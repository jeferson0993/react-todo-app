import { useState, useEffect, SetStateAction } from "react";
import Navbar from "./components/navbar";
import reactLogo from "./assets/react.svg";
import { Todo } from "./interfaces/todo";

const TodoAppComponent = () => {
  const initialTodosState: Todo[] = [];
  const initialInputState: string = "";
  const [todos, setTodos] = useState(initialTodosState);
  const [inputValue, setInputValue] = useState(initialInputState);

  useEffect(() => {
    const todosFromLocalStorage = localStorage.getItem("todos");
    setTodos(todosFromLocalStorage ? JSON.parse(todosFromLocalStorage) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputValue, completed: false },
      ]);
      setInputValue("");
    }
  };

  const handleToggleTodo = (id: number) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      setTodos([
        ...todos.slice(0, index),
        { ...todos[index], completed: !todos[index].completed },
        ...todos.slice(index + 1),
      ]);
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <Navbar />
      <main>
        <div className="container mx-auto p-4 max-w-md">
          <div className="grid justify-items-center mb-8 mt-8">
            <img
              src={reactLogo}
              className="logo react"
              alt="React logo"
            />
          </div>
          <div className="flex mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="flex-grow mr-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Add a new todo..."
            />
            <button
              onClick={handleAddTodo}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors"
            >
              Add
            </button>
          </div>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center bg-white p-3 rounded shadow"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  className="mr-2 form-checkbox h-5 w-5 text-secondary"
                />
                <span
                  className={`flex-grow ${
                    todo.completed ? "line-through text-primary" : ""
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-secondary hover:text-red-700 transition-colors"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default TodoAppComponent;
