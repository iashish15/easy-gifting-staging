import mongoose from "mongoose";

const brandSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: "" },
  },
  { timestamps: true },
);

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
