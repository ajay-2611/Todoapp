import React from 'react';
import { Navigate } from 'react-router-dom';

// Component to redirect authenticated users away from homepage
export function HomeRoute({ children }) {
    const isAuthenticated = !!localStorage.getItem('token');
    
    // If user is authenticated, redirect to todos page
    if (isAuthenticated) {
        return <Navigate to="/todos" />;
    }
    
    // If not authenticated, show the homepage
    return children;
}

// Component to protect routes that require authentication
export function ProtectedRoute({ children }) {
    const isAuthenticated = !!localStorage.getItem('token');
    
    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    
    // If authenticated, show the protected content
    return children;
}
