import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <span className="brand-icon">📝</span>
            NotesApp
          </Link>
        </div>
        
        <div className="navbar-links">
          <Link 
            to="/notes" 
            className={`nav-link ${location.pathname === '/notes' ? 'active' : ''}`}
          >
            <span className="nav-icon">📒</span>
            Notes
          </Link>
          <Link 
            to="/login" 
            className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
          >
            <span className="nav-icon">🔐</span>
            Login
          </Link>
          <Link 
            to="/register" 
            className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
          >
            <span className="nav-icon">👤</span>
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;