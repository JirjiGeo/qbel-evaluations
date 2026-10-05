alter table public.training_assignments
  add column if not exists attended boolean;

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