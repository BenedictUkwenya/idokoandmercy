-- Run this in the Supabase SQL editor for the Idoko & Mercy RSVP form.

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text not null,
  phone text not null,
  wedding_attendance text not null check (wedding_attendance in ('accepts', 'declines')),
  guest_count integer,
  guest_names text,
  traditional_attendance text not null check (traditional_attendance in ('accepts', 'declines')),
  song_request text,
  special_notes text,
  confirmation_email_sent boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists rsvps_created_at_idx on public.rsvps (created_at desc);
create index if not exists rsvps_email_idx on public.rsvps (email);

alter table public.rsvps enable row level security;

-- No public read/write policies: the Next.js API uses the service role key.
