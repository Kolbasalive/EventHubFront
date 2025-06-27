// src/components/EventDetail.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetail.css'; // (по желанию, стили для страницы деталей)

function EventDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('EventDetail МОНТИРОВАН');
        const fetchEventById = async () => {
            try {
                const response = await fetch(`http://localhost:8080/event/${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                    }
                });
                if (response.status === 401) {
                    localStorage.removeItem('access_token');
                    alert('Сессия истекла. Пожалуйста, войдите заново.');
                    navigate('/login');
                    return;
                }
                if (!response.ok) {
                    throw new Error('Не удалось загрузить данные события');
                }
                const data = await response.json();
                setEventData(data);
            } catch (err) {
                console.error(err);
                setError('Ошибка при загрузке данных');
            }
        };

        fetchEventById();
        return () => console.log('EventDetail РАЗМОНТИРОВАН');
    }, [id, navigate]);

    if (error) {
        return <div style={{ textAlign: 'center', marginTop: '20px', color: 'red' }}>{error}</div>;
    }

    if (!eventData) {
        return <div style={{ textAlign: 'center', marginTop: '20px' }}>Загрузка...</div>;
    }

    // Здесь вы можете красиво отрисовать все поля eventData,
    // но для примера просто выведем основные:
    return (
        <div className="event-detail-container">
            <h2 className="event-detail-title">{eventData.title}</h2>
            <p className="event-detail-category">{eventData.category}</p>
            <p className="event-detail-date">Дата: {new Date(eventData.eventDate).toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</p>
            <p className="event-detail-location">Место: {eventData.location}</p>
            <p className="event-detail-description">{eventData.description}</p>
            <p className="event-detail-rating">Средняя оценка: {eventData.avgRating?.toFixed(1) ?? '—'}</p>
            <p className="event-detail-organization">Организация: {eventData.organizationId}</p>
            {/* Отзывы, размер, любая другая информация по вкусу */}
        </div>
    );
}

export default EventDetail;
