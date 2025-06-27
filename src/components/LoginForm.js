import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './FormStyles.css';

const LoginForm = ({ onLogin }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ login: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('access_token', data.response);
                console.log('Токен установлен, перенаправляюсь на /events');
                onLogin(); // теперь не ругается
                navigate('/events');
            } else {
                console.log('Ошибка входа, статус:', response.status);
                const data = await response.json();
                setError(data.message || 'Ошибка входа');
            }
        } catch (err) {
            setError('Сервер недоступен');
        }
    };

    return (
        <div className="form-container">
            <h2>Вход в систему</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="login"
                    placeholder="Имя пользователя"
                    value={form.login}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Войти</button>
                {error && <div className="login-error">{error}</div>}
            </form>
            {error && <div className="form-error">{error}</div>}
            <p>Нет аккаунта? <Link to="/register">Зарегистрируйтесь здесь</Link></p>
        </div>
    );
};

export default LoginForm;