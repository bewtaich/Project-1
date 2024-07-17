
const pokeURL=`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
const database=[];




fetch(pokeURL)
.then(function(response){
return response.json();
})
.then(function(data){
    const pokeObj=data;
    console.log(pokeObj);
    for (let i=0;i<1025;i++){
       database.push(pokeObj.results[i].name) 
    }
})

console.log(database);