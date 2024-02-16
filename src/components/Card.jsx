/* eslint-disable react/prop-types */
import Tilt from "react-parallax-tilt";
import "../styles/card.css";

export default function Card({ name, id, sprite, handleClick, cardsShowing, animationKey }) {
  return (
    <Tilt>
      <div
        key={animationKey}
        id={`card-${id}`}
        className={`card ${!cardsShowing ? "card-flip" : ""}`}
        onClick={() => {
          handleClick(id);
        }}
      >
        <div className="card-face">
          <img src={sprite} alt="pokemon image"></img>
          <h3>{name}</h3>
        </div>
        <div className="card-back"></div>
      </div>
    </Tilt>
  );
}
