import React from "react";

const Filter = ({ onChange, searching }) => {
  return (
    <div>
      Search: <input onChange={onChange} value={searching} type="text" />
    </div>
  );
};

export default Filter;
