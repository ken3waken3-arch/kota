const CACHE_NAME = "jiritsu-navi-github-v13";
const APP_ENTRY = new URL("./index.html", self.location.href);
const APP_PATCH = new URL("./worksheet-enhancement.js", self.location.href);
const APP_LOCATION = new URL("./save-location.js", self.location.href);
const APP_CONSULT = new URL("./consultation.js", self.location.href);
const APP_SHELL = [APP_ENTRY, new URL("./manifest.webmanifest", self.location.href), new URL("./icon.svg", self.location.href), APP_PATCH, APP_LOCATION, APP_CONSULT];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith("jiritsu-navi-github-") && key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

async function worksheetResponse(response) {
  if (!response) return new Response("一度オンラインで開くと、オフラインでも使えます。", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  const html = await response.text();
  let scripts = "";
  if (!html.includes("worksheet-enhancement.js")) scripts += '<script src="./worksheet-enhancement.js"></script>';
  if (!html.includes("save-location.js")) scripts += '<script src="./save-location.js"></script>';
  if (!html.includes("consultation.js")) scripts += '<script src="./consultation.js"></script>';
  if (!scripts) return new Response(html, { status: response.status, statusText: response.statusText, headers: response.headers });
  const updated = html.replace(/<\/body>/i, `${scripts}</body>`);
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.delete("etag");
  headers.set("content-type", "text/html; charset=utf-8");
  return new Response(updated, { status: response.status, statusText: response.statusText, headers });
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then(worksheetResponse).catch(async () => worksheetResponse(await caches.match(APP_ENTRY))));
    return;
  }
  if (APP_SHELL.some((asset) => asset.href === url.href)) event.respondWith(caches.match(request).then((cached) => cached || fetch(request)));
});
