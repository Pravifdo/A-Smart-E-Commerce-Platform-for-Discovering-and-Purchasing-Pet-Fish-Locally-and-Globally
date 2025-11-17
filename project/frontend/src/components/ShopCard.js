import React from 'react';
import '../styles/ShopCard.css';

const ShopCard = ({ shop }) => {
  const handleVisitShop = () => {
    console.log('Visiting shop:', shop.name);
    // Add navigation functionality here
    alert(`Visiting ${shop.name}!`);
  };

  return (
    <div className="shop-card">
      <div className="shop-image">
        <img 
          src={shop.imageUrl} 
          alt={shop.name} 
          onError={(e) => {
            e.target.style.display = 'none';
          }} 
        />
      </div>
      
      <div className="shop-info">
        <h3 className="shop-name">{shop.name}</h3>
        <p className="shop-owner">Owner: {shop.owner}</p>
        <p className="shop-description">{shop.description}</p>

        <div className="shop-details">
          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <span className="detail-text">
              {typeof shop.address === 'object' 
                ? `${shop.address.street || ''}, ${shop.address.city || ''}, ${shop.address.state || ''} ${shop.address.zipCode || ''}`.trim() || 'Address not provided'
                : shop.address || 'Address not provided'}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-icon">📞</span>
            <span className="detail-text">{shop.phone || 'N/A'}</span>
          </div>

          <div className="detail-item">
            <span className="detail-icon">📧</span>
            <span className="detail-text">{shop.email}</span>
          </div>
        </div>
        
        {shop.rating !== undefined && (
          <div className="shop-rating">
            <div className="rating-stars">
              {'⭐'.repeat(Math.round(shop.rating || 0))}
              {'☆'.repeat(5 - Math.round(shop.rating || 0))}
            </div>
            <span className="rating-text">
              {shop.rating?.toFixed(1) || '0.0'} ({shop.reviews || 0} reviews)
            </span>
          </div>
        )}
        
        <div className="shop-footer">
          <button 
            className="visit-shop-btn" 
            onClick={handleVisitShop}
          >
            Visit Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
