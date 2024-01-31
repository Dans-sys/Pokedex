self.addEventListener('install', event => {
    // Descargar Assets
    // Crear Cache

    // Cache
    const cachePromise = caches.open('cache-v1')
        .then( cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/img/logo.png',
                'https://pokeapi.co/api/v2/pokemon/'
            ]);
        })


    event.waitUntil(cachePromise);
    // self.skipWaiting();
});


self.addEventListener('fetch', e => {
    // 2 Cache with Network Fallbak
    const respuesta =caches.match(e.request)
    .then(response => {
        if(response) return response;

        console.log('No existe ', e.request.url );

        return fetch(e.request).then(newResponse => {
            return newResponse;
        })
    });

    e.respondWith(respuesta);

//    // 1 Cache Only
//     e.respondWith(caches.match(e.request));
});