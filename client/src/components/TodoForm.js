import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../features/todos/todosThunks';

function TodoForm() {
    const [title, setTitle] = useState('');
    
    const addStatus = useSelector(state => state.todos.status.add);
    const loadStatus = useSelector(state => state.todos.status.load);
    const status = addStatus === 'loading' || loadStatus === 'loading';

    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        const trimmedTitle = title.trim();

        if (trimmedTitle === '') return;

        dispatch(addTodo(trimmedTitle));
        setTitle('');
    };

    return (
         <form className='add-form' onSubmit={handleSubmit}>
            <input 
                type='text'
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                placeholder='Add a new task...'
                className={`input add-input ${status ? 'disabled' : ''}`}
                required
            />
            <input 
                type='submit' 
                value='Add' 
                className={`button add-button ${status ? 'disabled' : ''}`}
            />
        </form>
    );
}

export default TodoForm;