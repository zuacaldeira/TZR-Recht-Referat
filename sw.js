const CACHE_NAME = 'kinderrechte-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/timeline.html',
  '/articles.html',
  '/games.html',
  '/vermittlung.html',
  '/css/variables.css',
  '/css/reset.css',
  '/css/layout.css',
  '/css/components.css',
  '/css/animations.css',
  '/css/pages/home.css',
  '/css/pages/timeline.css',
  '/css/pages/articles.css',
  '/css/pages/games.css',
  '/css/pages/vermittlung.css',
  '/js/main.js',
  '/js/timeline.js',
  '/js/articles.js',
  '/js/games.js',
  '/js/data/timeline-data.js',
  '/js/data/articles-data.js',
  '/js/data/quiz-data.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
