import React, { useState, useEffect, createContext } from "react";
import "./App.css";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

const url = "/todo";

const Themes = {
  light: {
    color: "#000",
    backgroundColor: "#fff"
  },
  dark: {
    color: "#fff",
    backgroundColor: "#000"
  }
};

export const ThemeContext = createContext(Themes.light);

function App() {
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [theme, setTheme] = useState("light");

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

  const handleTheme = e => {
    setTheme(e.target.value);
  };

  return (
    <div className="App">
      <ThemeContext.Provider value={Themes[theme]}>
        <div className="theme-selector">
          <label>
            <input
              type="radio"
              name="theme"
              value="light"
              defaultChecked={theme === "light"}
              onChange={handleTheme}
            />
            Light
          </label>
          <label>
            <input
              type="radio"
              name="theme"
              value="dark"
              defaultChecked={theme === "dark"}
              onChange={handleTheme}
            />
            Dark
          </label>
        </div>

        <TodoForm onSave={handleCreate} />

        {todos.map(item => (
          <Todo
            key={item.id}
            {...item}
            onSave={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
