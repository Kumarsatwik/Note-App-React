import React, { useState } from "react";
import { useParams } from "react-router";
import { addNote, selectNote } from "../reducer/NotesSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import "../styles/mobile_chats.css";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";

const MobileChats = () => {
  const { id } = useParams();
  const groupDetails = useSelector((state) => state.notes.groupDetails);
  // console.log(groupDetails);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // console.log(id);

  let data = groupDetails.filter((note) => note.id == id);
  // console.log(data[0]);

  const [message, setMessage] = useState("");

  function handleSendMessage() {
    if (!message.trim()) {
      alert("Please enter a message before submitting.");
      return;
    }
    // console.log(message);
    dispatch(
      addNote({
        groupId: id,
        note: message,
      })
    );

    setMessage("");
  }
  const handleMessageChange = (e) => setMessage(e.target.value);
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chats">
      <div className="chats__heading">
        <BsArrowLeft onClick={() => navigate('/')} style={{ cursor: "pointer", fontSize: "1.5rem" }} />
        <span
          className="chats__logo"
          style={{ backgroundColor: data[0].color }}
        >
          {data[0].groupName.slice(0, 2).toUpperCase()}
        </span>
        <h1 className="chats__name">{data[0].groupName}</h1>
      </div>

      <div className="chats__list">
        {data[0].notes.map((note) => (
          <div className="chats__chat" key={note.id}>
            <div className="chats__time">
              <p>{note.timeStamp.split("at")[1]}</p>
              <p>{note.timeStamp.split("at")[0]}</p>
            </div>
            <div className="chats__message">
              <p>{note.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chats__input">
        <textarea
          type="text"
          placeholder="Enter your text here..........."
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleEnter}
        ></textarea>
        <AiOutlineSend
          className="send-icons"
          style={{ color: "#ABABAB" }}
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default MobileChats;
