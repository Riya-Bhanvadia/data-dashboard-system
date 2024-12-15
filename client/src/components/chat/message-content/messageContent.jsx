import React, { useEffect, useRef, useState } from "react";
import { TbSend } from "react-icons/tb";
// import io from "socket.io-client";
import { socket } from "../../../socket/socket";
import {
  useCreateOrGetMessage,
  useUpdateMessage,
} from "../../../hooks/chatHooks/chatHooks";
import { format } from "timeago.js";
import { useQueryClient } from "react-query";

const MessageContent = (props) => {
  const { id } = props;
  const empId = localStorage.getItem("empId");
  console.log(empId);
  const scrollRef = useRef();
  // const socket = useRef();
  const [msg, setMsg] = useState([]);
  const [arrivalData, setArrivalData] = useState("");
  const [displayMsg, setDisplayMsg] = useState("");
  const { mutate: updateMsg } = useUpdateMessage();
  const { isLoading, data } = useCreateOrGetMessage(id);
  const queryClient = useQueryClient();

  // console.log(data);
  // console.log(receiverId);
  useEffect(() => {
    const receiverId = data?.data.chatId.members.find((i) => i !== empId);
    console.log("hiiiiiiiiiiii");
    if (receiverId) {
      socket.emit("adduser", {
        receiverId: receiverId,
        chatId: id,
      });
    }
  }, [data?.data.chatId.members]);
  // useEffect(() => {

  //   socket.on("getMessage", (data) => {
  //     console.log(data.senderId);
  //     setArrivalData({
  //       sender: data.senderId,
  //       text: data.message,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [updateMsg, data?.data.conversation.length]);

  const sender = false;
  const handleSend = () => {
    setDisplayMsg(msg);
    const objMsg = { chatId: id, sender: sender, message: msg };
    // console.log(empId);
    // console.log(receiverId);
    // const receiverId = data.data.chatId.members.find((i)=> i !== empId)

    // console.log(msg);
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
            sender: false,
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
    console.log(id);
    const eventHandler = ({ msg, chatId }) => {
      // queryClient.invalidateQueries(["message",chatId])
      queryClient.setQueryData(["message", chatId], (oldData) => {
        console.log(oldData);
        const newArr = oldData;
        newArr.data.conversation.push({
          sender: true,
          message: msg,
          read: false,
          createdAt: Date.now(),
          _id: Math.random() * 1000000,
        });
        console.log(newArr);
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

  if (isLoading) {
    return <div>isLoading...</div>;
  }
  return (
    <>
      <div style={{ height: "285px", overflowY: "auto" }}>
        {data.data ? (
          data.data.conversation.map((i) => (
            <div key={i.createdAt}>
              {i.sender === true ? (
                <>
                  <div className="left-message displaysender" ref={scrollRef}>
                    {i.message}
                  </div>
                  <div style={{ fontSize: "x-small", float: "right" }}>
                    <div
                      className="right-message"
                      style={{ fontSize: "x-small" }}
                    >
                      {format(i.createdAt)}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="right-message displayreceiver"
                    ref={scrollRef}
                  >
                    {i.message}
                  </div>
                  <div
                    className="right-message"
                    style={{ fontSize: "x-small" }}
                  >
                    {format(i.createdAt)}
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          style={{ borderRadius: "30px", background: "#1F3484" }}
          onClick={() => handleSend()}
        >
          <TbSend />
        </button>
      </div>
    </>
  );
};

export default MessageContent;
