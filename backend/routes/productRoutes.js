import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  // getFeaturedProducts,
  // getTrendingProducts,
  // getNewArrivals,
  // getBestSellers,
  // searchProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getProducts);
// router.get("/featured", getFeaturedProducts);
// router.get("/trending", getTrendingProducts);
// router.get("/new-arrivals", getNewArrivals);
// router.get("/best-sellers", getBestSellers);
// router.get("/search", searchProducts);
router.get("/admin/all", protect, admin, getAllProducts);
router.get("/:id", getProductById);

// Admin routes
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
