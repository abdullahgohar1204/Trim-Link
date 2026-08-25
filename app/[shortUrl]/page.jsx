import { redirect, notFound } from "next/navigation";
import connectdb from "@/lib/mongodb";
import Url from "@/models/url";

export default async function RedirectPage({ params }) {
  // 1. Establish connection to MongoDB Atlas database
  await connectdb();

  // 2. Await route parameters
  const { shortUrl } = await params;

  // 3. Safety check for valid short handle parameter
  if (!shortUrl || typeof shortUrl !== "string") {
    notFound();
  }

  // 4. Query database for matching short handle
  const urlRecord = await Url.findOne({ shortUrl: shortUrl.trim() });

  // 5. If no record is found, render standard Next.js 404 page
  if (!urlRecord) {
    notFound();
  }

  // 6. Redirect visitor directly to original destination URL
  redirect(urlRecord.originalUrl);
}