(function () {
  const content = window.VARIANT_CONTENT || {};
  const brand = document.querySelector(".brand");

  if (content.logo?.src && brand) {
    const logo = new Image();
    logo.src = content.logo.src;
    logo.alt = content.logo.alt || "VARIANT";
    logo.addEventListener("load", () => {
      brand.replaceChildren(logo);
      brand.classList.add("brand--image");
    });
  }

  const work = Array.isArray(content.featuredWork) ? content.featuredWork.filter((item) => item?.src) : [];
  const section = document.getElementById("featured-work");
  const track = document.getElementById("featured-work-track");
  const previous = document.querySelector("[data-gallery-prev]");
  const next = document.querySelector("[data-gallery-next]");

  if (!section || !track || work.length === 0) return;

  section.hidden = false;
  let activeIndex = 0;

  const render = () => {
    const item = work[activeIndex];
    const media = item.type === "video"
      ? `<video controls preload="metadata" playsinline src="${item.src}"></video>`
      : `<img src="${item.src}" alt="${item.alt || ""}">`;

    track.innerHTML = `<figure class="featured-work__slide">${media}<figcaption><span>${item.title || "Featured work"}</span><span>${item.credit || ""}</span></figcaption></figure>`;
    previous.disabled = work.length < 2;
    next.disabled = work.length < 2;
  };

  previous.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + work.length) % work.length;
    render();
  });

  next.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % work.length;
    render();
  });

  render();
})();
