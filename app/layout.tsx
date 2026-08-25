import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// Load Geist Sans font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Load Geist Mono font
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Site Metadata & SEO configuration
export const metadata: Metadata = {
  title: {
    default: "TrimLink - Fast & Simple URL Shortener",
    template: "%s | TrimLink",
  },
  description:
    "TrimLink makes it easy to shorten, customize, and manage your long URLs with custom handles and fast redirection.",
  openGraph: {
    title: "TrimLink - Fast & Simple URL Shortener",
    description: "Create custom short links quickly with TrimLink.",
    siteName: "TrimLink",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-700 text-white">
        {/* Navigation Bar across all pages */}
        <Navbar />

        {/* Main Content Container */}
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}