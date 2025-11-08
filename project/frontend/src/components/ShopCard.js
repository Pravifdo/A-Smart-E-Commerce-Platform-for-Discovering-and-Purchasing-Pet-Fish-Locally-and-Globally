import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ShopCard.css';

const ShopCard = ({ shop }) => {
  const navigate = useNavigate();

  const handleViewShop = () => {
    navigate(`/shop/${shop._id}`);
  };

  const handleContact = () => {
    window.location.href = `mailto:${shop.email}`;
  };

  return (
    <div className="shop-card">
      <div className="shop-image">
        <img 
          src={shop.imageUrl || 'https://via.placeholder.com/400x250/4A90E2/ffffff?text=Shop'} 
          alt={shop.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x250/4A90E2/ffffff?text=Shop';
          }}
        />
        {shop.isActive && <div className="active-badge">Active</div>}
      </div>

      <div className="shop-info">
        <h3 className="shop-name">{shop.name}</h3>
        <p className="shop-owner">Owner: {shop.owner}</p>
        
        <p className="shop-description">
          {shop.description || 'Quality aquatic supplies and fish'}
        </p>

        <div className="shop-details">
          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <span className="detail-text">
              {shop.address?.street || shop.address || 'Address not provided'}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-icon">📞</span>
            <span className="detail-text">{shop.phone}</span>
          </div>

          <div className="detail-item">
            <span className="detail-icon">📧</span>
            <span className="detail-text">{shop.email}</span>
          </div>
        </div>

        {shop.specialties && shop.specialties.length > 0 && (
          <div className="specialties">
            <h4>Specialties:</h4>
            <div className="specialty-tags">
              {shop.specialties.map((specialty, index) => (
                <span key={index} className="specialty-tag">
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="shop-rating">
          <div className="rating-stars">
            {'⭐'.repeat(Math.round(shop.rating || 0))}
            {'☆'.repeat(5 - Math.round(shop.rating || 0))}
          </div>
          <span className="rating-text">
            {shop.rating?.toFixed(1) || '0.0'} ({shop.reviews || 0} reviews)
          </span>
        </div>

        <div className="shop-actions">
          <button className="view-shop-btn" onClick={handleViewShop}>
            View Shop
          </button>
          <button className="contact-btn" onClick={handleContact}>
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;