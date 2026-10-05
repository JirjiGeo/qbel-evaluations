create extension if not exists pgcrypto;

create table if not exists public.employees (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  department text not null,
  designation text not null,
  joining_date date,
  reporting_to text,
  job_description_name text,
  job_description_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.evaluations (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.employees(id) on delete cascade,
  evaluation_date date not null default current_date,
  score numeric(5,2) not null check (score >= 0 and score <= 100),
  previous_score numeric(5,2) check (previous_score >= 0 and previous_score <= 100),
  ratings jsonb not null default '[]'::jsonb,
  employee_area_of_development text,
  employee_improvement text,
  employee_strength text,
  direct_manager_comments text,
  evaluator_comment text,
  employee_signature text,
  manager_signature text,
  evaluator_signature text,
  created_at timestamptz not null default now()
);

create index if not exists evaluations_employee_id_idx on public.evaluations(employee_id);
create index if not exists evaluations_date_idx on public.evaluations(evaluation_date desc);

alter table public.employees enable row level security;
alter table public.evaluations enable row level security;

drop policy if exists "Authenticated users can read employees" on public.employees;
drop policy if exists "Authenticated users can insert employees" on public.employees;
drop policy if exists "Authenticated users can update employees" on public.employees;
drop policy if exists "Authenticated users can delete employees" on public.employees;
drop policy if exists "Authenticated users can read evaluations" on public.evaluations;
drop policy if exists "Authenticated users can insert evaluations" on public.evaluations;
drop policy if exists "Authenticated users can update evaluations" on public.evaluations;
drop policy if exists "Authenticated users can delete evaluations" on public.evaluations;

drop policy if exists "Authenticated users can read development resources" on public.development_resources;
drop policy if exists "Authenticated users can insert development resources" on public.development_resources;
drop policy if exists "Authenticated users can update development resources" on public.development_resources;
drop policy if exists "Authenticated users can delete development resources" on public.development_resources;
drop policy if exists "Authenticated users can read training assignments" on public.training_assignments;
drop policy if exists "Authenticated users can insert training assignments" on public.training_assignments;
drop policy if exists "Authenticated users can update training assignments" on public.training_assignments;
drop policy if exists "Authenticated users can delete training assignments" on public.training_assignments;

create table if not exists public.development_resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  department text not null,
  category text not null,
  recommended boolean not null default false,
  file_name text not null,
  file_type text not null,
  file_data text,
  file_path text,
  created_at timestamptz not null default now()
);

create table if not exists public.training_assignments (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.employees(id) on delete cascade,
  resource_id uuid not null references public.development_resources(id) on delete cascade,
  quarter text not null default '',
  assigned_date date not null default current_date,
  scheduled_date date,
  scheduled_time time without time zone,
  due_date date,
  status text not null default 'Assigned' check (status in ('Assigned','In progress','Completed')),
  completed_date date,
  skills_to_develop text[] not null default '{}',
  result_status text not null default 'Pending',
  result_source text not null default 'manual',
  passed_date date,
  training_valid_until date,
  created_at timestamptz not null default now()
);

alter table public.training_assignments
  add column if not exists skills_to_develop text[] not null default '{}';
alter table public.training_assignments add column if not exists scheduled_date date;
alter table public.training_assignments add column if not exists scheduled_time time without time zone;
alter table public.training_assignments add column if not exists attended boolean;
alter table public.training_assignments add column if not exists result_status text not null default 'Pending';
alter table public.training_assignments add column if not exists result_source text not null default 'manual';
alter table public.training_assignments add column if not exists passed_date date;
alter table public.training_assignments add column if not exists training_valid_until date;
alter table public.training_assignments drop constraint if exists training_assignments_result_status_check;
alter table public.training_assignments add constraint training_assignments_result_status_check check (result_status in ('Pending','Passed','Failed'));
alter table public.training_assignments drop constraint if exists training_assignments_result_source_check;
alter table public.training_assignments add constraint training_assignments_result_source_check check (result_source in ('manual','assessment'));

create table if not exists public.development_plans (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.employees(id) on delete cascade,
  goal text not null,
  action_plan text not null,
  due_date date not null,
  status text not null default 'Planned' check (status in ('Planned','In progress','Completed','On hold')),
  created_at timestamptz not null default now()
);

create table if not exists public.development_skills (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.employees(id) on delete cascade,
  competency text not null,
  current_level smallint not null check (current_level between 1 and 5),
  target_level smallint not null check (target_level between 1 and 5),
  assessed_on date not null default current_date,
  created_at timestamptz not null default now(),
  unique (employee_id, competency)
);

create table if not exists public.employee_certifications (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.employees(id) on delete cascade,
  certificate_name text not null,
  issuer text,
  issued_on date,
  expires_on date,
  training_assignment_id uuid,
  file_name text,
  file_path text,
  created_at timestamptz not null default now()
);

alter table public.employee_certifications
  add column if not exists training_assignment_id uuid;
alter table public.employee_certifications
  drop constraint if exists employee_certifications_training_assignment_id_fkey;
alter table public.employee_certifications
  add constraint employee_certifications_training_assignment_id_fkey
  foreign key (training_assignment_id) references public.training_assignments(id) on delete cascade;

create table if not exists public.training_assessment_results (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.training_assignments(id) on delete cascade,
  attempted_on date not null default current_date,
  score numeric(5,2) not null check (score between 0 and 100),
  pass_mark numeric(5,2) not null default 70 check (pass_mark between 0 and 100),
  passed boolean not null check (passed = (score >= pass_mark)),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.training_impact_records (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.training_assignments(id) on delete cascade,
  measure text not null,
  before_value numeric(12,2) not null,
  after_value numeric(12,2) not null,
  measured_on date not null default current_date,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.development_plans enable row level security;
alter table public.development_skills enable row level security;
alter table public.employee_certifications enable row level security;
alter table public.training_assessment_results enable row level security;
alter table public.training_impact_records enable row level security;

create index if not exists development_plans_employee_id_idx on public.development_plans(employee_id);
create index if not exists development_skills_employee_id_idx on public.development_skills(employee_id);
create index if not exists employee_certifications_employee_id_idx on public.employee_certifications(employee_id);
create index if not exists employee_certifications_expires_on_idx on public.employee_certifications(expires_on);
create unique index if not exists employee_certifications_training_assignment_idx on public.employee_certifications(training_assignment_id);
create index if not exists training_assessment_results_assignment_id_idx on public.training_assessment_results(assignment_id);
create index if not exists training_impact_records_assignment_id_idx on public.training_impact_records(assignment_id);

insert into storage.buckets (id, name, public)
values ('development-certificates', 'development-certificates', false)
on conflict (id) do update set public = false;

drop policy if exists "Authenticated users can read development plans" on public.development_plans;
drop policy if exists "Authenticated users can insert development plans" on public.development_plans;
drop policy if exists "Authenticated users can update development plans" on public.development_plans;
drop policy if exists "Authenticated users can delete development plans" on public.development_plans;
drop policy if exists "Authenticated users can read development skills" on public.development_skills;
drop policy if exists "Authenticated users can insert development skills" on public.development_skills;
drop policy if exists "Authenticated users can update development skills" on public.development_skills;
drop policy if exists "Authenticated users can delete development skills" on public.development_skills;
drop policy if exists "Authenticated users can read employee certifications" on public.employee_certifications;
drop policy if exists "Authenticated users can insert employee certifications" on public.employee_certifications;
drop policy if exists "Authenticated users can update employee certifications" on public.employee_certifications;
drop policy if exists "Authenticated users can delete employee certifications" on public.employee_certifications;
drop policy if exists "Authenticated users can read training assessment results" on public.training_assessment_results;
drop policy if exists "Authenticated users can insert training assessment results" on public.training_assessment_results;
drop policy if exists "Authenticated users can update training assessment results" on public.training_assessment_results;
drop policy if exists "Authenticated users can delete training assessment results" on public.training_assessment_results;
drop policy if exists "Authenticated users can read training impact records" on public.training_impact_records;
drop policy if exists "Authenticated users can insert training impact records" on public.training_impact_records;
drop policy if exists "Authenticated users can update training impact records" on public.training_impact_records;
drop policy if exists "Authenticated users can delete training impact records" on public.training_impact_records;
drop policy if exists "Authenticated users can read development certificate files" on storage.objects;
drop policy if exists "Authenticated users can upload development certificate files" on storage.objects;
drop policy if exists "Authenticated users can delete development certificate files" on storage.objects;

alter table public.development_resources add column if not exists recommended boolean not null default false;
alter table public.development_resources add column if not exists file_path text;
alter table public.development_resources alter column file_data drop not null;
alter table public.training_assignments add column if not exists quarter text not null default '';

insert into storage.buckets (id, name, public)
values ('development-resources', 'development-resources', false)
on conflict (id) do update set public = false;

drop policy if exists "Authenticated users can read development resource files" on storage.objects;
drop policy if exists "Authenticated users can upload development resource files" on storage.objects;
drop policy if exists "Authenticated users can delete development resource files" on storage.objects;

create index if not exists development_resources_created_at_idx on public.development_resources(created_at desc);
create index if not exists training_assignments_employee_id_idx on public.training_assignments(employee_id);
create index if not exists training_assignments_resource_id_idx on public.training_assignments(resource_id);

alter table public.development_resources enable row level security;
alter table public.training_assignments enable row level security;

create policy "Authenticated users can read employees"
  on public.employees for select to authenticated using (true);
create policy "Authenticated users can insert employees"
  on public.employees for insert to authenticated with check (true);
create policy "Authenticated users can update employees"
  on public.employees for update to authenticated using (true) with check (true);
create policy "Authenticated users can delete employees"
  on public.employees for delete to authenticated using (true);

create policy "Authenticated users can read evaluations"
  on public.evaluations for select to authenticated using (true);
create policy "Authenticated users can insert evaluations"
  on public.evaluations for insert to authenticated with check (true);
create policy "Authenticated users can update evaluations"
  on public.evaluations for update to authenticated using (true) with check (true);
create policy "Authenticated users can delete evaluations"
  on public.evaluations for delete to authenticated using (true);

create policy "Authenticated users can read development resources"
  on public.development_resources for select to authenticated using (true);
create policy "Authenticated users can insert development resources"
  on public.development_resources for insert to authenticated with check (true);
create policy "Authenticated users can update development resources"
  on public.development_resources for update to authenticated using (true) with check (true);
create policy "Authenticated users can delete development resources"
  on public.development_resources for delete to authenticated using (true);

create policy "Authenticated users can read training assignments"
  on public.training_assignments for select to authenticated using (true);
create policy "Authenticated users can insert training assignments"
  on public.training_assignments for insert to authenticated with check (true);
create policy "Authenticated users can update training assignments"
  on public.training_assignments for update to authenticated using (true) with check (true);
create policy "Authenticated users can delete training assignments"
  on public.training_assignments for delete to authenticated using (true);

create policy "Authenticated users can read development resource files"
  on storage.objects for select to authenticated using (bucket_id = 'development-resources');
create policy "Authenticated users can upload development resource files"
  on storage.objects for insert to authenticated with check (bucket_id = 'development-resources');
create policy "Authenticated users can delete development resource files"
  on storage.objects for delete to authenticated using (bucket_id = 'development-resources');

create policy "Authenticated users can read development plans"
  on public.development_plans for select to authenticated using (true);
create policy "Authenticated users can insert development plans"
  on public.development_plans for insert to authenticated with check (true);
create policy "Authenticated users can update development plans"
  on public.development_plans for update to authenticated using (true) with check (true);
create policy "Authenticated users can delete development plans"
  on public.development_plans for delete to authenticated using (true);

create policy "Authenticated users can read development skills"
  on public.development_skills for select to authenticated using (true);
create policy "Authenticated users can insert development skills"
  on public.development_skills for insert to authenticated with check (true);
create policy "Authenticated users can update development skills"
  on public.development_skills for update to authenticated using (true) with check (true);
create policy "Authenticated users can delete development skills"
  on public.development_skills for delete to authenticated using (true);

create policy "Authenticated users can read employee certifications"
  on public.employee_certifications for select to authenticated using (true);
create policy "Authenticated users can insert employee certifications"
  on public.employee_certifications for insert to authenticated with check (true);
create policy "Authenticated users can update employee certifications"
  on public.employee_certifications for update to authenticated using (true) with check (true);
create policy "Authenticated users can delete employee certifications"
  on public.employee_certifications for delete to authenticated using (true);

create policy "Authenticated users can read training assessment results"
  on public.training_assessment_results for select to authenticated using (true);
create policy "Authenticated users can insert training assessment results"
  on public.training_assessment_results for insert to authenticated with check (true);
create policy "Authenticated users can update training assessment results"
  on public.training_assessment_results for update to authenticated using (true) with check (true);
create policy "Authenticated users can delete training assessment results"
  on public.training_assessment_results for delete to authenticated using (true);

create policy "Authenticated users can read training impact records"
  on public.training_impact_records for select to authenticated using (true);
create policy "Authenticated users can insert training impact records"
  on public.training_impact_records for insert to authenticated with check (true);
create policy "Authenticated users can update training impact records"
  on public.training_impact_records for update to authenticated using (true) with check (true);
create policy "Authenticated users can delete training impact records"
  on public.training_impact_records for delete to authenticated using (true);

create policy "Authenticated users can read development certificate files"
  on storage.objects for select to authenticated using (bucket_id = 'development-certificates');
create policy "Authenticated users can upload development certificate files"
  on storage.objects for insert to authenticated with check (bucket_id = 'development-certificates');
create policy "Authenticated users can delete development certificate files"
  on storage.objects for delete to authenticated using (bucket_id = 'development-certificates');

create or replace function public.enforce_training_attendance()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.status = 'Completed' and new.attended is false then
    new.result_status := 'Failed';
    new.result_source := 'manual';
    new.passed_date := null;
    new.training_valid_until := null;
  end if;
  return new;
end;
$$;

drop trigger if exists enforce_training_attendance on public.training_assignments;
create trigger enforce_training_attendance
  before insert or update on public.training_assignments
  for each row execute function public.enforce_training_attendance();

create or replace function public.set_training_assignment_validity()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.result_status = 'Passed' then
    if tg_op = 'INSERT' then
      new.passed_date := coalesce(new.passed_date, new.completed_date, current_date);
    elsif old.status <> 'Completed' or old.result_status <> 'Passed' or new.passed_date is distinct from old.passed_date then
      new.passed_date := coalesce(new.passed_date, new.completed_date, current_date);
    else
      new.passed_date := coalesce(new.passed_date, old.passed_date, new.completed_date, current_date);
    end if;
    new.training_valid_until := case when new.status = 'Completed' then (new.passed_date + interval '1 year')::date else null end;
  else
    new.passed_date := null;
    new.training_valid_until := null;
  end if;
  return new;
end;
$$;

drop trigger if exists set_training_assignment_validity on public.training_assignments;
create trigger set_training_assignment_validity
  before insert or update on public.training_assignments
  for each row execute function public.set_training_assignment_validity();

create or replace function public.sync_training_assignment_result_for(p_assignment_id uuid)
returns void
language plpgsql
set search_path = public
as $$
declare
  latest_result public.training_assessment_results%rowtype;
begin
  select * into latest_result
  from public.training_assessment_results
  where training_assessment_results.assignment_id = p_assignment_id
  order by attempted_on desc, created_at desc
  limit 1;

  if found then
    update public.training_assignments
    set result_status = case when latest_result.passed then 'Passed' else 'Failed' end,
        result_source = 'assessment',
        passed_date = case when latest_result.passed then latest_result.attempted_on else null end
    where id = p_assignment_id;
  else
    update public.training_assignments
    set result_status = 'Pending', result_source = 'manual', passed_date = null
    where id = p_assignment_id and result_source = 'assessment';
  end if;
end;
$$;

create or replace function public.sync_training_assignment_result()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if tg_op = 'DELETE' then
    perform public.sync_training_assignment_result_for(old.assignment_id);
    return old;
  end if;

  if tg_op = 'UPDATE' and old.assignment_id is distinct from new.assignment_id then
    perform public.sync_training_assignment_result_for(old.assignment_id);
  end if;
  perform public.sync_training_assignment_result_for(new.assignment_id);
  return new;
end;
$$;

drop trigger if exists sync_training_assignment_result on public.training_assessment_results;
create trigger sync_training_assignment_result
  after insert or update or delete on public.training_assessment_results
  for each row execute function public.sync_training_assignment_result();

create or replace function public.issue_training_completion_certificate()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  certificate_issue_date date;
begin
  if new.status <> 'Completed' or new.result_status <> 'Passed' then
    delete from public.employee_certifications
    where training_assignment_id = new.id;
    return new;
  end if;

  certificate_issue_date := coalesce(new.passed_date, new.completed_date, current_date);

  insert into public.employee_certifications (
    employee_id,
    training_assignment_id,
    certificate_name,
    issuer,
    issued_on,
    expires_on
  )
  select
    new.employee_id,
    new.id,
    resource.title || ' Completion Certificate',
    'QBEL FM & Technical Services',
    certificate_issue_date,
    coalesce(new.training_valid_until, (certificate_issue_date + interval '1 year')::date)
  from public.development_resources as resource
  where resource.id = new.resource_id
    and resource.category in ('Courses', 'Trainings')
  on conflict (training_assignment_id) do update set
    employee_id = excluded.employee_id,
    certificate_name = excluded.certificate_name,
    issuer = excluded.issuer,
    issued_on = excluded.issued_on,
    expires_on = excluded.expires_on;

  return new;
end;
$$;

drop trigger if exists issue_training_completion_certificate on public.training_assignments;
create trigger issue_training_completion_certificate
  after insert or update on public.training_assignments
  for each row execute function public.issue_training_completion_certificate();

delete from public.employee_certifications as certificate
using public.training_assignments as assignment, public.development_resources as resource
where certificate.training_assignment_id = assignment.id
  and resource.id = assignment.resource_id
  and (assignment.status <> 'Completed'
    or assignment.result_status <> 'Passed'
    or resource.category not in ('Courses', 'Trainings'));

insert into public.employee_certifications (
  employee_id,
  training_assignment_id,
  certificate_name,
  issuer,
  issued_on,
  expires_on
)
select
  assignment.employee_id,
  assignment.id,
  resource.title || ' Completion Certificate',
  'QBEL FM & Technical Services',
  coalesce(assignment.completed_date, current_date),
  (coalesce(assignment.completed_date, current_date) + interval '1 year')::date
from public.training_assignments as assignment
join public.development_resources as resource on resource.id = assignment.resource_id
where assignment.status = 'Completed'
  and assignment.result_status = 'Passed'
  and resource.category in ('Courses', 'Trainings')
on conflict (training_assignment_id) do nothing;


create table if not exists public.employee_assets (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.employees(id) on delete cascade,
  asset_type text not null,
  description text,
  serial_asset_no text,
  date_issued date,
  date_returned date,
  handover_form_name text,
  handover_form_data text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists employee_assets_employee_id_idx on public.employee_assets(employee_id);

alter table public.employee_assets enable row level security;

drop policy if exists "Authenticated users can read employee assets" on public.employee_assets;
drop policy if exists "Authenticated users can insert employee assets" on public.employee_assets;
drop policy if exists "Authenticated users can update employee assets" on public.employee_assets;
drop policy if exists "Authenticated users can delete employee assets" on public.employee_assets;

create policy "Authenticated users can read employee assets"
  on public.employee_assets for select to authenticated using (true);
create policy "Authenticated users can insert employee assets"
  on public.employee_assets for insert to authenticated with check (true);
create policy "Authenticated users can update employee assets"
  on public.employee_assets for update to authenticated using (true) with check (true);
create policy "Authenticated users can delete employee assets"
  on public.employee_assets for delete to authenticated using (true);
