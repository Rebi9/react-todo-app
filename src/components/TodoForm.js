import React, { useState } from "react";
import "./Todo.css";

function ToDoForm(props = { is_done: false, content: "" }) {
  const [done, setDone] = useState(!!props.is_done);
  const [content, setContent] = useState(props.content || "");

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
    <div className="todo">
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
