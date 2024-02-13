/* eslint-disable react/prop-types */
// import { useState } from "react";

export default function Card({ name, id, sprite, handleClick }) {
  return (
    <>
      <div key={id} className="card" onClick={()=>{handleClick(id)}}>
        <img src={sprite} alt="pokemon image"></img>
        <h3>{name}</h3>
      </div>
    </>
  );
}
