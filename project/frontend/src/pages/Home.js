import React from 'react';
import Navbar from '../components/Navbar';
import homeImage from '../pages/Home-image.jpg';
import '../styles/Home.css';
import { Link } from 'react-router-dom'; // For navigation

const Home = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section with background image + overlay text */}
      <div className="hero-section" style={{ backgroundImage: `url(${homeImage})` }}>
        <div className="hero-overlay">
          <h3>Your AquaTrade World Starts Here</h3>
          <p>Discover and purchase pet fish locally and globally.</p>

          {/* Buttons */}
          <div className="hero-buttons">
            <Link to="/login" className="hero-btn login-btn">Login</Link>
            <Link to="/register" className="hero-btn register-btn">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
