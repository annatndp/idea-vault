-- Run this once in Supabase → SQL Editor → New query → Run.
-- Works for a fresh setup OR to upgrade the earlier "open" version to private.

create table if not exists public.videos (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid default auth.uid(),
  url        text not null,
  note       text,
  platform   text,
  categories text[] default '{}',
  thumb      text,
  created_at timestamptz default now()
);

-- Make sure the owner column exists + defaults to the logged-in user
alter table public.videos add column if not exists user_id uuid;
alter table public.videos alter column user_id set default auth.uid();

-- Row Level Security: each person only sees their own rows
alter table public.videos enable row level security;
drop policy if exists "anon full access" on public.videos;
drop policy if exists "own rows" on public.videos;
create policy "own rows" on public.videos
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Realtime (safe to re-run)
do $$
begin
  alter publication supabase_realtime add table public.videos;
exception when duplicate_object then null;
end $$;
