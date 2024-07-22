const dexPhoto = document.getElementById('dexPhoto');
const search = document.querySelector('form');
const input = document.getElementById('search');
const hpText = document.getElementById('hpText');
const atkText = document.getElementById('atkText');
const spatkText = document.getElementById('spatkText');
const defText = document.getElementById('defText');
const spdefText = document.getElementById('spdefText');
const speedText = document.getElementById('speedText');
const Index = document.getElementById('index');
const entry = document.getElementById('pokemon-entry');
const pkmnName = document.getElementById('pokemon-name');
const species = document.getElementById('pokemon-species');
const type1 = document.getElementById('type1');
const type2 = document.getElementById('type2');

// Changes all pokemon information
const renderPKMNInfo = function (event) {
    event.preventDefault();

    const pokemon = input.value.toLowerCase();
    const pokeURL = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;

    // Display pokemon image based on input
    const fetchImage = function () {
        fetch(pokeURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const pokeObjIMG = data;
                const img = pokeObjIMG.sprites.other.home.front_default;
                dexPhoto.setAttribute('src', img);

                if (pokeObjIMG.types.length > 1) {
                    const type1Img = pokeObjIMG.types[0].type.name;
                    const type2Img = pokeObjIMG.types[1].type.name;
                    type1.setAttribute('src', `./assets/images/types/${type1Img}.png`);
                    type2.setAttribute('src', `./assets/images/types/${type2Img}.png`);
                } else {
                    const type1Img = pokeObjIMG.types[0].type.name;
                    console.log(type1Img);
                    type1.setAttribute('src', `./assets/images/types/${type1Img}.png`);
                    type2.setAttribute('src', `./assets/images/types/none.png`);
                }
            });
    };

    // Display Stats and adjust bars length accordingly
    const fetchStats = function () {
        const empty = [];

        fetch(pokeURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const pokeObjStat = data.stats;

                for (let i = 0; i < pokeObjStat.length; i++) {
                    const stats = pokeObjStat[i].base_stat;
                    empty.push(stats);
                }

                hpText.textContent = empty[0];
                atkText.textContent = empty[1];
                defText.textContent = empty[2];
                spatkText.textContent = empty[3];
                spdefText.textContent = empty[4];
                speedText.textContent = empty[5];

                const hpbar = document.getElementById('hpbar');
                const atkbar = document.getElementById('atkbar');
                const defbar = document.getElementById('defbar');
                const spatkbar = document.getElementById('spatkbar');
                const spdefbar = document.getElementById('spdefbar');
                const speedbar = document.getElementById('speedbar');

                hpbar.style.width = `${((empty[0] / 255) * 100)}%`;
                atkbar.style.width = `${((empty[1] / 255) * 100)}%`;
                defbar.style.width = `${((empty[2] / 255) * 100)}%`;
                spatkbar.style.width = `${((empty[3] / 255) * 100)}%`;
                spdefbar.style.width = `${((empty[4] / 255) * 100)}%`;
                speedbar.style.width = `${((empty[5] / 255) * 100)}%`;
            });
    };

    const fetchBio = function () {
        const bioURL = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`;

        // Pull Name, Number, Dex Entry
        fetch(bioURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const pokeObjBio = data;
                // Dex-Entry
                // Find english text
                const enText = (pokeObjBio.flavor_text_entries.findIndex(obj => obj.language.name === 'en'));
                // Updates Dex Entry and gets rid of unwanted characters
                entry.innerHTML = `${pokeObjBio.flavor_text_entries[enText].flavor_text.replace('\f', " ")}`;
                species.innerHTML="";
                // Dex Name + #
                const zerofilled = ('0000' + pokeObjBio.id).slice(-4);
                pkmnName.innerHTML = `${pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}: #${zerofilled}`;

            });
    };

    fetchImage();
    fetchStats();
    fetchBio();
}

search.addEventListener('submit', renderPKMNInfo);

// CONOR

// FUNCTION TO CLOSE ALERT
document.getElementById('close-alert').addEventListener('click', () => {
    document.getElementById('party-subheading').style.display = 'none';
});

// FUNCTION TO SEARCH INDEX
const searchIndexContainer = document.getElementById('search-index-container');

// FUNCTION TO FETCH-DISPLAY POKEMON DETAILS
const fetchAndDisplayPokemon = function (pokemon) {
    const pokeURL = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;

    // DISPLAY MESSAGE BASED ON INPUT
    const fetchImage = function () {
        fetch(pokeURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const pokeObjIMG = data;
                const img = pokeObjIMG.sprites.other.home.front_default;
                dexPhoto.setAttribute('src', img);
            });
    };

    const fetchStats = function () {
        const empty = [];

        fetch(pokeURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const pokeObjStat = data.stats;

                for (let i = 0; i < pokeObjStat.length; i++) {
                    const stats = pokeObjStat[i].base_stat;
                    empty.push(stats);
                }

                hpText.textContent = empty[0];
                atkText.textContent = empty[1];
                defText.textContent = empty[2];
                spatkText.textContent = empty[3];
                spdefText.textContent = empty[4];
                speedText.textContent = empty[5];

                const hpbar = document.getElementById('hpbar');
                const atkbar = document.getElementById('atkbar');
                const defbar = document.getElementById('defbar');
                const spatkbar = document.getElementById('spatkbar');
                const spdefbar = document.getElementById('spdefbar');
                const speedbar = document.getElementById('speedbar');

                hpbar.style.width = `${((empty[0] / 255) * 100)}%`;
                atkbar.style.width = `${((empty[1] / 255) * 100)}%`;
                defbar.style.width = `${((empty[2] / 255) * 100)}%`;
                spatkbar.style.width = `${((empty[3] / 255) * 100)}%`;
                spdefbar.style.width = `${((empty[4] / 255) * 100)}%`;
                speedbar.style.width = `${((empty[5] / 255) * 100)}%`;
            });
    };

    fetchImage();
    fetchStats();
};

// FUNCTION TO POPULATE INDEX
const populateSearchIndex = function () {
    const pokeURL = 'https://pokeapi.co/api/v2/pokemon?limit=1000';
    fetch(pokeURL)
        .then(response => response.json())
        .then(data => {
            const pokeList = data.results;

            pokeList.forEach((pokemon, index) => {
                const pokeElement = document.createElement('div');
                const zerofilled = ('0000' + (index + 1)).slice(-4);
                const capitalizedPokemonName = `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`;
                pokeElement.innerHTML = `${capitalizedPokemonName}: #${zerofilled}`;
                pokeElement.classList.add('box');
                pokeElement.draggable = true;
                pokeElement.addEventListener('dragstart', (event) => {
                    event.dataTransfer.setData('text', pokemon.name);
                });
                pokeElement.addEventListener('click', () => {
                    fetchAndDisplayMainPokemon(pokemon.name);

                    document.querySelectorAll('.main-aside .box').forEach(item => {
                        item.classList.remove('clicked');
                    });

                    pokeElement.classList.add('clicked');
                });
                searchIndexContainer.appendChild(pokeElement);
            });
        });
};

populateSearchIndex();

// FUNCTION TO DRAG AND DROP
function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const pokeURL = `https://pokeapi.co/api/v2/pokemon/${data}/`;

    fetch(pokeURL)
        .then(response => response.json())
        .then(data => {
            const img = data.sprites.other.home.front_default;
            const attack = data.stats.find(stat => stat.stat.name === 'attack').base_stat;

            const imgElement = document.createElement('img');
            imgElement.src = img;

            const attackElement = document.createElement('div');
            attackElement.classList.add('attack-value');
            attackElement.textContent = `Attack: ${attack}`;

            event.target.innerHTML = '';

            event.target.appendChild(imgElement);
            event.target.appendChild(attackElement);
        });
}

// FUNCTION TO DROP IN FAVORITES LIST
function dropFavorite(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const pokeURL = `https://pokeapi.co/api/v2/pokemon/${data}/`;

    fetch(pokeURL)
        .then(response => response.json())
        .then(data => {
            const img = data.sprites.other.home.front_default;
            const name = data.name;
            const hp = data.stats.find(stat => stat.stat.name === 'hp').base_stat;

            const favoriteItem = document.createElement('div');
            favoriteItem.classList.add('favorite-item');
            favoriteItem.draggable = true;

            favoriteItem.innerHTML = `
                <img src="${img}" alt="${name}">
                <p>${name.charAt(0).toUpperCase() + name.slice(1)}: HP ${hp}</p>
            `;

            favoriteItem.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text', name);
            });

            favoriteItem.addEventListener('click', () => {
                fetchAndDisplayMainPokemon(name);

                document.querySelectorAll('.favorites-list .favorite-item').forEach(item => {
                    item.classList.remove('clicked');
                });

                favoriteItem.classList.add('clicked');
            });

            document.getElementById('favorites-container').appendChild(favoriteItem);
        });
}

// FUNCTION TO CLEAR PARTY
const clearPartyButton = document.getElementById('clear-party');
clearPartyButton.addEventListener('click', () => {
    document.querySelectorAll('.party-slot').forEach(slot => {
        slot.innerHTML = '';
    });
});

// FUNCTION TO CLEAR FAVORITES
document.getElementById('clear-favorites').addEventListener('click', () => {
    const favoritesContainer = document.getElementById('favorites-container');
    favoritesContainer.innerHTML = '';
});

// FUNCTION TO GET POKEMON DETAILS IN THE MAIN SECTION (POKEMON ENTRY)
const fetchAndDisplayMainPokemon = function (pokemon) {
    const pokeURL = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;

    fetch(pokeURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const img = data.sprites.other.home.front_default;
            dexPhoto.setAttribute('src', img);

            if (data.types.length > 1) {
                const type1Img = data.types[0].type.name;
                const type2Img = data.types[1].type.name;
                type1.setAttribute('src', `./assets/images/types/${type1Img}.png`);
                type2.setAttribute('src', `./assets/images/types/${type2Img}.png`);
            } else {
                const type1Img = data.types[0].type.name;
                console.log(type1Img);
                type1.setAttribute('src', `./assets/images/types/${type1Img}.png`);
                type2.setAttribute('src', `./assets/images/types/none.png`);
            }

            const pokeObjStat = data.stats;
            const empty = [];

            for (let i = 0; i < pokeObjStat.length; i++) {
                const stats = pokeObjStat[i].base_stat;
                empty.push(stats);
            }

            hpText.textContent = empty[0];
            atkText.textContent = empty[1];
            defText.textContent = empty[2];
            spatkText.textContent = empty[3];
            spdefText.textContent = empty[4];
            speedText.textContent = empty[5];

            const hpbar = document.getElementById('hpbar');
            const atkbar = document.getElementById('atkbar');
            const defbar = document.getElementById('defbar');
            const spatkbar = document.getElementById('spatkbar');
            const spdefbar = document.getElementById('spdefbar');
            const speedbar = document.getElementById('speedbar');

            hpbar.style.width = `${((empty[0] / 255) * 100)}%`;
            atkbar.style.width = `${((empty[1] / 255) * 100)}%`;
            defbar.style.width = `${((empty[2] / 255) * 100)}%`;
            spatkbar.style.width = `${((empty[3] / 255) * 100)}%`;
            spdefbar.style.width = `${((empty[4] / 255) * 100)}%`;
            speedbar.style.width = `${((empty[5] / 255) * 100)}%`;

            const bioURL = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`;
            return fetch(bioURL);
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const pokeObjBio = data;
            const enText = (pokeObjBio.flavor_text_entries.findIndex(obj => obj.language.name === 'en'));
            entry.innerHTML = `${pokeObjBio.flavor_text_entries[enText].flavor_text.replace('\f', " ")}`;

            const zerofilled = ('0000' + pokeObjBio.id).slice(-4);
            pkmnName.innerHTML = `${pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}: #${zerofilled}`;
        });
};

// FUNCTION TO FETCH AND DISPLAY RANDOM POKEMON
const getRandomPokemon = function () {
    const randomId = Math.floor(Math.random() * 898) + 1; // As of now, there are 898 Pokémon
    const randomPokeURL = `https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:${randomId}`;

    fetch(randomPokeURL)
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data.length > 0) {
                const pokemonCard = data.data[0];
                const imgSrc = pokemonCard.images.large || './assets/images/default.png';
                document.getElementById('random-pokemon-img').src = imgSrc;

                const name = pokemonCard.name.charAt(0).toUpperCase() + pokemonCard.name.slice(1);
                document.getElementById('pokemon-name').textContent = `Name: ${name}`;
                species.innerHTML = "";

                if (pokemonCard.types.length > 0) {
                    const typeImg = pokemonCard.types[0].toLowerCase();
                    type1.setAttribute('src', `./assets/images/types/${typeImg}.png`);
                    type2.setAttribute('src', `./assets/images/types/none.png`);
                } else {
                    type1.setAttribute('src', `./assets/images/types/none.png`);
                    type2.setAttribute('src', `./assets/images/types/none.png`);
                }

                const pokeObjStat = pokemonCard.stats || [];
                const empty = [0, 0, 0, 0, 0, 0]; // Default values if stats are not available

                for (let i = 0; i < pokeObjStat.length; i++) {
                    const stats = pokeObjStat[i].value;
                    empty[i] = stats;
                }

                hpText.textContent = empty[0];
                atkText.textContent = empty[1];
                defText.textContent = empty[2];
                spatkText.textContent = empty[3];
                spdefText.textContent = empty[4];
                speedText.textContent = empty[5];

                const hpbar = document.getElementById('hpbar');
                const atkbar = document.getElementById('atkbar');
                const defbar = document.getElementById('defbar');
                const spatkbar = document.getElementById('spatkbar');
                const spdefbar = document.getElementById('spdefbar');
                const speedbar = document.getElementById('speedbar');

                hpbar.style.width = `${((empty[0] / 255) * 100)}%`;
                atkbar.style.width = `${((empty[1] / 255) * 100)}%`;
                defbar.style.width = `${((empty[2] / 255) * 100)}%`;
                spatkbar.style.width = `${((empty[3] / 255) * 100)}%`;
                spdefbar.style.width = `${((empty[4] / 255) * 100)}%`;
                speedbar.style.width = `${((empty[5] / 255) * 100)}%`;
            }
        })
        .catch(error => console.error('Error fetching Pokémon data:', error));
};

// FUNCTION TO DISPLAY A RANDOM POKEMON
getRandomPokemon();

document.getElementById('random-pokemon-btn').addEventListener('click', getRandomPokemon);

// CONOR

// FUNCTION TO SAVE TO LOCAL STORAGE
const savePartyToLocalStorage = () => {
    const partySlots = document.querySelectorAll('.party-slot');
    const party = [];
    partySlots.forEach(slot => {
        const imgElement = slot.querySelector('img');
        if (imgElement) {
            const attackElement = slot.querySelector('.attack-value');
            party.push({
                src: imgElement.src,
                attack: attackElement ? attackElement.textContent : ''
            });
        } else {
            party.push(null);
        }
    });
    localStorage.setItem('party', JSON.stringify(party));
};

const saveFavoritesToLocalStorage = () => {
    const favorites = [];
    const favoriteItems = document.querySelectorAll('.favorites-list .favorite-item');
    favoriteItems.forEach(item => {
        const imgElement = item.querySelector('img');
        const nameElement = item.querySelector('p');
        favorites.push({
            src: imgElement.src,
            name: nameElement.textContent
        });
    });
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

const loadPartyFromLocalStorage = () => {
    const party = JSON.parse(localStorage.getItem('party')) || [];
    const partySlots = document.querySelectorAll('.party-slot');
    partySlots.forEach((slot, index) => {
        slot.innerHTML = '';
        if (party[index]) {
            const imgElement = document.createElement('img');
            imgElement.src = party[index].src;
            const attackElement = document.createElement('div');
            attackElement.classList.add('attack-value');
            attackElement.textContent = party[index].attack;
            slot.appendChild(imgElement);
            slot.appendChild(attackElement);
        }
    });
};

const loadFavoritesFromLocalStorage = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesContainer = document.getElementById('favorites-container');
    favoritesContainer.innerHTML = '';
    favorites.forEach(fav => {
        const favoriteItem = document.createElement('div');
        favoriteItem.classList.add('favorite-item');
        favoriteItem.draggable = true;

        favoriteItem.innerHTML = `
            <img src="${fav.src}" alt="${fav.name}">
            <p>${fav.name}</p>
        `;

        favoriteItem.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text', fav.name.split(':')[0].trim().toLowerCase());
        });

        favoriteItem.addEventListener('click', () => {
            fetchAndDisplayMainPokemon(fav.name.split(':')[0].trim().toLowerCase());

            document.querySelectorAll('.favorites-list .favorite-item').forEach(item => {
                item.classList.remove('clicked');
            });

            favoriteItem.classList.add('clicked');
        });

        favoritesContainer.appendChild(favoriteItem);
    });
};

// EVENT LISTENERS
document.querySelectorAll('.party-slot').forEach(slot => {
    slot.addEventListener('drop', () => {
        savePartyToLocalStorage();
    });
});

document.getElementById('clear-party').addEventListener('click', () => {
    document.querySelectorAll('.party-slot').forEach(slot => {
        slot.innerHTML = '';
    });
    savePartyToLocalStorage();
});

document.getElementById('clear-favorites').addEventListener('click', () => {
    const favoritesContainer = document.getElementById('favorites-container');
    favoritesContainer.innerHTML = '';
    saveFavoritesToLocalStorage();
});

document.getElementById('favorites-container').addEventListener('drop', () => {
    saveFavoritesToLocalStorage();
});

// LOCAL STORAGE LOAD
document.addEventListener('DOMContentLoaded', () => {
    loadPartyFromLocalStorage();
    loadFavoritesFromLocalStorage();
});

// FUNCTION TO DRAG AND DROP
function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const pokeURL = `https://pokeapi.co/api/v2/pokemon/${data}/`;

    fetch(pokeURL)
        .then(response => response.json())
        .then(data => {
            const img = data.sprites.other.home.front_default;
            const attack = data.stats.find(stat => stat.stat.name === 'attack').base_stat;

            const imgElement = document.createElement('img');
            imgElement.src = img;

            const attackElement = document.createElement('div');
            attackElement.classList.add('attack-value');
            attackElement.textContent = `Attack: ${attack}`;

            event.target.innerHTML = '';

            event.target.appendChild(imgElement);
            event.target.appendChild(attackElement);
            savePartyToLocalStorage(); // SAVE PARTY
        });
}

// FUNCTION TO DROP IN FAVORITES LIST
function dropFavorite(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const pokeURL = `https://pokeapi.co/api/v2/pokemon/${data}/`;

    fetch(pokeURL)
        .then(response => response.json())
        .then(data => {
            const img = data.sprites.other.home.front_default;
            const name = data.name;
            const hp = data.stats.find(stat => stat.stat.name === 'hp').base_stat;

            const favoriteItem = document.createElement('div');
            favoriteItem.classList.add('favorite-item');
            favoriteItem.draggable = true;

            favoriteItem.innerHTML = `
                <img src="${img}" alt="${name}">
                <p>${name.charAt(0).toUpperCase() + name.slice(1)}: HP ${hp}</p>
            `;

            favoriteItem.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text', name);
            });

            favoriteItem.addEventListener('click', () => {
                fetchAndDisplayMainPokemon(name);

                document.querySelectorAll('.favorites-list .favorite-item').forEach(item => {
                    item.classList.remove('clicked');
                });

                favoriteItem.classList.add('clicked');
            });

            document.getElementById('favorites-container').appendChild(favoriteItem);
            saveFavoritesToLocalStorage(); // SAVE FAVORITES
        });
}


