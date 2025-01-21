import mongoose from 'mongoose';


const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/notes');
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`MongoDB connection failed: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;