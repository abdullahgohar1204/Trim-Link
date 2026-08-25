import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 text-center select-none">
            <div className="bg-black border border-zinc-800 rounded-2xl p-8 sm:p-10 max-w-lg w-full shadow-2xl flex flex-col items-center">
                {/* Monochromatic 404 Badge */}
                <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-3xl font-extrabold flex items-center justify-center mb-6 shadow-inner">
                    404
                </div>

                {/* Heading */}
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                    Link Not Found
                </h1>

                {/* Informational Text to ensure Chrome payload threshold is met */}
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
                    The short link you are trying to access does not exist, has expired, or may have been typed incorrectly. Please double-check your link or create a new shortened URL below.
                </p>

                {/* Primary Action Button */}
                <Link
                    href="/generate"
                    className="w-full bg-white text-black font-semibold py-3.5 px-6 rounded-xl hover:bg-zinc-200 transition-all duration-200 active:scale-95 text-sm sm:text-base shadow-md"
                >
                    Create New Short Link
                </Link>
            </div>

            {/* Padding footer to maintain proper layout height */}
            <footer className="mt-8 text-zinc-600 text-xs">
                TrimLink &bull; URL Shortener Service
            </footer>
        </main>
    );
}