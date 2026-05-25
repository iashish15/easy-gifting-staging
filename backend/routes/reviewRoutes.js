import express from "express";
import {
  getReviews,
  getProductReviews,
  addReview,
  updateReview,
  deleteReview,
  approveReview,
} from "../controllers/reviewController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public review routes
router.get("/product/:productId", getProductReviews);
router.get("/", getReviews);

// Customer review operations
router.post("/", protect, addReview);
router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

// Admin moderation
router.put("/:id/approve", protect, admin, approveReview);

export default router;
