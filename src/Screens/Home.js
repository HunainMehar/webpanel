import React, { useState } from "react";
import Chat from "./Chat";
import Dashboard from "./Dashboard";
import Designs from "./Designs";
import Orders from "./Orders";
import Profile from "./Profile";
import SellerTopHeader from "./SellerTopHeader";

function Home() {
  const [dashboard, setDashboard] = useState(false);
  const [orders, setOrders] = useState(false);
  const [designs, setDesigns] = useState(false);
  const [chat, setChat] = useState(false);
  const [profile, setProfile] = useState(false);

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

  return (
    <>
      <SellerTopHeader
        openDashboard={openDashboard}
        openOrders={openOrders}
        openDesigns={openDesigns}
        openChat={openChat}
        openProfile={openProfile}
      />
      {dashboard ? <Dashboard /> : null}
      {orders ? <Orders /> : null}
      {designs ? <Designs /> : null}
      {chat ? <Chat /> : null}
      {profile? <Profile /> : null}
    </>
  );
}

export default Home;
