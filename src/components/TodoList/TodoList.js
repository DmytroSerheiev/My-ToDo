import React, { useState } from 'react';
import classNames from 'classnames';
import './TodoList.css';

const TodoList = ({
  todos,
  onDeleteTodo,
  onToggleCompleted,
  selectedTodos,
  handleTodoClick,
  handleDeleteTodo,
  handleEditTodo,
  editingTodoId,
  handleSaveEdit,
  handleCancelEdit,
}) => {
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
    <ul className="TodoList">
      {todos.map(({ id, text, completed, createdAt }) => (
        <li
          key={id}
          className={classNames('TodoList__item', {
            'TodoList__item--completed': completed,
            'TodoList__item--selected': selectedTodos.some(
              selectedTodo => selectedTodo.id === id
            ),
          })}
        >
          <input
            type="checkbox"
            className="TodoList__checkbox"
            checked={completed}
            onChange={() => onToggleCompleted(id)}
          />
          {editingTodoId === id ? (
            <div className="TodoList__editContainer">
              <textarea
                className="TodoList__editInput"
                value={editedText}
                onChange={handleTextChange}
                onKeyDown={handleKeyPress}
              />
              <div className="TodoList__editButtons">
                <button className="TodoList__editButton" onClick={handleSave}>
                  Сохранить
                </button>
                <button
                  className="TodoList__editButton"
                  onClick={handleCancelEdit}
                >
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <p
              className={classNames('TodoList__text', {
                'TodoList__text--selected': selectedTodos.some(
                  selectedTodo => selectedTodo.id === id
                ),
              })}
              onClick={() => handleTodoClick({ id, text, completed })}
            >
              {text}
            </p>
          )}
          <p className="TodoList__createdAt">Created at: {createdAt}</p>
        </li>
      ))}
      {/* {selectedTodos.length === 1 && (
        <button
          type="button"
          className={classNames('TodoList__btn', {
            'TodoList__btn--active': selectedTodos.length > 0,
          })}
          onClick={() => handleEditTodo(selectedTodos[0].id)}
          disabled={selectedTodos.length !== 1 || editingTodoId !== null}
        >
          Редактировать
        </button>
      )} */}
    </ul>
  );
};

export default TodoList;
