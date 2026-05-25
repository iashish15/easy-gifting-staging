// import mongoose from "mongoose";

// const userSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     email: { type: String, required: true, unique: true, lowercase: true },
//     password: { type: String, required: true },
//     role: { type: String, default: "customer" },
//     wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
//     cart: [
//       {
//         product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//         quantity: { type: Number, default: 1 },
//       },
//     ],
//   },
//   { timestamps: true },
// );

// const User = mongoose.model("User", userSchema);
// export default User;

import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, default: "" }, // empty for Google OAuth users
    phone: { type: String, default: "" },
    role: { type: String, default: "customer" },

    // ── Google OAuth ──────────────────────────────────────────────
    googleId: { type: String, default: null },
    avatar: { type: String, default: "" },

    // ── Verification ──────────────────────────────────────────────
    isVerified: { type: Boolean, default: false },

    // ── Password Reset (OTP-based) ────────────────────────────────
    resetOTP: { type: String, default: null },
    resetOTPExpires: { type: Date, default: null },

    // ── Wishlist & Cart ───────────────────────────────────────────
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
