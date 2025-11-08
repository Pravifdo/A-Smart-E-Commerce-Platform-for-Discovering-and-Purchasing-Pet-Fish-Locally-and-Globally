import React, { useState, useEffect } from 'react';
import NavbarHome from '../components/NavbarHome';
import BMPSection from '../components/BMPSection';
import { bmpData } from '../data/bmpData';
import '../styles/BestManagement.css';

const BestManagement = () => {
  const [practices, setPractices] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('All');

  useEffect(() => {
    setPractices(bmpData);
  }, []);

  const topics = ['All', 'Water Quality', 'Feeding', 'Tank Maintenance', 'Health Care', 'Breeding'];

  const filteredPractices = selectedTopic === 'All' 
    ? practices 
    : practices.filter(practice => practice.topic === selectedTopic);

  return (
    <div className="best-management-page">
      <NavbarHome />
      <div className="bmp-container">
        <div className="bmp-header">
          <h1>Best Management Practices</h1>
          <p className="subtitle">
            Learn the best practices for maintaining healthy and thriving aquatic life
          </p>
        </div>

        <div className="topic-filter">
          <label>Filter by Topic:</label>
          <div className="topic-buttons">
            {topics.map(topic => (
              <button
                key={topic}
                className={selectedTopic === topic ? 'active' : ''}
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div className="bmp-grid">
          {filteredPractices.length > 0 ? (
            filteredPractices.map(practice => (
              <BMPSection key={practice.id} practice={practice} />
            ))
          ) : (
            <p className="no-results">No practices found for this topic.</p>
          )}
        </div>

        <div className="bmp-tips">
          <h2>Quick Tips</h2>
          <ul>
            <li>🌡️ Maintain consistent water temperature</li>
            <li>💧 Test water parameters weekly</li>
            <li>🐟 Don't overcrowd your tank</li>
            <li>🍽️ Feed appropriate amounts 2-3 times daily</li>
            <li>🔄 Perform regular water changes (20-30% weekly)</li>
            <li>🌿 Include live plants for natural filtration</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BestManagement;