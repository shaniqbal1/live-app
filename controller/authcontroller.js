import User from "../model/user.model.js"
import jwt from "jsonwebtoken";

// 🔥 Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ========================
// 1. SEND OTP (LOGIN / REGISTER)
// ========================
export const sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone is required" });
    }

    const otp = generateOTP();
    const otpExpires = Date.now() + 5 * 60 * 1000; // 5 min

    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({
        phone,
        otpCode: otp,
        otpExpires
      });
    } else {
      user.otpCode = otp;
      user.otpExpires = otpExpires;
      await user.save();
    }

    // 🔴 Replace with SMS service (Twilio, etc.)
    console.log("OTP sent:", otp);

    res.json({
      message: "OTP sent successfully",
      phone
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ========================
// 2. VERIFY OTP (LOGIN / REGISTER)
// ========================
export const verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otpCode !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // ✅ Mark verified
    user.isVerified = true;
    user.otpCode = null;
    user.otpExpires = null;

    await user.save();

    // 🔑 JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ========================
// 3. COMPLETE PROFILE
// ========================
export const completeProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, avatar } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.avatar = avatar || user.avatar;

    await user.save();

    res.json({
      message: "Profile updated",
      user
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ========================
// 4. GET LOGGED IN USER
// ========================
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};