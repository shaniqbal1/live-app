import React, { useState, useEffect } from "react";
import { socket } from "../sockit.js";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };

  }, []);

  const sendMessage = () => {

    const msgData = {
      user: "Shan",
      message: message
    };

    socket.emit("send_message", msgData);

    setMessage("");
  };

  return (
    <div>
      <h2>Live Chat</h2>

      {messages.map((msg, index) => (
        <p key={index}>
          {msg.user}: {msg.message}
        </p>
      ))}

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default ChatPage;