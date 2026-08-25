import React from "react";

// Page Metadata for SEO (Works because this is a Server Component)
export const metadata = {
  title: "About Us",
  description:
    "Learn more about TrimLink — a fast, modern URL shortener built with Next.js, Tailwind CSS, and MongoDB.",
};

export default function About() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-3 sm:px-4 py-6">
      <div className="bg-black border border-gray-800 rounded-2xl p-5 sm:p-8 max-w-2xl w-full">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-white text-center mb-4">
          About TrimLink
        </h1>

        {/* Description Paragraphs */}
        <p className="text-gray-400 text-center text-xs sm:text-sm leading-relaxed">
          TrimLink is a simple and efficient tool that takes long, messy
          URLs and transforms them into short, clean, and shareable links.
        </p>

        <p className="text-gray-400 text-center text-xs sm:text-sm leading-relaxed mt-3">
          Whether you&apos;re sharing on social media, sending emails, or posting in
          chat, short links save space and look more professional.
        </p>

        <p className="text-gray-400 text-center text-xs sm:text-sm leading-relaxed mt-3">
          Built with Next.js, Tailwind CSS, and MongoDB — this project is
          open-source and free to use.
        </p>

        {/* Version Badge */}
        <div className="mt-6 pt-4 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            <span className="text-white font-medium">Version:</span> 1.0.1
          </p>
        </div>
      </div>
    </main>
  );
}