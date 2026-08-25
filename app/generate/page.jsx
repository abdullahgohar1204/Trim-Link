"use client";

import { Toaster, toast } from "react-hot-toast";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function GenerateContent() {
  const searchParams = useSearchParams();
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [expiration, setExpiration] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

    if (isSubmitting || !isValidUrl(originalUrl)) return;

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
            expiration: expiration,
          }),
        });
        const data = await response.json();

        if (data.success) {
          setGeneratedUrl(data.shortUrl);
          toast.success("Link trimmed successfully!", {
            icon: "⚡",
            style: { background: "#111", color: "#a3e635", borderColor: "#a3e635" },
          });
        } else {
          if (data.message && data.message.toLowerCase().includes("taken")) {
            setErrorMessage(`"${shortUrl}" is already taken. Choose another.`);
            toast.error("Short name already taken!", {
              icon: "❌",
              style: { background: "#111", color: "#ef4444", borderColor: "#ef4444" },
            });
          } else {
            setErrorMessage(data.message || "Failed to generate link.");
          }
        }
      } catch (error) {
        setErrorMessage("Network error: Server did not respond.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCopy = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl);
      toast.success("Copied to clipboard!", {
        icon: "📋",
        style: { background: "#111", color: "#a3e635", borderColor: "#a3e635" },
      });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-10 relative overflow-hidden bg-gradient-to-b from-zinc-950 via-black to-zinc-950">

      {/* Ambient Background Glow (Design Point #2) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lime-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div
        className={`relative bg-black/80 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-6 sm:p-10 max-w-xl w-full shadow-2xl transition-all duration-300 ${isSubmitting ? "opacity-75 pointer-events-none select-none" : ""
          }`}
      >
        {/* Visual Anchor / Pill Badge (Design Point #3 & #5) */}
        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-lime-500/10 text-lime-400 border border-lime-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse"></span>
            ⚡ Lightning Fast Shortener
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white text-center tracking-tight mb-6">
          Trim Your Link
        </h2>

        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs sm:text-sm text-center font-medium flex items-center justify-center gap-2">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleGenerate} className="space-y-4">
          {/* Original URL Input */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
              Original URL
            </label>
            <input
              type="url"
              value={originalUrl}
              disabled={isSubmitting}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com/your-long-url"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 text-white border border-zinc-800 text-base focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all duration-200 disabled:opacity-50"
            />
          </div>

          {/* Custom Short Handle Input */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
              Custom Short Name for URL <span className="text-zinc-600">(optional)</span>
            </label>
            <input
              type="text"
              value={shortUrl}
              disabled={isSubmitting}
              onChange={(e) => setShortUrl(e.target.value)}
              placeholder="custom-name"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 text-white border border-zinc-800 text-base focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all duration-200 disabled:opacity-50"
            />
            <p className="text-zinc-500 text-xs mt-1">
              Leave blank to auto-generate a unique ID
            </p>
          </div>

          {/* Link Expiration Selector Dropdown */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
              Link Expiration
            </label>
            <select
              value={expiration}
              disabled={isSubmitting}
              onChange={(e) => setExpiration(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-base focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all duration-200 disabled:opacity-50 cursor-pointer ${expiration === "" ? "text-zinc-500" : "text-white"
                }`}
            >
              <option value="" disabled className="text-zinc-600">
                Select expiration time (Defaults to Never)
              </option>
              <option value="never" className="text-white bg-zinc-900">Never Expire</option>
              <option value="1h" className="text-white bg-zinc-900">1 Hour</option>
              <option value="6h" className="text-white bg-zinc-900">6 Hours</option>
              <option value="12h" className="text-white bg-zinc-900">12 Hours</option>
              <option value="24h" className="text-white bg-zinc-900">24 Hours</option>
              <option value="7d" className="text-white bg-zinc-900">7 Days</option>
            </select>
          </div>

          {/* Generated Link Display & Copy Control */}
          <div className="pt-2">
            <label className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
              Trimmed Link
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              {generatedUrl ? (
                <a
                  href={generatedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 text-lime-400 border border-zinc-800 text-base font-mono underline hover:text-lime-300 transition truncate cursor-pointer block"
                >
                  {generatedUrl}
                </a>
              ) : (
                <input
                  type="text"
                  readOnly
                  placeholder="Your generated URL will appear here"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 text-zinc-600 border border-zinc-800/60 focus:outline-none text-base cursor-not-allowed"
                />
              )}
              <button
                type="button"
                onClick={handleCopy}
                disabled={!generatedUrl || isSubmitting}
                className={`w-full sm:w-auto px-5 py-3 rounded-xl transition-all duration-200 whitespace-nowrap text-sm font-medium flex items-center justify-center gap-1.5 ${copied
                  ? "bg-zinc-800 text-lime-400"
                  : generatedUrl
                    ? "bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer active:scale-95"
                    : "bg-zinc-900 text-zinc-600 cursor-not-allowed"
                  }`}
              >
                <span>{copied ? "✓" : "📋"}</span>
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Action Submit Button with Lime Accent (Design Point #1 & #4) */}
          <button
            type="submit"
            disabled={!isValidUrl(originalUrl) || isSubmitting}
            className={`w-full font-bold py-3.5 rounded-xl transition-all duration-200 active:scale-95 text-base flex items-center justify-center gap-2 mt-4 ${isValidUrl(originalUrl) && !isSubmitting
              ? "bg-lime-400 text-black hover:bg-lime-300 shadow-lg shadow-lime-400/20 cursor-pointer"
              : "bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed"
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
                <span>Trimming link...</span>
              </>
            ) : (
              <span>Trim Link </span>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

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
        }}
      />
      <Suspense
        fallback={
          <div className="min-h-[85vh] flex items-center justify-center text-white bg-black">
            Loading...
          </div>
        }
      >
        <GenerateContent />
      </Suspense>
    </>
  );
}