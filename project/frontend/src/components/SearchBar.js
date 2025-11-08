import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
        {value && (
          <button className="clear-btn" onClick={handleClear} aria-label="Clear search">
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;