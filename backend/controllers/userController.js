import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const getUsers = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  const count = await User.countDocuments({});
  const users = await User.find({})
    .select("-password")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({
    users,
    page,
    pages: Math.ceil(count / pageSize),
    total: count,
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isVerified =
      req.body.isVerified !== undefined ? req.body.isVerified : user.isVerified;
    user.role = req.body.role || user.role;

    if (req.body.address) {
      user.address = { ...user.address, ...req.body.address };
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isVerified: updatedUser.isVerified,
      address: updatedUser.address,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { getUsers, getUserById, updateUser, deleteUser };
