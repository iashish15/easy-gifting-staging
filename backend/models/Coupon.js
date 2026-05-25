import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  description: { type: String },
  type: { type: String, enum: ["percentage", "fixed"], required: true },
  value: { type: Number, required: true },
  minOrderValue: { type: Number, default: 0 },
  maxDiscount: { type: Number }, // For percentage coupons
  usageLimit: { type: Number }, // Total usage limit
  usageCount: { type: Number, default: 0 },
  userLimit: { type: Number, default: 1 }, // Per user limit
  validFrom: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  applicableCategories: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  ],
  applicableBrands: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],
  applicableProducts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Check if coupon is valid
couponSchema.methods.isValid = function (orderValue, userId) {
  const now = new Date();
  return (
    this.isActive &&
    now >= this.validFrom &&
    now <= this.validUntil &&
    orderValue >= this.minOrderValue &&
    (!this.usageLimit || this.usageCount < this.usageLimit)
  );
};

export default mongoose.model("Coupon", couponSchema);
