import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../pages/Auth.css';

function AuthForm({
  title,
  subtitle,
  buttonText,
  loadingText,
  linkText,
  linkHref,
  linkAnchorText,
  apiEndpoint,
  usernamePlaceholder,
  passwordPlaceholder,
  usernameId,
  passwordId,
  errorMessage
}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('All fields are required');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/notes');
      } else {
        const data = await response.json();
        setError(data.message || errorMessage);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">{title}</h2>
          <p className="auth-subtitle">{subtitle}</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor={usernameId} className="input-label">Username</label>
            <input
              id={usernameId}
              type="text"
              placeholder={usernamePlaceholder}
              value={username}
              onChange={e => {
                setUsername(e.target.value);
                setError('');
              }}
              className={`auth-input ${error ? 'error' : ''}`}
              disabled={isLoading}
            />
          </div>
          <div className="input-group">
            <label htmlFor={passwordId} className="input-label">Password</label>
            <input
              id={passwordId}
              type="password"
              placeholder={passwordPlaceholder}
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setError('');
              }}
              className={`auth-input ${error ? 'error' : ''}`}
              disabled={isLoading}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                {loadingText}
              </>
            ) : (
              buttonText
            )}
          </button>
        </form>
        <div className="auth-footer">
          <p>{linkText} <a href={linkHref} className="auth-link">{linkAnchorText}</a></p>
        </div>
      </div>
    </div>
  );
}
// Add PropTypes validation
AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  loadingText: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  linkHref: PropTypes.string.isRequired,
  linkAnchorText: PropTypes.string.isRequired,
  apiEndpoint: PropTypes.string.isRequired,
  usernamePlaceholder: PropTypes.string.isRequired,
  passwordPlaceholder: PropTypes.string.isRequired,
  usernameId: PropTypes.string.isRequired,
  passwordId: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired
};

export default AuthForm;