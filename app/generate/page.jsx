"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Generate() {
  const searchParams = useSearchParams();
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");

  useEffect(() => {
    const urlParam = searchParams.get("url");
    if (urlParam) {
      setOriginalUrl(decodeURIComponent(urlParam));
    }
  }, [searchParams]);

  const isValidUrl = (url) => {
    return url.length >= 3;
  };

  const handleGenerate = async () => {
    if (isValidUrl(originalUrl)) {
      //Logic main

      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            originalUrl: originalUrl,
            shortUrl: shortUrl,
          }),
        });
        const data = await response.json();

        if (data.success) {
          setGeneratedUrl(data.shortUrl);
          setShortUrl("");
        } else {
          alert("Error " + data.message);
        }
      } catch (error) {
        alert("error ");
      }
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

        {/* Short URL (custom) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Custom Short URL (optional)
          </label>
          <input
            type="text"
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
            placeholder="custom-name"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition"
          />
          <p className="text-gray-500 text-xs mt-1">
            Leave blank to generate automatically
          </p>
        </div>

        {/* Generated Short URL */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Generated Short URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={generatedUrl}
              readOnly
              placeholder="Your generated URL will appear here"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-400 border border-gray-700 cursor-not-allowed focus:outline-none"
            />
            <button
              onClick={() => {
                if (generatedUrl) {
                  navigator.clipboard.writeText(generatedUrl);
                  alert("Copied!");
                }
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition whitespace-nowrap text-sm flex items-center gap-1"
            >
              <span>📋</span> Copy
            </button>
          </div>
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
