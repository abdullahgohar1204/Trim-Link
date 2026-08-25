import React from "react";

// Page Metadata for SEO (Works because this is a Server Component)
export const metadata = {
  title: "About Us",
  description:
    "Learn more about TrimLink — a fast, modern URL shortener built with Next.js, Tailwind CSS, and MongoDB.",
};

export default function About() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-3 sm:px-4 py-8">
      <div className="relative bg-black/80 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-6 sm:p-10 max-w-2xl w-full shadow-2xl">

        {/* Lime Accent Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-lime-500/10 text-lime-400 border border-lime-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse"></span>
            ✦ About The Project
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-white text-center tracking-tight mb-6">
          About Trim<span className="text-lime-400">Link</span>
        </h1>

        {/* Description Paragraphs */}
        <div className="space-y-4 text-zinc-400 text-center text-sm sm:text-base leading-relaxed">
          <p>
            TrimLink is a simple and efficient tool that takes long, messy
            URLs and transforms them into short, clean, and shareable links.
          </p>

          <p>
            Whether you&apos;re sharing on social media, sending emails, or posting in
            chat, short links save space and look much more professional.
          </p>

          <p>
            Built using <span className="text-white font-medium">Next.js</span>,{" "}
            <span className="text-white font-medium">Tailwind CSS</span>, and{" "}
            <span className="text-white font-medium">MongoDB</span> with custom expiration options.
          </p>
        </div>

        {/* Version Badge & Info */}
        <div className="mt-8 pt-5 border-t border-zinc-800/80 flex items-center justify-between text-xs sm:text-sm text-zinc-500">
          <span>Open-source & Free</span>
          <p>
            <span className="text-zinc-300 font-medium">Version:</span> <span className="text-lime-400 font-mono">1.0.1</span>
          </p>
        </div>
      </div>
    </main>
  );
}