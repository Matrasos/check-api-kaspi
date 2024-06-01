import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/subscribe', {
        email,
        endpoint
      });

      if (response.status === 201) {
        setMessage('Успешная подписка!');
      } else {
        setMessage('Ошибка при подписке.');
      }
    } catch (error) {
      setMessage('Ошибка при подписке.');
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:3001/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    const interval = setInterval(fetchNotifications, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Подписка на штормовые предупреждения</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endpoint">Endpoint:</label>
          <input
            type="text"
            id="endpoint"
            name="endpoint"
            className="form-control"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="http://localhost:3001/receive_notification"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Подписаться</button>
      </form>
      {message && <div className="alert alert-info mt-4">{message}</div>}
      <h2 className="mt-5">Уведомления</h2>
      <ul className="list-group mt-3">
        {notifications.map((notification, index) => (
          <li key={index} className="list-group-item">
            {notification}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
