import express from "express";
import {sendOTP,verifyOTP,completeProfile,getMe} from "../controller/authcontroller.js";

import protect from "../middlwear/auth.js"

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.put("/complete-profile", protect, completeProfile);
router.get("/me", protect, getMe);

export default router;