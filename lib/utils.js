// lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import mongoose from "mongoose";

// 1. Tailwind utility for class merging
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// 2. MongoDB connection function
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "hotel-booking",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB connection error:", err);
    throw err;
  }
};
