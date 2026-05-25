import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  description: String,
  image: { type: String, required: true },
  mobileImage: String,
  link: String,
  linkText: String,
  position: {
    type: String,
    enum: ["hero", "sidebar", "footer"],
    default: "hero",
  },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  startDate: Date,
  endDate: Date,
  clickCount: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Banner", bannerSchema);
