import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Styles from './Auth.module.css';

const API_BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8000';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            console.log('Attempting login with:', { email, password: '***' });
            const response = await axios.post(`${process.env.REACT_APP_API_URL || API_BASE_URL}/auth/login`, {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Login successful:', response.data);
            
            // Store token in localStorage
            localStorage.setItem('token', response.data.token);
            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            // Navigate to todos page
            navigate('/todos');
        } catch (error) {
            setError((error.response && error.response.data && error.response.data.message) || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={Styles.authContainer}>
            <div className={Styles.authCard}>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className={Styles.inputGroup}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={Styles.inputGroup}>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className={Styles.error}>{error}</div>}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <p className={Styles.registerLink}>
                        Don't have an account?{' '}
                        <span onClick={() => navigate('/register')}>Register here</span>
                    </p>
                </form>
            </div>
        </div>
    );
}