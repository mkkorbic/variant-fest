(function () {
  const form = document.getElementById("interest");
  if (!form) return;

  const button = form.querySelector("button");
  const success = document.getElementById("success");
  const protection = window.VARIANT_FORM_PROTECTION || {};

  const addHiddenField = (name, value) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.append(input);
  };

  const honeypot = document.createElement("input");
  honeypot.name = "website";
  honeypot.type = "text";
  honeypot.autocomplete = "off";
  honeypot.tabIndex = -1;
  honeypot.setAttribute("aria-hidden", "true");
  honeypot.style.cssText = "position:absolute;left:-9999px;opacity:0";
  form.append(honeypot);
  addHiddenField("started_at", String(Date.now()));

  if (protection.turnstileSiteKey) {
    const target = document.createElement("div");
    target.className = "cf-turnstile";
    target.dataset.sitekey = protection.turnstileSiteKey;
    form.insertBefore(target, button);
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.head.append(script);
  }

  const show = (message, isError) => {
    success.textContent = message;
    success.classList.toggle("is-error", Boolean(isError));
    success.style.display = "block";
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    button.textContent = "Joining…";
    success.style.display = "none";

    try {
      const payload = Object.fromEntries(new FormData(form));
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong.");
      show("You’re on the founding list. We’ll be in touch with open call details.");
      button.textContent = "You’re in";
      form.reset();
    } catch (error) {
      show(error.message || "We could not save your signup. Please try again.", true);
      button.disabled = false;
      button.textContent = "Try again";
    } finally {
      button.removeAttribute("aria-busy");
    }
  });
})();
