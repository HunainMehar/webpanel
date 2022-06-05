import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import "./index.css";

import SignIn from "././Screens/SignIn";
import SignUp from "././Screens/SignUp";
import Otp from "././Screens/Otp";
import ForgetPassword from "././Screens/ForgetPassword";
import NewPassword from "./Screens/NewPassword";
import SellerTopHeader from "./Screens/SellerTopHeader";
import Designs from "./Screens/Designs";
import Dashboard from "./Screens/Dashboard";
import Profile from "./Screens/Profile";
import Orders from "./Screens/Orders";
import Chat from "./Screens/Chat";
import Home from "./Screens/Home";
import OrderDetails from "./Screens/OrderDetails";
import Notifications from "./Screens/Notifications";
import Settings from "./Screens/Settings";
import { SocketContext, globalSocket } from "./services/webSockets";
import toast, { Toaster } from "react-hot-toast";

// Modal.setAppElement("#root");
function App() {
  return (
    // <Test/>

    <Router>
      <Toaster />
      <SocketContext.Provider value={globalSocket}>
        <Routes>
          <Route
            path="/"
            element={
              localStorage.getItem("token") ? (
                <Navigate to={"/home"} />
              ) : (
                <Navigate to={"/signin"} />
              )
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/newpassword" element={<NewPassword />} />
          <Route path="/sellertopheader" element={<SellerTopHeader />} />
          <Route path="/designs" element={<Designs />} />
          <Route
            path="/dashboard"
            element={
              <SocketContext.Provider value={globalSocket}>
                <Dashboard />
              </SocketContext.Provider>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/chat" element={<Chat />} />
          <Route
            path="/home"
            element={
              localStorage.getItem("token") ? (
                <Home />
              ) : (
                <Navigate to={"/signin"} />
              )
            }
          />
          <Route path="/orderdetails" element={<OrderDetails />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </SocketContext.Provider>
    </Router>
  );
}

export default App;
