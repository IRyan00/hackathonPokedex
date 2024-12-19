// Sélectionner l'élément HTML où les cartes des Pokémon seront insérées.
const pokemonContainer = document.getElementById("pokemons-container");

// Fonction asynchrone pour récupérer les informations des 151 premiers Pokémon.
const fetchPokemons = async () => {
  const pokemonData = []; // Tableau qui stockera les données des Pokémon récupérés.

  // Utiliser une boucle `for` pour parcourir les identifiants de Pokémon de 1 à 151 inclus.
  for (let i = 1; i < 152; i++) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut ${response.status}`);
      }
      const pokemon = await response.json();
      pokemonData.push({
        id: i,
        name: pokemon.name,
        sprite: pokemon.sprites.front_default,
      });
    } catch (error) {
      console.error(
        `Échec de la récupération du Pokémon #${i} : ${error.message}`
      );
    }
  }

  // Une fois tous les Pokémon récupérés, trier le tableau par ID
  pokemonData.sort((a, b) => a.id - b.id);

  // Afficher les Pokémon
  pokemonData.forEach((pokemon) => {
    pokemonContainer.innerHTML += `
      <div class="pokemon-card"> 
        <img class="pokemon-image" src="${pokemon.sprite}" alt="${pokemon.name}">
        <div class="pokemon-info">
          <h5 class="pokemon-name">${pokemon.name}</h5>
          <p class="pokemon-number">№ ${pokemon.id}</p>
        </div>
      </div>`;
  });
}; 

// Appeler la fonction fetchPokemons
fetchPokemons();


// Code pour la recherche (en dehors de la fonction fetchPokemons)
const pokemonRecherchee = document.getElementById('search-container');

pokemonRecherchee.addEventListener('input', (event) => {
   const pkmn = document.querySelectorAll(".pokemon-card");
   const recherche = event.target.value.toLowerCase();
   
   pkmn.forEach((card) => {
       const pkmnNom = card.querySelector('.pokemon-name').textContent.toLowerCase();
       const pkmnNbr = card.querySelector('.pokemon-number').textContent.toLowerCase();
       
       if (pkmnNom.includes(recherche) || pkmnNbr.includes(recherche)) {
           card.style.display = "block";
       } else {
           card.style.display = "none";
       }
   });
});