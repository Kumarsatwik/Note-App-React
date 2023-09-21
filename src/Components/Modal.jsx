import React, { useState } from "react";
import "../styles/modal.css";
const Modal = ({ groups, setGroupName, setModal }) => {
  const bgcolors = [
    "#b38bfa",
    "#ff79f2",
    "#43e6fc",
    "#f19576",
    "#0041ff",
    "#6691ff",
  ];
  const [modalData, setModalData] = useState({ groupName: "", bgColor: "" });
  const [error, setError] = useState("");
  const [reload, setReload] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalData.groupName.length < 2) {
      setError("Group Name must more than 2 characters");
      return;
    }
    if (modalData.bgColor === "") {
      setError("Color is required");
      return;
    }
    let storeData = [
      ...groups,
      {
        groupName: modalData.groupName,
        color: modalData.bgColor,
        notes: [],
        id: Date.now(),
      },
    ];
    setError("");
    setGroupName(storeData);
    localStorage.setItem("groupDetails", JSON.stringify(storeData));
    setModal(false);
    setReload(!reload);
  };

  const handleChange = (e) => {
    if (e.target.className === "bgColor")
      setModalData({
        ...modalData,
        [e.target.className]: e.target.id,
      });
    else {
      setModalData({ ...modalData, [e.target.name]: e.target.value });
    }
  };
  return (
    <div className="modal">
      <h2 className="modal__heading">Create New Notes Group</h2>
      <div className="modal__group_name">
        <span className="modal__heading">Group Name</span>
        <input
          name="groupName"
          type="text"
          placeholder="Enter your group name..."
          onChange={handleChange}
        />
      </div>

      <div className="modal__color_choose">
        <span className="modal__heading">Choose Color</span>
        {bgcolors.map((color) => (
          <label
            id={color}
            key={color}
            className={`bgColor${
              modalData.bgColor === color ? " selected" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={handleChange}
          ></label>
        ))}
      </div>
      {error !== "" && <p>{error}</p>}

      <button type="submit" onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
};

export default Modal;
