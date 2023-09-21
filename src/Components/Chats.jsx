import React, { useState } from "react";
import "../styles/chatlist.css";
const Chats = ({ notes }) => {
  //   console.log(notes);
  window.scrollTo(0, 0);
  return (
    <div className="chatlist__home">
      {notes.map((data) => (
        <div className="chatlist__chat" key={data.id}>
          <div className="chatlist__time">
            <p>{data.timeStamp.split("at")[1]}</p>
            <p>{data.timeStamp.split("at")[0]}</p>
          </div>
          <div className="chatlist__message">
            <p>{data.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
