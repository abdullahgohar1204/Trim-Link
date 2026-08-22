export default function Contact() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-3 sm:px-4 py-6">
      <div className="bg-black border border-gray-800 rounded-2xl p-5 sm:p-8 max-w-2xl w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-4">
          Contact Us
        </h2>
        <p className="text-gray-400 text-center text-xs sm:text-sm leading-relaxed">
          Have questions, feedback, or suggestions? We'd love to hear from you!
        </p>
        <p className="text-gray-400 text-center text-xs sm:text-sm leading-relaxed mt-3">
          Whether it's a bug report, feature request, or just a friendly hello —
          feel free to reach out.
        </p>
        <p className="text-gray-400 text-center text-xs sm:text-sm leading-relaxed mt-6">
          📧 Email us at:
        </p>
        <a
          href="mailto:abdullahgohar1204@gmail.com"
          className="text-white text-center text-sm sm:text-base font-medium mt-1 block hover:text-gray-300 transition break-all"
        >
          abdullahgohar1204@gmail.com
        </a>
        <p className="text-gray-400 text-center text-xs sm:text-sm leading-relaxed mt-4">
          We'll get back to you as soon as possible.
        </p>
      </div>
    </div>
  );
}
