import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchTodos(token);
    }
  }, [navigate]);

  const fetchTodos = async (token) => {
    try {
      const response = await axios.get('https://posttodo.test/api/todos', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setTodos(response.data);
    } catch (error) {
      setError('Failed to fetch todos');
    }
  };

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-indigo-600 text-white p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Todo App</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <div className="p-6">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <TodoForm addTodo={addTodo} />
          <div className="mt-6">
            <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
