import React, { useState, useEffect } from "react";
import shortid from "shortid";
import classNames from "classnames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import DropdownAddToDo from "./components/DropdownAddToDo";
import TodoList from "./components/TodoList";
import initialTodos from "./todos.json";
import Filter from "./components/Filter";

import TodoEditor from "./components/TodoEditor";

const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState("");
  const [selectedTodos, setSelectedTodos] = useState([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    setTodos([todo, ...todos]);
  };

  const deleteTodo = (todoIds) => {
    const updatedTodos = todos.filter((todo) => !todoIds.includes(todo.id));
    setTodos(updatedTodos);
  };

  const toggleCompleted = (todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDeleteTodo = () => {
    deleteTodo(selectedTodos.map((selectedTodo) => selectedTodo.id));
    setSelectedTodos([]);
  };

  const handleTodoClick = (todo) => {
    const isSelected = selectedTodos.some(
      (selectedTodo) => selectedTodo.id === todo.id
    );
    if (isSelected) {
      const updatedSelectedTodos = selectedTodos.filter(
        (selectedTodo) => selectedTodo.id !== todo.id
      );
      setSelectedTodos(updatedSelectedTodos);
    } else {
      setSelectedTodos([...selectedTodos, todo]);
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Filter value={filter} onChange={handleFilterChange} />

      <button
        type="button"
        className={classNames("TodoList__btn", {
          "TodoList__btn--active": selectedTodos.length > 0,
        })}
        onClick={handleDeleteTodo}
        disabled={selectedTodos.length === 0}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>

      <DropdownAddToDo>
        <TodoEditor onSubmit={addTodo} />
      </DropdownAddToDo>
      <TodoList
        todos={filteredTodos}
        onDeleteTodo={deleteTodo}
        onToggleCompleted={toggleCompleted}
        selectedTodos={selectedTodos}
        handleTodoClick={handleTodoClick}
        handleDeleteTodo={handleDeleteTodo}
      />
    </>
  );
};

export default App;
