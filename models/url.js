import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    expiresAt: { type: Date, default: null },
},
    { timestamps: true }
)

UrlSchema.index({ expiresAt: { expireAfterSeconds: 0 } });

export default mongoose.models.Url || mongoose.model('Url', UrlSchema);


