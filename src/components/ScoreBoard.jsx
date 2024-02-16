/* eslint-disable react/prop-types */
export default function ScoreBoard({ scoreBoard }) {
  return (
    <div className="header">
      <p className="header-desc">
        Get points by clicking on images. Game over if you click on any more
        than once!
      </p>
      <div className="score-board">
        <h1>ScoreBoard</h1>
        <div className="scores">
          <div>Current Score: {scoreBoard.currentScore}</div>
          <div>Best Score: {scoreBoard.bestScore}</div>
        </div>
      </div>
    </div>
  );
}
