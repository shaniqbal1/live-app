import User from "../model/user.model.js";
import { generateOTP, verifyOTP } from "../utils/otpStore.js";

// SEND OTP
export const sendOtp = async (req, res) => {
  const { phone } = req.body;

  if (!phone) return res.status(400).json({ msg: "Phone required" });

  const otp = generateOTP(phone);

  res.json({ msg: "OTP sent (check console for now)" });
};

// VERIFY OTP + CREATE USER
export const verifyOtpAndRegister = async (req, res) => {
  const { phone, otp, firstName, lastName } = req.body;

  const isValid = verifyOTP(phone, otp);

  if (!isValid) {
    return res.status(400).json({ msg: "Invalid OTP" });
  }

  let user = await User.findOne({ phone });

  if (!user) {
    user = await User.create({
      phone,
      firstName,
      lastName,
      isVerified: true
    });
  }

  res.json({
    msg: "User authenticated",
    user
  });
};