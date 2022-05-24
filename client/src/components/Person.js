import React from "react";

const Person = ({ person, handleDelete }) => {
  return (
    <>
      <p key={person.id}>
        {person.name} {person.number}
      </p>
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </>
  );
};

export default Person;
