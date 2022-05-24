import React from "react";

const PersonForm = ({ addPerson, nameChange, phoneChange, newName, newPhone }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={nameChange} value={newName} />
        <br />
        phone: <input onChange={phoneChange} value={newPhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
