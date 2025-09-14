import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

export function Homepage() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    const handleViewTasks = () => {
        navigate('/login');
    };

    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero">
                <h1>Organize Your Life</h1>
                <p>Stay productive and never miss a task with our intuitive and powerful TODO app. Organize, prioritize, and accomplish your goals with ease.</p>
                <div className="cta-buttons">
                    <button onClick={handleGetStarted} className="btn btn-primary">Get Started</button>
                    <button onClick={handleViewTasks} className="btn btn-secondary">View My Tasks</button>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <h2>Why Choose Our TODO App?</h2>
                <div className="features-grid">
                    <div className="feature">
                        <div className="feature-icon">✓</div>
                        <h3>Simple & Intuitive</h3>
                        <p>Clean, user-friendly interface that makes managing tasks effortless and enjoyable.</p>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">✓</div>
                        <h3>Lightning Fast</h3>
                        <p>Add, edit, and organize tasks in seconds. Built for speed and efficiency.</p>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">✓</div>
                        <h3>Always Accessible</h3>
                        <p>Access your tasks from anywhere, on any device. Your productivity travels with you.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2025 My TODO App. All rights reserved.</p>
            </footer>
        </div>
    );
}
