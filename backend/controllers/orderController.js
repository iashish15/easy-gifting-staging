import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items provided");
  }

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });
  res.status(201).json(order);
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  res.json(order);
});

export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(orders);
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.json(orders);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  order.status = req.body.status || order.status;
  if (req.body.isPaid) order.isPaid = req.body.isPaid;
  if (req.body.paidAt) order.paidAt = req.body.paidAt;
  if (req.body.isDelivered) order.isDelivered = req.body.isDelivered;
  if (req.body.deliveredAt) order.deliveredAt = req.body.deliveredAt;
  const updated = await order.save();
  res.json(updated);
});
export const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = "Cancelled";

  const updatedOrder = await order.save();

  res.json({
    message: "Order cancelled successfully",
    order: updatedOrder,
  });
});
