import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// routes
app.use("/api/auth", authRouter);

export default app;