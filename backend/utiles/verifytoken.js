import jwt from "jsonwebtoken";

export const generateVerifyToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_ACCESSTOKEN_SECRET,
    { expiresIn: "1d" }
  );

};