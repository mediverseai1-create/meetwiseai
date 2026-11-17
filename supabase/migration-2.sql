-- Run once in the Supabase SQL editor (after schema.sql).
alter table public.profiles
  add column if not exists full_name text,
  add column if not exists company text,
  add column if not exists role text,
  add column if not exists country text,
  add column if not exists use_case text;

alter table public.meetings
  add column if not exists type text default 'general',
  add column if not exists status text default 'analyzed';

alter table public.actions
  add column if not exists status text not null default 'open';

create policy "own profile update" on public.profiles for update using (auth.uid() = id);
