import React, { useState, useEffect, useRef } from 'react';
import shortid from 'shortid';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import DropdownAddToDo from './components/DropdownAddToDo';
import TodoList from './components/TodoList';
import initialTodos from './todos.json';
import Filter from './components/Filter';
import './App.css';

import TodoEditor from './components/TodoEditor';

const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState('');
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const appRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (appRef.current && !appRef.current.contains(event.target)) {
        setSelectedTodos([]);
        setEditingTodoId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
      createdAt: new Date().toLocaleString(),
    };

    setTodos([todo, ...todos]);
  };

  const deleteTodo = todoIds => {
    const updatedTodos = todos.filter(todo => !todoIds.includes(todo.id));
    setTodos(updatedTodos);
  };

  const toggleCompleted = todoId => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const handleDeleteTodo = () => {
    deleteTodo(selectedTodos.map(selectedTodo => selectedTodo.id));
    setSelectedTodos([]);
  };

  const handleTodoClick = todo => {
    const isSelected = selectedTodos.some(
      selectedTodo => selectedTodo.id === todo.id
    );
    if (isSelected) {
      const updatedSelectedTodos = selectedTodos.filter(
        selectedTodo => selectedTodo.id !== todo.id
      );
      setSelectedTodos(updatedSelectedTodos);
      setEditingTodoId(null);
    } else {
      setSelectedTodos([todo]);
    }
  };

  const handleEditTodo = todoId => {
    const selectedTodo = todos.find(todo => todo.id === todoId);
    setEditingTodoId(todoId);
    setEditedText(selectedTodo.text);
  };

  const handleSaveEdit = (todoId, newText) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, text: newText } : todo
      )
    );
    setEditingTodoId(null);
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
  };

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(filter.toLowerCase())
  );

  const [editedText, setEditedText] = useState('');

  const handleTextChange = event => {
    setEditedText(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setEditedText(editedText + '\n');
    }
  };

  const handleSave = () => {
    handleSaveEdit(editingTodoId, editedText.trim());
  };

  return (
    <div ref={appRef} className="container">
      <container>
        <div className="header">
          <DropdownAddToDo>
            <TodoEditor onSubmit={addTodo} />
          </DropdownAddToDo>

          <div className="buttons-container">
            <button
              type="button"
              className={classNames('TodoList__btn', {
                'TodoList__btn--active': selectedTodos.length > 0,
              })}
              onClick={handleDeleteTodo}
              disabled={selectedTodos.length === 0}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>

            <button
              type="button"
              className={classNames('TodoList__btn', {
                'TodoList__btn--active':
                  selectedTodos.length === 1 && editingTodoId === null,
              })}
              onClick={() => handleEditTodo(selectedTodos[0].id)}
              disabled={selectedTodos.length !== 1 || editingTodoId !== null}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>

          <div className="filter">
            <Filter value={filter} onChange={handleFilterChange} />
          </div>
        </div>

        <TodoList
          todos={filteredTodos}
          onDeleteTodo={deleteTodo}
          onToggleCompleted={toggleCompleted}
          selectedTodos={selectedTodos}
          handleTodoClick={handleTodoClick}
          handleDeleteTodo={handleDeleteTodo}
          editingTodoId={editingTodoId}
          handleTextChange={handleTextChange}
          handleKeyPress={handleKeyPress}
          handleSave={handleSave}
          handleCancelEdit={handleCancelEdit}
          editedText={editedText}
        />
      </container>
    </div>
  );
};

export default App;
