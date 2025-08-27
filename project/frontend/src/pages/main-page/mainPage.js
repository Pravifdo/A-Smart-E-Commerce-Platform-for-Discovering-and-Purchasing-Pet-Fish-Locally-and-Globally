import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import '../../styles/mainPage.css';

// Import videos
import fishVideo from './videos/fish-explore.mp4';
import shopVideo from './videos/shop-explore.mp4';
import learnVideo from './videos/learn.mp4';
import bmpVideo from './videos/bmp.mp4';

const Main = () => {
  return (
    <div className="main-page">
      <Navbar />
      <div className="content">
        <h2>Welcome to AquaTrade</h2>
        <div className="box-container">
          <Link to="/explore-fish" className="box">
            <video className="box-video" muted loop autoPlay>
              <source src={fishVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h3>Explore Fish</h3>
          </Link>

          <Link to="/explore-shops" className="box">
            <video className="box-video" muted loop autoPlay>
              <source src={shopVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h3>Explore Shops</h3>
          </Link>

          <Link to="/learn" className="box">
            <video className="box-video" muted loop autoPlay>
              <source src={learnVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h3>Learn</h3>
          </Link>

          <Link to="/best-management" className="box">
            <video className="box-video" muted loop autoPlay>
              <source src={bmpVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h3>Best Management</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
