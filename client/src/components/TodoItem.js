import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTodo, toggleTodoStatus, removeTodo } from '../features/todos/todosThunks';

function TodoItem({ todo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);

    const editStatus = useSelector(state => state.todos.status.edit);
    const deleteStatus = useSelector(state => state.todos.status.remove);
    const toggleStatus = useSelector(state => state.todos.status.toggle);
    const status = editStatus === 'loading' || deleteStatus === 'loading' || toggleStatus === 'loading';

    const dispatch = useDispatch();

    const handleSave = () => {
        if (!newTitle.trim() || newTitle.trim() === todo.title) {
            setNewTitle(todo.title);
            setIsEditing(false);
            return;
        }
        dispatch(editTodo({ id: todo.id, title: newTitle }));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setNewTitle(todo.title);
        setIsEditing(false);
    }

    return (
        <li className='todo-item'>
            <input 
                type='checkbox' 
                checked={todo.isCompleted} 
                onChange={() => dispatch(toggleTodoStatus({ id: todo.id, isCompleted: !todo.isCompleted }))} 
                className={`checkbox ${status ? 'disabled' : ''}`}
            />
            {isEditing ? (
                <>
                    <input 
                        type='text'
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        onKeyDown={e => { 
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSave();
                            } else if (e.key === 'Escape') {
                                handleCancel();
                            }
                        }}
                        className={`input edit-input ${status ? 'disabled' : ''}`}
                        autoFocus
                    />
                    <button 
                        onClick={handleSave} 
                        className={`button save-button ${status ? 'disabled' : ''}`}
                    >
                        Save
                    </button>
                    <button 
                        onClick={handleCancel} 
                        className={`button cancel-button ${status ? 'disabled' : ''}`}
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <span className={`todo-title ${todo.isCompleted ? 'completed' : ''}`}>
                        {todo.title}
                    </span>
                    <button 
                        onClick={() => setIsEditing(true)} 
                        className={`button edit-button ${status ? 'disabled' : ''}`}
                    >
                        Edit
                    </button>
                    <button 
                        onClick={() => dispatch(removeTodo(todo.id))} 
                        className={`button delete-button ${status ? 'disabled' : ''}`}
                    >
                        Delete
                    </button>
                </>
            )}
        </li>
    );
}

export default TodoItem;