import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const LOCAL_MONGO_URI = "mongodb://127.0.0.1:27017/easyfiting";

const isInvalidMongoUri = (uri) => {
  if (!uri) return true;
  return ["<username>", "<password>", "cluster0.mongodb.net"].some(
    (placeholder) => uri.includes(placeholder),
  );
};

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    if (isInvalidMongoUri(mongoUri)) {
      console.warn(
        "MongoDB URI is missing or invalid. Falling back to local MongoDB://127.0.0.1:27017/easyfiting.",
      );
      mongoUri = LOCAL_MONGO_URI;
    }

    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error.message || error);
    return false;
  }
};

export default connectDB;
