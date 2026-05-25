import asyncHandler from "express-async-handler";
import Coupon from "../models/Coupon.js";

const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find({}).sort({ createdAt: -1 });
  res.json(coupons);
});

const getCouponById = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (coupon) {
    res.json(coupon);
  } else {
    res.status(404);
    throw new Error("Coupon not found");
  }
});

const createCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.create({
    ...req.body,
    createdBy: req.user._id,
  });
  res.status(201).json(coupon);
});

const updateCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }

  const updatedCoupon = await Coupon.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: Date.now() },
    { new: true },
  );

  res.json(updatedCoupon);
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }

  await Coupon.findByIdAndDelete(req.params.id);
  res.json({ message: "Coupon deleted" });
});

const validateCoupon = asyncHandler(async (req, res) => {
  const { code, orderValue, userId } = req.body;

  const coupon = await Coupon.findOne({ code: code.toUpperCase() });
  if (!coupon) {
    res.status(404);
    throw new Error("Invalid coupon code");
  }

  if (!coupon.isValid(orderValue, userId)) {
    res.status(400);
    throw new Error("Coupon is not valid for this order");
  }

  res.json({
    valid: true,
    coupon: {
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      discount:
        coupon.type === "percentage"
          ? Math.min(
              (orderValue * coupon.value) / 100,
              coupon.maxDiscount || Infinity,
            )
          : coupon.value,
    },
  });
});

export {
  getCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
};
