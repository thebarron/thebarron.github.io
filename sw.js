// Sovereignty — Service Worker (offline-first cache)
const CACHE_NAME = 'sov-v4';

// API paths — never cached (dev-server endpoints, dynamic data).
// Pattern-matches against URL pathname.
const API_PATHS = ['/character_creator/', '/map_editor/', '/character_creator/parts', '/buildings/'];

// Pre-cache nothing on install — Three.js ships from same-origin _lib/ now;
// the old r128 CDN line was dead code from the monolith era. Just take over.
self.addEventListener('install', function(e) {
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

// Network-first for HTML + JS (always get latest during dev), cache-first for assets.
// API paths are passthrough — never touched by the SW so failures don't poison
// the cache and dynamic data is always fresh.
self.addEventListener('fetch', function(e) {
    var url = e.request.url;
    var pathname;
    try { pathname = new URL(url).pathname; } catch (_) { pathname = ''; }

    // API endpoints — let the network handle it directly, no cache layer.
    for (var i = 0; i < API_PATHS.length; i++) {
        if (pathname.indexOf(API_PATHS[i]) === 0) return;
    }

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
