import React from 'react';

const LoginShop = ({ email, setEmail, password, setPassword, handleLogin, error, message, onSwitchToRegister }) => {
  return (
    <div className="auth-form-container">
      <h2>Business Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="Enter your business email" 
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
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <button type="submit" className="submit-btn">Login</button>
        <p className="toggle-auth">
          Don't have an account?{' '}
          <button type="button" onClick={onSwitchToRegister} className="link-btn">
            Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginShop;
