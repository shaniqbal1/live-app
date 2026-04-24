import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: { type: String, unique: true },
  bio: { type: String, default: "" },
  profilePic: { type: String, default: "" },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("User", userSchema);