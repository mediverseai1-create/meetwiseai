-- Run this in the Supabase SQL editor.
create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  transcript text not null,
  analysis jsonb,
  followup_email text,
  created_at timestamptz not null default now()
);

create table if not exists public.actions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  text text not null,
  owner text,
  due text,
  done boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  plan text not null default 'free'
);

alter table public.meetings enable row level security;
alter table public.actions enable row level security;
alter table public.profiles enable row level security;

create policy "own meetings" on public.meetings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own actions" on public.actions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own profile read" on public.profiles for select using (auth.uid() = id);
create policy "own profile insert" on public.profiles for insert with check (auth.uid() = id);

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id) values (new.id) on conflict do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute procedure public.handle_new_user();
