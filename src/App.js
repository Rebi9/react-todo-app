import React from "react";
import "./App.css";

function App() {
  const libralies = ["jQuery", "React", "Vue.js"];

  return (
    <div className="App">
      <header className="App-header">
        {libralies.map(item => (
          <p>{item}</p>
        ))}
      </header>
    </div>
  );
}

export default App;
