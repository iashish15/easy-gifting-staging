import asyncHandler from "express-async-handler";
import HomepageSection from "../models/HomepageSection.js";
import Banner from "../models/Banner.js";

const getHomepageSections = asyncHandler(async (req, res) => {
  const sections = await HomepageSection.find({ isActive: true }).sort({
    order: 1,
  });
  res.json(sections);
});

const getHomepageSectionById = asyncHandler(async (req, res) => {
  const section = await HomepageSection.findById(req.params.id);
  if (section) {
    res.json(section);
  } else {
    res.status(404);
    throw new Error("Homepage section not found");
  }
});

const createHomepageSection = asyncHandler(async (req, res) => {
  const section = await HomepageSection.create({
    ...req.body,
    createdBy: req.user._id,
  });
  res.status(201).json(section);
});

const updateHomepageSection = asyncHandler(async (req, res) => {
  const section = await HomepageSection.findById(req.params.id);
  if (!section) {
    res.status(404);
    throw new Error("Homepage section not found");
  }

  const updatedSection = await HomepageSection.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: Date.now() },
    { new: true },
  );

  res.json(updatedSection);
});

const deleteHomepageSection = asyncHandler(async (req, res) => {
  const section = await HomepageSection.findById(req.params.id);
  if (!section) {
    res.status(404);
    throw new Error("Homepage section not found");
  }

  await HomepageSection.findByIdAndDelete(req.params.id);
  res.json({ message: "Homepage section deleted" });
});

const getBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find({ isActive: true }).sort({ order: 1 });
  res.json(banners);
});

const createBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.create({
    ...req.body,
    createdBy: req.user._id,
  });
  res.status(201).json(banner);
});

const updateBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id);
  if (!banner) {
    res.status(404);
    throw new Error("Banner not found");
  }

  const updatedBanner = await Banner.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: Date.now() },
    { new: true },
  );

  res.json(updatedBanner);
});

const deleteBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id);
  if (!banner) {
    res.status(404);
    throw new Error("Banner not found");
  }

  await Banner.findByIdAndDelete(req.params.id);
  res.json({ message: "Banner deleted" });
});

export {
  getHomepageSections,
  getHomepageSectionById,
  createHomepageSection,
  updateHomepageSection,
  deleteHomepageSection,
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
};
