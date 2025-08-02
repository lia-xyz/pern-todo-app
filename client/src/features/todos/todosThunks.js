import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    getTodos,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo
} from '../../services/api';

export const loadTodos = createAsyncThunk('todos/loadTodos', async () => {
    return await getTodos();
});

export const addTodo = createAsyncThunk('todos/addTodo', async (title) => {
    return await createTodo(title);
});

export const editTodo = createAsyncThunk('todos/editTodo', async ({ id, title }) => {
    return await updateTodo(id, title);
});

export const toggleTodoStatus = createAsyncThunk('todos/toggleTodoStatus', async ({ id, isCompleted }) => {
    return await toggleTodo(id, isCompleted);
});

export const removeTodo = createAsyncThunk('todos/removeTodo', async (id) => {
    return await deleteTodo(id);
});