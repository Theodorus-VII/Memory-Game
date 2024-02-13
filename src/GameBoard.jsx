import { pokemonNames } from "./pokemon_names";
import { useState, useEffect } from "react";
import Card from "./Card";

export default function GameBoard() {
  const [pokemonData, setPokemonData] = useState([]);
  const [scoreBoard, setScoreBoard] = useState({
    history: [],
    bestScore: 0,
    currentScore: 0,
  }); //history, best score and current score

  // first needs to fetch the pokemons from the server. will need their names and images then.
  useEffect(() => {
    async function loadPokemonData() {
      const promises = pokemonNames.map(async (pokemon) => {
        // fetch the data from the server.
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

  function handleClick(id) {
    // declare variables for the state object.
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

    // now that we have the new values, update the state object.
    setScoreBoard({
      history: newHistory,
      currentScore: newCurrentScore,
      bestScore: newBestScore,
    });

    // randomize the pokemonData array.
    setPokemonData((prevPokemonData) => {
      const shuffledData = shuffleArray([...prevPokemonData]);
      return shuffledData;
    });
  }

  return (
    <>
      <div>
        <div>ScoreBoard</div>
        <div>
          current score: {scoreBoard.currentScore}
          best score: {scoreBoard.bestScore}
        </div>
      </div>
      <div>THE cards go here</div>
      <div className="gameboardContainer">
        {pokemonData.map((pokemon) => (
          <Card key={pokemon.id} {...pokemon} handleClick={handleClick} />
        ))}
      </div>
    </>
  );
}
