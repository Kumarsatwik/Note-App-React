import { useEffect, useState } from "react";
import "../styles/sidebar.css";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";

const Sidebar = ({ selected, setSelected }) => {
  const [openModal, setModal] = useState(false);
  const [group, setGroup] = useState([]);
  const [chosenGroup, setChosenGroup] = useState("");
  const [shouldReloadPage, setShouldReloadPage] = useState(false);
  const modalButton = () => {
    setModal(true);
  };

  function fetchData() {
    let groupData = localStorage.getItem("groupDetails");
    // console.log(groupData);
    if (groupData && Array.isArray(JSON.parse(groupData))) {
      setGroup(JSON.parse(groupData));
    } else {
      setGroup([]);
    }

    if (shouldReloadPage) {
      setShouldReloadPage(false);
      location.reload();
    }
    // location.reload();
  }

  useEffect(() => {
    fetchData();
  }, [openModal, shouldReloadPage]);

  const handleClick = (data) => {
    setChosenGroup(data);
    setSelected(data);
  };

  // console.log(group);

  return (
    <section className="sidebar">
      <h1 className="sidebar__heading">Pocket Notes</h1>
      <button className="sidebar__createButton" onClick={modalButton}>
        <AiOutlinePlus className="icon" /> Create Notes Group
      </button>
      {openModal && (
        <Modal groups={group} setGroupName={setGroup} setModal={setModal} />
      )}

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
