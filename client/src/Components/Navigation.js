import React from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from './Navigation.module.css';

const Navigation = ({ isAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    const handleMyTodos = () => {
        navigate('/');
    };

    return (
        <div className={Styles.topNavigation}>
            <div className={Styles.navLeft}>
                <span className={Styles.appTitle}>My TODO App</span>
            </div>
            <div className={Styles.navRight}>
                {isAuthenticated ? (
                    <>
                        <button className={Styles.navButton} onClick={handleLogout}>
                            LOGOUT
                        </button>
                    </>
                ) : (
                    <>
                        <span className={Styles.navLink} onClick={handleMyTodos}>
                            My Todos
                        </span>
                        <button className={Styles.navButton} onClick={handleLogin}>
                            LOGIN
                        </button>
                        <button className={Styles.navButton} onClick={handleRegister}>
                            REGISTER
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navigation;
