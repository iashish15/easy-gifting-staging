import express from "express";
import multer from "multer";
import { uploadImage } from "../controllers/uploadController.js";
import { adminProtect } from "../middleware/authMiddleware.js";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
router.post("/image", adminProtect, upload.single("image"), uploadImage);
export default router;
