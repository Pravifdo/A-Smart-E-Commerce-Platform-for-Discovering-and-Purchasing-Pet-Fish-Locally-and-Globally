import React, { useState, useEffect } from 'react';
import NavbarHome from '../components/NavbarHome';
import FishCard from '../components/FishCard';
import SearchBar from '../components/SearchBar';
import { fishData } from '../data/fishData';
import '../styles/ExploreFish.css';

const ExploreFish = () => {
  const [fishes, setFishes] = useState([]);
  const [filteredFishes, setFilteredFishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Load fish data
    setFishes(fishData);
    setFilteredFishes(fishData);
  }, []);

  useEffect(() => {
    // Filter fishes based on search and category
    let filtered = fishes;

    if (searchTerm) {
      filtered = filtered.filter(fish =>
        fish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fish.species.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(fish => fish.category === selectedCategory);
    }

    setFilteredFishes(filtered);
  }, [searchTerm, selectedCategory, fishes]);

  const categories = ['All', 'Freshwater', 'Saltwater', 'Tropical', 'Coldwater'];

  return (
    <div className="explore-fish-page">
      <NavbarHome />
      <div className="explore-container">
        <h1>Explore Fish</h1>
        <p className="subtitle">Discover amazing aquatic species from around the world</p>
        
        <SearchBar 
          value={searchTerm} 
          onChange={setSearchTerm} 
          placeholder="Search by fish name or species..."
        />

        <div className="filter-section">
          <label>Category:</label>
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="fish-grid">
          {filteredFishes.length > 0 ? (
            filteredFishes.map(fish => (
              <FishCard key={fish.id} fish={fish} />
            ))
          ) : (
            <p className="no-results">No fish found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreFish;