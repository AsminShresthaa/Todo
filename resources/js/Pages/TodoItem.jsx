import React, { useState } from 'react';
import axios from 'axios';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`https://posttodo.test/api/todos/${todo.id}`, {
        title,
        description,
        completed: todo.completed
      }, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      updateTodo(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error.response.data);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://posttodo.test/api/todos/${todo.id}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      deleteTodo(todo.id);
    } catch (error) {
      console.error('Error deleting todo:', error.response.data);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg flex items-center space-x-4 mb-4">
      {isEditing ? (
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-2">Edit Todo</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
            placeholder="Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
            placeholder="Description"
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Update
            </button>
            <button
              onClick={handleToggleEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-between items-center">
          <div className="flex-grow">
            <h3 className="text-lg font-semibold mb-1">{todo.title}</h3>
            <p className="text-gray-600">{todo.description}</p>
          </div>
          <div className="flex-shrink-0 flex gap-2">
            <button
              onClick={handleToggleEdit}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
