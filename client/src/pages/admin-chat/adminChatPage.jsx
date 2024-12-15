import React, { useContext } from "react";
import "./adminChat.css";
import ChatNameList from "../../components/admin-chat/chat-name-list/chatNameList";
import AdminMsgContent from "../../components/admin-chat/admin-message-content/adminMsgContent";
import ChatContext from "../../context/chatContext/chatContext";

const AdminChatPage = () => {
  const { chatId } = useContext(ChatContext);
  return (
    <div className="admin-chat">
      <ChatNameList />
      <div className="admin-chat-chat">
        <div className="admin-chat-head">
          <h2>reciever name</h2>
        </div>
        {chatId !== "" ? <AdminMsgContent chatId={chatId} /> : <></>}
      </div>
    </div>
  );
};

export default AdminChatPage;
