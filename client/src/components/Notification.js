import React from "react";

const Notification = ({ notiObj }) => {
  const succesStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (notiObj.flag === 1) {
    return <div style={succesStyle}>{notiObj.message}</div>;
  } else if (notiObj.flag === 0) {
    return <div style={errorStyle}>{notiObj.message}</div>;
  } else if (notiObj.flag === -1) {
    return null;
  }
};

export default Notification;
