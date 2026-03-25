// routes/chat.routes.js
import express from "express";
import { authMiddleware } from "../middlwear/auth.js";

const router = express.Router();

// Protected Live Chat Route
router.get("/livechat", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Welcome to the live chat!",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

export default router;