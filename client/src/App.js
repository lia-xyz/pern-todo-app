import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { loadTodos } from './features/todos/todosThunks';

import TodoForm from './components/TodoForm';
import FilterButtons from './components/TodoFilters';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';

import './App.css';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(loadTodos());
    }, [dispatch]);

  return (
    <div className='app'>
      <h1 className='header'>To-Do List</h1> 

      <TodoForm />
      <FilterButtons />

      <div className='todo-list-container'>
        <TodoList />
      </div>
    
      <hr />

      <TodoStats />
    </div>
  );
}

export default App;
