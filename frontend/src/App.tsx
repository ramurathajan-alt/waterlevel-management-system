import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import PublicPortal from './PublicPortal';  // Adjust the path if needed
import AdminDashboard from './AdminDashboard';
import Footer from './components/Footer/Footer';


import './App.css';
import Navbar from './components/Navbar/Navbar';
import LoginPopup from './components/LoginPopup/LoginPopup';


// Card components
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="card">{children}</div>
);
const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="card-header">{children}</div>
);
const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="card-title">{children}</h3>
);
const CardDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="card-description">{children}</p>
);
const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="card-content">{children}</div>
);
const CardFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="card-footer">{children}</div>
);

// Button component
const Button = ({
  children,
  variant = 'default',
  onClick
}: {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'ghost';
  onClick?: () => void;
}) => (
  <button
    className={`button ${variant === 'destructive' ? 'destructive' : variant === 'ghost' ? 'ghost' : 'default'}`}
    onClick={onClick}
  >
    {children}
  </button>
);

// Type definitions and mock data remain unchanged

// PublicPortal component and AdminDashboard component remain unchanged

// App component remains mostly the same, except you need to ensure the routes and page logic are intact.
export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [redirectToAdmin, setRedirectToAdmin] = useState(false);

  return (
    <Router>
      {showLogin && (
        <LoginPopup
          setShowLogin={setShowLogin}
          onLoginSuccess={() => {
            setIsAuthenticated(true);
            setShowLogin(false);
            setRedirectToAdmin(true);
          }}
        />
      )}

      <div className="app">
        <Navbar
          setShowLogin={setShowLogin}
          isAuthenticated={isAuthenticated}
          onAdminClick={() => {
            if (isAuthenticated) {
              setRedirectToAdmin(true);
            } else {
              setShowLogin(true);
            }
          }}
        />

        <Routes>
          <Route path="/" element={<PublicPortal />} />
          
          <Route
            path="/admin"
            element={
              isAuthenticated ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>

        {redirectToAdmin && isAuthenticated && <Navigate to="/admin" replace />}
      </div>
      <Footer />
    </Router>
  );
}
