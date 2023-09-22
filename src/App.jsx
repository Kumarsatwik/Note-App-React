import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Main from "./Components/Main";
import ChatHome from "./Components/ChatHome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Chats from "./Components/Chats";
import MobileSidebar from "./pages/MobileSidebar";
import MobileChats from "./pages/MobileChats";

function App() {
  const selectedNotes = useSelector((state) => state.notes.selectedNotes);

  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", checkSize);
  });
  const checkSize = () => {
    setScreenSize(window.innerWidth);
  };

  return (
    <section className="App">
      {screenSize < 900 ? (
        <Router>
          <Routes>
            <Route path="/" element={<MobileSidebar />} />
            <Route path="/chat/:id" element={<MobileChats />} />
          </Routes>
        </Router>
      ) : (
        <>
          <Sidebar />
          {selectedNotes !== "" ? <ChatHome /> : <Main />}
        </>
      )}
    </section>
  );
}

export default App;
