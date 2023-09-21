import React, { useEffect, useState } from "react";
import ChatHeading from "./ChatHeading";
import Chats from "./Chats";
import "../styles/chathome.css";
import { AiOutlineSend } from "react-icons/ai";

const ChatHome = ({ selectedNotes, setSelectedNotes }) => {
  const [message, setMessage] = useState("");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const groupData = localStorage.getItem("groupDetails") || "[]";
    setGroups(JSON.parse(groupData));
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("groupDetails");
    const notesArray = JSON.parse(data);
    const groupIndex = notesArray.findIndex(
      (group) => group.id === selectedNotes.id
    );
    setSelectedNotes(notesArray[groupIndex]);
  }, [message]); // update on message change, which ensures data consistency

  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSendMessage = () => {
    if (!message.trim()) {
      alert("Please enter a message before submitting.");
      return;
    }

    const currentTime = new Date();
    const timeStamp = currentTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const newGroup = [...groups];
    const groupIndex = newGroup.findIndex(
      (group) => group.id === selectedNotes.id
    );
    // console.log(groupIndex);
    const currentGroup = newGroup[groupIndex];
    currentGroup["notes"].push({ timeStamp, message });

    localStorage.setItem("groupDetails", JSON.stringify(newGroup));
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
      <ChatHeading
        name={selectedNotes?.groupName}
        color={selectedNotes?.color}
      />
      <div className="chat__list">
        <Chats notes={selectedNotes.notes} />
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
