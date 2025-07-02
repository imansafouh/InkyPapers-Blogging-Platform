import mongoose from "mongoose";

export const connectDB = async () => {
  const MONGO_URI = process.env.DATABASE_LOCAL;
  if (!MONGO_URI) throw new Error("MONGO_URI not found");
  await mongoose.connect(MONGO_URI);
  console.log("✅ MongoDB connected");
};
