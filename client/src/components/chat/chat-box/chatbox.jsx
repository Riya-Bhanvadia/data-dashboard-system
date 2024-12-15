import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import "./chatbox.css";
import DashboardContext from "../../dashboardContext/dashboardcontext";
import { useGetChats } from "../../../hooks/chatHooks/chatHooks";
import ChatHeader from "../chat-header/chatHeader";

const Chatbox = () => {
  

  return (
    <div>
      <ChatHeader />
    </div>
  );
};

export default Chatbox;
