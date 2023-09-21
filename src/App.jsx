import { useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Main from "./Components/Main";
import ChatHome from "./Components/ChatHome";

function App() {
  const [selectedNotes, setSelectedNotes] = useState("");
  // console.log("selected notes", selectedNotes); 
  return (
    <section className="App">
      <Sidebar selected={selectedNotes} setSelected={setSelectedNotes} />
      {selectedNotes ? (
        <ChatHome
          selectedNotes={selectedNotes}
          setSelectedNotes={setSelectedNotes}
          
        />
      ) : (
        <Main />
      )}
    </section>
  );
}

export default App;
