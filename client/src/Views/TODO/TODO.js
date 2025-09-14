import { useEffect, useState } from 'react';
import Styles from './TODO.module.css';
import { dummy } from './dummy';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8000';

export function TODO(props) {
    const [newTodo, setNewTodo] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [todoData, setTodoData] = useState(dummy);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');

    useEffect(() => {
        const fetchTodo = async() => {
            const apiData = await getTodo();
            setTodoData(apiData);
            setLoading(false);
        };
        fetchTodo();
    }, []);

    const getTodo = async() => {
        const token = localStorage.getItem('token');
        const options = {
            method: 'GET',
            url: `${API_BASE_URL}/api/todo`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
        };
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (err) {
            console.error('Error fetching todos:', err);
            if (err.response?.status === 401) {
                // Redirect to login if unauthorized
                window.location.href = '/login';
            }
            return []; // return an empty array in case of error
        }
    };

    const addTodo = async() => {
        const token = localStorage.getItem('token');
        
        // Check if user is logged in before proceeding
        if (!token) {
            alert('Please login first to add todos');
            window.location.href = '/login';
            return;
        }

        if (!newTodo.trim()) {
            alert('Please enter a todo title');
            return;
        }

        const options = {
            method: 'POST',
            url: `${API_BASE_URL}/api/todo`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: {
                title: newTodo,
                description: newDescription,
                done: false
            },
        };
        try {
            const response = await axios.request(options);
            setTodoData((prevData) => [...prevData, response.data.newTodo || response.data]);
            setNewTodo('');
            setNewDescription('');
        } catch (err) {
            console.error('Error adding todo:', err);
            if (err.response?.status === 401) {
                alert('Session expired. Please login again');
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else {
                alert('Error adding todo: ' + (err.response?.data?.message || err.message));
            }
        }
    };

    const deleteTodo = async(id) => {
        const token = localStorage.getItem('token');
        
        // Check if user is logged in before proceeding
        if (!token) {
            alert('Please login first to delete todos');
            window.location.href = '/login';
            return;
        }

        const options = {
            method: 'DELETE',
            url: `${API_BASE_URL}/api/todo/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.request(options);
            setTodoData((prevData) => prevData.filter((todo) => todo._id !== id));
        } catch (err) {
            console.error('Error deleting todo:', err);
            if (err.response?.status === 401) {
                alert('Session expired. Please login again');
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else {
                alert('Error deleting todo: ' + (err.response?.data?.message || err.message));
            }
        }
    };

    const updateTodo = async(id) => {
        const token = localStorage.getItem('token');
        
        // Check if user is logged in before proceeding
        if (!token) {
            alert('Please login first to update todos');
            window.location.href = '/login';
            return;
        }

        const todoToUpdate = todoData.find((todo) => todo._id === id);
        const options = {
            method: 'PUT',
            url: `${API_BASE_URL}/api/todo/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: {
                title: updatedTitle || todoToUpdate.title,
                description: updatedDescription || todoToUpdate.description,
                done: !todoToUpdate.done, // Toggle done status
            },
        };
        try {
            const response = await axios.request(options);
            setTodoData((prevData) => prevData.map((todo) => (todo._id === id ? response.data : todo)));
            setEditing(null);
            setUpdatedTitle('');
            setUpdatedDescription('');
        } catch (err) {
            console.error('Error updating todo:', err);
            if (err.response?.status === 401) {
                alert('Session expired. Please login again');
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else {
                alert('Error updating todo: ' + (err.response?.data?.message || err.message));
            }
        }
    };

    const startEditing = (id, currentTitle, currentDescription) => {
        setEditing(id);
        setUpdatedTitle(currentTitle);
        setUpdatedDescription(currentDescription);
    };

    return (
        <div className={Styles.ancestorContainer}>
            <div className={Styles.headerContainer}>
                <h1>Tasks</h1>
                <span>
                    <input 
                        className={Styles.todoInput}
                        type='text'
                        name='New Todo'
                        placeholder='Title'
                        value={newTodo}
                        onChange={(event) => setNewTodo(event.target.value)}
                    />
                    <input 
                        className={Styles.todoInput}
                        type='text'
                        name='New Description'
                        placeholder='Description'
                        value={newDescription}
                        onChange={(event) => setNewDescription(event.target.value)}
                    />
                    <button 
                        id='addButton'
                        name='add'
                        className={Styles.addButton}
                        onClick={addTodo}
                    >
                        +New Todo
                    </button>
                </span>
            </div>
            <div id='todoContainer' className={Styles.todoContainer}>
                {loading ? (
                    <p style={{ color: 'white' }}>Loading...</p>
                ) : todoData.length > 0 ? (
                    todoData.map((entry) => (
                        <div key={entry._id} className={Styles.todo}>
                            <input 
                                type='checkbox'
                                checked={entry.done}
                                onChange={() => updateTodo(entry._id)}
                                className={Styles.checkbox}
                            />
                            <div className={Styles.todoContent}>
                                <div className={Styles.todoTitle}>
                                    {editing === entry._id ? (
                                        <input 
                                            type='text'
                                            value={updatedTitle}
                                            onChange={(event) => setUpdatedTitle(event.target.value)}
                                            className={Styles.editTitleInput}
                                        />
                                    ) : (
                                        <span className={entry.done ? Styles.completed : ''}>
                                            {entry.title}
                                        </span>
                                    )}
                                </div>
                                <div className={Styles.todoDescription}>
                                    {editing === entry._id ? (
                                        <textarea 
                                            value={updatedDescription}
                                            onChange={(event) => setUpdatedDescription(event.target.value)}
                                            className={Styles.editDescriptionTextarea}
                                            rows="2"
                                            placeholder="Enter description..."
                                        />
                                    ) : (
                                        <span className={`${Styles.descriptionText} ${entry.done ? Styles.completed : ''}`}>
                                            {entry.description || ''}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className={Styles.todoActions}>
                                {editing === entry._id ? (
                                    <>
                                        <button 
                                            onClick={() => updateTodo(entry._id)}
                                            className={`${Styles.actionButton} ${Styles.saveButton}`}
                                        >
                                            Save
                                        </button>
                                        <button 
                                            onClick={() => setEditing(null)}
                                            className={`${Styles.actionButton} ${Styles.cancelButton}`}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button 
                                            onClick={() => startEditing(entry._id, entry.title, entry.description)}
                                            className={`${Styles.actionButton} ${Styles.editButton}`}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => deleteTodo(entry._id)}
                                            className={`${Styles.actionButton} ${Styles.deleteButton}`}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={Styles.noTodoMessage}>No tasks available. Please add a new task.</p>
                )}
            </div>
        </div>
    );
}