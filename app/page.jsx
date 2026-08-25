"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  // Handles redirecting to /generate with pre-filled query param
  const handleShorten = (e) => {
    e.preventDefault();
    if (url.trim()) {
      router.push(`/generate?url=${encodeURIComponent(url)}`);
    }
  };

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gray-800/80 border border-gray-700 rounded-full px-4 py-1.5 text-sm text-gray-300 mb-6 backdrop-blur-sm">
          <span>✦ Instant & Free</span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.1]">
          Trim Link{" "}
          <span className="block sm:inline text-gray-400">instantly.</span>
        </h1>

        {/* Hero Description */}
        <p className="text-gray-400 text-lg mt-4 max-w-lg mx-auto">
          Paste your link and get a trimmed URL in one click.
        </p>

        {/* Input Form */}
        <form
          onSubmit={handleShorten}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto w-full"
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/your-long-url"
            required
            className="w-full px-5 py-3.5 rounded-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 text-base focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:bg-gray-200 transition active:scale-95 whitespace-nowrap cursor-pointer"
          >
            Trim →
          </button>
        </form>

        {/* Features Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 text-sm">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <div className="font-medium text-white">⚡ Fast</div>
            <div className="text-gray-500 text-xs mt-1">
              Instant link generation
            </div>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <div className="font-medium text-white">🔗 Short</div>
            <div className="text-gray-500 text-xs mt-1">
              Clean, memorable links
            </div>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <div className="font-medium text-white">🆓 Free</div>
            <div className="text-gray-500 text-xs mt-1">
              No sign-up required
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}