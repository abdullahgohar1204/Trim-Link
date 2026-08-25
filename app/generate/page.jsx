"use client";

import { Toaster, toast } from "react-hot-toast";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// 1. Inner component containing form state & hooks
function GenerateContent() {
  const searchParams = useSearchParams();
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // States for handling submit state locks and inline error messaging
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const urlParam = searchParams.get("url");
    if (urlParam) {
      setOriginalUrl(decodeURIComponent(urlParam));
    }
  }, [searchParams]);

  // Validates standard domain and URL structures
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

    // Guard Clause: Instantly drops execution if submitting or invalid
    if (isSubmitting || !isValidUrl(originalUrl)) return;

    // Set submit state and reset messages
    setIsSubmitting(true);
    setErrorMessage("");
    setGeneratedUrl("");

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
          toast.success("Link trimmed !", {
            icon: "✅",
            style: { borderColor: "#22c55e" },
          });
        } else {
          // Dark-themed inline error handling matching site styling
          if (data.message && data.message.toLowerCase().includes("taken")) {
            setErrorMessage(`"${shortUrl}" is already taken. Please choose another.`);
            toast.error("Short name already taken!", {
              icon: "❌",
              style: { borderColor: "#ef4444" },
            });
          } else {
            setErrorMessage(data.message || "Failed to generate link.");
          }
        }
      } catch (error) {
        setErrorMessage("Network error: Server did not respond.");
      } finally {
        // Unlock submit state when request completes
        setIsSubmitting(false);
      }
    }
  };

  const handleCopy = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl);
      toast.success("Copied", {
        icon: "✅",
        style: { borderColor: "#22c55e" },
      }); setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-3 sm:px-4 py-6">
      <div
        className={`bg-black border border-gray-800 rounded-2xl p-5 sm:p-8 max-w-2xl w-full transition-all duration-300 ${isSubmitting ? "opacity-75 backdrop-blur-sm pointer-events-none select-none" : ""
          }`}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-6">
          Trim Link
        </h2>

        {/* NEW: Changed bg-gray-500 to bg-zinc-900 to fix theme background bug */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs sm:text-sm text-center font-medium flex items-center justify-center gap-2">
            <span className="text-zinc-400">⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleGenerate}>
          {/* Original URL Input */}
          <div className="mb-4">
            <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1">
              Original URL
            </label>
            <input
              type="url"
              value={originalUrl}
              disabled={isSubmitting}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com/your-long-url"
              className="w-full px-4 py-2.5 rounded-lg bg-gray-900 text-white border border-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-white transition disabled:opacity-50"
            />
          </div>

          {/* Custom Short Handle Input */}
          <div className="mb-4">
            <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1">
              Custom Short URL (optional)
            </label>
            <input
              type="text"
              value={shortUrl}
              disabled={isSubmitting}
              onChange={(e) => setShortUrl(e.target.value)}
              placeholder="custom-name"
              className="w-full px-4 py-2.5 rounded-lg bg-gray-900 text-white border border-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-white transition disabled:opacity-50"
            />
            <p className="text-gray-500 text-xs mt-1">
              Leave blank to generate automatically
            </p>
          </div>

          {/* Generated Link Display & Copy Control */}
          <div className="mb-6">
            <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1">
              Trimmed Link
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
                disabled={!generatedUrl || isSubmitting}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-lg transition-all duration-200 whitespace-nowrap text-sm flex items-center justify-center gap-1.5 ${copied
                  ? "bg-zinc-700 text-white font-medium cursor-pointer"
                  : generatedUrl
                    ? "bg-gray-800 hover:bg-gray-700 text-white cursor-pointer"
                    : "bg-gray-900 text-[#666] cursor-not-allowed"
                  }`}
              >
                <span>{copied ? "✓" : "📋"}</span>
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Action Submit Button with Loading State */}
          <button
            type="submit"
            disabled={!isValidUrl(originalUrl) || isSubmitting}
            className={`w-full font-semibold py-3 rounded-lg transition active:scale-95 text-sm sm:text-base flex items-center justify-center gap-2 ${isValidUrl(originalUrl) && !isSubmitting
              ? "bg-white text-black hover:bg-gray-200 cursor-pointer"
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Trimming...</span>
              </>
            ) : (
              <span>Trim</span>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

// 2. Default export wrapped in Suspense for Next.js build requirements
export default function Generate() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid #333",
            borderRadius: "12px",
            padding: "14px 20px",
            fontSize: "14px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
          },
          success: {
            duration: 2500,
            style: {
              borderColor: "#22c55e",
              color: "#22c55e",
            },
          },
          error: {
            duration: 3500,
            style: {
              borderColor: "#ef4444",
              color: "#ef4444",
            },
          },
        }}
      />
      <Suspense
        fallback={
          <div className="min-h-[80vh] flex items-center justify-center text-white">
            Loading...
          </div>
        }
      >
        <GenerateContent />
      </Suspense>
    </>
  );
}