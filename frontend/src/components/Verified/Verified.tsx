// src/components/Verified.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Verified.css';

interface VerifiedNumber {
  _id: string;
  phoneNumber: string;
}

const Verified: React.FC = () => {
  const [numbers, setNumbers] = useState<VerifiedNumber[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchVerifiedNumbers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:4000/api/sms/verified');
      setNumbers(res.data.numbers || []);
    } catch (error) {
      console.error('Error fetching verified numbers:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNumber = async (phoneNumber: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${phoneNumber}?`);
    if (!confirmed) return;

    try {
      setDeleting(phoneNumber);
      await axios.delete(`http://localhost:4000/api/sms/verified/${phoneNumber}`);
      setNumbers(numbers.filter((n) => n.phoneNumber !== phoneNumber));
    } catch (error) {
      console.error('Error deleting number:', error);
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    fetchVerifiedNumbers();
  }, []);

  return (
    <div className="verified-container">
      <h2 className="verified-title">Verified Phone Numbers</h2>

      {loading ? (
        <p>Loading...</p>
      ) : numbers.length === 0 ? (
        <p>No verified numbers found.</p>
      ) : (
        <ul className="verified-list">
          {numbers.map(({ phoneNumber, _id }) => (
            <li key={_id} className="verified-item">
              <span>{phoneNumber}</span>
              <button
                className="delete-button"
                onClick={() => deleteNumber(phoneNumber)}
                disabled={deleting === phoneNumber}
              >
                {deleting === phoneNumber ? 'Deleting...' : 'Delete'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Verified;
