import React from "react";
import Person from "./Person.js";

const Display = ({ state, handleDelete }) => {
  return (
    <>
      {state.map((person) => {
        return <Person handleDelete={handleDelete} key={person.id} person={person} />;
      })}
    </>
  );
};

export default Display;
