import React from 'react';
import './SelectedTodoList.css';

const SelectedTodoList = ({ selectedTodos }) => {
  return (
    <ul>
      {selectedTodos.map(todo => (
        <li className="li" key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
};

export default SelectedTodoList;
