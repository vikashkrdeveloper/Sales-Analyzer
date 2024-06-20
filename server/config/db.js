import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const connectDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed');
        process.exit(1);
    }
};

connectDB();
export const database = mongoose;