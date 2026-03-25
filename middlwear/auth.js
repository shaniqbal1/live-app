import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import CustomError from "../handler/customError.js";
import AsyncHandler from "../handler/async-handler.js";

const authMiddleware = AsyncHandler(async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return next(new CustomError(401, "Token not found! You are unauthorized"));
  }

  const decoded = jwt.verify(token, process.env.JWT_ACCESSTOKEN_SECRET);
  const userId = decoded.id; // make sure your token payload has id

  const user = await User.findById(userId).select("+password -refreshToken");
  if (!user) {
    return next(new CustomError(404, "User not found"));
  }

  req.user = user;
  req.role = user.role;
  next();
});

export { authMiddleware };