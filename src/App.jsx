import { useState } from "react";
import "./App.css";
import GameBoard from "./GameBoard";

function App() {
  return (
    <>
      <h1>THE MEMORY GAME</h1>
      <h2>
        Get points by clicking on images. Game over if you click on any more
        than once!
      </h2>
      <GameBoard/>
    </>
  );
}

export default App;
