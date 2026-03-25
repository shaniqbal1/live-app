import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import ConnectDB from "./config/db.config.js";
import chalk from "chalk";
import http from "http";
import { Server } from "socket.io";

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5174",
    methods: ["GET", "POST"]
  }
});

// socket connection
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("send_message", (data) => {
    console.log("Message received:", data);

    // send message to all users
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
console.log(chalk.yellow(`Using PORT: ${PORT} (from ${process.env.PORT ? '.env' : 'default'})`));

// ✅ Connect DB BEFORE starting server
await ConnectDB();

httpServer.listen(PORT, () => {
  console.log(chalk.bgGreen.bold(`Server + Socket + DB running on http://localhost:${PORT}`));
});
