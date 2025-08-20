import React from 'react';
import { Link } from 'react-router-dom'; // For navigation
import '../styles/Home.css'//ssuming you have a CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">AquaTrade</Link> {/* Logo as clickable link */}
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/community">Community</Link></li>
        <li><Link to="/learn">Learn</Link></li>
      </ul>
      <div className="nav-actions">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>Search</button> {/* Text placeholder instead of image */}
        </div>
        <Link to="/sign-in" className="sign-in">Sign In</Link>
        <Link to="/cart" className="cart-icon">
          Cart {/* Text placeholder instead of image */}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;