let cacheName = 'tictactoe-v9';
console.log('location.origin');
self.addEventListener('install', event => {
  // console.log({event});
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll([
          `${location.origin}/index.html`,
          `${location.origin}/assets/css/main.css`,
          `${location.origin}/assets/js/app.js`,
          `${location.origin}/manifest/manifest.json`,
          `${location.origin}/manifest/images/icons/icon-72x72.png`,
          `${location.origin}/manifest/images/icons/icon-96x96.png`,
          `${location.origin}/manifest/images/icons/icon-128x128.png`,
          `${location.origin}/manifest/images/icons/icon-144x144.png`,
          `${location.origin}/manifest/images/icons/icon-152x152.png`,
          `${location.origin}/manifest/images/icons/icon-192x192.png`,
          `${location.origin}/manifest/images/icons/icon-384x384.png`,
          `${location.origin}/manifest/images/icons/icon-512x512.png`,
        ])
          .then(() => self.skipWaiting());
      })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function (res) {
              return caches.open(cacheName)
                .then(function (cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
            })
        }
      })
  );
}); 
