import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";

export const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product",
  );

  if (!cart) {
    return res.json({ items: [], totalPrice: 0 });
  }

  res.json(cart);
});

export const updateCart = asyncHandler(async (req, res) => {
  const { items } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      items,
      totalPrice: 0,
    });
  } else {
    cart.items = items;
  }

  cart.totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  await cart.save();

  res.json(cart);
});

export const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOneAndDelete({
    user: req.user._id,
  });

  res.json({
    message: "Cart cleared",
    cart,
  });
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const cartItem = await Cart.create({
    user: req.user._id,
    product: productId,
    quantity,
  });

  res.status(201).json(cartItem);
});
export const applyCoupon = asyncHandler(async (req, res) => {
  const { couponCode } = req.body;

  res.json({
    message: `Coupon ${couponCode} applied successfully`,
  });
});
export const removeCoupon = asyncHandler(async (req, res) => {
  res.json({
    message: "Coupon removed successfully",
  });
});
export const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId,
  );

  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  await cart.save();

  res.json(cart);
});
export const updateCartItem = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({
    user: req.user._id,
  });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  const item = cart.items.find((item) => item.product.toString() === productId);

  if (!item) {
    res.status(404);
    throw new Error("Cart item not found");
  }

  item.quantity = quantity;

  cart.totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  await cart.save();

  res.json(cart);
});
