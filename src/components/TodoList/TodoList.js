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
}) => {
  return (
    <ul className="TodoList">
      {todos.map(({ id, text, completed }) => (
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
        </li>
      ))}
      {/* {selectedTodos.length > 0 && (
        <button
          type="button"
          className={classNames("TodoList__btn", {
            "TodoList__btn--active": selectedTodos.length > 0,
          })}
          onClick={handleDeleteTodo} // Update this line
          disabled={selectedTodos.length === 0}
        >
          Удалить
        </button>
      )} */}
    </ul>
  );
};

export default TodoList;
