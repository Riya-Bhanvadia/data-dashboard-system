import React, { useContext, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import {
  useCreateChat,
  useGetAllEmployee,
} from "../../../hooks/chatHooks/chatHooks";
import ChatContext from "../../../context/chatContext/chatContext";
import { socket } from "../../../socket/socket";

const ChatNameList = () => {
  const { isLoading, data } = useGetAllEmployee();
  const [chatId, setChatId] = useState()
  const { mutate } = useCreateChat();
  const { addChatId } = useContext(ChatContext);
  const adminId = localStorage.getItem("adminId");

  const openMessageHandler = (id) => {
    const empId = id;
    const obj = { empId, adminId };
    
    
    mutate(obj, {
      onSuccess: (data) => {
        // console.log(data.data._id);
        setChatId(data.data._id)
        addChatId(data.data._id);
      },
    });
    console.log(chatId);

    
  };
  // console.log(data);
  if (isLoading) {
    return <div className="admin-chat-people">Loading...</div>;
  }
  return (
    <div className="admin-chat-people">
      <div style={{ textAlign: "center" }}>
        <h3>Messages</h3>
      </div>
      <div className="admin-name-search">
        <input type="text" placeholder="search" />
      </div>
      <div className="admin-name-list">
        {data.data.map((i) => (
          <div
            className="admin-chat-person"
            key={i._id}
            onClick={() => openMessageHandler(i._id)}
          >
            <BsPersonCircle className="chat-profile-icon" />
            <div className="prof-container">
              <h3 className="profile-name">{i.empName}</h3>
              <p className="profile-line">Last message: Hey there!</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatNameList;
