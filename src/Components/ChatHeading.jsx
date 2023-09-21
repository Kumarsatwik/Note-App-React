import React from "react";
import '../styles/chatheading.css'

const ChatHeading = ({ name, color }) => {
  return (
    <div className="chatHeading__home">
      <span className="chatHeading__logo" style={{ backgroundColor: color }}>{name.slice(0,2).toUpperCase()}</span>
      <h1 className="chatHeading__name">{name}</h1>
    </div>
  );
};

export default ChatHeading;
