import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },

  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },

  isVerified: { type: Boolean, default: false },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  avatar: { type: String },

  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
