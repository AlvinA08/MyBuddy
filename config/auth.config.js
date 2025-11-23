import jwt from "jsonwebtoken";
import User from "../db/models/User.js";

// --- AUTH REQUIRED MIDDLEWARE ---
async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Authorization denied.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Authorization denied.",
      });
    }

    const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists.",
      });
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication failed.",
    });
  }
}

// --- OPTIONAL AUTH MIDDLEWARE ---
async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const JWT_SECRET = process.env.JWT_SECRET;

      if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

      const decoded = jwt.verify(token, JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (user) {
        req.user = {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      }
    }

    next();
  } catch (error) {
    next(); // Continue without blocking the request
  }
}

// Aliases
const requireAuth = authMiddleware;

export default authMiddleware;
export { authMiddleware, optionalAuth, requireAuth };
