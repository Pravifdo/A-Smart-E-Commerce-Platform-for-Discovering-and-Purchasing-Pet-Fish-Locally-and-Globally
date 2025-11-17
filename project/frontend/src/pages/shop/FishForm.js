import React from 'react';

const FishForm = ({ 
  fishForm, 
  setFishForm, 
  handleAddFish, 
  error, 
  message,
  imagePreview,
  handleImageChange,
  setImageFile,
  setImagePreview
}) => {
  return (
    <form onSubmit={handleAddFish} className="fish-form">
      <div className="form-row">
        <div className="form-group">
          <label>Fish Name *</label>
          <input 
            type="text" 
            value={fishForm.name} 
            onChange={(e) => setFishForm({...fishForm, name: e.target.value})} 
            required 
            placeholder="e.g., Betta Fish" 
          />
        </div>
        <div className="form-group">
          <label>Species *</label>
          <input 
            type="text" 
            value={fishForm.species} 
            onChange={(e) => setFishForm({...fishForm, species: e.target.value})} 
            required 
            placeholder="e.g., Betta splendens" 
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category *</label>
          <select 
            value={fishForm.category} 
            onChange={(e) => setFishForm({...fishForm, category: e.target.value})} 
            required
          >
            <option value="Freshwater">Freshwater</option>
            <option value="Saltwater">Saltwater</option>
            <option value="Tropical">Tropical</option>
            <option value="Coldwater">Coldwater</option>
          </select>
        </div>
        <div className="form-group">
          <label>Care Level *</label>
          <select 
            value={fishForm.careLevel} 
            onChange={(e) => setFishForm({...fishForm, careLevel: e.target.value})} 
            required
          >
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Difficult">Difficult</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Price ($) *</label>
          <input 
            type="number" 
            step="0.01" 
            value={fishForm.price} 
            onChange={(e) => setFishForm({...fishForm, price: e.target.value})} 
            required 
            placeholder="e.g., 15.99" 
          />
        </div>
        <div className="form-group">
          <label>Stock *</label>
          <input 
            type="number" 
            value={fishForm.stock} 
            onChange={(e) => setFishForm({...fishForm, stock: e.target.value})} 
            required 
            placeholder="e.g., 25" 
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Size *</label>
          <input 
            type="text" 
            value={fishForm.size} 
            onChange={(e) => setFishForm({...fishForm, size: e.target.value})} 
            required 
            placeholder="e.g., 2-3 inches" 
          />
        </div>
        <div className="form-group">
          <label>Temperament *</label>
          <input 
            type="text" 
            value={fishForm.temperament} 
            onChange={(e) => setFishForm({...fishForm, temperament: e.target.value})} 
            required 
            placeholder="e.g., Peaceful, Aggressive" 
          />
        </div>
      </div>

      <div className="form-group full-width">
        <label>Description *</label>
        <textarea 
          value={fishForm.description} 
          onChange={(e) => setFishForm({...fishForm, description: e.target.value})} 
          required 
          placeholder="Describe the fish..." 
          rows="3" 
        />
      </div>

      <div className="form-group full-width">
        <label>Upload Fish Image</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange}
          className="file-input"
        />
        <p className="help-text">Upload an image (Max size: 5MB, Formats: JPG, PNG, GIF)</p>
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
            <button 
              type="button" 
              onClick={() => {
                setImageFile(null);
                setImagePreview(null);
                setFishForm({...fishForm, imageUrl: ''});
              }}
              className="remove-image-btn"
            >
              Remove Image
            </button>
          </div>
        )}
      </div>

      <h3 className="section-title">Water Parameters</h3>

      <div className="form-row">
        <div className="form-group">
          <label>pH Level</label>
          <input 
            type="text" 
            value={fishForm.pH} 
            onChange={(e) => setFishForm({...fishForm, pH: e.target.value})} 
            placeholder="e.g., 6.5-7.5" 
          />
        </div>
        <div className="form-group">
          <label>Temperature</label>
          <input 
            type="text" 
            value={fishForm.temperature} 
            onChange={(e) => setFishForm({...fishForm, temperature: e.target.value})} 
            placeholder="e.g., 75-80°F" 
          />
        </div>
        <div className="form-group">
          <label>Water Hardness</label>
          <input 
            type="text" 
            value={fishForm.hardness} 
            onChange={(e) => setFishForm({...fishForm, hardness: e.target.value})} 
            placeholder="e.g., Soft to medium" 
          />
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      <button type="submit" className="submit-btn large">Add Fish to Inventory</button>
    </form>
  );
};

export default FishForm;
