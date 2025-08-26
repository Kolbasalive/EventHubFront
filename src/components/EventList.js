import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventList.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://89.111.169.64:8080';

function EventList() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('EventList МОНТИРОВАН');
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${API_URL}/event/all`, {
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
                    throw new Error('Ошибка при получении событий');
                }

                const data = await response.json();
                setEvents(data);
            } catch (err) {
                console.error('Ошибка:', err);
            }
        };

        fetchEvents();
        return () => console.log('EventList РАЗМОНТИРОВАН');
    }, [navigate]);

    // Функция для форматирования даты в «день.месяц.год часы:минуты»
    const formatDateTime = dateString => {
        if (!dateString) return '';
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleString('ru-RU', options);
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginTop: '20px', color: '#333' }}>Список событий</h2>
            <div className="events-container">
                {events.map(event => (
                    <div
                        key={event.eventId}
                        className="event-card"
                        onClick={() => {
                            console.log("Нажата карточка:", event.eventId);
                            navigate(`/event/${event.eventId}`);
                        }
                    }
                    >
                        <div className="event-title">{event.title}</div>
                        <div className="event-category">{event.category}</div>
                        <div className="event-description">
                            {event.description.length > 100
                                ? event.description.slice(0, 100) + '…'
                                : event.description}
                        </div>
                        <div className="event-details">
                            <strong>Дата:</strong> {formatDateTime(event.eventDate)}
                        </div>
                        <div className="event-details">
                            <strong>Локация:</strong> {event.location}
                        </div>
                        <div className="event-stats">
                            <span>⭐ {event.avgRating?.toFixed(1) ?? '—'}</span>
                            <span>Отзывы: {event.reviews ? event.reviews.length : 0}</span>
                        </div>
                        {/* Если нужно, можно добавить кнопку «Подробнее» */}
                        {/*
                        <button
                            className="event-button"
                            onClick={() => navigate(`/events/${event.eventId}`)}
                        >
                            Подробнее
                        </button>
                        */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventList;
