/* eslint-disable react/prop-types */
export default function ScoreBoard({ scoreBoard }) {
  return (
    <div className="score-board">
      <div>ScoreBoard</div>
      <div>
        current score: {scoreBoard.currentScore}
        best score: {scoreBoard.bestScore}
      </div>
    </div>
  );
}
