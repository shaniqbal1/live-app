import AsyncHandler from "../handler/async-handler.js";
import CustomError from "../handler/customError.js";
import User from "../model/user.model.js";
import {generateToken, generateRefreshToken } from "../utils/token.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
import crypto from 'crypto';
// REGISTER
// RESEND VERIFICATION (new endpoint)
export const resendVerification = AsyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new CustomError(400, "Email required"));
  }

  const user = await User.findOne({ email, isVerified: false });
  if (!user) {
    return next(new CustomError(404, "No unverified account found with this email"));
  }

  const verificationToken = crypto.randomBytes(32).toString('hex');
  const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  user.verificationToken = verificationToken;
  user.verificationTokenExpires = new Date(verificationTokenExpires);
  await user.save();

  let emailResult = { success: false };
  try {
    emailResult = await sendVerificationEmail(user._id, email, verificationToken);
  } catch (error) {
    emailResult.error = error.message;
  }

  res.json({
    success: true,
    message: emailResult.success ? 'Verification email resent!' : 'Resent failed (check console), but token refreshed.',
    emailSent: emailResult.success
  });
});

export const register = AsyncHandler (async(req,res,next)=>{

  const {name,email,password,gender} = req.body;

  // Validate required fields
  if (!email || !password || !gender) {
    return next(new CustomError(400, "Email, password, and gender are required"));
  }

  const userExist = await User.findOne({email});

  if(userExist){
    return next(new CustomError(400,"User already exists"));
  }

  let user;
  try {
    user = await User.create({name,email,password,gender});
    console.log("User created successfully:", user._id);
  } catch (error) {
    console.error("User creation error:", error);
    
    if (error.code === 11000) {
      return next(new CustomError(400, "Email already exists"));
    }
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message).join(', ');
      return next(new CustomError(400, `Validation failed: ${errors}`));
    }
    
    return next(new CustomError(500, "Failed to create user"));
  }

  // Generate verification token
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  user.verificationToken = verificationToken;
  user.verificationTokenExpires = new Date(verificationTokenExpires);
  await user.save();

  // Send verification email - DETAILED DEBUG LOGS w/ timestamp
  const emailStartTime = new Date().toISOString();
  console.log(`[${emailStartTime}] 📧 Sending verification email to ${email} for user ${user._id}`);
  console.log('🔍 SMTP config:', {
    usingEthereal: !process.env.SMTP_USER,
    smtpHost: process.env.SMTP_HOST || 'ethereal.email',
    smtpUser: process.env.SMTP_USER ? `${process.env.SMTP_USER.slice(0,3)}...` : 'none'
  });
  
  let emailResult = { success: false, error: null };
  try {
    emailResult = await sendVerificationEmail(user._id, email, verificationToken);
    const emailEndTime = new Date().toISOString();
    console.log(`[${emailEndTime}] ✅ Verification email SENT (${(new Date(emailEndTime) - new Date(emailStartTime))/1000}s):`, {
      success: emailResult.success,
      messageId: emailResult.messageId,
      attempts: emailResult.attempts,
      ethereal: !!emailResult.messageId?.includes('ethereal')
    });
  } catch (emailError) {
    console.error(`[${new Date().toISOString()}] ❌ Email send FAILED:`, {
      message: emailError.message,
      code: emailError.code,
      smtpHost: process.env.SMTP_HOST || 'Ethereal',
      isAuthError: emailError.code === 'EAUTH'
    });
    emailResult.error = emailError.message;
  }


  res.status(201).json({
    success: true,
    message: 'Account created. Verification email sent.',
    requiresVerification: true
  });


});


// LOGIN
export const login = AsyncHandler(async (req, res, next) => {
const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new CustomError(400, "Invalid email or password"));

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new CustomError(400, "Invalid email or password"));

  // Check if email is verified
  if (!user.isVerified) {
    return next(new CustomError(403, "Please verify your email before logging in"));
  }

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




// VERIFY EMAIL
export const verifyEmail = AsyncHandler(async (req, res, next) => {
  const { verificationToken } = req.body;

  if (!verificationToken) {
    return next(new CustomError(400, "Verification token is required"));
  }

  const user = await User.findOne({ 
    verificationToken, 
    isVerified: false,
    verificationTokenExpires: { $gt: new Date() }
  }).select("+password");

  if (!user) {
    return next(new CustomError(400, "Invalid or expired verification token"));
  }

  // Mark as verified and clear token
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  // Generate tokens like login
  const accessToken = generateToken(user._id);
  const refreshToken = generateRefreshToken(user);
 //abc
  // Send tokens in cookies (same as login)
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
    message: "Email verified successfully. Auto-logged in.",
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    },
    accessToken,  // Also return for frontend context
    refreshToken  // Frontend won't store, but for consistency
  });
});

// GET verify email endpoint for email links
export const verifyEmailToken = AsyncHandler(async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ success: false, message: "Verification token is required" });
    }

    console.log('🔍 Verifying token:', token ? `${token.slice(0,8)}...` : 'missing');
    const user = await User.findOne({ 
      verificationToken: token, 
      isVerified: false,
      verificationTokenExpires: { $gt: new Date() }
    }).select("+password");
    console.log('👤 User found for direct verify:', user ? user.email : 'none');

    if (!user) {
res.redirect(`http://localhost:5173/login?error=invalid-token`);
    }

    // Mark as verified
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // Redirect to success\n    res.redirect("http://localhost:5173/login");\n  }
  } catch (error) {   console.error('Verify email token error:', error);    res.redirect("http://localhost:5173/login");  }});

// googleauthcallback 

export const googleAuthCallback = AsyncHandler(async (req, res) => {
  try {
             const user = req.user

            // generate tokens 
            const accessToken = generateToken(user._id);
            const refreshToken = generateRefreshToken(user);

            // store refresh token in db
            user.refreshToken = [{token:refreshToken , createdAt:new Date()}];
            await user.save();

            // store refresh token in cookies 
            res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000 });
            res.cookie("accessToken", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 60 * 60 * 1000 });
            
            res.redirect(`http://localhost:5173/auth/success?accessToken=${accessToken}`);

         } catch (error) {
            // this is error message
            res.redirect(`http://localhost:5173/auth/failure?error=${encodeURIComponent(error.message)}`)
         }
       }
     
   )
  





