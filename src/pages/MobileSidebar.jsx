import { useEffect, useState } from "react";
import "../styles/mobile_sidebar.css";
import { AiOutlinePlus } from "react-icons/ai";
import MobileModal from "./MobileModal";

import { selectNote } from "../reducer/NotesSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const MobileSidebar = () => {
  const [openModal, setModal] = useState(false);
  const [group, setGroup] = useState([]);
  const [chosenGroup, setChosenGroup] = useState("");

  const groupDetails = useSelector((state) => state.notes.groupDetails);
  const dispatch = useDispatch();

  const navigate = useNavigate();

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
    navigate(`/chat/${data.id}`);
    // setSelected(data);
  };

  // console.log(group);

  return (
    <section className="mob__sidebar">
      <h1 className="mob__sidebar_heading">Pocket Notes</h1>
      <button className="mob__sidebar_createButton" onClick={modalButton}>
        <AiOutlinePlus className="icon" /> Create Notes Group
      </button>
      {openModal && <MobileModal setModal={setModal} />}

      {group.length > 0 &&
        group?.map((data) => (
          <section
            key={data?.id}
            className={`mob__groupSection${
              chosenGroup === data ? " mob__groupSelected" : ""
            }`}
            onClick={() => handleClick(data)}
          >
            <span
              className="mob__groupIcon"
              style={{ backgroundColor: data?.color }}
            >
              {data?.groupName.slice(0, 2).toUpperCase()}
            </span>
            <h3 className="mob__groupNames">{data?.groupName}</h3>
          </section>
        ))}
    </section>
  );
};

export default MobileSidebar;
