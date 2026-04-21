const CACHE_NAME = 'optistep-v2';
const BASE_PATH = '/OptiStep/';
const ASSETS_TO_CACHE = [
  BASE_PATH,
  BASE_PATH + 'index.html',
  BASE_PATH + 'site.webmanifest',
  BASE_PATH + 'favicon.ico',
  BASE_PATH + 'android-chrome-192x192.png',
  BASE_PATH + 'android-chrome-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});