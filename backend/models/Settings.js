import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: mongoose.Schema.Types.Mixed,
  type: {
    type: String,
    enum: ["string", "number", "boolean", "object", "array"],
    default: "string",
  },
  description: String,
  category: {
    type: String,
    enum: ["general", "seo", "social", "payment", "shipping", "email"],
    default: "general",
  },
  isPublic: { type: Boolean, default: false },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Settings", settingsSchema);
