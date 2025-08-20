import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Orders from "./pages/Orders";
import Items from "./pages/Items";
import Shop from "./pages/Shop";
import Register from "./pages/Register";


function App() {
  return (
   <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/items" element={<Items />} />


          <Route path="/login" element={<SignUp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Orders />} />

        </Routes>
      </div>
   </Router>
  );
}

export default App;
