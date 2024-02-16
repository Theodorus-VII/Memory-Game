import { pokemonNames } from "./pokemon_names";
import { useState, useEffect } from "react";
import Card from "./Card";
import "../styles/board.css";

export default function GameBoard() {
  const [pokemonData, setPokemonData] = useState([]);
  const [scoreBoard, setScoreBoard] = useState({
    history: [],
    bestScore: 0,
    currentScore: 0,
  });
  const [cardsShowing, setCardsShowing] = useState(true);

  // first needs to fetch the pokemons from the server. will need their names and images then.

  useEffect(() => {
    // runs onMount
    async function loadPokemonData() {
      // fetch the data from the server.
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
    loadPokemonData();
  }, []);

  function shuffleArray(array) {
    // Fisher-Yates Sorting Algorithm.
    // create a new copy to avoid mutation
    let copiedArray = [...array];
    for (let i = copiedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
    }
    return copiedArray;
  }

  async function handleClick(id) {
    // declare variables for the state object.
    setCardsShowing(false);
    setTimeout(() => {
      setCardsShowing(true);
    }, 300);

    let newCurrentScore;
    let newHistory;
    let newBestScore;

    if (scoreBoard.history.includes(id)) {
      // game fail state. reset history and current score, update best score.
      newHistory = [];
      newCurrentScore = 0;

      newBestScore = scoreBoard.bestScore;
      if (scoreBoard.currentScore >= scoreBoard.bestScore) {
        newBestScore = scoreBoard.currentScore;
      }
    } else {
      newHistory = [...scoreBoard.history, id];
      newCurrentScore = scoreBoard.currentScore + 1;

      newBestScore = scoreBoard.bestScore;
      if (newCurrentScore > scoreBoard.bestScore) {
        newBestScore = newCurrentScore;
      }
    }
    setScoreBoard({
      history: newHistory,
      currentScore: newCurrentScore,
      bestScore: newBestScore,
    });

    setTimeout(() => {
      // randomize the pokemonData array for the next go.
      setPokemonData((prevPokemonData) => {
        const shuffledData = shuffleArray([...prevPokemonData]);
        return shuffledData;
      });
      // this way triggers a re-render, which stops some of the flip animations(random).
    }, 1);
    clearTimeout();
    // now that we have the new values, update the state object.
  }

  return (
    <>
      {/* <div>THE cards go here</div> */}
      <div className="gameboardContainer">
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
