import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/mainPage'); // Redirect to Main Page on success
      } else {
        setError(data.message || 'Login failed');
        navigate('/reject'); // Redirect to Reject page on failure
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      navigate('/reject');
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-container">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Log in to explore the aquatic world of AquaTrade</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-button">Login</button>
          <div className="footer-links">
            <p>
              Don’t have an account? <Link to="/register">Register</Link>
            </p>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;