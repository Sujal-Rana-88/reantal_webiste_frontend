// src/components/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#f8f9fa', 
      color: '#343a40' 
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '20px', fontWeight: 'bold' }}>404</h1>
      <h2 style={{ marginBottom: '10px' }}>Oops! Page Not Found</h2>
      <p style={{ marginBottom: '30px', color: '#6c757d' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" style={{ 
        padding: '10px 20px', 
        backgroundColor: '#007bff', 
        color: '#fff', 
        borderRadius: '5px', 
        textDecoration: 'none', 
        fontSize: '1.1rem' 
      }}>
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
