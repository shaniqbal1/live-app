import AsyncHandler  from "../handler/async-handler.js";
import CustomError from "../handler/coustomError.js";
import User from "../modle/user.modle.js";
import {generateToken, generateRefreshToken } from "../utiles/token.js"
import { generateVerifyToken } from "../utiles/verifytoken.js";
import sendEmail from "../utiles/email.js";
import jwt from "jsonwebtoken";

// REGISTER
export const register = AsyncHandler(async(req,res,next)=>{

  const {name,email,password,gender} = req.body;

  const userExist = await User.findOne({email});

  if(userExist){
    return next(new CustomError(400,"User already exists"));
  }

  const user = await User.create({name,email,password,gender});

  const token = generateVerifyToken(user._id);

  const verifyLink = `http://localhost:8000/api/auth/verify/${token}`;

  const html = `
  <h2>Email Verification</h2>
  <p>Please verify your email</p>
  <a href="${verifyLink}">
    <button>Verify Email</button>
  </a>
  `;

  await sendEmail(user.email,"Verify Email",html);

  res.status(201).json({
    success:true,
    message:"Registration successful. Please check your email."
  });

});


// LOGIN
export const login = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new CustomError(400, "Invalid email or password"));
  if (!user.isVerified) return next(new CustomError(401, "Please verify your email first"));

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new CustomError(400, "Invalid email or password"));

  const accessToken = generateToken(user._id);
  const refreshToken = generateRefreshToken(user);


  // Send tokens in cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000 // 1 hour
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});


// VERIFY EMAIL
export const verifyEmail = AsyncHandler(async(req,res,next)=>{

  const {token} = req.params;

  const decoded = jwt.verify(
    token,
    process.env.JWT_ACCESSTOKEN_SECRET
  );

  const user = await User.findById(decoded.id);

  if(!user){
    return next(new CustomError(404,"User not found"));
  }

  user.isVerified = true;

  await user.save();

  res.redirect(`${process.env.CLIENT_URL}/login`);

});

// logout
export const logout = AsyncHandler(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
});

// Google OAuth Callback
export const googleCallback = AsyncHandler(async (req, res) => {
  const user = req.user;
  
  const accessToken = generateToken(user._id);
  const refreshToken = generateRefreshToken(user);

  // Set cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000 // 1 hour
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  // Redirect to frontend with access token
  res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/google?accessToken=${accessToken}`);
});
