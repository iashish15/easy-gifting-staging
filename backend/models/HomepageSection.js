import mongoose from "mongoose";

const homepageSectionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: {
    type: String,
    enum: [
      "hero",
      "featured-products",
      "categories",
      "brands",
      "testimonials",
      "offers",
      "newsletter",
      "custom",
    ],
    required: true,
  },
  title: String,
  subtitle: String,
  description: String,
  content: mongoose.Schema.Types.Mixed, // Flexible content structure
  images: [{ type: String }],
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  settings: {
    layout: { type: String, enum: ["grid", "slider", "list"], default: "grid" },
    itemsPerRow: { type: Number, default: 4 },
    maxItems: Number,
    autoplay: { type: Boolean, default: false },
    showTitle: { type: Boolean, default: true },
    backgroundColor: String,
    textColor: String,
  },
  filters: {
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    brands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],
    tags: [String],
    featured: Boolean,
    trending: Boolean,
    bestSeller: Boolean,
    newArrival: Boolean,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("HomepageSection", homepageSectionSchema);
