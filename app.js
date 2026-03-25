import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { passport } from "./config/passport.js";
import dotenv from "dotenv";

// Load environment variables FIRST before any other imports
dotenv.config();

import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.route.js";

const app = express();

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));

// Body parsers
app.use(express.json());
app.use(cookieParser());

// Passport
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);

// Error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ success: false, message: err.message });
});

export default app;
