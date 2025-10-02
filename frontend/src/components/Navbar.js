import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#eee', marginBottom: '2rem' }}>
      <Link to="/notes" style={{ marginRight: '1rem' }}>Notes</Link>
      <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}

export default Navbar;