import React from "react";
import genericService from "./genericServices.js";
import io from "socket.io-client";

export const globalSocket = io.connect(
  "https://websocket-fashionhub.herokuapp.com/"
);

globalSocket.on("connect", async () => {
  console.log("Connected to the server");

  if (genericService.isLoggedIn()) {
    const id = genericService.getUserInfo();
    globalSocket.emit("connectUser", {
      userId: id._id,
    });
  }
});
//on connection display the message

export const SocketContext = React.createContext();
