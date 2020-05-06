var cacheName = 'environ.';
var filesToCache = [

  './frontoffice/',
  './index.html',
  './frontoffice/css/',
  './frontOffice/images',
  './frontOffice/js',
  './frontOffice/js/main.js',
  'https://environ-front.herokuapp.com/index.html',
  'https://environ-front.herokuapp.com/manifest.json',
  'https://environ-front.herokuapp.com/sw-register.js',
  'https://environ-front.herokuapp.com/assets/img/icons/icon-192x192.png",'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

self.addEventListener('activate', evt => {
    console.log("Ativado")
})