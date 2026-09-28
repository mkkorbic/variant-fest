/*
 * Edit this file to add your logo and featured work.
 * `src` accepts a local project path (for example, /assets/images/logo.svg)
 * or an absolute HTTPS image/video URL.
 */
window.VARIANT_CONTENT = {
  logo: {
    src: "",
    alt: "VARIANT",
  },
  featuredWork: [
    // {
    //   type: "image", // "image" or "video"
    //   src: "/assets/images/example.jpg",
    //   alt: "Description of the work",
    //   title: "Work title",
    //   credit: "Artist name · 2027",
    // },
  ],
};

// Optional: add your Cloudflare Turnstile site key to activate CAPTCHA.
// Keep the matching secret key in Vercel only, as TURNSTILE_SECRET_KEY.
window.VARIANT_FORM_PROTECTION = { turnstileSiteKey: "" };
