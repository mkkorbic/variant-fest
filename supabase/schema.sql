-- VARIANT only. Use a separate Supabase project for every unrelated MVP.
create schema if not exists variant;
revoke all on schema variant from public;
grant usage on schema variant to service_role;

create table if not exists variant.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) <= 254),
  city text check (char_length(city) <= 160),
  interest text check (char_length(interest) <= 120),
  note text check (char_length(note) <= 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint waitlist_entries_email_key unique (email)
);

create or replace function variant.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists waitlist_entries_set_updated_at on variant.waitlist_entries;
create trigger waitlist_entries_set_updated_at before update on variant.waitlist_entries
for each row execute function variant.set_updated_at();

-- The browser has no direct database permissions. Only the Vercel API route writes.
revoke all on all tables in schema variant from anon, authenticated;
grant select, insert, update on variant.waitlist_entries to service_role;
alter table variant.waitlist_entries enable row level security;
-- Do not add policies: direct browser access is intentionally disabled.
