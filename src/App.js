import React from "react";
import "./App.css";
import Message from "./components/Message";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Message name="habu" />
        <Message name="moriuchi" />
        <Message name="sato" />
      </header>
    </div>
  );
}

export default App;
