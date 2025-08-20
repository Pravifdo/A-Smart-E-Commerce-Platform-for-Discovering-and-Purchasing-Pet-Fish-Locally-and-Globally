import React from 'react';
import Navbar from '../components/Navbar';
import homeImage from '../pages/Home-image.jpg';
import '../styles/Home.css';

const Home = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section with background image + overlay text */}
      <div className="hero-section" style={{ backgroundImage: `url(${homeImage})` }}>
        <div className="hero-overlay">
          <h3>Your AquaTrade World Starts Here</h3>
          <p>Discover and purchase pet fish locally and globally.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
