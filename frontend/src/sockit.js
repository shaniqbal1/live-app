// src/socket.js
import { io } from "socket.io-client";

// Connect to your backend Socket.IO server
export const socket = io("http://localhost:8000", { withCredentials: true });