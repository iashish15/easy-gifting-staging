import express from "express";
import {
  getWishlist,
  updateWishlist,
  clearWishlist,
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router
  .route("/")
  .get(protect, getWishlist)
  .put(protect, updateWishlist)
  .delete(protect, clearWishlist);
export default router;
