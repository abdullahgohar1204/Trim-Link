import { redirect, notFound } from "next/navigation";
import connectdb from "@/lib/mongodb";
import Url from "@/models/url";

export default async function Page({ params }) {
  //connect db
  await connectdb();

  //get body
  const { shortUrl } = await params;

  const urlRecord = await Url.findOne({ shortUrl: shortUrl });

  if (!urlRecord) {
    notFound();
  }
  redirect(urlRecord.originalUrl);
}
