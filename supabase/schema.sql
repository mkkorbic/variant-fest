create table if not exists public.interest_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  city text,
  interest text,
  note text,
  created_at timestamptz not null default now()
);

alter table public.interest_submissions enable row level security;

-- The browser never accesses this table directly. The Vercel function uses
-- the Supabase service-role key, which bypasses RLS and must remain secret.
