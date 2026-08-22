import mongoose from "mongoose";

const mongodb = process.env.MONGODB_URI
console.log(mongodb)

if (!mongodb) {
    throw new Error("Mongodb not connected")
}
let isConnected = false

export default async function connectdb() {
    if (isConnected) {
        return;
    }
    await mongoose.connect(mongodb);
    isConnected = true
    console.log("\n\nMongodb connected\n\n")
}