import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Items from "./pages/Items";
import Shop from "./pages/Shop";
import Register from "./pages/Register";
import Login from "./pages/Login";


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

        </Routes>
      </div>
   </Router>
  );
}

export default App;
