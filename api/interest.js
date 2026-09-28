const value = (input, maxLength = 500) =>
  typeof input === "string" ? input.trim().slice(0, maxLength) : "";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const name = value(req.body?.name, 120);
  const email = value(req.body?.email, 254).toLowerCase();
  const city = value(req.body?.city, 160);
  const interest = value(req.body?.interest, 120);
  const note = value(req.body?.note, 1_000);
  const website = value(req.body?.website, 200);
  const startedAt = Number(req.body?.started_at);

  const requestOrigin = req.headers.origin;
  const requestHost = req.headers["x-forwarded-host"] || req.headers.host;
  if (requestOrigin && requestHost && new URL(requestOrigin).host !== requestHost) {
    return res.status(403).json({ error: "This signup request is not allowed." });
  }

  // Silently accept likely bots, without storing their submitted data.
  if (website) return res.status(201).json({ ok: true });

  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2_000) {
    return res.status(400).json({ error: "Please take a moment and try again." });
  }

  if (!name || !email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Please provide your name and a valid email." });
  }

  const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!process.env.SUPABASE_URL || !supabaseKey) {
    return res.status(503).json({
      error: "Signups are not configured yet. Please email hello@variantfestival.com.",
    });
  }

  if (process.env.TURNSTILE_SECRET_KEY) {
    const token = value(req.body?.["cf-turnstile-response"], 2_048);
    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY, response: token }),
    });
    const result = await verification.json();
    if (!result.success) return res.status(400).json({ error: "Please complete the security check." });
  }

  try {
    const response = await fetch(
      `${process.env.SUPABASE_URL.replace(/\/$/, "")}/rest/v1/waitlist_entries?on_conflict=email`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          "Content-Profile": "variant",
          "Accept-Profile": "variant",
          Prefer: "resolution=merge-duplicates,return=minimal",
        },
        body: JSON.stringify({ name, email, city: city || null, interest: interest || null, note: note || null }),
      },
    );

    if (!response.ok) {
      console.error("Supabase signup error", await response.text());
      return res.status(502).json({ error: "We could not save your signup. Please try again." });
    }

    return res.status(201).json({ ok: true });
  } catch (error) {
    console.error("Signup error", error);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
