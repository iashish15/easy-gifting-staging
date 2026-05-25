import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import cmsRoutes from "./routes/cmsRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { seedDefaultAdmin } from "./utils/seedAdmin.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://easygifting.in",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(helmet());
app.use(morgan("dev"));

// Root Route
app.get("/", (req, res) => {
  res.send("EasyGifting Backend API is running...");
});

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "EasyGifting API is running",
    dbConnected: app.locals.dbConnected || false,
  });
});

// Start Server Function
const startServer = async () => {
  try {
    const connected = await connectDB();
    app.locals.dbConnected = connected;

    // DB Protection Middleware
    const requireDb = (req, res, next) => {
      if (!app.locals.dbConnected) {
        return res.status(503).json({
          status: "error",
          message: "Database unavailable. Please check MongoDB connection.",
        });
      }
      next();
    };

    // ✅ Groq AI Chat Route (FREE)
    app.post("/api/chat", async (req, res) => {
      try {
        const { messages, system } = req.body;

        console.log("─── CHAT REQUEST ───────────────────────");
        console.log("Messages:", JSON.stringify(messages));
        console.log("Groq Key exists:", !!process.env.GROQ_API_KEY);

        const groqRes = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            },
            body: JSON.stringify({
              model: "llama-3.3-70b-versatile",
              messages: [{ role: "system", content: system }, ...messages],
              max_tokens: 300,
              temperature: 0.7,
            }),
          },
        );

        const data = await groqRes.json();
        console.log("Groq response:", JSON.stringify(data, null, 2));

        const text =
          data.choices?.[0]?.message?.content ||
          "I'm sorry, I couldn't process that. Please contact us on WhatsApp! 🙏";

        // ✅ Same response format — frontend needs no changes
        res.json({ content: [{ type: "text", text }] });
      } catch (error) {
        console.error("Groq error:", error);
        res.status(500).json({ error: "AI service unavailable" });
      }
    });

    // API Routes
    app.use("/api/auth", requireDb, authRoutes);
    app.use("/api/admin", requireDb, adminRoutes);
    app.use("/api/products", requireDb, productRoutes);
    app.use("/api/categories", requireDb, categoryRoutes);
    app.use("/api/brands", requireDb, brandRoutes);
    app.use("/api/orders", requireDb, orderRoutes);
    app.use("/api/reviews", requireDb, reviewRoutes);
    app.use("/api/cart", requireDb, cartRoutes);
    app.use("/api/wishlist", requireDb, wishlistRoutes);
    app.use("/api/upload", requireDb, uploadRoutes);
    app.use("/api/cms", requireDb, cmsRoutes);
    app.use("/api/coupons", requireDb, couponRoutes);
    app.use("/api/users", requireDb, userRoutes);

    // Error Middleware
    app.use(notFound);
    app.use(errorHandler);

    // Start Listening
    app.listen(PORT, "0.0.0.0", async () => {
      console.log(`Backend server running on http://localhost:${PORT}`);
      if (connected) {
        console.log("MongoDB connected successfully");
        try {
          await seedDefaultAdmin();
          console.log("Default admin seeded");
        } catch (seedError) {
          console.log("Admin seed skipped");
        }
      } else {
        console.log("Server running without database connection");
      }
    });
  } catch (error) {
    console.error("Server startup failed:");
    console.error(error);
    process.exit(1);
  }
};

startServer();
