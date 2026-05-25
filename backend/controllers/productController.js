import asyncHandler from "express-async-handler";
import slugify from "slugify";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Brand from "../models/brandModel.js";

export const getProducts = asyncHandler(async (req, res) => {
  const search = req.query.search || "";
  const category = req.query.category || "";
  const brand = req.query.brand || "";
  const sort = req.query.sort || "latest";
  const query = { status: "active" };
  if (search) query.name = { $regex: search, $options: "i" };
  if (category) query.category = category;
  if (brand) query.brand = brand;

  const sortMap = {
    latest: { createdAt: -1 },
    lowToHigh: { price: 1 },
    highToLow: { price: -1 },
    popular: { rating: -1 },
  };

  const products = await Product.find(query)
    .populate("brand category")
    .sort(sortMap[sort] || sortMap.latest);
  res.json(products);
});

// ─── Get ALL products (admin only, includes drafts) ───────────────
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .populate("brand category")
    .sort({ createdAt: -1 });
  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "brand category",
  );
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    price,
    discountPrice,
    images,
    stock,
    tags,
    sizes,
    featured,
    status,
  } = req.body;

  const brandExists = await Brand.findById(brand);
  const categoryExists = await Category.findById(category);
  if (!brandExists || !categoryExists) {
    res.status(400);
    throw new Error("Brand or category not found");
  }

  const product = await Product.create({
    name,
    slug: slugify(name, { lower: true }),
    description,
    brand,
    category,
    price,
    discountPrice,
    images,
    stock,
    tags,
    sizes,
    featured,
    status,
  });

  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // const updates = {
  //   ...req.body,
  //   slug: req.body.name
  //     ? slugify(req.body.name, { lower: true })
  //     : product.slug,
  // };
  const updates = {
    ...req.body,
    slug: req.body.name
      ? slugify(req.body.name, { lower: true }) + "-" + product._id // ✅ stable on updates
      : product.slug,
  };

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    updates,
    {
      new: true,
    },
  );
  res.json(updatedProduct);
});

// ✅ FIXED: replaced deprecated product.remove()
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});
