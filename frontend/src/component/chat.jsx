// import React, { useEffect, useState } from "react";
// import { socket } from "./socket";

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     // Listen for incoming messages
//     socket.on("receive_message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.off("receive_message");
//     };
//   }, []);

//   const sendMessage = () => {
//     if (!input) return;
//     const messageData = { user: "Shan", message: input };
//     socket.emit("send_message", messageData); // send to backend
//     setInput(""); // clear input
//   };

//   return (
//     <div>
//       <div>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             {msg.user}: {msg.message}
//           </p>
//         ))}
//       </div>
//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Type your message"
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default Chat;