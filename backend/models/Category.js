import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, unique: true },
  description: { type: String },
  image: { type: String },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  isActive: { type: Boolean, default: true },
  seo: {
    title: String,
    description: String,
    keywords: [String],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create slug from name before saving
categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "-")
      .replace(/-+/g, "-");
  }
  next();
});

export default mongoose.model("Category", categorySchema);
