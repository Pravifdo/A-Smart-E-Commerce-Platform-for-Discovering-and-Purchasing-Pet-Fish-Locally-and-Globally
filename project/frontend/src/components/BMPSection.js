import React, { useState } from 'react';
import '../styles/BMPSection.css';

const BMPSection = ({ practice }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return '#2196F3';
    }
  };

  return (
    <div className="bmp-card">
      <div className="bmp-header">
        <div className="bmp-image">
          <img 
            src={practice.imageUrl} 
            alt={practice.title}
            onError={(e) => {
              e.target.src = '/images/bmp-placeholder.jpg';
            }}
          />
        </div>
        
        <div className="bmp-title-section">
          <h3>{practice.title}</h3>
          <div className="bmp-meta">
            <span className="topic-badge">{practice.topic}</span>
            <span 
              className="difficulty-badge"
              style={{ backgroundColor: getDifficultyColor(practice.difficulty) }}
            >
              {practice.difficulty}
            </span>
          </div>
        </div>
      </div>

      <div className="bmp-content">
        <p className="bmp-description">{practice.description}</p>
        
        {!isExpanded ? (
          <button className="expand-btn" onClick={toggleExpand}>
            Show More Details ▼
          </button>
        ) : (
          <>
            <div className="bmp-detail-content">
              <p className="content-text">{practice.content}</p>

              {practice.steps && practice.steps.length > 0 && (
                <div className="steps-section">
                  <h4>Steps:</h4>
                  <ol className="steps-list">
                    {practice.steps.map((step) => (
                      <li key={step.stepNumber}>
                        <strong>{step.instruction}</strong>
                        {step.tips && step.tips.length > 0 && (
                          <ul className="tips-list">
                            {step.tips.map((tip, index) => (
                              <li key={index}>💡 {tip}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {practice.materials && practice.materials.length > 0 && (
                <div className="materials-section">
                  <h4>Materials Needed:</h4>
                  <ul>
                    {practice.materials.map((material, index) => (
                      <li key={index}>🔧 {material}</li>
                    ))}
                  </ul>
                </div>
              )}

              {practice.benefits && practice.benefits.length > 0 && (
                <div className="benefits-section">
                  <h4>Benefits:</h4>
                  <ul>
                    {practice.benefits.map((benefit, index) => (
                      <li key={index}>✅ {benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              {practice.warnings && practice.warnings.length > 0 && (
                <div className="warnings-section">
                  <h4>⚠️ Warnings:</h4>
                  <ul>
                    {practice.warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button className="expand-btn" onClick={toggleExpand}>
              Show Less ▲
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BMPSection;