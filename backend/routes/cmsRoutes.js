import express from "express";
import {
  getHomepageSections,
  getHomepageSectionById,
  createHomepageSection,
  updateHomepageSection,
  deleteHomepageSection,
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../controllers/cmsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Homepage sections
router.get("/sections", getHomepageSections);
router.get("/sections/:id", getHomepageSectionById);
router.post("/sections", protect, admin, createHomepageSection);
router.put("/sections/:id", protect, admin, updateHomepageSection);
router.delete("/sections/:id", protect, admin, deleteHomepageSection);

// Banners
router.get("/banners", getBanners);
router.post("/banners", protect, admin, createBanner);
router.put("/banners/:id", protect, admin, updateBanner);
router.delete("/banners/:id", protect, admin, deleteBanner);

export default router;
