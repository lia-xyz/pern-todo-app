import React from 'react';
import { useSelector } from 'react-redux';

function TodoStats() {
    const todos = useSelector(state => state.todos.items);

    const total = todos.length;
    const completed = todos.filter(todo => todo.isCompleted).length;
    const uncompleted = todos.length - completed;

    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className='todo-stats'>
            <div className='progress'>
                <div className='progress-bar' style={{ width: `${percentage}%` }}></div>
            </div>
            <div className='counter'>
                Completed: {completed} | Remaining: {uncompleted}
            </div>
        </div>
    );
}

export default TodoStats;