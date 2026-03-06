// routes/auth.route.js
import express from "express";
import { register, login, verifyEmail } from "../controller/authcontroller.js";

const router = express.Router();

// register
router.post("/register", register);

// login
router.post("/login", login);

// verify email
router.get("/verify/:token", verifyEmail);

export default router;
