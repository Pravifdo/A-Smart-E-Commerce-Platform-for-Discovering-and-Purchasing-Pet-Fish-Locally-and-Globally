import React, { useState, useEffect } from "react";
import "../styles/Shop.css";
import NavbarHome from "../components/NavbarHome";
import LoginShop from "./shop/LoginShop";
import RegistrationShop from "./shop/RegistrationShop";
import FishForm from "./shop/FishForm";
import ShopHome from "./shop/shopHome";

const Shop = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFishForm, setShowFishForm] = useState(false); // Toggle between shop home and fish form
  const [businessData, setBusinessData] = useState(null);

  // Shared form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Fish form
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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Shop image for registration
  const [shopImageFile, setShopImageFile] = useState(null);
  const [shopImagePreview, setShopImagePreview] = useState(null);
  const [shopImage, setShopImage] = useState("");

  // ======================
  // 🔹 Handle Login
  // ======================
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/shops/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        setBusinessData(data.shop);
        localStorage.setItem("businessUser", JSON.stringify(data.shop));
        setMessage("Login successful!");
      } else {
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Server error. Please try again.");
    }
  };

  // ======================
  // 🔹 Handle Registration
  // ======================
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/shops/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name: businessName,
          phone,
          address,
          imageUrl: shopImage, // Include shop image
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful! Please login.");
        setShowRegister(false);
        setEmail("");
        setPassword("");
        setBusinessName("");
        setPhone("");
        setAddress("");
        setShopImageFile(null);
        setShopImagePreview(null);
        setShopImage("");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch {
      setError("Server error. Please try again.");
    }
  };

  // ======================
  // 🔹 Handle Logout
  // ======================
  const handleLogout = () => {
    setIsLoggedIn(false);
    setBusinessData(null);
    localStorage.removeItem("businessUser");
  };

  // ======================
  // 🔹 Handle Image Upload
  // ======================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFishForm({ ...fishForm, imageUrl: reader.result });
    };
    reader.readAsDataURL(file);
    setError("");
  };

  // ======================
  // 🔹 Handle Shop Image Upload
  // ======================
  const handleShopImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    setShopImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setShopImagePreview(reader.result);
      setShopImage(reader.result);
    };
    reader.readAsDataURL(file);
    setError("");
  };

  // ======================
  // 🔹 Handle Add Fish
  // ======================
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
        setImageFile(null);
        setImagePreview(null);
      } else {
        setError(data.message || "Failed to add fish");
      }
    } catch {
      setError("Server error. Please try again.");
    }
  };

  // ======================
  // 🔹 Auto-Login from LocalStorage
  // ======================
  useEffect(() => {
    const savedBusiness = localStorage.getItem("businessUser");
    if (savedBusiness) {
      try {
        const business = JSON.parse(savedBusiness);
        setBusinessData(business);
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem("businessUser");
      }
    }
  }, []);

  // ======================
  // 🔹 JSX Render
  // ======================
  return (
    <div className="shop-page">
      <NavbarHome />
      <div className="shop-container">
        {!isLoggedIn ? (
          <div className="auth-section">
            <h1>Business Portal</h1>
            <p className="subtitle">Login or Register your business to add fish</p>
            {!showRegister ? (
              <LoginShop
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                error={error}
                message={message}
                onSwitchToRegister={() => setShowRegister(true)}
              />
            ) : (
              <RegistrationShop
                businessName={businessName}
                setBusinessName={setBusinessName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                address={address}
                setAddress={setAddress}
                password={password}
                setPassword={setPassword}
                handleRegister={handleRegister}
                error={error}
                message={message}
                onSwitchToLogin={() => setShowRegister(false)}
                shopImagePreview={shopImagePreview}
                handleShopImageChange={handleShopImageChange}
                setShopImageFile={setShopImageFile}
                setShopImagePreview={setShopImagePreview}
                shopImage={shopImage}
              />
            )}
          </div>
        ) : (
          <div className="add-fish-section">
            {!showFishForm ? (
              <ShopHome 
                businessData={businessData}
                onAddFishClick={() => setShowFishForm(true)}
                onLogout={handleLogout}
              />
            ) : (
              <div>
                <button 
                  onClick={() => setShowFishForm(false)} 
                  className="back-btn"
                >
                  ← Back to Shop
                </button>
                <h2 className="form-title">Add New Fish to Your Inventory</h2>
                <FishForm
                  fishForm={fishForm}
                  setFishForm={setFishForm}
                  handleAddFish={handleAddFish}
                  error={error}
                  message={message}
                  imagePreview={imagePreview}
                  handleImageChange={handleImageChange}
                  setImageFile={setImageFile}
                  setImagePreview={setImagePreview}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
