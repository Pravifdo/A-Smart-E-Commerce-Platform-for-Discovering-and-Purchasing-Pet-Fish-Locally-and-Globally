import React, { useState, useEffect } from 'react';
import '../../styles/shopHome.css';

const ShopHome = ({ businessData, onAddFishClick, onLogout }) => {
  const [myFish, setMyFish] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch fish added by this shop
    const fetchMyFish = async () => {
      if (!businessData?._id) return;
      
      try {
        const response = await fetch('http://localhost:3000/api/fish');
        if (response.ok) {
          const allFish = await response.json();
          // Filter fish that belong to this shop
          const shopFish = allFish.filter(fish => fish.shopId === businessData._id);
          setMyFish(shopFish);
        }
      } catch (error) {
        console.error('Error fetching fish:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyFish();
  }, [businessData]);

  const handleDeleteFish = async (fishId) => {
    if (!window.confirm('Are you sure you want to delete this fish?')) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/fish/${fishId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setMyFish(myFish.filter(fish => fish._id !== fishId));
        alert('Fish deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting fish:', error);
      alert('Failed to delete fish');
    }
  };

  return (
    <div className="shop-home">
      <div className="welcome-header">
        <h1>Welcome to Your Shop!</h1>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="shop-dashboard">
        <div className="shop-info">
          <h2>Your Shop Details</h2>
          
          <div className="shop-image-display">
            {businessData?.imageUrl && businessData.imageUrl !== '/images/shop-default.jpg' ? (
              <img src={businessData.imageUrl} alt="Shop" />
            ) : (
              <div className="no-image-placeholder">
                <p>No shop image uploaded</p>
              </div>
            )}
          </div>
          
          <div className="shop-details">
            <p><strong>Shop Name:</strong> {businessData?.name}</p>
            <p><strong>Email:</strong> {businessData?.email}</p>
            <p><strong>Phone:</strong> {businessData?.phone}</p>
            <p>
              <strong>Address:</strong>{' '}
              {typeof businessData?.address === 'object' 
                ? `${businessData?.address?.street || ''}, ${businessData?.address?.city || ''}, ${businessData?.address?.state || ''} ${businessData?.address?.zipCode || ''}, ${businessData?.address?.country || ''}`.replace(/,\s*,/g, ',').trim()
                : businessData?.address || 'N/A'
              }
            </p>
          </div>
        </div>

        <button 
          onClick={onAddFishClick} 
          className="add-fish-btn"
        >
          + Add New Fish to Inventory
        </button>

        {/* My Fish Inventory Section */}
        <div className="my-fish-section">
          <h2>My Fish Inventory</h2>
          
          {loading ? (
            <p className="loading-text">Loading your fish...</p>
          ) : myFish.length === 0 ? (
            <div className="no-fish">
              <p>You haven't added any fish yet.</p>
              <p>Click the button above to add your first fish!</p>
            </div>
          ) : (
            <div className="fish-grid">
              {myFish.map((fish) => (
                <div key={fish._id} className="fish-card">
                  {fish.imageUrl && (
                    <div className="fish-image">
                      <img src={fish.imageUrl} alt={fish.name} />
                    </div>
                  )}
                  <div className="fish-info">
                    <h3>{fish.name}</h3>
                    <p className="fish-species">{fish.species}</p>
                    <div className="fish-details">
                      <span className="category-badge">{fish.category}</span>
                      <span className="care-badge">{fish.careLevel}</span>
                    </div>
                    <p className="fish-price">${fish.price}</p>
                    <p className="fish-stock">Stock: {fish.stock}</p>
                    <button 
                      onClick={() => handleDeleteFish(fish._id)}
                      className="delete-fish-btn"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopHome;