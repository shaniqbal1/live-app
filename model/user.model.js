import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // 📱 Login identity
  phone: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  // 🔐 OTP system
  isVerified: {
    type: Boolean,
    default: false
  },

  otpCode: String,
  otpExpires: Date,

  // 👤 Profile (created AFTER OTP)
  name: {
    type: String,
    default: ""
  },

  avatar: {
    type: String,
    default: ""
  },

  // 💬 chat status
  isOnline: {
    type: Boolean,
    default: false
  },

  lastSeen: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

export default mongoose.model('User', UserSchema);