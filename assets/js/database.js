
const pokeURL=`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
const database=[];
const nameTag = document.querySelector('h1')



fetch(pokeURL)
.then(function(response){
return response.json();
})
.then(function(data){
    const pokeObj=data;

    for (let i=0;i<1025;i++){
       database.push(pokeObj.results[i].name) 
    }
})