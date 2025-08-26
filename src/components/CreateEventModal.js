import React, { useState } from 'react';
import './CreateEventModal.css';

const CreateEventModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        eventDate: '',
        maxUserSize: '',
        category: '',
        organizationId: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Создаём событие:', formData); // тут будет POST-запрос
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Создать мероприятие</h2>
                <form onSubmit={handleSubmit}>
                    {Object.keys(formData).map((key) => (
                        <div key={key} className="form-group">
                            <label>{key}</label>
                            <input
                                type="text"
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
                    <div className="modal-buttons">
                        <button type="submit">Создать</button>
                        <button type="button" onClick={onClose}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEventModal;
