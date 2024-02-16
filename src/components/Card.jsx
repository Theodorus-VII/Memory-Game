import PropTypes from 'prop-types';
import Tilt from "react-parallax-tilt";
import "../styles/card.css";

export default function Card({ name, id, sprite, handleClick, cardsShowing, animationKey }) {
  return (
    <Tilt>
      <div
        key={animationKey}
        id={`card-${id}`}
        className={`card ${cardsShowing ? "card-face-front" : "card-face-back"}`}
        onClick={() => {
          handleClick(id);
        }}
      >
        <div className="card-face">
          <img src={sprite} alt="pokemon image"></img>
          <div className="card-title">
          <h3>{name}</h3>
          </div>
          
        </div>
        <div className="card-back"></div>
      </div>
    </Tilt>
  );
}

Card.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  sprite: PropTypes.string,
  handleClick: PropTypes.func,
  animationKey: PropTypes.string,
  cardsShowing: PropTypes.bool
}
