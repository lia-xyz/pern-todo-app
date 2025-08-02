import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../features/filter/filterSlice';

function TodoFilters() {
    const currentFilter = useSelector(state => state.filter);
    const status = useSelector(state => state.todos.status.load);
        
    const dispatch = useDispatch();

    const filters = ['all', 'completed', 'uncompleted'];
    const filterLabels = {
        all: 'All',
        completed: 'Completed',
        uncompleted: 'Not completed'
    }
    
    return (
        <div className='todo-filters'>
            {filters.map(filter => (
                <button 
                    key={filter} 
                    className={`button filter-button ${filter === currentFilter ? 'active' : ''} ${status === 'loading' ? 'disabled' : ''}`}
                    onClick={() => dispatch(setFilter(filter))}  
                >
                    {filterLabels[filter]}
                </button>
            ))}
        </div>
    );
}

export default TodoFilters;