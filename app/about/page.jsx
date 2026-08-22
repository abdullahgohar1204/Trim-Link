export default function About() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-3 sm:px-4 py-6">
      <div className="bg-black border border-gray-800 rounded-2xl p-5 sm:p-8 max-w-2xl w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-4">
          About URL Shortener
        </h2>
        <p className="text-gray-400 text-center text-xs sm:text-sm leading-relaxed">
          URL Shortener is a simple and efficient tool that takes long, messy
          URLs and transforms them into short, clean, and shareable links.
        </p>
        <p className="text-gray-400 text-center text-xs sm:text-sm leading-relaxed mt-3">
          Whether you're sharing on social media, sending emails, or posting in
          chat, short links save space and look more professional.
        </p>
        <p className="text-gray-400 text-center text-xs sm:text-sm leading-relaxed mt-3">
          Built with Next.js, Tailwind CSS, and MongoDB — this project is
          open-source and free to use.
        </p>
        <p className="text-gray-400 text-center text-xs sm:text-sm leading-relaxed mt-4">
          <span className="text-white font-medium">Version:</span> 1.0.0
        </p>
      </div>
    </div>
  );
}
