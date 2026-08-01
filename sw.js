const CACHE = "idea-vault-v3";
const SHELL = ["./","./index.html","./manifest.webmanifest","./config.js","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;              // let Supabase / fonts / microlink pass straight to network
  if (req.mode === "navigate") {                           // pages: network-first so shared links work, offline falls back to cache
    e.respondWith(fetch(req).catch(() => caches.match("./index.html")));
    return;
  }
  e.respondWith(caches.match(req).then(c => c || fetch(req)));  // assets: cache-first
});
