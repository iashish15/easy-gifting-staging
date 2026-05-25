// import asyncHandler from "express-async-handler";
// import slugify from "slugify";
// import Brand, { preloadedBrands } from "../models/Brand.js";

// const getBrands = asyncHandler(async (req, res) => {
//   // const brands = await Brand.find({ isActive: true }).sort({ name: 1 });
//   const brands = await Brand.find({}).sort({ name: 1 });
//   res.json(brands);
// });

// const getBrandById = asyncHandler(async (req, res) => {
//   const brand = await Brand.findById(req.params.id);

//   if (brand) {
//     res.json(brand);
//   } else {
//     res.status(404);
//     throw new Error("Brand not found");
//   }
// });

// const createBrand = asyncHandler(async (req, res) => {
//   const { name, description, logo, website } = req.body;

//   if (!name) {
//     return res.status(400).json({ message: "Name is required" });
//   }

//   const slug = slugify(name, { lower: true });

//   const existing = await Brand.findOne({ slug });

//   if (existing) {
//     res.status(400);
//     throw new Error("Brand already exists");
//   }

//   const brand = await Brand.create({
//     name,
//     slug,
//     description,
//     logo,
//     website,
//     isActive: true,
//   });

//   res.status(201).json(brand);
// });

// const updateBrand = asyncHandler(async (req, res) => {
//   const brand = await Brand.findById(req.params.id);

//   if (!brand) {
//     res.status(404);
//     throw new Error("Brand not found");
//   }

//   const updates = { ...req.body };

//   if (updates.name) {
//     updates.slug = slugify(updates.name, { lower: true });
//   }

//   const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, updates, {
//     new: true,
//   });

//   res.json(updatedBrand);
// });

// const deleteBrand = asyncHandler(async (req, res) => {
//   const brand = await Brand.findById(req.params.id);

//   if (!brand) {
//     res.status(404);
//     throw new Error("Brand not found");
//   }

//   await brand.deleteOne();

//   res.json({
//     message: "Brand deleted successfully",
//   });
// });

// const preloadBrands = asyncHandler(async (req, res) => {
//   const brands = [];

//   for (const brandData of preloadedBrands) {
//     const slug = slugify(brandData.name, { lower: true });

//     const existing = await Brand.findOne({ slug });

//     if (!existing) {
//       const brand = await Brand.create({
//         name: brandData.name,
//         slug,
//         description: brandData.description,
//         isActive: true,
//       });

//       brands.push(brand);
//     }
//   }

//   res.json({
//     message: `${brands.length} brands preloaded successfully`,
//     brands,
//   });
// });

// export {
//   getBrands,
//   getBrandById,
//   createBrand,
//   updateBrand,
//   deleteBrand,
//   preloadBrands,
// };

import asyncHandler from "express-async-handler";
import slugify from "slugify";
import Brand from "../models/brandModel.js";

export const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find({}).sort({ name: 1 });
  res.json(brands);
});

export const createBrand = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const slug = slugify(name, { lower: true });
  const existing = await Brand.findOne({ slug });
  if (existing) {
    res.status(400);
    throw new Error("Brand already exists");
  }
  const brand = await Brand.create({ name, slug, description });
  res.status(201).json(brand);
});

export const updateBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    res.status(404);
    throw new Error("Category not found");
  }
  brand.name = req.body.name || brand.name;
  brand.slug = req.body.name
    ? slugify(req.body.name, { lower: true })
    : brand.slug;
  brand.description = req.body.description || brand.description;
  const updated = await brand.save();
  res.json(updated);
});

export const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    res.status(404);
    throw new Error("Brand not found");
  }

  await brand.deleteOne();

  res.json({ message: "Brand removed" });
});
export const getBrandById = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (brand) {
    res.json(brand);
  } else {
    res.status(404);
    throw new Error("Brand not found");
  }
});
