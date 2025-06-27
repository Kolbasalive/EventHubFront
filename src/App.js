// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, BrowserRouter } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import EventList from './components/EventList';
import EventDetail from "./components/EventDetail";

import './App.css';

function AppWrapper() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(null);

    React.useEffect(() => {
        const token = localStorage.getItem('access_token');
        setIsLoggedIn(!!token);
    }, []);

    if (isLoggedIn === null) return <div>Загрузка...</div>;

    return (
        <BrowserRouter>
            <App isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </BrowserRouter>
    );
}

function App({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isLoggedIn && location.pathname === '/login') {
            navigate('/events');
        } else if (!isLoggedIn && location.pathname !== '/login') {
            navigate('/login');
        }
    }, [isLoggedIn, location.pathname, navigate]);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <div className="App">
            <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to={isLoggedIn ? '/events' : '/login'} />}
                    />
                    <Route
                        path="/login"
                        element={<LoginForm onLogin={handleLogin} />}
                    />
                    <Route
                        path="/register"
                        element={<RegisterForm onLogin={handleLogin} />}
                    />
                    <Route
                        path="/events"
                        element={isLoggedIn ? (<EventList />) : (<Navigate to="/login" />)}
                    />
                    <Route
                        path="/event/:id"
                        element={isLoggedIn ? (<EventDetail />) : (<Navigate to="/login" />)}
                    />
                    <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '40px' }}>Страница не найдена</h2>} />
                </Routes>
            </main>
        </div>
    );
}

export default AppWrapper;
