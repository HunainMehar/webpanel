import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "./index.css";

import SignIn from "././Screens/SignIn";
import SignUp from "././Screens/SignUp";
import Otp from "././Screens/Otp";
import ForgetPassword from "././Screens/ForgetPassword";
import SellerDashboard from "././Screens/SellerDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/sellerdashboard" element={<SellerDashboard />} />

      </Routes>
    </Router>
  )
}

export default App;
