import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/app";

export async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}
