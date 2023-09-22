import { useEffect, useState } from "react";
import "../styles/sidebar.css";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";

import { selectNote, addNoteName, addNote } from "../reducer/NotesSlice";
import { useSelector, useDispatch } from "react-redux";

const Sidebar = () => {
  const [openModal, setModal] = useState(false);
  const [group, setGroup] = useState([]);
  const [chosenGroup, setChosenGroup] = useState("");

  const groupDetails = useSelector((state) => state.notes.groupDetails);
  const selectedNotes = useSelector((state) => state.notes.selectedNotes);
  const dispatch = useDispatch();
  // console.log(dispatch);

  const modalButton = () => {
    setModal(true);
  };

  function fetchData() {
    if (groupDetails && Array.isArray(groupDetails)) {
      setGroup(groupDetails);
    } else {
      setGroup([]);
    }
  }

  useEffect(() => {
    fetchData();
  }, [openModal, groupDetails]);

  const handleClick = (data) => {
    dispatch(selectNote({ selected: data.id }));
    setChosenGroup(data);
    // setSelected(data);
  };

  // console.log(group);

  return (
    <section className="sidebar">
      <h1 className="sidebar__heading">Pocket Notes</h1>
      <button className="sidebar__createButton" onClick={modalButton}>
        <AiOutlinePlus className="icon" /> Create Notes Group
      </button>
      {openModal && <Modal setModal={setModal} />}

      {group.length > 0 &&
        group?.map((data) => (
          <section
            key={data?.id}
            className={`groupSection${
              chosenGroup === data ? " groupSelected" : ""
            }`}
            onClick={() => handleClick(data)}
          >
            <span
              className="groupIcon"
              style={{ backgroundColor: data?.color }}
            >
              {data?.groupName.slice(0, 2).toUpperCase()}
            </span>
            <h3 className="groupNames">{data?.groupName}</h3>
          </section>
        ))}
    </section>
  );
};

export default Sidebar;
