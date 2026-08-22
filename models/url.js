import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
},
    { timestamps: true }
)

export default mongoose.models.Url || mongoose.model('Url', UrlSchema);


