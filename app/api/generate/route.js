import Url from "@/models/url"
import { NextResponse } from "next/server";
import connectdb from "@/lib/mongodb";


export async function POST(request) {
    try {
        //connect db
        await connectdb();

        //get body
        const body = await request.json()
        const { originalUrl, shortUrl } = body

        //shortid checking 
        let shortId = ""

        if (shortUrl && shortUrl.trim().length > 0) {
            shortId = shortUrl.trim().replace(/\s+/g, '-').toLowerCase();

            // Validate: Allow ONLY letters, numbers, hyphens, and underscores
            const isValidShortId = /^[a-zA-Z0-9_-]+$/.test(shortId);

            if (!isValidShortId) {
                return NextResponse.json({
                    success: false,
                    error: "Invalid short URL format",
                    message: "Custom short URL can only contain letters, numbers, hyphens (-), and underscores (_)."
                }, { status: 400 });
            }
            //check if already existing
            const existing = await Url.findOne({ shortUrl: body.shortUrl });
            if (existing) {
                return NextResponse.json({
                    success: false,
                    error: "Short name already taken",
                    message: `"${body.shortUrl}" is already taken. Please choose another.`
                }, { status: 400 });
            }
        }
        else {
            // Auto-generate short ID
            let isUnique = false
            while (!isUnique) {
                shortId = Math.random().toString(36).substring(2, 7);
                const existing = await Url.findOne({ shortUrl: shortId })
                if (!existing) {
                    isUnique = true
                }
            }
        }

        //generate url 
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const fullShortUrl = `${baseUrl}/${shortId}`;

        //save in db 
        const newUrl = new Url({
            originalUrl: originalUrl,
            shortUrl: shortId
        })
        await newUrl.save();

        //response on success
        return NextResponse.json({
            success: true,
            shortUrl: fullShortUrl,
            message: "URL shortened successfully"
        });
    }//response on error
    catch (error) {
        return NextResponse.json({
            success: false,
            error: "Server error",
            message: error.message
        }, { status: 500 });
    }
}
