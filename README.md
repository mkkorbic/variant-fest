# VARIANT Festival

Starter site for VARIANT, an AI film, motion, and visual-art festival.

## Structure

- `index.html` — current single-page landing page
- `assets/images/` — project imagery
- `assets/fonts/` — locally served fonts, if added
- `css/` — styles when the inline stylesheet is separated
- `js/` — scripts when the inline JavaScript is separated

## Add visual content

Add a logo, local images, remote image URLs, or MP4 videos through [`js/content.js`](js/content.js). The featured-work slider automatically appears after at least one media item has a `src`; it stays hidden until then.

Open `index.html` in a browser to view the site.

## Deploy to Vercel

1. Create a dedicated Supabase project for VARIANT. Keep unrelated MVPs in separate Supabase projects—the strongest data boundary.
2. In **Project Settings → Data API**, add `variant` to **Exposed schemas**.
3. Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL editor.
4. Add `SUPABASE_URL` and `SUPABASE_SECRET_KEY` to Vercel project environment variables. Never commit or expose the secret key.
4. Import this Git repository into Vercel, or run `vercel` from this directory after logging in.

Until those two environment variables are configured, the form responds with a clear email fallback rather than pretending a signup was saved.

This project includes a local Node runtime and Vercel CLI, so no system-wide installation is required. From the project folder, use:

```sh
./scripts/vercel.sh
```

The first run will ask you to log in to Vercel and create or link a Vercel project. Use `./scripts/vercel.sh --prod` when you are ready for the public production deployment.
