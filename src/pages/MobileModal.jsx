import React, { useState } from "react";
import "../styles/mobile_modal.css";
import { addNoteName } from "../reducer/NotesSlice";
import { useSelector, useDispatch } from "react-redux";
const MobileModal = ({ setModal }) => {
  const dispatch = useDispatch();
  // console.log("Dispatch value:", dispatch);
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

    // console.log(modalData);

    dispatch(
      addNoteName({
        name: modalData.groupName,
        color: modalData.bgColor,
      })
    );
    setModal(false);
    setError("");
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
    <div className="mobile__modal">
      <h2 className="mobile__modal_heading">Create New Notes Group</h2>
      <div className="mobile__modal_group_name">
        <span className="mobile__modal_heading">Group Name</span>
        <input
          name="groupName"
          type="text"
          placeholder="Enter your group name..."
          onChange={handleChange}
        />
      </div>

      <div className="mobile__modal_color_choose">
        <span className="mobile__modal_heading">Choose Color</span>
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

export default MobileModal;
