import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
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
                        <Link to="/events" className="navbar-link">
                            События
                        </Link>
                        {/* Можете добавить ещё ссылки, если понадобится */}
                    </>
                ) : (
                    <>
                        <Link to="/login" className="navbar-link">
                            Вход
                        </Link>
                        <Link to="/register" className="navbar-link">
                            Регистрация
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
