import React, { useState } from "react";
import "./App.css";
import Message from "./components/Message";
import NameForm from "./components/NameForm";

function App() {
  const [name, setName] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <NameForm name={name} onChangeName={value => setName(value)} />

        <Message name={name} />
      </header>
    </div>
  );
}

export default App;
