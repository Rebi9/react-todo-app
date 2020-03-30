import React, { useState } from "react";
import TodoForm from "./TodoForm";
import "./Todo.css";

function Todo(props) {
  const [edit, setEdit] = useState(false);

  const handleUpdate = data => {
    props.onSave(data);
    setEdit(false);
  };

  if (edit) {
    return (
      <TodoForm
        {...props}
        onSave={handleUpdate}
        onCancel={() => setEdit(false)}
      />
    );
  }

  return (
    <div className="todo">
      <div className="check">{props.is_done && <span>✓</span>}</div>
      <div className="body">
        <div className="header">
          <span className="date">CreatedAt: {props.created_at}</span>
          <span className="date">UpdatedAt: {props.updated_at}</span>
        </div>
        <div className="content">{props.content}</div>
      </div>
      <button className="btn" onClick={() => setEdit(true)}>
        Edit
      </button>
      <button className="btn" onClick={() => props.onDelete(props.id)}>
        Delete
      </button>
    </div>
  );
}

export default Todo;
