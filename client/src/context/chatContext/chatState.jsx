import React, { useContext, useState } from "react";
import ChatContext from "./chatContext";

const ChatState = (props) => {
  const [chatId, setChatId] = useState("");

  const addChatId = (data) => {
    setChatId(data);
  };
  return (
    <ChatContext.Provider value={{ chatId, addChatId }}>
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
