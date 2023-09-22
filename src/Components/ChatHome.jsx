import React, { useEffect, useState } from "react";
import ChatHeading from "./ChatHeading";
import Chats from "./Chats";
import "../styles/chathome.css";
import { AiOutlineSend } from "react-icons/ai";

import { addNote } from "../reducer/NotesSlice";
import { useSelector, useDispatch } from "react-redux";

const ChatHome = () => {
  const [message, setMessage] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);

  const groupDetails = useSelector((state) => state.notes.groupDetails);
  const selectednote = useSelector((state) => state.notes.selectedNotes);
  const dispatch = useDispatch();

  let data = groupDetails.filter((note) => note.id === selectednote);

  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSendMessage = () => {
    if (!message.trim()) {
      alert("Please enter a message before submitting.");
      return;
    }

    // const newGroup = [...groups];
    // const groupIndex = newGroup.findIndex((group) => group.id === selected);
    // // console.log(groupIndex);
    // const currentGroup = newGroup[groupIndex];
    // currentGroup["notes"].push({ timeStamp, message });

    // localStorage.setItem("groupDetails", JSON.stringify(newGroup));

    dispatch(
      addNote({
        groupId: selectednote,
        note: message,
      })
    );

    setMessage("");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat__home">
      <ChatHeading name={data[0].groupName} color={data[0].color} />
      <div className="chat__list">
        <Chats notes={data[0].notes} />
        <div className="chat__input_container">
          <textarea
            className="chat__input"
            type="text"
            placeholder="Enter your text here..........."
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleEnter}
          ></textarea>
          <AiOutlineSend
            className="send-icon"
            style={{ color: "#ABABAB" }}
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatHome;
