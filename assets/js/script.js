


//
const dexPhoto=document.getElementById('dexPhoto');
const search=document.querySelector('form');
const input=document.getElementById('search');
const hpText = document.getElementById('hpText');
const atkText = document.getElementById('atkText');
const spatkText = document.getElementById('spatkText');
const defText = document.getElementById('defText');
const spdefText = document.getElementById('spdefText');
const speedText = document.getElementById('speedText');
// Changes all pokemon information
const renderPKMNInfo = function (event) {
 
    event.preventDefault();

const pokemon=input.value;
const pokeURL=`https://pokeapi.co/api/v2/pokemon/${pokemon}/`


// Display pokemon image based on input
const fetchImage = function() {
    
    fetch(pokeURL)
    .then(function(response){    
    return response.json();
    })

    .then(function(data){
        const pokeObjIMG=data; 
        console.log(pokeObjIMG);
        const img = pokeObjIMG.sprites.other.home.front_default;
        console.log(img);
        dexPhoto.setAttribute('src', img);
         })  
    }

const fetchStats = function () {
   const empty = [];

    fetch(pokeURL)
    .then(function(response){    
    return response.json();
    })

    .then(function(data){
        const pokeObjStat=data.stats; 
        console.log(pokeObjStat);

        for (let i=0;i<pokeObjStat.length;i++){

        const stats = pokeObjStat[i].base_stat;
        
            empty.push(stats); 
        } 
        
        console.log(empty);
        hpText.textContent = empty[0]
        atkText.textContent = empty[1]
        defText.textContent = empty[2]
        spatkText.textContent = empty[3]
        spdefText.textContent = empty[4]
        speedText.textContent = empty[5]

        const hpbar = document.getElementById('hpbar')
        const atkbar = document.getElementById('atkbar')
        const defbar = document.getElementById('defbar')
        const spatkbar = document.getElementById('spatkbar')
        const spdefbar = document.getElementById('spdefbar')
        const speedbar = document.getElementById('speedbar')

        hpbar.style.width=`${((empty[0]/255)*100)}%`
        atkbar.style.width=`${((empty[1]/255)*100)}%`
        defbar.style.width=`${((empty[2]/255)*100)}%`
        spatkbar.style.width=`${((empty[3]/255)*100)}%`
        spdefbar.style.width=`${((empty[4]/255)*100)}%`
        speedbar.style.width=`${((empty[5]/255)*100)}%`

        })   
    }

const fetchBio = function () {

    fetch(pokeURL)
    .then(function(response){    
    return response.json();
    })

    .then(function(data){
        const pokeObjName=data

    })
}


fetchImage();
fetchStats();

}








search.addEventListener('submit', renderPKMNInfo)


// Stat Bars
