import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true },
    description: { type: String, default: "" },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: { type: Number, required: true, default: 0 },
    discountPrice: { type: Number, default: 0 },
    images: [{ type: String }],
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    tags: [{ type: String }],
    sizes: [{ type: String }],
    featured: { type: Boolean, default: false },
    status: { type: String, default: "active", enum: ["active", "draft"] },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
