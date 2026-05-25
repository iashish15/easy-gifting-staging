import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  images: [{ type: String }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  tags: [{ type: String }],
  sku: { type: String, unique: true },
  stock: { type: Number, default: 0 },
  variants: [
    {
      name: String,
      value: String,
      price: Number,
      stock: Number,
    },
  ],
  seo: {
    title: String,
    description: String,
    keywords: [String],
  },
  shipping: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    freeShipping: { type: Boolean, default: false },
  },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isRecommended: { type: Boolean, default: false },
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create slug from name before saving
productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "-")
      .replace(/-+/g, "-");
  }

  next();
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
