const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeInfo({
                img :"not-found.png",
                name : "Not found",
                type:[],
                stats:null,
                moves:[]
            });
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
        
            const pokeObj={
                img : data.sprites.other['official-artwork']['front_default'],
                name : data.name,
                type: data.types.map(item => item.type.name),
                stats: data.stats.map(
                    item => {
                       return{
                            name : item.stat.name,
                            baseStat : item.base_stat,
                            effort : item.effort
                        }
                    }
                ),
                moves: data.moves.map(item => item.move.name),
            }

            pokeInfo(pokeObj);
        }
    });
}

const pokeInfo = (props) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = props.img;

    const pokeName = document.getElementById("pokeNameLabel");
    pokeName.innerHTML = props.name.charAt(0).toUpperCase() + props.name.slice(1);;

    const pokeTypes = document.getElementById("types");
    pokeTypes.innerHTML = "Types: "+props.type;
    
    const stats = document.getElementById("stats");
    stats.innerHTML ="";
    if(props.stats != null){
        props.stats.forEach(element => {
            const mainDiv =document.createElement("div");

            const name =document.createElement("p");
            name.innerHTML = element.name;
            
            const smallDiv = document.createElement("div");
            const baseStat =document.createElement("p");
            baseStat.innerHTML = "Base: "+element.baseStat;
            const effort =document.createElement("p");
            effort.innerHTML = "Effort: " +element.effort;
            
            name.className="stats-name"
            smallDiv.className="base-effort";
            mainDiv.className="stat";

            stats.appendChild(mainDiv);
            smallDiv.appendChild(baseStat);
            smallDiv.appendChild(effort);
            mainDiv.appendChild(name);
            mainDiv.appendChild(smallDiv);
        });
    }

    const pokeMoves = document.getElementById("moves");
    pokeMoves.innerHTML = props.moves;
}



