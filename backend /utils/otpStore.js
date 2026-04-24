const otpStore = {};

export const generateOTP = (phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore[phone] = {
    otp,
    expires: Date.now() + 5 * 60 * 1000 // 5 min
  };

  console.log("OTP for", phone, ":", otp); // for testing

  return otp;
};

export const verifyOTP = (phone, userOtp) => {
  const record = otpStore[phone];

  if (!record) return false;
  if (Date.now() > record.expires) return false;

  return record.otp === userOtp;
};