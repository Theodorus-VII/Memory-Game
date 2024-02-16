import { pokemonNames } from "./pokemon_names";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Card from "./Card";

export default function PlayField({ updateScoreBoard }) {
  const [pokemonData, setPokemonData] = useState([]);
  const [cardsShowing, setCardsShowing] = useState(true);

  // first needs to fetch the pokemons from the server. will need their names and images then.
  async function loadPokemonData() {
    const promises = pokemonNames.map(async (pokemon) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
      );
      const result = await response.json();
      const sprite_url =
        result["sprites"]["other"]["official-artwork"]["front_default"];
      return {
        name: pokemon,
        id: result["id"],
        sprite: sprite_url,
      };
    });
    const resolvedData = await Promise.all(promises);
    setPokemonData(resolvedData);
  }
  
  useEffect(() => {
    // runs onMount
    loadPokemonData();
  }, []);

  function shuffleArray(array) {
    // Fisher-Yates Sorting Algorithm.
    let copiedArray = [...array];
    for (let i = copiedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
    }
    return copiedArray;
  }

  async function handleClick(id) {
    // animation trigger
    setCardsShowing(false);

    //update the score
    let gameState = updateScoreBoard(id);
    console.log(gameState);

    // randomize the cards array for the next go.
    setTimeout(() => {
      // Want to shuffle the array and set the state once the animation finishes,
      //    so that the re-render triggered by the setState doesnt interrupt it.
      // After the cards flip, the new images are set. Then we trigger the
      //    animation for the cards flipping back.
      // Timeout period is hardcoded for now.
      setPokemonData((prevPokemonData) => {
        const shuffledData = shuffleArray([...prevPokemonData]);
        return shuffledData;
      });
      setCardsShowing(true);
    }, 1100);
    clearTimeout();
  }

  return (
    <>
      <div className="playing-field">
        {pokemonData.map((pokemon, index) => (
          <Card
            key={pokemon.id}
            {...pokemon}
            cardsShowing={cardsShowing}
            handleClick={handleClick}
            animationKey={`${index} - ${pokemon.id}`}
          />
        ))}
      </div>
    </>
  );
}

PlayField.propTypes = {
  updateScoreBoard: PropTypes.func,
}
