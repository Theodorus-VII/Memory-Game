import { useState } from "react";
import "../styles/board.css";
import PlayField from "./PlayField";
import ScoreBoard from "./ScoreBoard";
import Modal from "./Modal";

export default function GameBoard() {
  const [scoreBoard, setScoreBoard] = useState({
    history: [],
    bestScore: 0,
    currentScore: 0,
  });
  const [modalOpen, setModalOpen] = useState(true);

  function updateScoreBoard(id) {
    let newCurrentScore;
    let newHistory;
    let newBestScore;
    let gameState = 0;

    if (scoreBoard.history.includes(id)) {
      // game fail state. reset history and current score, update best score.
      newHistory = [];
      newCurrentScore = 0;

      newBestScore = scoreBoard.bestScore;
      if (scoreBoard.currentScore >= scoreBoard.bestScore) {
        //new high score
        newBestScore = scoreBoard.currentScore;
        gameState = 1;
      } else {
        //didnt beat high score
        gameState = -1;
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
    return gameState;
  }

  return (
    <>
      {modalOpen ? (
        <Modal>
          <h2>Game Over</h2>
          <button>Try Again?</button>
        </Modal>
      ) : (
        <div className="board-container">
          <ScoreBoard scoreBoard={scoreBoard} />
          <PlayField updateScoreBoard={updateScoreBoard} />
        </div>
      )}
    </>
  );
}
