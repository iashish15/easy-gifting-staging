import bcrypt from "bcryptjs";
import Admin from "../models/adminModel.js";

export const seedDefaultAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@easygifting.com";
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const password = process.env.ADMIN_PASSWORD || "EasyGifting@123";
      const hashedPassword = await bcrypt.hash(password, 10);
      await Admin.create({
        name: "EasyGifting Admin",
        email: adminEmail,
        password: hashedPassword,
      });
      console.log("Default admin seeded:", adminEmail);
    }
  } catch (error) {
    console.error("Could not seed admin user:", error);
  }
};
