import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import CreateEventModal from './CreateEventModal'; // 👈 модалка отдельно

const Navbar = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false); // 👈 управление модалкой

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <>
            <header className="navbar">
                <div className="navbar-left">
                    {isLoggedIn && (
                        <button className="navbar-logout" onClick={handleLogout}>
                            Выйти
                        </button>
                    )}
                    <span className="navbar-title">Управление событиями</span>
                </div>
                <nav className="navbar-right">
                    {isLoggedIn ? (
                        <>
                            <Link to="/events" className="navbar-link">События</Link>
                            <button
                                className="navbar-link navbar-button"
                                onClick={() => setShowModal(true)}
                            >
                                Создать мероприятие
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="navbar-link">Вход</Link>
                            <Link to="/register" className="navbar-link">Регистрация</Link>
                        </>
                    )}
                </nav>
            </header>

            {showModal && <CreateEventModal onClose={() => setShowModal(false)} />}
        </>
    );
};

export default Navbar;
