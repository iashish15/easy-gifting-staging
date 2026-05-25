import express from "express";
import {
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
  // preloadBrands,
} from "../controllers/brandController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getBrands);
router.get("/:id", getBrandById);

// Admin routes
router.post("/", protect, admin, createBrand);
router.put("/:id", protect, admin, updateBrand);
router.delete("/:id", protect, admin, deleteBrand);
// router.post("/preload", protect, admin, preloadBrands);

export default router;
