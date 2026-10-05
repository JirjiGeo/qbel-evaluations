create table if not exists public.training_documents (
  id uuid primary key default gen_random_uuid(),
  resource_id uuid not null references public.development_resources(id) on delete cascade,
  title text not null,
  file_name text not null,
  file_type text not null,
  file_path text not null,
  created_at timestamptz not null default now()
);

create index if not exists training_documents_resource_id_idx on public.training_documents(resource_id);
alter table public.training_documents enable row level security;

drop policy if exists "Authenticated users can read training documents" on public.training_documents;
create policy "Authenticated users can read training documents"
  on public.training_documents for select to authenticated using (true);
drop policy if exists "Authenticated users can insert training documents" on public.training_documents;
create policy "Authenticated users can insert training documents"
  on public.training_documents for insert to authenticated with check (true);
drop policy if exists "Authenticated users can delete training documents" on public.training_documents;
create policy "Authenticated users can delete training documents"
  on public.training_documents for delete to authenticated using (true);