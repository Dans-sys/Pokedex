// // self.addEventListener('fetch', event => {
// //     const offline = new Response(`
// //         NO ESTAS CONECTADO A INTERNET
// //     `);
    
// //     const respuesta = fetch(event.request)
// //         .catch(() => {
// //             return offline;
// //         });

// //     event.respondWith(respuesta);
// // })

// // Ciclo de vida del SW
// self.addEventListener('install', event => {
//     // Descargar Assets
//     // Crear Cache
//     console.log('Instalando SW');

//     const instalacion = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('SW: Instalaciones terminadas');
//             self.skipWaiting();
//             resolve();
//         }, 1);
//     })

//     event.waitUntil(instalacion);
//     // self.skipWaiting();
// });

// self.addEventListener('activate', event => {
//     // Borrar Cache
//     console.log('Activando SW');
// });

// // FETCH: Manejo de peticiones HTTP
// self.addEventListener('fetch', event => {

//     // Aplicar estrategias del cache
//     console.log(event.request.url);

//     if (event.request.url.includes('https://reqres.in/api/users')) {
//         const resp = new Response(`Hola`);
//         event.respondWith(resp);
//     }
// });

// // SYNC: Recuperar conexion a internet
// self.addEventListener('sync', event => {
//     console.log('Tenemos conexion');
//     console.log(event);
//     console.log(event.tag);
// });

// self.addEventListener('push', event => {
//     console.log('Notificacion recibida');
// });
