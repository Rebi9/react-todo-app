import React, { useState, useContext } from "react";
import "./Todo.css";

import { ThemeContext } from "../App";

function ToDoForm(props = { is_done: false, content: "" }) {
  const [done, setDone] = useState(!!props.is_done);
  const [content, setContent] = useState(props.content || "");
  const theme = useContext(ThemeContext);

  const handleSave = () => {
    const data = {
      ...props,
      is_done: done,
      content: content
    };

    props.onSave(data);

    setDone(false);
    setContent("");
  };

  return (
    <div className="todo" style={theme}>
      <div className="check">
        <input
          type="checkbox"
          checked={done}
          onChange={e => setDone(e.target.checked)}
        />
      </div>
      <div className="body">
        <textarea value={content} onChange={e => setContent(e.target.value)} />
      </div>
      <button className="btn" onClick={handleSave}>
        Save
      </button>
      {props.ID && (
        <button className="btn" onClick={props.onCancel}>
          Cancel
        </button>
      )}
    </div>
  );
}

export default ToDoForm;
