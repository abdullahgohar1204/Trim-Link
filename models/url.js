import mongoose from "mongoose"

const UrlSchema = new mongoose.Schema({
    shortId: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Url || mongoose.model('Url', UrlSchema);






