import React from 'react';
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
  handleTextChange,
  handleKeyPress,
  handleSave,
  handleCancelEdit,
  editedText,
}) => {
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
                onKeyDown={event => handleKeyPress(event, id)}
              />
              <div className="TodoList__editButtons">
                <button
                  className="TodoList__editButton"
                  onClick={() => handleSave(id, editedText)}
                >
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
    </ul>
  );
};

export default TodoList;
