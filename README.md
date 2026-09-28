# VARIANT Festival

Starter site for VARIANT, an AI film, motion, and visual-art festival.

## Structure

- `index.html` — current single-page landing page
- `assets/images/` — project imagery
- `assets/fonts/` — locally served fonts, if added
- `css/` — styles when the inline stylesheet is separated
- `js/` — scripts when the inline JavaScript is separated

Open `index.html` in a browser to view the site.

## Deploy to Vercel

1. Create a Supabase project when you are ready to collect real signups.
2. Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL editor.
3. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to Vercel project environment variables. Do not put the service-role key in the site or commit it.
4. Import this Git repository into Vercel, or run `vercel` from this directory after logging in.

Until those two environment variables are configured, the form responds with a clear email fallback rather than pretending a signup was saved.
