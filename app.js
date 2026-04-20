import dotenv from "dotenv";
dotenv.config();
import express from "express";

import cors from "cors";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json()); // ✅ VERY IMPORTANT

// routes
app.use("/api/auth", authRouter); // ✅ only use this

export default app;