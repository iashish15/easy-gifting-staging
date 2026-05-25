import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, unique: true },
  description: { type: String },
  logo: { type: String },
  website: { type: String },
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
brandSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "-")
      .replace(/-+/g, "-");
  }
  next();
});

const Brand = mongoose.models.Brand || mongoose.model("Brand", brandSchema);

export default Brand;

// Preloaded brands data
export const preloadedBrands = [
  { name: "Nike", description: "Leading athletic footwear and apparel brand" },
  { name: "Adidas", description: "Global sports brand" },
  { name: "Puma", description: "German multinational corporation" },
  { name: "Reebok", description: "American fitness brand" },
  { name: "Gucci", description: "Italian luxury brand" },
  { name: "Louis Vuitton", description: "French luxury fashion house" },
  { name: "Apple", description: "American technology company" },
  { name: "Samsung", description: "South Korean multinational conglomerate" },
  { name: "Sony", description: "Japanese multinational conglomerate" },
  { name: "H&M", description: "Swedish multinational clothing company" },
  { name: "Zara", description: "Spanish fast fashion retailer" },
  { name: "Levi's", description: "American clothing company" },
  { name: "Rolex", description: "Swiss luxury watch manufacturer" },
  { name: "Fossil", description: "American watch and lifestyle company" },
  { name: "JBL", description: "American audio hardware company" },
  { name: "Boat", description: "Indian consumer electronics brand" },
  {
    name: "HP",
    description: "American multinational information technology company",
  },
  {
    name: "Dell",
    description: "American multinational computer technology company",
  },
  { name: "Lenovo", description: "Chinese multinational technology company" },
  {
    name: "Casio",
    description: "Japanese multinational electronics manufacturing company",
  },
  { name: "Titan", description: "Indian watch manufacturing company" },
  { name: "Ray-Ban", description: "Italian-Italian brand of sunglasses" },
  { name: "Tommy Hilfiger", description: "American fashion designer" },
  { name: "Calvin Klein", description: "American fashion designer" },
];
