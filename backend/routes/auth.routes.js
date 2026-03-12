// routes/auth.route.js
import express from "express";
import { passport } from "../config/passport.js";
import { register, login, verifyEmail, logout, googleAuthCallback } from "../controller/authcontroller.js";
const router = express.Router();


// register
router.post("/register", register);

// login
router.post("/login", login);

// verify email
router.get("/verify/:token", verifyEmail);

//logout
router.get("/logout", logout);

// google oauth
// /api/v1/auth/google
router.route("/google").get(passport.authenticate("google" ,{scope:["profile" , "email"]}));

// api/v1/auth/google/callback
router.route("/google/callback").get(passport.authenticate("google" , { session:false , failureRedirect:"http://localhost:5173/auth/failure"}), googleAuthCallback)

export default router;

