import React from "react";
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return(
    <nav className="navbar">
      <div className="left-section">
        <div className="logo">
          <Link to ="/">Aqua Trade</Link>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/items">Items</Link></li>
        </ul>
      </div>
      <div className="nav-actions">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="submit">Search</button>
        </div>
        <Link to ="/sign-in" className="sign-in">Sign In</Link>
        <Link to ="/orders" className="cart-icon">Orders</Link>
      </div>
    </nav>
  );
};

export default Navbar;