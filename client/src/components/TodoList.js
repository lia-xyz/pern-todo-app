import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

function TodoList() {
    const todos = useSelector(state => state.todos.items);
    const filter = useSelector(state => state.filter);
    const status = useSelector(state => state.todos.status.load);
    const error = useSelector(state => state.todos.error.load);

    const filteredTodos = useMemo(() => {
        return todos.filter(todo => {
            if (filter === 'completed') return todo.isCompleted;
            if (filter === 'uncompleted') return !todo.isCompleted;
            return true;
        });
    }, [todos, filter]);

    if (status === 'loading') return <div className='message loading-message'>Loading...</div>;
    if (status === 'failed') return <div className='message error-message'>{error}</div>;

    if (filteredTodos.length === 0) {
        let message = '';

        switch (filter) {
            case 'completed':
                message = "You haven't completed any tasks yet.";
                break;
            case 'uncompleted':
                message = 'All tasks are completed - great job!';
                break;
            default:
                message = 'No tasks found. Add one to get started!';
        }
        return <p className='message no-todos-message'>{message}</p>;
    }

    return (
        <ul className='todo-list'>
            {filteredTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
}

export default TodoList;