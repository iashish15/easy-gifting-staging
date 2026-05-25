import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import Admin from "../models/adminModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import generateToken from "../utils/generateToken.js";

export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid admin credentials");
  }
});

export const getAdminDashboard = asyncHandler(async (req, res) => {
  const productCount = await Product.countDocuments();
  const orderCount = await Order.countDocuments();
  const userCount = await User.countDocuments({ role: "customer" });
  const totalSales = await Order.aggregate([
    { $match: { isPaid: true } },
    { $group: { _id: null, total: { $sum: "$totalPrice" } } },
  ]);

  res.json({
    productCount,
    orderCount,
    userCount,
    totalRevenue: totalSales[0]?.total || 0,
  });
});
