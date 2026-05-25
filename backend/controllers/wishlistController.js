import asyncHandler from "express-async-handler";
import Wishlist from "../models/wishlistModel.js";

export const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
    "products",
  );
  if (!wishlist) {
    return res.json({ products: [] });
  }
  res.json(wishlist);
});

export const updateWishlist = asyncHandler(async (req, res) => {
  const { products } = req.body;
  let wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) {
    wishlist = new Wishlist({ user: req.user._id, products });
  } else {
    wishlist.products = products;
  }
  await wishlist.save();
  res.json(wishlist);
});

export const clearWishlist = asyncHandler(async (req, res) => {
  await Wishlist.findOneAndDelete({ user: req.user._id });
  res.json({ message: "Wishlist cleared" });
});
