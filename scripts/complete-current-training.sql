-- One-time operation: complete active Courses/Trainings assignments.
-- Assignments with exam results keep the latest score's pass/fail outcome.
-- Assignments without an exam result are marked Passed manually.
-- The assignment triggers calculate validity and issue eligible certificates.
begin;

with latest_assessments as (
  select distinct on (assignment_id)
    assignment_id,
    id as assessment_id,
    attempted_on,
    passed
  from public.training_assessment_results
  order by assignment_id, attempted_on desc, created_at desc
),
target_assignments as (
  select
    assignment.id,
    latest.assessment_id,
    latest.attempted_on,
    latest.passed
  from public.training_assignments as assignment
  join public.development_resources as resource
    on resource.id = assignment.resource_id
  left join latest_assessments as latest
    on latest.assignment_id = assignment.id
  where assignment.status in ('Assigned', 'In progress')
    and resource.category in ('Courses', 'Trainings')
)
update public.training_assignments as assignment
set status = 'Completed',
    completed_date = coalesce(assignment.completed_date, current_date),
    result_status = case
      when target.assessment_id is null or target.passed then 'Passed'
      else 'Failed'
    end,
    result_source = case
      when target.assessment_id is null then 'manual'
      else 'assessment'
    end,
    passed_date = case
      when target.assessment_id is null then current_date
      when target.passed then target.attempted_on
      else null
    end
from target_assignments as target
where assignment.id = target.id
returning assignment.id, assignment.employee_id, assignment.resource_id,
  assignment.status, assignment.result_status, assignment.training_valid_until;

commit;
