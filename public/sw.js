const CacheKey = "cache-v1";

const initCache = () => {
  return caches.open(CacheKey).then(
    (cache) => {
      return cache.addAll(["./index.html"]);
    },
    (error) => {
      console.log(error);
    }
  );
};

const tryNetwork = (req, timeout) => {
  console.log(req);
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(reject, timeout);
    fetch(req).then((res) => {
      clearTimeout(timeoutId);
      const responseClone = res.clone();
      caches.open(CacheKey).then((cache) => {
        cache.match(req, responseClone);
      });
      resolve(res);
      // Reject also if network fetch rejects.
    }, reject);
  });
};

const getFromCache = async (req) => {
  console.log("network is off so getting from cache...");
  return caches.open(CacheKey).then(async (cache) => {
    return cache.match(req).then((result) => {
      return result || Promise.reject("no-match");
    });
  });
};
// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", (e) => {
  console.log("Installed");
  e.waitUntil(initCache());
});
// eslint-disable-next-line no-restricted-globals
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CacheKey) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", (e) => {
  console.log("Try network and store result or get data from cache");
  // Try network and if it fails, go for the cached copy.
  e.respondWith(
    tryNetwork(e.request, 400).catch(() => getFromCache(e.request))
  );
});
