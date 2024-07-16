


//
const dexPhoto=document.getElementById('dexPhoto')
const search=document.querySelector('form')
const input=document.getElementById('search')

// Display pokemon image based on input
const displaySprite = function (event) {
    event.preventDefault();
    const pokemon=input.value;
    console.log(pokemon);
    const pokeURL=`https://pokeapi.co/api/v2/pokemon/${pokemon}/`
    
    fetch(pokeURL)
    .then(function(response){    
    return response.json();
})
    .then(function(data){
        const pokeObj=data; 
        console.log(pokeObj);
        const img = pokeObj.sprites.other.home.front_default;
        dexPhoto.setAttribute('src', img);
         })  
}

search.addEventListener('submit', displaySprite)


