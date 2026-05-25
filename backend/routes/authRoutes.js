{
  /*import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  getUserProfile,
  // forgotPassword,
  // resetPassword,
  // verifyEmail,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.post("/refresh", refreshToken);
router.get("/profile", protect, getUserProfile);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);
// router.post("/verify-email", verifyEmail);

export default router;*/
}

import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  getUserProfile,
  forgotPassword,
  resetPassword,
  verifyEmail,
  sendOTP,
  verifyOTP,
  loginWithOTP,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.post("/refresh", refreshToken);
router.get("/profile", protect, getUserProfile);
router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);
router.post("/reset-password", resetPassword);
router.post("/verify-email", verifyEmail);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/login-otp", loginWithOTP);

export default router;
