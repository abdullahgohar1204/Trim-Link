import mongoose from "mongoose"

const connectDB = async () => {
    const uri = process.env.MONGODB_URI
    if (uri) {
        try {
            const connection = await mongoose.connect(uri);
            console.log("\n\nMongodb connected Sucessfully !!\n\n")
            return connection;
        } catch (error) {
            throw new Error("\nMONGODB Connection Failed :", error.message);
        }
    }
};

export default connectDB;