import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavbarHome.css";

const NavbarHome = () => {
  const user = JSON.parse(localStorage.getItem("user")); // ✅ Get user from localStorage
  const navigate = useNavigate();

  // ✅ Always go to ProfileForm if logged in, otherwise go Login
  const handleProfileClick = () => {
   navigate("/Profile")
  };

  return (
    <nav className="navbar">
      {/* 🌊 Left Section */}
      <div className="left-section">
        <div className="logo">
          <Link to="/">Aqua Trade</Link>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/items">Items</Link></li>
        </ul>
      </div>

      {/* 👉 Right Section */}
      <div className="nav-actions">
        {/* 🔎 Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="submit">Search</button>
        </div>

        {/* 🛒 Orders */}
        <Link to="/orders" className="cart-icon">Orders</Link>

        {/* 👤 Profile Image */}
        <div className="profile-link" onClick={handleProfileClick}>
          <img
            src={user?.profileImage || "/images/default-avatar.png"}
            alt="Profile"
            className="profile-img"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavbarHome;
