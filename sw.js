// Sovereignty — Service Worker (offline-first cache)
const CACHE_NAME = 'sov-v2';

// Cache the page + Three.js on first load
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll([
                'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
            ]).catch(function() {});
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', function(e) {
    // Clean old caches
    e.waitUntil(
        caches.keys().then(function(names) {
            return Promise.all(
                names.filter(function(n) { return n !== CACHE_NAME; })
                     .map(function(n) { return caches.delete(n); })
            );
        })
    );
    self.clients.claim();
});

// Network-first for HTML + JS (always get latest during dev), cache-first for assets
self.addEventListener('fetch', function(e) {
    var url = e.request.url;
    // HTML + JS files — network first, fall back to cache (dev-friendly)
    if (e.request.mode === 'navigate' || url.endsWith('.html') || url.endsWith('.js')) {
        e.respondWith(
            fetch(e.request).then(function(resp) {
                var clone = resp.clone();
                caches.open(CACHE_NAME).then(function(c) { c.put(e.request, clone); });
                return resp;
            }).catch(function() {
                return caches.match(e.request);
            })
        );
        return;
    }
    // Everything else (audio, images, CDN libs) — cache first, fall back to network
    e.respondWith(
        caches.match(e.request).then(function(cached) {
            if (cached) return cached;
            return fetch(e.request).then(function(resp) {
                var clone = resp.clone();
                caches.open(CACHE_NAME).then(function(c) { c.put(e.request, clone); });
                return resp;
            });
        })
    );
});
