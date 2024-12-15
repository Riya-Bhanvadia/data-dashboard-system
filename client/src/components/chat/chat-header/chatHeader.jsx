import React, { useContext, useEffect, useState } from "react";
import { useGetChats } from "../../../hooks/chatHooks/chatHooks";
import DashboardContext from "../../dashboardContext/dashboardcontext";
import ChatLayout from "../chat-layout/chatLayout";
import { useGetAllAdmin } from "../../../hooks/hooks";

const ChatHeader = () => {
  const [toggle, setToggle] = useState(false);
//   const { user } = useContext(DashboardContext);
 const user = localStorage.getItem("userId")
//   const { isLoading, data } = useGetChats(user);
  const { isLoading, data } = useGetAllAdmin(user);
  
  const openChatBox = () => {
    setToggle(!toggle);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div className="chat">
      <p className="chat-header" onClick={openChatBox}>
        Chat Box
      </p>
      {toggle ? (
        <div className="chat-content">
          <ChatLayout adminData={data.data} currentUser={user} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChatHeader;
