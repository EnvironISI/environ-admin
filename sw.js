/*// This is the "Offline page" service worker

const CACHE = "pwabuilder-page";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "https://dai-18-19-front-a84182.c9users.io/fallback/index.html";

// Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener("install", function(event) {
  console.log("[PWA Builder] Install Event processing");

  event.waitUntil(
    caches.open(CACHE).then(function(cache) {
      console.log("[PWA Builder] Cached offline page during install");

      if (offlineFallbackPage === "https://dai-18-19-front-a84182.c9users.io/fallback/index.html") {
        return cache.add(new Response("TODO: Update the value of the offlineFallbackPage constant in the serviceworker."));
      }

      return cache.add(offlineFallbackPage);
    })
  );
});

// If any fetch fails, it will show the offline page.
self.addEventListener("fetch", function(event) {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request).catch(function(error) {
      // The following validates that the request was for a navigation to a new document
      if (
        event.request.destination !== "document" ||
        event.request.mode !== "navigate"
      ) {
        return;
      }

      console.error("[PWA Builder] Network request Failed. Serving offline page " + error);
      return caches.open(CACHE).then(function(cache) {
        return cache.match(offlineFallbackPage);
      });
    })
  );
});

// This is an event that can be fired from your page to tell the SW to update the offline page
self.addEventListener("refreshOffline", function() {
  const offlinePageRequest = new Request(offlineFallbackPage);

  return fetch(offlineFallbackPage).then(function(response) {
    return caches.open(CACHE).then(function(cache) {
      console.log("[PWA Builder] Offline page updated from refreshOffline event: " + response.url);
      return cache.put(offlinePageRequest, response);
    });
  });
});
*/

var cacheName = 'environ.';
var filesToCache = [
  './index.html',
  './frontOffice/js/main.js',
  './manifest.json',
  './sw-register.js',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
}).catch(reason => console.error(reason));

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
}).catch(reason => console.error(reason));

self.addEventListener('activate', evt => {
    console.log("Ativado")
}).catch(reason => console.error(reason))