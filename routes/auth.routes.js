// routes/auth.route.js
import express from "express";
import { passport } from "../config/passport.js";
import { register, login, logout, verifyEmail, verifyEmailToken, resendVerification, googleAuthCallback } from "../controller/authcontroller.js";
const router = express.Router();


// register
router.post("/register", register);

// login
router.post("/login", login);



// logout
router.get("/logout", logout);

// verify email POST (manual token)
router.post("/verify-email", verifyEmail);

// resend verification email
router.post("/resend-verification", resendVerification);

// verify email GET (email link)
router.get("/verify-email/:token", verifyEmailToken);

// google oauth
// /api/v1/auth/google
router.route("/google").get(passport.authenticate("google" ,{scope:["profile" , "email"]}));

// api/v1/auth/google/callback
router.route("/google/callback").get(passport.authenticate("google" , { session:false , failureRedirect:"http://localhost:5173/auth/failure"}), googleAuthCallback)

export default router;

