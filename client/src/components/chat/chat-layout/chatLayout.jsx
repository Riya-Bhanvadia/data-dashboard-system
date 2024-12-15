import React, { useRef, useState } from "react";
import { useCreateChat } from "../../../hooks/chatHooks/chatHooks";
import { BsPersonCircle } from "react-icons/bs";

import "./chatLayout.css";
import MessageContent from "../message-content/messageContent";
import ChatReadStatus from "../chat-read-status/chatReadStatus";

const ChatLayout = (props) => {
  // const scrollRef = useRef();
  const { adminData } = props;
  const [openConversation, setOpenConversation] = useState(false);
  const [id, setId] = useState();
  const employeeId = localStorage.getItem("empId");

  //   const { mutate } = useGetAdminName();
  const { mutate } = useCreateChat();

  const getChatBox = (i) => {
    const obj = { empId: employeeId, adminId: i._id };
    mutate(obj, {
      onSuccess: (data) => {
        setId(data.data._id);
        setOpenConversation(true);
      },
    });
  };

  return (
    <>
      <div className="chat-list">
        {!openConversation ? (
          adminData.map((i, index) => (
            <div
              key={index}
              className="chat-list-item"
              onClick={() => getChatBox(i)}
            >
              {/* <img src="user1.jpg" alt="User 1" /> */}
              <BsPersonCircle
                style={{ width: "25px", height: "25px", marginRight: "15px" }}
              />
              <div className="chat-list-details">
                <div className="chat-list-wrapper">
                  <div className="chat-list-wrapper-div1">
                    <h3>{i.adminName}</h3>
                  </div>
                  <ChatReadStatus chatId={id}/>
                  
                </div>
                <p>Last message: Hey there!</p>
              </div>
            </div>
          ))
        ) : (
          <MessageContent id={id} />
        )}
      </div>
    </>
  );
};

export default ChatLayout;
