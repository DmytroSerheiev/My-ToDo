import React, { useState, useEffect, useRef } from 'react';
import shortid from 'shortid';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import './App.css';

import DropdownAddToDo from './components/DropdownAddToDo';
import TodoList from './components/TodoList';
import initialTodos from './todos.json';
import Filter from './components/Filter';
import TodoEditor from './components/TodoEditor';
import SelectedTodoList from './components/TodoItem/SelectedTodoList'; // Новый компонент для отображения выбранного элемента списка

const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState('');
  const [selectedTodos, setSelectedTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const appRef = useRef(null);
  const [editedText, setEditedText] = useState('');
  const [oldText, setOldText] = useState('');

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
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteTodo(selectedTodos.map(selectedTodo => selectedTodo.id));
    setSelectedTodos([]);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
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
      setEditingTodoId(null); // Reset the editingTodoId when a new todo is selected
    }
  };

  const handleEditTodo = (todoId, todoText) => {
    setEditingTodoId(todoId);
    setOldText(todoText);
    setEditedText(todoText); // Устанавливаем значение editedText равным исходному тексту
  };

  const handleSaveEdit = (todoId, newText) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, text: newText } : todo
      )
    );
    setEditingTodoId(null);
    setOldText('');
    setEditedText(''); // Очищаем значение editedText после сохранения
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setOldText('');
    setEditedText(''); // Очищаем значение editedText при отмене редактирования
  };

  const handleKeyPress = (event, todoId) => {
    if (event.key === 'Enter') {
      handleSaveEdit(todoId, editedText);
    }
  };

  const handleTextChange = event => {
    setEditedText(event.target.value);
  };

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div ref={appRef} className="container">
      <div className="header">
        <DropdownAddToDo>
          <TodoEditor
            onSubmit={addTodo}
            handleTextChange={handleTextChange}
            editedText={editedText}
          />
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
            onClick={() =>
              handleEditTodo(selectedTodos[0].id, selectedTodos[0].text)
            }
            disabled={selectedTodos.length !== 1 || editingTodoId !== null}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>

        <div className="filter">
          <Filter value={filter} onChange={handleFilterChange} />
        </div>
      </div>
      <div class="main-container">
        <div className="selected-todo" style={{ listStyleType: 'none' }}>
          {/* Показуємо вибраний елемент списку */}
          {selectedTodos.length > 0 && (
            <SelectedTodoList selectedTodos={selectedTodos} />
          )}
        </div>
        <div className="sidebar">
          <TodoList
            todos={filteredTodos}
            onDeleteTodo={deleteTodo}
            onToggleCompleted={toggleCompleted}
            selectedTodos={selectedTodos}
            handleTodoClick={handleTodoClick}
            handleDeleteTodo={handleDeleteTodo}
            handleEditTodo={handleEditTodo}
            editingTodoId={editingTodoId}
            handleTextChange={handleTextChange}
            handleKeyPress={handleKeyPress}
            handleSave={handleSaveEdit} // Переименовано handleSaveEdit в handleSave
            handleCancelEdit={handleCancelEdit}
            editedText={editedText}
            oldText={oldText}
          />
        </div>
      </div>

      {showDeleteModal && (
        <div className="delete-modal">
          <p>Удалить?</p>
          <button onClick={handleConfirmDelete}>Да</button>
          <button onClick={handleCancelDelete}>Отмена</button>
        </div>
      )}
    </div>
  );
};

export default App;
