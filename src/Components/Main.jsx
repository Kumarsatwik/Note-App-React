import "../styles/main.css";
import Home from "../assets/Home.svg";
import { BiSolidLock } from "react-icons/bi";
const Main = () => {
  return (
    <section className="main">
      <img src={Home} alt="" />
      <h1 className="main__heading">Pocket Notes</h1>
      <p>
        Send and receive messages without keeping your phone online. Use Pocket
        Notes on up to 4 linked devices and 1 mobile phone
      </p>
      <div className="message">
        <BiSolidLock />
        <span>end-to-end encrypted</span>
      </div>
    </section>
  );
};

export default Main;
