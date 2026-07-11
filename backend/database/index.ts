import mongoose from 'mongoose';
import { env } from '../config/env';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`🚨 MongoDB Connection Error: ${error.message}`);
    console.warn(`The server will stay alive, but database operations will fail until connection is established.`);
    // We intentionally do NOT call process.exit(1) here to prevent Railway boot-loops.
  }
};

export default connectDB;
