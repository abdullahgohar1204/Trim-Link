import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Url from "@/models/url"

export async function POST(request) {

    try {
        const connection = await connectDB();
        console.log("\n\nConnected to database:", connection.connection.db.databaseName, "\n\n");
        const body = await request.json()
        const shortId = Math.random().toString(36).substring(2, 7);
        const shortUrl = `http://localhost:3000/${shortId}`;

        const newEntry = new Url({
            shortId: shortId,
            originalUrl: body.originalUrl,
            shortUrl: shortUrl
        })

        await newEntry.save();

        return NextResponse.json({
            success: true,
            shortId,
            shortUrl,
            message: "Short URL generated and saved"
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}






