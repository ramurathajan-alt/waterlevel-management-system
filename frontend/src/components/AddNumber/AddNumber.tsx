import React, { useState } from 'react';
import axios from 'axios';
import './AddNumber.css';

const AddNumber: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'send' | 'verify' | 'done'>('send');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (!phoneNumber) {
      setMessage('Please enter your phone number');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post('http://localhost:4000/api/sms/get', { phoneNumber });
      if (res.data.success) {
        setMessage('OTP sent successfully!');
        setStep('verify');
      } else {
        setMessage(res.data.message || 'Failed to send OTP');
      }
    } catch (error) {
      setMessage('Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      setMessage('Please enter the OTP');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post('http://localhost:4000/api/sms/verify', { phoneNumber, otp });
      if (res.data.success) {
        setMessage('Phone number verified successfully!');
        setStep('done');
      } else {
        setMessage(res.data.message || 'OTP verification failed');
      }
    } catch (error) {
      setMessage('Error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-number-wrapper">
      <div className="add-number-container">
        <h1 className='h1'>Get SMS Alert </h1>

        {step === 'send' && (
          <>
            <input
              type="tel"
              placeholder="+9477XXXXXXX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input-field"
              disabled={loading}
            />
            <button onClick={sendOtp} disabled={loading} className="btn">
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </>
        )}

        {step === 'verify' && (
          <>
            <p>OTP sent to: <b>{phoneNumber}</b></p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input-field"
              disabled={loading}
            />
            <button onClick={verifyOtp} disabled={loading} className="btn">
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </>
        )}

        {step === 'done' && (
          <p className="success-message">Phone number has been saved successfully.</p>
        )}

        {message && <p className="error-message">{message}</p>}
      </div>

      <div className="add-number-info">
        <h1>Why Verify Your Number?</h1>
        <br />
        <p>
          By verifying your phone number, you'll receive SMS notifications when the main water gate opens or closes.
          This is especially helpful for farmers and local residents to plan irrigation and water usage.
        </p>
        <br />
        <br />
        <h4>Steps:</h4>
        <ol>
          <li>Enter your mobile number (e.g., +9477XXXXXXX)</li>
          <li>Click <b>Send OTP</b> to get a code via SMS</li>
          <li>Enter the code and click <b>Verify OTP</b></li>
          <li>You’re done! You’ll now get gate open/close alerts via SMS</li>
        </ol>
      </div>
    </div>
  );
};

export default AddNumber;
