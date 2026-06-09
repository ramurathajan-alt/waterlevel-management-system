import jwt from "jsonwebtoken";
import userModal from "../models/userModal.js"; // Assuming user model exists

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT secret from environment variables
    req.user = await userModal.findById(decoded.id); // Attach user to request object
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default authMiddleware;
