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
  file_name text not null,
  file_type text not null,
  file_data text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.training_assignments (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.employees(id) on delete cascade,
  resource_id uuid not null references public.development_resources(id) on delete cascade,
  assigned_date date not null default current_date,
  due_date date,
  status text not null default 'Assigned' check (status in ('Assigned','In progress','Completed')),
  completed_date date,
  created_at timestamptz not null default now()
);

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

