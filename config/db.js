import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("db is connected✅");
        
    } catch (error) {
        console.log((error.message));
        
        throw new Error("Something went wrong")
    }
}