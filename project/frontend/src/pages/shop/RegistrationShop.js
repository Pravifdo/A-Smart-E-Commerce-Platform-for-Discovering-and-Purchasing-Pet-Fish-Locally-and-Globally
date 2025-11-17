import React, { useState } from 'react';

const RegistrationShopForm = ({ onSwitchToLogin, onShopRegistered }) => {
  // Form state
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [shopImage, setShopImage] = useState(null);
  const [shopImagePreview, setShopImagePreview] = useState(null);

  // Feedback messages
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Handle image selection
  const handleShopImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setShopImage(file);
      setShopImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit registration form
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Convert image to base64 if exists
    let imageUrl = '';
    if (shopImage) {
      const reader = new FileReader();
      imageUrl = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(shopImage);
      });
    }

    try {
      const res = await fetch('http://localhost:3000/api/shops/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: businessName,
          email,
          phone,
          address,
          password,
          imageUrl,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'Registration successful!');
        setError('');

        // Pass shop data to parent to render in ShopCard
        if (onShopRegistered && data.shop) {
          onShopRegistered(data.shop); // data.shop should be the full shop object
        }

        // Reset form
        setBusinessName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setPassword('');
        setShopImage(null);
        setShopImagePreview(null);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      setError('Server error, please try again later');
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Business Registration</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <input
          type="text"
          placeholder="Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="form-group full-width">
          <label>Shop Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleShopImageChange}
            className="file-input"
          />
          {shopImagePreview && (
            <div className="image-preview">
              <img src={shopImagePreview} alt="Shop Preview" />
              <button
                type="button"
                onClick={() => {
                  setShopImage(null);
                  setShopImagePreview(null);
                }}
                className="remove-image-btn"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <button type="submit" className="submit-btn">
          Register
        </button>

        <p className="toggle-auth">
          Already have an account?{' '}
          <button type="button" onClick={onSwitchToLogin} className="link-btn">
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegistrationShopForm;
