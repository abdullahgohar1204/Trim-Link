"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Generate() {
  const searchParams = useSearchParams();
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  useEffect(() => {
    const urlParam = searchParams.get("url");
    if (urlParam) {
      setOriginalUrl(decodeURIComponent(urlParam));
    }
  }, [searchParams]);

  const isValidUrl = (url) => {
    return url.length >= 5;
  };

  const handleGenerate = () => {
    if (isValidUrl(originalUrl)) {
      // TODO: Implement actual URL shortening
      setShortUrl("https://short.link/abc123");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-black border border-gray-800 rounded-2xl p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Generate Short URL
        </h2>

        {/* Original URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Original URL
          </label>
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com/your-long-url"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition"
          />
        </div>

        {/* Short URL */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Short URL
          </label>
          <input
            type="text"
            value={shortUrl}
            readOnly
            placeholder="Your short URL will appear here"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-400 border border-gray-700 cursor-not-allowed focus:outline-none"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!isValidUrl(originalUrl)}
          className={`w-full font-semibold py-2.5 rounded-lg transition active:scale-95 ${
            isValidUrl(originalUrl)
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          Generate
        </button>
      </div>
    </div>
  );
}
