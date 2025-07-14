import { logger } from "../../logger";
import mongoose from "mongoose";

// Connect to the database 
export const connectDB = async (url: string) => {
    mongoose.connection.on('connected', () => {
        logger.info('MongoDB connected successfully');
    })

    mongoose.connection.on('error', (err) => {
        logger.error('MongoDB connection error', err);
    })

    mongoose.connection.on('disconnected', (err) => {
        logger.error('MongoDB disconnected', err);
    })

    await mongoose.connect(url, {});

    return true;
}