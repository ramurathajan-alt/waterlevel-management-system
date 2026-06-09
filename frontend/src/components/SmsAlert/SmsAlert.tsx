import React, { useState } from 'react';
import axios from 'axios';
import './SmsAlert.css';

const SmsAlert: React.FC = () => {
  const [language, setLanguage] = useState('english');
  const [alertType, setAlertType] = useState('open');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendAlert = async () => {
    if (!time) {
      setError('Please select a gate time');
      return;
    }

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await axios.post(
        `http://localhost:4000/api/alerts/sms/${language}/${alertType}`,
        { time }
      );

      if (response.data.success) {
        setMessage(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send SMS alert');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sms-alert-container">
      <h2>Send Gate Status SMS Alert</h2>

      <div className="form-group">
        <label>Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="english">English</option>
          <option value="tamil">Tamil</option>
        </select>
      </div>

      <div className="form-group">
        <label>Alert Type:</label>
        <select value={alertType} onChange={(e) => setAlertType(e.target.value)}>
          <option value="open">Gate Opened</option>
          <option value="close">Gate Closed</option>
        </select>
      </div>

      <div className="form-group">
        <label>{alertType === 'open' ? 'Open Time' : 'Close Time'}:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <button className="send-btn" onClick={sendAlert} disabled={loading}>
        {loading ? 'Sending...' : 'Send Alert'}
      </button>

      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default SmsAlert;
