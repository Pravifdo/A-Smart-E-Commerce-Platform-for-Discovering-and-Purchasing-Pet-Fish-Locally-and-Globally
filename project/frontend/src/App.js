import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Items from "./pages/Items";
import Shop from "./pages/ExploreShops/ShopCard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MainPage from "./pages/main-page/mainPage";
import Profile from "./pages/profile";
import ExploreFish from "./pages/ExploreFish";
import BestManagement from "./pages/BestManagement";
import About from "./pages/About";

function App() {
  return (
   <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/items" element={<Items />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore-fish" element={<ExploreFish />} />
          <Route path="/explore-shops" element={<Shop />} />
          <Route path="/learn" element={<About />} />
          <Route path="/best-management" element={<BestManagement />} />
        </Routes>
      </div>
   </Router>
  );
}

export default App;
