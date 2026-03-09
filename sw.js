const CACHE_NAME = 'sterrenhemel-v2';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Libre+Franklin:wght@400;500;600&display=swap'
];

const NEWS_CACHE = 'sterrenhemel-news-v1';
const WEATHER_CACHE = 'sterrenhemel-weather-v1';

// Install: cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME && k !== NEWS_CACHE && k !== WEATHER_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch strategy
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // RSS/News feeds: stale-while-revalidate (show cached, update in background)
  if (url.hostname === 'api.rss2json.com') {
    event.respondWith(staleWhileRevalidate(event.request, NEWS_CACHE, 30 * 60 * 1000)); // 30 min
    return;
  }

  // Weather API: stale-while-revalidate with shorter TTL
  if (url.hostname === 'api.open-meteo.com') {
    event.respondWith(staleWhileRevalidate(event.request, WEATHER_CACHE, 15 * 60 * 1000)); // 15 min
    return;
  }

  // Google Fonts: cache-first
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // Static assets: cache-first
  event.respondWith(cacheFirst(event.request));
});

// Cache-first: try cache, fallback to network
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // If offline and not cached, return a basic offline response
    return new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

// Stale-while-revalidate: return cached immediately, fetch fresh in background
async function staleWhileRevalidate(request, cacheName, maxAge) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  // Fetch fresh data in background
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      // Store with timestamp
      const cloned = response.clone();
      cache.put(request, cloned);
    }
    return response;
  }).catch(() => null);

  // If we have a cached response, return it immediately
  if (cached) {
    // Still trigger the background fetch to update cache
    fetchPromise;
    return cached;
  }

  // No cache: wait for network
  const networkResponse = await fetchPromise;
  if (networkResponse) return networkResponse;

  // Totally offline, no cache
  return new Response(JSON.stringify({ status: 'error', items: [] }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
