import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
  return (
    <div className="space-y-4">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
