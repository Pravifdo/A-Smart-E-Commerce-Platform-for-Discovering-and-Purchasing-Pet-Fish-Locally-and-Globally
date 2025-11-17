import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarHome from '../components/NavbarHome';
import ShopCard from '../components/ShopCard';
import SearchBar from '../components/SearchBar';
import '../styles/ExploreShops.css';

const ExploreShops = () => {
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  // Fetch shops from API
  useEffect(() => {
    const fetchShops = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/shops');
        
        if (!response.ok) {
          throw new Error('Failed to fetch shops');
        }
        
        const data = await response.json();
        setShops(data);
        setFilteredShops(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  // Filter shops based on search and category
  useEffect(() => {
    let filtered = shops;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(shop =>
        shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.address?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter (based on specialties)
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(shop =>
        shop.specialties?.some(specialty => 
          specialty.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );
    }

    setFilteredShops(filtered);
  }, [searchTerm, selectedCategory, shops]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleBusinessPortal = () => {
    navigate('/shop');
  };

  return (
    <div className="explore-shops-page">
      <NavbarHome />
      
      <div className="explore-shops-container">
        {/* Header Section */}
        <div className="header-section">
          <div className="header-content">
            <h1>Explore Pet Fish Shops</h1>
            <p>Discover trusted shops offering quality pet fish locally and globally</p>
          </div>
          <button className="business-portal-btn" onClick={handleBusinessPortal}>
            <span className="btn-icon">🏪</span>
            Business Shop Portal
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="filter-section">
          <SearchBar onSearch={handleSearch} placeholder="Search shops by name, location, or description..." />
          
          <div className="category-filters">
            <button
              className={selectedCategory === 'All' ? 'category-btn active' : 'category-btn'}
              onClick={() => handleCategoryChange('All')}
            >
              All Shops
            </button>
            <button
              className={selectedCategory === 'Freshwater' ? 'category-btn active' : 'category-btn'}
              onClick={() => handleCategoryChange('Freshwater')}
            >
              Freshwater
            </button>
            <button
              className={selectedCategory === 'Saltwater' ? 'category-btn active' : 'category-btn'}
              onClick={() => handleCategoryChange('Saltwater')}
            >
              Saltwater
            </button>
            <button
              className={selectedCategory === 'Tropical' ? 'category-btn active' : 'category-btn'}
              onClick={() => handleCategoryChange('Tropical')}
            >
              Tropical
            </button>
            <button
              className={selectedCategory === 'Aquarium' ? 'category-btn active' : 'category-btn'}
              onClick={() => handleCategoryChange('Aquarium')}
            >
              Aquarium Supplies
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading shops...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">
            <p>⚠️ {error}</p>
            <button onClick={() => window.location.reload()} className="retry-btn">
              Retry
            </button>
          </div>
        )}

        {/* Shops Grid */}
        {!loading && !error && (
          <>
            <div className="results-info">
              <p>Showing {filteredShops.length} {filteredShops.length === 1 ? 'shop' : 'shops'}</p>
            </div>

            {filteredShops.length === 0 ? (
              <div className="no-results">
                <h3>No shops found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="shops-grid">
                {filteredShops.map((shop) => (
                  <ShopCard key={shop._id} shop={shop} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ExploreShops;
