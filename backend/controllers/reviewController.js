import asyncHandler from "express-async-handler";
import Review from "../models/Review.js";
import Product from "../models/Product.js";

const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ isApproved: true })
    .populate("user", "name avatar")
    .populate("product", "name images")
    .sort({ createdAt: -1 });
  res.json(reviews);
});

const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    product: req.params.productId,
    isApproved: true,
  })
    .populate("user", "name avatar")
    .sort({ createdAt: -1 });

  res.json(reviews);
});

const addReview = asyncHandler(async (req, res) => {
  const { productId, rating, title, comment, images } = req.body;

  // Check if user already reviewed this product
  const existingReview = await Review.findOne({
    user: req.user._id,
    product: productId,
  });

  if (existingReview) {
    res.status(400);
    throw new Error("You have already reviewed this product");
  }

  const review = await Review.create({
    user: req.user._id,
    product: productId,
    rating,
    title,
    comment,
    images: images || [],
  });

  // Update product rating
  await updateProductRating(productId);

  res.status(201).json(review);
});

const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  if (review.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this review");
  }

  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: Date.now() },
    { new: true },
  );

  // Update product rating
  await updateProductRating(review.product);

  res.json(updatedReview);
});

const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  if (review.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this review");
  }

  await Review.findByIdAndDelete(req.params.id);

  // Update product rating
  await updateProductRating(review.product);

  res.json({ message: "Review deleted" });
});

const approveReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  review.isApproved = true;
  await review.save();

  res.json({ message: "Review approved" });
});

const updateProductRating = async (productId) => {
  const reviews = await Review.find({ product: productId, isApproved: true });

  if (reviews.length > 0) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      "ratings.average": averageRating,
      "ratings.count": reviews.length,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      "ratings.average": 0,
      "ratings.count": 0,
    });
  }
};

export {
  getReviews,
  getProductReviews,
  addReview,
  updateReview,
  deleteReview,
  approveReview,
};
