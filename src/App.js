import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

const url = "/todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const getTodoes = async () => {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
      });

      const res = await response.json();

      setTodos(res.sort((a, b) => (a.created_at < b.created_at ? 1 : -1)));
    };

    getTodoes();
  }, [refresh]);

  const handleCreate = data => {
    const createTodo = async () => {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });

      console.log(response.status);

      setRefresh(Date.now());
    };

    createTodo();
  };

  const handleUpdate = data => {
    const updateTodo = async () => {
      const response = await fetch(`${url}/${data.id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
      });

      console.log(response.status);

      setRefresh(Date.now());
    };

    updateTodo();
  };

  const handleDelete = id => {
    const deleteTodo = async () => {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
        mode: "cors"
      });

      console.log(response.status);

      setRefresh(Date.now());
    };

    deleteTodo();
  };

  return (
    <div className="App">
      <TodoForm onSave={handleCreate} />

      {todos.map(item => (
        <Todo
          key={item.id}
          {...item}
          onSave={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default App;
