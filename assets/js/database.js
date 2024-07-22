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
        const input = pokeObj.results[i].name;
       database.push(input.charAt(0).toUpperCase() + input.slice(1)) 
       
    }
})

function showResults(val) {
  res = document.getElementById("result");
  res.innerHTML = '';
  let list = '';
  let terms = autocompleteMatch(val);
  for (i=0; i<terms.length; i++) {
    list += '<li>' + terms[i] + '</li>';
  }
  res.innerHTML = '<ul>' + list + '</ul>';
}

