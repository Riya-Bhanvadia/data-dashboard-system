import React from "react";
import { GoDotFill } from "react-icons/go";

const ChatReadStatus = (props) => {
  const { chatId } = props;
  console.log(chatId);
  return (
    <div className="chat-list-wrapper-div2">
      <span style={{ color: "red" }}>
        <GoDotFill />
      </span>
    </div>
  );
};

export default ChatReadStatus;
