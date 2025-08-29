import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './FormStyles.css';

const API_URL = '/api';

const RegisterForm = ({ onLogin }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        login: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (form.password !== form.confirmPassword) {
            setError('Пароли не совпадают!');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    login: form.login,
                    password: form.password,
                    name: form.name,
                    email: form.email
                })
            });

            if (response.ok) {
                const data = await response.json();

                if (data.response) {
                    localStorage.setItem('access_token', data.response);
                    onLogin(); // Поднятие состояния
                    navigate('/events');
                } else {
                    setSuccess('Регистрация успешна! Теперь войдите.');
                }

                setForm({
                    login: '',
                    password: '',
                    confirmPassword: '',
                    name: '',
                    email: ''
                });
            } else {
                const data = await response.json();
                setError(data.message || 'Ошибка регистрации');
            }
        } catch (err) {
            setError('Ошибка соединения с сервером');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Регистрация</h2>
                <input
                    type="text"
                    name="login"
                    placeholder="Логин"
                    value={form.login}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Имя"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Электронная почта"
                    value={form.email}
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
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Подтверждение пароля"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Зарегистрироваться</button>
                {error && <div className="register-error">{error}</div>}
                {success && <div style={{color: 'green', textAlign: 'center'}}>{success}</div>}
                <p>Уже есть аккаунт? <Link to="/login">Войдите здесь</Link></p>
            </form>
            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">{success}</div>}
        </div>
    );
};

export default RegisterForm;
