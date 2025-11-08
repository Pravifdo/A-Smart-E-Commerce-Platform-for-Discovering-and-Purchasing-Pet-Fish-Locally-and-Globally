import React, { useState } from "react";

const AddFish = ({ businessData, handleLogout }) => {
  const [fishForm, setFishForm] = useState({
    name: "",
    species: "",
    category: "Freshwater",
    price: "",
    description: "",
    size: "",
    temperament: "",
    careLevel: "Easy",
    imageUrl: "",
    stock: "",
    pH: "",
    temperature: "",
    hardness: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAddFish = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const fishData = {
      ...fishForm,
      price: parseFloat(fishForm.price),
      stock: parseInt(fishForm.stock),
      shopId: businessData._id,
      waterParameters: {
        pH: fishForm.pH,
        temperature: fishForm.temperature,
        hardness: fishForm.hardness,
      },
    };

    try {
      const response = await fetch("http://localhost:3000/api/fish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fishData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Fish added successfully!");
        setFishForm({
          name: "",
          species: "",
          category: "Freshwater",
          price: "",
          description: "",
          size: "",
          temperament: "",
          careLevel: "Easy",
          imageUrl: "",
          stock: "",
          pH: "",
          temperature: "",
          hardness: "",
        });
      } else {
        setError(data.message || "Failed to add fish");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="add-fish-section">
      <div className="welcome-header">
        <h1>Welcome, {businessData?.name}!</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <p className="subtitle">Add new fish to your inventory</p>

      <form onSubmit={handleAddFish} className="fish-form">
        <div className="form-group">
          <label>Fish Name</label>
          <input
            type="text"
            value={fishForm.name}
            onChange={(e) => setFishForm({ ...fishForm, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Species</label>
          <input
            type="text"
            value={fishForm.species}
            onChange={(e) => setFishForm({ ...fishForm, species: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Price ($)</label>
          <input
            type="number"
            value={fishForm.price}
            onChange={(e) => setFishForm({ ...fishForm, price: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={fishForm.description}
            onChange={(e) => setFishForm({ ...fishForm, description: e.target.value })}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <button type="submit" className="submit-btn large">Add Fish</button>
      </form>
    </div>
  );
};

export default AddFish;
