
const FILES = [
    '/',
    '/js/main.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('bicycleapp').then(cache => {
            return cache.addAll(FILES)
        }).then(() => self.skipWaiting())
    )
});


self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(cacheReponse => {
        if(cacheReponse) {
            return cacheReponse;
        }
        return fetch(event.request);
    }))
})