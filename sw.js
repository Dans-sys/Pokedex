// sw.js

const CACHE_NAME = 'pokemon-cache-v2';

self.addEventListener('install', (event) => {
    // Realiza la instalación del Service Worker como antes
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/css/main.css',
                    '/js/main.js',
                    'https://pokeapi.co/api/v2/pokemon/'
                ]);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        // Intenta obtener la respuesta desde la caché
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Si está en la caché, devuélvelo
                    return cachedResponse;
                }

                // Si no está en la caché, realiza la solicitud de red
                return fetch(event.request)
                    .then((response) => {
                        // Verifica si la respuesta es válida
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Almacena la respuesta en la caché antes de devolverla
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    });
            })
    );
});

self.addEventListener('activate', (event) => {
    // Elimina las cachés antiguas
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});