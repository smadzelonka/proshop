import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const protect = asyncHandler(async (req, res, next) => {
  let token;
  // console.log(req.headers);
  console.log(req.body);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedToken.id).select("-password");
      next();
    } catch (err) {
      console.error(err);
      res.status(401);
      throw new Error("Not Authorized, Token Invalid");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized Admin access");
  }
};

export { protect, admin };
