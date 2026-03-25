import nodemailer from "nodemailer";

export const sendVerificationEmail = async (userId, email, verificationToken) => {
  try {
    // ✅ Gmail transporter (REAL EMAILS)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,   // your gmail
        pass: process.env.SMTP_PASS    // app password
      }
    });

    // ✅ Verification link
    const verifyUrl = `http://localhost:5173/verify-email/${verificationToken}`;

      // ✅ Simple Plain Email HTML Template (Reverted)
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 40px auto; padding: 20px;">
  <h1 style="color: #333;">Verify Your Email</h1>
  <p>Thanks for signing up! Please click the link below to verify your email address:</p>
  <p style="font-size: 18px; margin: 30px 0;">
    <a href="${verifyUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email Address</a>
  </p>
  <p>This link expires in 24 hours.</p>
  <p>If you didn't request this, safely ignore this email.</p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  <p style="font-size: 14px; color: #666; text-align: center;">
    Need help? <a href="mailto:support@yourapp.com">Contact support</a>
  </p>
</body>
</html>`;

    // ✅ Send email
    const info = await transporter.sendMail({
      from: `"Your App" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify your email",
      html: html,
    });

    console.log("✅ Email sent:", info.messageId);

    return {
      success: true,
      messageId: info.messageId
    };

  } catch (error) {
    console.error("❌ Email failed:", error.message);

    return {
      success: false,
      error: error.message
    };
  }
};
