import React, { useEffect, useRef, useState } from "react";
import {
  useCreateOrGetMessage,
  useUpdateMessage,
} from "../../../hooks/chatHooks/chatHooks";
import { socket } from "../../../socket/socket";

import { format } from "timeago.js";
import { useQueryClient } from "react-query";

const AdminMsgContent = (props) => {
  const { chatId: id } = props;
  const [msg, setMsg] = useState("");
  const scrollRef = useRef();

  const { isLoading, data } = useCreateOrGetMessage(id);
  const adminId = localStorage.getItem("adminId");
  //   console.log(data);
  const { mutate: updateMsg } = useUpdateMessage();
  const queryClient = useQueryClient();

  const sender = true;
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [updateMsg, data?.data.conversation.length]);
  const handleSend = () => {
    const objMsg = { chatId: id, sender: sender, message: msg };

    console.log(id);
    socket.emit("sendMessage", {
      message: msg,
      chatId: id,
    });

    updateMsg(objMsg, {
      onSuccess: () => {
        console.log("query invalidated" + id);
        // queryClient.invalidateQueries(["message", id]);

        queryClient.setQueryData(["message", id], (oldData) => {
          console.log(oldData);
          const newArr = oldData;
          newArr.data.conversation.push({
            sender: true,
            message: msg,
            read: false,
            createdAt: Date.now(),
            _id: Math.random() * 1000000,
          });
          return newArr;
        });
        setMsg("");
      },
    });
  };

  useEffect(() => {
    console.log("the chat id" + id);
    const eventHandler = ({ msg, chatId }) => {
      // queryClient.invalidateQueries(["message", chatId]);

      queryClient.setQueryData(["message", chatId], (oldData) => {
        console.log(oldData);
        const newArr = oldData;
        newArr.data.conversation.push({
          sender: false,
          message: msg,
          read: false,
          createdAt: Date.now(),
          _id: Math.random() * 1000000,
        });
        return newArr;
      });
      console.log(chatId);
      console.log(msg);
    };
    socket.on(`${id}`, eventHandler);
    return () => {
      socket.off(`${id}`, eventHandler);
    };
  }, []);

  useEffect(() => {
    const receiverId = data?.data.chatId.members.find((i) => i !== adminId);
    if (receiverId) {
      socket.emit("adduser", {
        // senderId: adminId,
        receiverId: receiverId,
        chatId: id,
      });
    }
  }, [data]);

  if (isLoading && id) {
    return <div className="admin-chat-chat">Loading...</div>;
  }
  return (
    <>
      <div className="admin-chat-messages">
        {data.data.conversation.map((i, index) => (
          <span key={index}>
            {i.sender === false ? (
              <>
                <div
                  key={index}
                  className="left-message displaysender"
                  ref={scrollRef}
                >
                  {i.message}
                </div>

                <div className="left-message" style={{ fontSize: "x-small" }}>
                  {format(i.createdAt)}
                </div>
                {/* </div> */}
              </>
            ) : (
              <>
                <div className="right-message displayreceiver" ref={scrollRef}>
                  {i.message}
                </div>
                <div className="right-message" style={{ fontSize: "x-small" }}>
                  {format(i.createdAt)}
                </div>
              </>
            )}
          </span>
        ))}
      </div>
      <div className="admin-chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button onClick={() => handleSend()}>Send</button>
      </div>
    </>
  );
};

export default AdminMsgContent;
