"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  const handleShorten = (e) => {
    e.preventDefault();
    if (url.trim()) {
      router.push(`/generate?url=${encodeURIComponent(url)}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 pb-20 px-4 flex flex-col items-center text-center">

        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lime-500/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-lime-500/10 border border-lime-500/20 rounded-full px-4 py-1.5 text-xs sm:text-sm text-lime-400 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
          <span>Next-Gen URL Shortener</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight max-w-4xl leading-[1.05]">
          Make every link <span className="text-lime-400 underline decoration-lime-400/30 underline-offset-8">count.</span>
        </h1>

        <p className="text-zinc-400 text-lg sm:text-xl mt-6 max-w-xl mx-auto font-normal leading-relaxed">
          Transform bloated, ugly URLs into clean, trackable, and secure short links in seconds. Zero clutter.
        </p>

        {/* Input Form Box */}
        <form
          onSubmit={handleShorten}
          className="mt-10 flex flex-col sm:flex-row items-center gap-3 max-w-2xl mx-auto w-full p-2 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl"
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long link here (https://...)"
            required
            className="w-full px-4 py-3.5 bg-transparent text-white placeholder-zinc-500 text-base focus:outline-none"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-lime-400 text-black font-bold px-8 py-3.5 rounded-xl hover:bg-lime-300 transition-all active:scale-95 whitespace-nowrap cursor-pointer shadow-lg shadow-lime-400/20"
          >
            Trim Link ⚡
          </button>
        </form>

        {/* Mini Preview Box (Interactive Feel) */}
        <div className="mt-8 flex items-center gap-3 text-xs sm:text-sm text-zinc-500 font-mono">
          <span className="bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800 text-zinc-400">trimlink.com/xyz99</span>
          <span>→</span>
          <span className="text-zinc-400 truncate max-w-[200px] sm:max-w-xs">https://your-super-long-annoying-url.com/blog/post-id-12345</span>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section className="py-20 px-4 border-t border-zinc-900 bg-zinc-950/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How it works in <span className="text-lime-400">3 simple steps</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2">
              Designed for speed, built for reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 relative">
              <span className="text-5xl font-black text-zinc-800 absolute top-4 right-6 select-none">01</span>
              <div className="text-lime-400 text-xl mb-3">🔗</div>
              <h3 className="text-white font-bold text-lg mb-2">Paste Link</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Copy your lengthy destination URL from any browser or app and paste it into TrimLink.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 relative">
              <span className="text-5xl font-black text-zinc-800 absolute top-4 right-6 select-none">02</span>
              <div className="text-lime-400 text-xl mb-3">⚙️</div>
              <h3 className="text-white font-bold text-lg mb-2">Customize & Set Expiry</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Optionally pick a custom alias name or configure your link to self-destruct after a set time.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 relative">
              <span className="text-5xl font-black text-zinc-800 absolute top-4 right-6 select-none">03</span>
              <div className="text-lime-400 text-xl mb-3">🚀</div>
              <h3 className="text-white font-bold text-lg mb-2">Share & Track</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Hit generate, copy your polished short link, and share it anywhere instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-20 px-4 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-lime-400 font-semibold text-xs tracking-widest uppercase">Powerful Engine</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2 mb-4">
              Built for performance and clean aesthetics.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
              Unlike clunky URL shorteners filled with intrusive ads and redirects, TrimLink provides an uncompromised developer-first experience.
            </p>
            <ul className="space-y-3 text-zinc-300 text-sm">
              <li className="flex items-center gap-2">✓ <span className="text-white font-medium">Lightning-fast MongoDB indexing</span></li>
              <li className="flex items-center gap-2">✓ <span className="text-white font-medium">Custom short link handles</span></li>
              <li className="flex items-center gap-2">✓ <span className="text-white font-medium">Automatic expiration options (10m to 24h)</span></li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-center items-center text-center">
            <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-lime-500/10 border border-lime-500/20 rounded-2xl flex items-center justify-center text-lime-400 text-2xl mx-auto mb-4">
                ⚡
              </div>
              <h3 className="text-white font-bold text-xl">Ready to shorten?</h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1 mb-6">No account or signup required to get started.</p>
              <Link
                href="/generate"
                className="inline-block bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-zinc-200 transition-all text-sm shadow-lg"
              >
                Launch Shortener →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}