// add resources to cache
const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

// service worker install event
self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    addResourcesToCache(["/", "/src/assets/react.svg", "/vite.svg"])
  );
});

// put key/value pair in cache
const putInCache = async (request, response) => {
  const cache = await caches.open("v1");
  await cache.put(request, response);
};

const cacheFirst = async (request) => {
  // try to fetch from caches
  const responseFromCache = await caches.match(request);

  if (responseFromCache) {
    console.log("request from cache");
    console.log(responseFromCache);
    return responseFromCache;
  }

  // try to fetch from network
  try {
    const responseFromNetwork = await fetch(request);
    await putInCache(request, responseFromNetwork);
    return responseFromNetwork;
  } catch (error) {
    console.log(error);
    return new Response("Network Error");
  }
};

// service worker fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    self.registration.navigationPreload.enable();
  }
};

// service worker activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
  event.waitUntil(enableNavigationPreload());
});
