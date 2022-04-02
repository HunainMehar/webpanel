import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "./index.css";

import SignIn from "././Screens/SignIn";
import SignUp from "././Screens/SignUp";
import Otp from "././Screens/Otp";
import ForgetPassword from "././Screens/ForgetPassword";
import SellerTopHeader from "./Screens/SellerTopHeader";
import Designs from "./Screens/Designs";
import Dashboard from "./Screens/Dashboard";
import Profile from "./Screens/Profile";
import Test from "./Screens/Test";
import Orders from "./Screens/Orders";
import Chat from "./Screens/Chat";
import Modal from "react-modal/lib/components/Modal";
import Home from "./Screens/Home";
Modal.setAppElement("#root");
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/sellertopheader" element={<SellerTopHeader />} />
        <Route path="/designs" element={<Designs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/home" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
