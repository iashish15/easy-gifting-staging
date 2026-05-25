import asyncHandler from "express-async-handler";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

const uploadStream = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "easyfiting/products", resource_type: "image" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      },
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Image file is required");
  }
  const result = await uploadStream(req.file.buffer);
  res.json({ url: result.secure_url, publicId: result.public_id });
});
