import Url from "@/models/url";
import { NextResponse } from "next/server";
import connectdb from "@/lib/mongodb";

export async function POST(request) {
    try {
        // 1. Establish connection to MongoDB Atlas database
        await connectdb();

        // 2. Parse request body
        const body = await request.json();
        let { originalUrl, shortUrl, expiration } = body;


        // Validate presence of original URL
        if (!originalUrl) {
            return NextResponse.json(
                { success: false, message: "Original URL is required." },
                { status: 400 }
            );
        }

        // Ensure protocol exists on original URL
        let formattedOriginalUrl = originalUrl.trim();
        if (
            !formattedOriginalUrl.startsWith("http://") &&
            !formattedOriginalUrl.startsWith("https://")
        ) {
            formattedOriginalUrl = `https://${formattedOriginalUrl}`;
        }

        let shortId = "";

        // 3. Process custom short link handle if provided
        if (shortUrl && shortUrl.trim().length > 0) {
            shortId = shortUrl.trim().replace(/\s+/g, "-").toLowerCase();

            // Validate custom handle formatting (alphanumeric, hyphens, underscores)
            const isValidShortId = /^[a-zA-Z0-9_-]+$/.test(shortId);
            if (!isValidShortId) {
                return NextResponse.json(
                    {
                        success: false,
                        error: "Invalid short URL format",
                        message:
                            "Custom short URL can only contain letters, numbers, hyphens (-), and underscores (_).",
                    },
                    { status: 400 }
                );
            }

            // Check if custom short handle is already taken in database
            const existing = await Url.findOne({ shortUrl: shortId });
            if (existing) {
                return NextResponse.json(
                    {
                        success: false,
                        error: "Short name already taken",
                        message: `"${shortId}" is already taken. Please choose another.`,
                    },
                    { status: 400 }
                );
            }
        } else {
            // 4. Auto-generate unique 5-character short ID if no custom handle provided
            let isUnique = false;
            while (!isUnique) {
                shortId = Math.random().toString(36).substring(2, 7);
                const existing = await Url.findOne({ shortUrl: shortId });
                if (!existing) {
                    isUnique = true;
                }
            }
        }

        // 5. Construct final full short URL using current deployment domain
        const baseUrl =
            process.env.NEXT_PUBLIC_BASE_URL || "https://trim-link-web.vercel.app";
        const fullShortUrl = `${baseUrl}/${shortId}`;


        //Expiring part
        let expiresAt = null;
        const now = new Date()

        //checking users input 
        if (expiration === "1h") {
            expiresAt = new Date(now.getTime() + 1 * 60 * 60 * 1000);
        } else if (expiration === "6h") {
            expiresAt = new Date(now.getTime() + 6 * 60 * 60 * 1000);
        } else if (expiration === "12h") {
            expiresAt = new Date(now.getTime() + 12 * 60 * 60 * 1000);
        } else if (expiration === "24h") {
            expiresAt = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
        } else if (expiration === "7d") {
            expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        } else {
            expiresAt = null;
        }


        // 6. Save document to MongoDB
        const newUrl = new Url({
            originalUrl: formattedOriginalUrl,
            shortUrl: shortId,
            expiresAt: expiresAt,
        });
        await newUrl.save();

        // 7. Return successful response
        return NextResponse.json({
            success: true,
            shortUrl: fullShortUrl,
            message: "URL shortened successfully",
        });
    } catch (error) {
        // Return error response for server/database failures
        return NextResponse.json(
            {
                success: false,
                error: "Server error",
                message: error.message,
            },
            { status: 500 }
        );
    }
}