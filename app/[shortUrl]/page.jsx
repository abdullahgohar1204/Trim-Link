import Url from "@/models/url";
import connectdb from "@/lib/mongodb";
import { redirect, notFound } from "next/navigation";

export default async function RedirectPage({ params }) {
    // 1. Await dynamic URL params (Next.js 15/16 requirement)
    const { shortUrl } = await params;

    await connectdb();

    // 2. Query MongoDB for handle
    const urlData = await Url.findOne({ shortUrl: shortUrl });

    // 3. If missing, trigger Next.js notFound UI renderer
    if (!urlData) {
        notFound();
    }

    // 4. If found, redirect directly to long URL
    redirect(urlData.originalUrl);
}