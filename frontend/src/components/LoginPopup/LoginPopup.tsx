import { useState, ChangeEvent, FormEvent } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type LoginPopupProps = {
  setShowLogin: (show: boolean) => void;
  onLoginSuccess: () => void;
};


const LoginPopup: React.FC<LoginPopupProps> = ({ setShowLogin, onLoginSuccess }) => {
  const [currState, setCurrState] = useState<'Login' | 'Sign Up'>('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const url = "http://localhost:4000";

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event: FormEvent) => {
    event.preventDefault();
    const newUrl = url + (currState === 'Login' ? '/api/user/login' : '/api/user/register');

    try {
      const response = await axios.post(newUrl, data);
      if ((response.data as { success: boolean; message?: string }).success) {
        if ((response.data as { success: boolean; message?: string }).success) {
          onLoginSuccess(); // ✅ this triggers redirect
        }        
        navigate('/admin'); // Redirect to admin after login
      } else {
        alert((response.data as { message: string }).message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };

return (
  <div className='login-popup'>
    <form onSubmit={onLogin} className="login-popup-container">
      <div className="login-popup-title">
        <h2>{currState}</h2>
        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="close icon"
        />
      </div>
      <div className="login-popup-inputs">
        {currState === 'Sign Up' && (
          <input
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Your Name"
            required
          />
        )}
        <input
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Your Email"
          required
        />
        <input
          name="password"
          onChange={onChangeHandler}
          value={data.password}
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <button type="submit">
        {currState === 'Sign Up' ? 'Create Account' : 'Login'}
      </button>
      <div className="login-popup-condition">
        <input type="checkbox" required />
        <p>By continuing, I agree to terms of use & privacy policy</p>
      </div>

      {/* Only show switch to Sign Up if current state is Sign Up.
          Do NOT show sign up option in Login mode. */}
      {currState === 'Sign Up' && (
        <p className="col">
          Already have an account?{' '}
          <span onClick={() => setCurrState('Login')}>login here</span>
        </p>
      )}
    </form>
  </div>
);

};

export default LoginPopup;
