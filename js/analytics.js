(function () {
  // Only measure the public site, never local previews.
  if (!['variantfest.com', 'www.variantfest.com'].includes(location.hostname)) return;
  window.va = window.va || function () {
    (window.vaq = window.vaq || []).push(arguments);
  };
  // Do not send query strings or fragments that could contain personal data.
  window.va('beforeSend', function (event) {
    const url = new URL(event.url);
    url.search = '';
    url.hash = '';
    return { ...event, url: url.toString() };
  });
  const script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  document.head.append(script);
})();
