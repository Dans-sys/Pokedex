const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

var swLocation = '/Pokedex/sw.js';

// Instalacion
if ( navigator.serviceWorker ) {
    if (isLocalhost) {
        swLocation = '/sw.js';
    }

    navigator.serviceWorker.register(swLocation);
}


document.addEventListener('DOMContentLoaded', function () {
    const listaPokemon = document.querySelector("#listaPokemon");
    const botonesHeader = document.querySelectorAll(".btn-header");
    let URL = "https://pokeapi.co/api/v2/pokemon/";

    function fetchPokemonData(i) {
        return caches.match(URL + i)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse.json();
                } else {
                    return fetch(URL + i)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`Failed to fetch: ${URL + i}`);
                            }
                            const responseToCache = response.clone();
                            caches.open('pokemon-cache-v2')
                                .then((cache) => {
                                    cache.put(URL + i, responseToCache);
                                });
                            return response.json();
                        });
                }
            });
    }

    function mostrarPokemon(poke) {
        let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
        tipos = tipos.join('');

        let pokeId = poke.id.toString();
        if (pokeId.length === 1) {
            pokeId = "00" + pokeId;
        } else if (pokeId.length === 2) {
            pokeId = "0" + pokeId;
        }

        const div = document.createElement("div");
        div.classList.add("pokemon");
        div.innerHTML = `
            <p class="pokemon-id-back">#${pokeId}</p>
            <div class="pokemon-imagen">
                <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
            </div>
            <div class="pokemon-info">
                <div class="nombre-contenedor">
                    <p class="pokemon-id">#${pokeId}</p>
                    <h2 class="pokemon-nombre">${poke.name}</h2>
                </div>
                <div class="pokemon-tipos">
                    ${tipos}
                </div>
                <div class="pokemon-stats">
                    <p class="stat">${poke.height}m</p>
                    <p class="stat">${poke.weight}kg</p>
                </div>
            </div>
        `;
        listaPokemon.append(div);
    }

    botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
        const botonId = event.currentTarget.id;

        listaPokemon.innerHTML = "";

        for (let i = 1; i <= 151; i++) {
            fetchPokemonData(i)
                .then(data => {
                    if (botonId === "ver-todos") {
                        mostrarPokemon(data);
                    } else {
                        const tipos = data.types.map(type => type.type.name);
                        if (tipos.some(tipo => tipo.includes(botonId))) {
                            mostrarPokemon(data);
                        }
                    }
                });
        }
    }));
});