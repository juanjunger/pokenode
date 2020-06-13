// Param => id ou string
function pokemonConstructor(param) {

    function start() {
        const url = 'https://pokeapi.co/api/v2/pokemon'

        const options = {
            method: 'GET',
            mode: 'cors'
        }

        fetch(`${url}/${param}`, options)
            .then(responseStatus)
            .then(responseToJson)
            .then(getPokemon)
            .then(setPokemon)
            .catch(catchPokemon)
    }

    function responseStatus(response) {
        if (response.status >= 200 && response.status <= 299) {
            console.log('Yeah! your response was resolved.')
            return Promise.resolve(response)
        }
        else if (response.status >= 400 && response.status <= 499 ) {
            console.error('Hmm.. it is look like an error in client side. Sorry, your response was rejected.', error)
            return Promise.reject(response)
        }
        else if (response.status >= 500 && response.status <= 599) {
            console.error('Hmm.. it is look like an error in server side. Sorry, your response was rejected.', error)
            return Promise.reject(response)
        }
        else {
            console.log('Oops.. your response was rejected.')
            return Promise.reject(response)
        }
    }

    function responseToJson(response) {
        return response.json()
    }

    function getPokemon(pokemon) {
        return pokemon
    }

    function setPokemon(pokemon) {
         // pega a div que lista os pokemons no DOM
        let pokemonsList = document.getElementById('list')

        // cria elementos do pokemon no DOM (parent [elemento pai], id, nome e imagem)
        let pokemonParent = document.createElement('div')

        let pokemonId = document.createElement('span')
        let pokemonName = document.createElement('h2')
        let pokemonImage = document.createElement('img')

        // captura os dados do pokemon (nome e id) e salva em variaveis
        let pokemonTextName = document.createTextNode(pokemon.name)
        let pokemonTextId = document.createTextNode('#' + pokemon.id)
        
        // adiciona atributos do pokemon nos respectivos elementos (imagem e classes para estilização)
        pokemonImage.setAttribute('src', pokemon.sprites.front_default) 
        pokemonId.setAttribute('class', 'id')
        pokemonParent.setAttribute('class', 'card')
        
        // concatena os dados do pokemon nos respectivos elementos
        pokemonName.appendChild(pokemonTextName)
        pokemonId.appendChild(pokemonTextId)
        
        // concatena os atributos do pokemon no elemento pai (parent)
        pokemonParent.appendChild(pokemonId)
        pokemonParent.appendChild(pokemonImage)
        pokemonParent.appendChild(pokemonName)
        
        // caso o pokemon possua atributos, cria os elementos html e adiciona seus valores no DOM
        if (pokemon.types.length > 0) {
            let pokemonTypesParent = document.createElement('div')
            pokemonTypesParent.setAttribute('class', 'types')

            for (let response of pokemon.types) {
                let pokemonType = document.createElement('p')
                let pokemonTextType = document.createTextNode(response.type.name)
                
                pokemonType.setAttribute('id', response.type.name)
                pokemonType.appendChild(pokemonTextType)
                
                pokemonTypesParent.appendChild(pokemonType)
                pokemonParent.appendChild(pokemonTypesParent)

                if (response.type.name === 'psychic' || response.type.name == 'flying') {
                    pokemonParent.setAttribute('class', 'card active')
                }
            }
        }

        // concatena o elemento pai (parent) na div que lista os pokemons
        pokemonsList.appendChild(pokemonParent)

        // bloco de codigo responsavel pelo scroll top
        let pokebolaParent = document.getElementById('pokebola')
        pokebolaParent.style.display = "block";
        
        let pokebola = document.getElementById('scrollTop')

        pokebola.onclick = function () { window.scrollTo(0, 0) };
    }

    function catchPokemon(error) {
        console.error('Well.. we could not catch some pokemons today!', error)
    }

    start()
}

// Exibe a primeira geração de pokemons
console.time('constructorTime')
for (let count = 1; count <= 151; count ++) {
    pokemonConstructor(count)
}
console.timeEnd('constructorTime')