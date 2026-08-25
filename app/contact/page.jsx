import React from "react";

// Page Metadata for SEO
export const metadata = {
  title: "Contact Us",
  description:
    "Have questions, suggestions, or feedback about TrimLink? Get in touch with our support team.",
};

export default function Contact() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-3 sm:px-4 py-6">
      <div className="bg-black border border-gray-800 rounded-2xl p-5 sm:p-8 max-w-2xl w-full text-center">
        {/* Page Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-4">
          Contact Us
        </h1>

        {/* Informational Text */}
        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
          Have questions, feedback, or suggestions? We&apos;d love to hear from you!
        </p>
        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-3">
          Whether it&apos;s a bug report, feature request, or just a friendly hello —
          feel free to reach out.
        </p>

        {/* Direct Contact Email */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-2">
            📧 Email us directly at:
          </p>
          <a
            href="mailto:abdullahgohar1204@gmail.com"
            className="text-white font-medium text-sm sm:text-base hover:text-gray-300 transition break-all underline underline-offset-4"
          >
            abdullahgohar1204@gmail.com
          </a>
        </div>

        <p className="text-gray-500 text-xs mt-6">
          We usually respond within 24–48 hours.
        </p>
      </div>
    </main>
  );
}