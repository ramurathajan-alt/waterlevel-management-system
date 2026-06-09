import { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useNavigate, Link } from 'react-router-dom';

interface NavbarProps {
  setShowLogin: (show: boolean) => void;
  isAuthenticated: boolean;
  onAdminClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ setShowLogin, isAuthenticated, onAdminClick }) => {
  const navigate = useNavigate();

const logout = (): void => {
  // Optionally clear auth-related storage
  localStorage.clear();
  sessionStorage.clear();

  // Navigate to home (optional)
  navigate('/');

  // Then reload the page
  window.location.reload();
};


  const handleAdminClick = (): void => {
    if (isAuthenticated) {
      // If user is authenticated, allow access to Admin
      onAdminClick();
    } else {
      // If user is not authenticated, show the login popup
      setShowLogin(true);
    }
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="Logo" className='logo' /></Link>
      <h1 className="text-3xl font-bold text-gray-800">Water Management System</h1>
      {/* Show Sign In button only when user is not authenticated */}
      {/*!isAuthenticated && <button onClick={() => setShowLogin(true)}>Sign In</button>*/}

      <div className='navbar-profile'>
        <img src={assets.profile_icon} alt="Profile" />
        <ul className="navbar-profile-downdrop">
          {/* Admin link, shows the login popup if not authenticated */}
          <li onClick={handleAdminClick}>
            <img src={assets.profile_icon} alt="Admin" />
            <p>Admin</p>
          </li>
          <hr />
          {/* Logout button, clears authentication and navigates to home */}
          <li onClick={logout}>
            <img src={assets.logout_icon} alt="Logout" />
            <p>Logout</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
