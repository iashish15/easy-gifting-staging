import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All cart routes require authentication
router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/update/:itemId", protect, updateCartItem);
router.delete("/remove/:itemId", protect, removeFromCart);
router.delete("/clear", protect, clearCart);
router.post("/coupon", protect, applyCoupon);
router.delete("/coupon", protect, removeCoupon);

export default router;
