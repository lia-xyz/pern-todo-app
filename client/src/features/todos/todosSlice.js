import { createSlice } from '@reduxjs/toolkit';
import {
    loadTodos,
    addTodo,
    editTodo,
    toggleTodoStatus,
    removeTodo
} from './todosThunks';

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        status: {
            load: 'idle',
            add: 'idle',
            edit: 'idle',
            toggle: 'idle',
            remove: 'idle'
        },
        error: {
            load: null,
            add: null,
            edit: null,
            toggle: null,
            remove: null
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadTodos.pending, (state) => {
                state.status.load = 'loading';
                state.error.load = null;
            })
            .addCase(loadTodos.fulfilled, (state, action) => {
                state.status.load = 'succeeded';
                state.items = action.payload;
            })
            .addCase(loadTodos.rejected, (state, action) => {
                state.status.load = 'failed';
                state.error.load = action.error.message;
            })

            .addCase(addTodo.pending, (state) => {
                state.status.add = 'loading';
                state.error.add = null;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.status.add = 'succeeded';
                state.items.push(action.payload);
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.status.add = 'failed';
                state.error.add = action.error.message;
            })

            .addCase(editTodo.pending, (state) => {
                state.status.edit = 'loading';
                state.error.edit = null;
            })
            .addCase(editTodo.fulfilled, (state, action) => {
                state.status.edit = 'succeeded';
                const index = state.items.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(editTodo.rejected, (state, action) => {
                state.status.edit = 'failed';
                state.error.edit = action.error.message;
            })

            .addCase(toggleTodoStatus.pending, (state) => {
                state.status.toggle = 'loading';
                state.error.toggle = null;
            })
            .addCase(toggleTodoStatus.fulfilled, (state, action) => {
                state.status.toggle = 'succeeded';
                const index = state.items.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(toggleTodoStatus.rejected, (state, action) => {
                state.status.toggle = 'failed';
                state.error.toggle = action.error.message;
            })

            .addCase(removeTodo.pending, (state) => {
                state.status.remove = 'loading';
                state.error.remove = null;
            })
            .addCase(removeTodo.fulfilled, (state, action) => {
                state.status.remove = 'succeeded';
                state.items = state.items.filter(todo => todo.id !== action.payload);
            })
            .addCase(removeTodo.rejected, (state, action) => {
                state.status.remove = 'failed';
                state.error.remove = action.error.message;
            })
    }
});

export default todosSlice.reducer;