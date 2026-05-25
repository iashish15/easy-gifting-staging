import asyncHandler from "express-async-handler";
import slugify from "slugify";
import Category from "../models/categoryModel.js";

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).sort({ name: 1 });
  res.json(categories);
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const slug = slugify(name, { lower: true });
  const existing = await Category.findOne({ slug });
  if (existing) {
    res.status(400);
    throw new Error("Category already exists");
  }
  const category = await Category.create({ name, slug, description });
  res.status(201).json(category);
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  category.name = req.body.name || category.name;
  category.slug = req.body.name
    ? slugify(req.body.name, { lower: true })
    : category.slug;
  category.description = req.body.description || category.description;
  const updated = await category.save();
  res.json(updated);
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  await category.deleteOne();

  res.json({ message: "Category removed" });
});
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});
