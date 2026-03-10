// routes/auth.route.js
import express from "express";
import passport from "passport";
import { register, login, verifyEmail, logout, googleCallback } from "../controller/authcontroller.js";

const router = express.Router();

// register
router.post("/register", register);

// login
router.post("/login", login);

// verify email
router.get("/verify/:token", verifyEmail);

//logout
router.get("/logout", logout);

// Google OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login?error=google_auth_failed" }),
  googleCallback
);

export default router;

