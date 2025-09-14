import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react';
import MyURLs from './Routes/Routes';
import Styles from './Layout.module.css';
import Navigation from './Components/Navigation';

export function MyRoutes(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    {/* <Route path='/' element={<App />} />
                    <Route path="condition" element={<Condition />} />
                    <Route path="form" element={<MyForm />} />
                    <Route path="style" element={<NewStyles />} />
                    <Route path="effect" element={<Effect />} /> */}
                    {MyURLs.map((view, index) => (
                        <Route key={view.path} path={view.path} element={<view.view />} />
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default function Layout(props) {
    // Use state to track authentication status
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    
    // Listen for storage changes to update authentication state
    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
        };
        
        // Check auth on mount
        checkAuth();
        
        // Listen for storage changes (when token is added/removed)
        window.addEventListener('storage', checkAuth);
        
        // Also check periodically in case token changes in same tab
        const interval = setInterval(checkAuth, 1000);
        
        return () => {
            window.removeEventListener('storage', checkAuth);
            clearInterval(interval);
        };
    }, []);
    
    return (
        <>
            <Navigation isAuthenticated={isAuthenticated} />
            <div className={Styles.primaryContainer}>
                <Outlet />
            </div>
        </>
    )
}