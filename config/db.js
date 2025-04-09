import mongoose from 'mongoose';


const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://hodasaghaei:5yEqck04CMgdyvjs@cluster0.wjrk1wa.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0');
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`MongoDB connection failed: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;