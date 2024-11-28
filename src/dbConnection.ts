import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {

    const mongoURI: any = process.env.MONGO_URI 
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
     throw new Error('Connection failed');
  }
};
export default connectDB;