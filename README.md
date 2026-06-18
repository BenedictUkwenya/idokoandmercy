# Idoko & Mercy — RSVP Form

Standalone wedding RSVP form with **Next.js**, **Supabase**, and **Resend**. Link this page from the Canva invitation.

## What it does

1. Guest fills the RSVP form
2. Response is saved in Supabase
3. Guest receives a confirmation email via Resend
4. Couple/planner receives a notification email (optional)

## Setup

### 1. Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Open **SQL Editor** and run `supabase/schema.sql`
3. Copy **Project URL** and **service role key** from **Project Settings → API**

### 2. Resend

1. Create an account at [resend.com](https://resend.com)
2. Create an API key
3. **Without a custom domain:** use `onboarding@resend.dev` as the sender and only send to your verified email while testing
4. After you buy a domain, verify it in Resend and update `RESEND_FROM_EMAIL`

### 3. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=onboarding@resend.dev
RSVP_NOTIFY_EMAIL=couple@example.com
```

### 4. Run locally

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## Canva integration

Add a button on the Canva site:

**RSVP Now** → `https://your-vercel-domain.com`

## Deploy

Push to GitHub and deploy on Vercel. Add the same environment variables in the Vercel project settings.
