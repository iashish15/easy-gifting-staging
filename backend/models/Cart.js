import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sessionId: { type: String }, // For guest users
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      variant: {
        name: String,
        value: String,
      },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true },
      addedAt: { type: Date, default: Date.now },
    },
  ],
  coupon: {
    code: String,
    discount: Number,
    type: { type: String, enum: ["percentage", "fixed"] },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Ensure either user or sessionId is present
cartSchema.pre("save", function (next) {
  if (!this.user && !this.sessionId) {
    next(new Error("Either user or sessionId must be provided"));
  }
  next();
});

export default mongoose.model("Cart", cartSchema);
