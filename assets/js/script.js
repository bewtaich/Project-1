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

// Stat Bars

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

    // DISPLAY MESSGAGE BASED ON INPUT
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
                pokeElement.classList.add('box'); // Ensure 'box' class is applied
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
            const imgElement = document.createElement('img');
            imgElement.src = img;
            event.target.innerHTML = ''; // Clear any existing content
            event.target.appendChild(imgElement); // Add the new image
        });
}

// FUNCTION TO CLEAR PARTY
const clearPartyButton = document.getElementById('clear-party');
clearPartyButton.addEventListener('click', () => {
    document.querySelectorAll('.party-slot').forEach(slot => {
        slot.innerHTML = ''; // Clear all party slots
    });
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
