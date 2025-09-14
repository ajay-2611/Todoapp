import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Styles from './Auth.module.css';

const API_BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8000';

export function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async(e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            console.log('Attempting registration with:', { username, email, password: '***' });
            console.log('API URL:', `${API_BASE_URL}/register`);

            const response = await axios.post(`${API_BASE_URL}/api/register`, {
                username,
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Registration successful:', response.data);

            // Store token in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Navigate to todos page
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error);
            console.error('Error response:', error.response && error.response.data);
            console.error('Error status:', error.response && error.response.status);

            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else if (error.message) {
                setError(error.message);
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return ( <
        div className = { Styles.authContainer } >
        <
        div className = { Styles.authCard } >
        <
        h2 > Register < /h2> <
        form onSubmit = { handleRegister } >
        <
        div className = { Styles.inputGroup } >
        <
        input type = "text"
        placeholder = "Username"
        value = { username }
        onChange = {
            (e) => setUsername(e.target.value) }
        required /
        >
        <
        /div> <
        div className = { Styles.inputGroup } >
        <
        input type = "email"
        placeholder = "Email"
        value = { email }
        onChange = {
            (e) => setEmail(e.target.value) }
        required /
        >
        <
        /div> <
        div className = { Styles.inputGroup } >
        <
        input type = "password"
        placeholder = "Password"
        value = { password }
        onChange = {
            (e) => setPassword(e.target.value) }
        required /
        >
        <
        /div> <
        div className = { Styles.inputGroup } >
        <
        input type = "password"
        placeholder = "Confirm Password"
        value = { confirmPassword }
        onChange = {
            (e) => setConfirmPassword(e.target.value) }
        required /
        >
        <
        /div> {
            error && < div className = { Styles.error } > { error } < /div>} <
                button type = "submit"
            disabled = { loading } > { loading ? 'Registering...' : 'Register' } <
                /button> <
                /form> <
                p >
                Already have an account ?
                <
                span
            className = { Styles.link }
            onClick = {
                    () => navigate('/login') } >
                Login here <
                /span> <
                /p> <
                /div> <
                /div>
        );
    }