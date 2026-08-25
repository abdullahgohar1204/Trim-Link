"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// 1. Inner component containing form state & hooks
function GenerateContent() {
  const searchParams = useSearchParams();
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const urlParam = searchParams.get("url");
    if (urlParam) {
      setOriginalUrl(decodeURIComponent(urlParam));
    }
  }, [searchParams]);

  const isValidUrl = (urlString) => {
    let testUrl = urlString.trim();
    if (!testUrl.startsWith("http://") && !testUrl.startsWith("https://")) {
      testUrl = "https://" + testUrl;
    }

    try {
      const url = new URL(testUrl);
      return url.hostname.includes(".");
    } catch (error) {
      return false;
    }
  };

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    if (isValidUrl(originalUrl)) {
      let normalizedUrl = originalUrl.trim();
      if (
        !normalizedUrl.startsWith("http://") &&
        !normalizedUrl.startsWith("https://")
      ) {
        normalizedUrl = "https://" + normalizedUrl;
      }
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            originalUrl: normalizedUrl,
            shortUrl: shortUrl,
          }),
        });
        const data = await response.json();

        if (data.success) {
          setGeneratedUrl(data.shortUrl);
        } else {
          alert("Error: " + data.message);
        }
      } catch (error) {
        alert("Failed to generate URL.");
      }
    }
  };

  const handleCopy = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-3 sm:px-4 py-6">
      <div className="bg-black border border-gray-800 rounded-2xl p-5 sm:p-8 max-w-2xl w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-6">
          Generate Short URL
        </h2>

        {/* Original URL */}
        <div className="mb-4">
          <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1">
            Original URL
          </label>
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com/your-long-url"
            className="w-full px-4 py-2.5 rounded-lg bg-gray-900 text-white border border-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-white transition"
          />
        </div>

        {/* Short URL (custom) */}
        <div className="mb-4">
          <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1">
            Custom Short URL (optional)
          </label>
          <input
            type="text"
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
            placeholder="custom-name"
            className="w-full px-4 py-2.5 rounded-lg bg-gray-900 text-white border border-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-white transition"
          />
          <p className="text-gray-500 text-xs mt-1">
            Leave blank to generate automatically
          </p>
        </div>

        {/* Generated Short URL Output */}
        <div className="mb-6">
          <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1">
            Generated Short URL
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            {generatedUrl ? (
              <a
                href={generatedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2.5 rounded-lg bg-gray-900 text-blue-400 border border-gray-700 text-base font-mono underline hover:text-blue-300 transition truncate cursor-pointer block"
              >
                {generatedUrl}
              </a>
            ) : (
              <input
                type="text"
                readOnly
                placeholder="Your generated URL will appear here"
                className="w-full px-4 py-2.5 rounded-lg bg-gray-900 text-gray-500 border border-gray-700 focus:outline-none text-base cursor-not-allowed"
              />
            )}
            <button
              type="button"
              onClick={handleCopy}
              disabled={!generatedUrl}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-lg transition whitespace-nowrap text-sm flex items-center justify-center gap-1.5 ${generatedUrl
                ? "bg-gray-800 hover:bg-gray-700 text-white cursor-pointer"
                : "bg-gray-900 text-[#666] cursor-not-allowed"
                }`}
            >
              <span>{copied ? "✓" : "📋"}</span>
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!isValidUrl(originalUrl)}
          className={`w-full font-semibold py-3 rounded-lg transition active:scale-95 text-sm sm:text-base ${isValidUrl(originalUrl)
            ? "bg-white text-black hover:bg-gray-200 cursor-pointer"
            : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
        >
          Generate
        </button>
      </div>
    </div>
  );
}

// 2. Default export wrapped in Suspense for Next.js build requirement
export default function Generate() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center text-white">Loading...</div>}>
      <GenerateContent />
    </Suspense>
  );
}