import React from 'react';
import '../styles/FishCard.css';

const FishCard = ({ fish }) => {
  const handleAddToCart = () => {
    console.log('Adding to cart:', fish.name);
    // Add cart functionality here
    alert(`${fish.name} added to cart!`);
  };

  return (
    <div className="fish-card">
      <div className="fish-image">
        <img src={fish.imageUrl} alt={fish.name} onError={(e) => {
          e.target.src = '/images/fish-placeholder.jpg';
        }} />
        {!fish.isAvailable && <div className="out-of-stock">Out of Stock</div>}
      </div>
      
      <div className="fish-info">
        <h3 className="fish-name">{fish.name}</h3>
        <p className="fish-species">{fish.species}</p>
        
        <div className="fish-details">
          <span className="category-badge">{fish.category}</span>
          <span className="care-level">{fish.careLevel}</span>
        </div>
        
        <p className="fish-description">{fish.description}</p>
        
        <div className="fish-stats">
          <div className="stat">
            <span className="stat-label">Size:</span>
            <span className="stat-value">{fish.size}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Temperament:</span>
            <span className="stat-value">{fish.temperament}</span>
          </div>
        </div>

        <div className="water-params">
          <h4>Water Parameters:</h4>
          <div className="params-grid">
            <div className="param">
              <span>pH:</span> {fish.waterParameters?.pH || 'N/A'}
            </div>
            <div className="param">
              <span>Temp:</span> {fish.waterParameters?.temperature || 'N/A'}
            </div>
          </div>
        </div>
        
        <div className="fish-footer">
          <div className="price-section">
            <span className="price">${fish.price.toFixed(2)}</span>
            {fish.stock > 0 && <span className="stock">In Stock: {fish.stock}</span>}
          </div>
          
          <button 
            className="add-to-cart-btn" 
            onClick={handleAddToCart}
            disabled={!fish.isAvailable || fish.stock === 0}
          >
            {fish.isAvailable ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FishCard;