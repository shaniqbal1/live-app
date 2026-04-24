import express from "express";
import { sendOtp, verifyOtpAndRegister } from "../controller/authcontroller.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtpAndRegister);

export default router;