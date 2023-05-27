// add resources to cache
const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

// service worker install event
self.addEventListener("install", (event) => {
  // make sure the service worker is activated immediately
  self.skipWaiting();

  event.waitUntil(
    addResourcesToCache([
      "/",
      "/src/assets/react.svg",
      "/vite.svg",
      // using {cache: reload} to make sure fetch file from network
      new Request("./offline.html", { cache: "reload" }),
    ])
  );
});

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    self.registration.navigationPreload.enable();
  }
};

// service worker activate event
self.addEventListener("activate", (event) => {
  // tell the active sw to take control of the page immediately
  self.clients.claim();
  // enabled navigation preload
  event.waitUntil(enableNavigationPreload());
});

// put key/value pair in cache
const putInCache = async (request, response) => {
  const cache = await caches.open("v1");
  await cache.put(request, response);
};

const cacheFirst = async (event) => {
  // try to fetch from caches
  const cacheResponse = await caches.match(event.request);
  if (cacheResponse) return cacheResponse;

  // try to fetch from preload
  const preloadResponse = await event.preloadResponse;
  if (preloadResponse) return preloadResponse;

  // try to fetch from network
  try {
    const networkResponse = await fetch(event.request);
    // await putInCache(event.request, networkResponse);
    return networkResponse;
  } catch (error) {
    if (event.request.mode === "navigate") {
      const offlineCacheResponse = await caches.match("./offline.html");
      return offlineCacheResponse;
    } else {
      return new Response("Network Error");
    }
  }
};

// service worker fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event));
});
