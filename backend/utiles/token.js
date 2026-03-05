import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_ACCESSTOKEN_SECRET,
    { expiresIn: "1h" }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESHTOKEN_SECRET,
    { expiresIn: "7d" }
  );
};
