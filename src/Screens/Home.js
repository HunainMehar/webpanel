import React, { useState } from "react";
import Chat from "./Chat";
import Dashboard from "./Dashboard";
import Designs from "./Designs";
import Orders from "./Orders";
import Profile from "./Profile";
import Settings from "./Settings";
import SellerTopHeader from "./SellerTopHeader";

function Home() {
  const [dashboard, setDashboard] = useState(true);
  const [orders, setOrders] = useState(false);
  const [designs, setDesigns] = useState(false);
  const [chat, setChat] = useState(false);
  const [profile, setProfile] = useState(false);
  const [settings, setSettings] = useState(false);

  const openDashboard = (data) => {
    setDashboard(data);
    console.log("dashboard", data);
  };

  const openOrders = (data) => {
    setOrders(data);
    console.log("Orders", data);
  };

  const openDesigns = (data) => {
    setDesigns(data);
    console.log("Designs", data);
  };

  const openChat = (data) => {
    setChat(data);
    console.log("Chat", data);
  };

  const openProfile = (data) => {
    setProfile(data);
    console.log("Profile", data);
  };
  const openSettings = (data) => {
    setSettings(data);
    console.log("Settings", data);
  };

  return (
    <>
      <SellerTopHeader
        openDashboard={openDashboard}
        openOrders={openOrders}
        openDesigns={openDesigns}
        openChat={openChat}
        openProfile={openProfile}
        openSettings={openSettings}
      />
      {dashboard ? <Dashboard /> : null}
      {orders ? <Orders /> : null}
      {designs ? <Designs /> : null}
      {chat ? <Chat /> : null}
      {profile? <Profile /> : null}
      {settings? <Settings /> : null}
    </>
  );
}

export default Home;
