// middleware/admin.middleware.js
import jwt from "jsonwebtoken";
import UserModel from "../models/user.models.js";

const adminAuth = async (req, res, next) => {
  try {
    // 1. Get token
    const token =
      req.cookies.accessToken ||
      req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Provide token",
        error: true,
        success: false,
      });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized access",
        error: true,
        success: false,
      });
    }

    // 3. Find user
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // 4. Check role
    if (user.role !== "ADMIN") {
      return res.status(403).json({
        message: "Access denied: Admins only",
        error: true,
        success: false,
      });
    }

    req.userId = user._id;
    req.userRole = user.role;

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error",
      error: true,
      success: false,
    });
  }
};

export default adminAuth;
