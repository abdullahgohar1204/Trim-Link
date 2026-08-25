import React from "react";

export const metadata = {
  title: "Contact Us",
  description:
    "Have questions, suggestions, or feedback about TrimLink? Get in touch with our support team.",
};

export default function Contact() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-3 sm:px-4 py-8">
      <div className="relative bg-black/80 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-6 sm:p-10 max-w-2xl w-full text-center shadow-2xl">

        {/* Lime Accent Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-lime-500/10 text-lime-400 border border-lime-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse"></span>
            ✦ Get In Touch
          </span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-6">
          Contact <span className="text-lime-400">Us</span>
        </h1>

        {/* Informational Text */}
        <div className="space-y-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
          <p>
            Have questions, feedback, or suggestions? We&apos;d love to hear from you!
          </p>
          <p>
            Whether it&apos;s a bug report, feature request, or just a friendly hello —
            feel free to reach out.
          </p>
        </div>

        {/* Direct Contact Email Card */}
        <div className="mt-8 pt-6 border-t border-zinc-800/60 bg-zinc-900/50 rounded-2xl p-5 border border-zinc-800/60">
          <p className="text-zinc-400 text-xs sm:text-sm font-medium mb-2 uppercase tracking-wider">
            📧 Email Us Directly
          </p>
          <a
            href="mailto:abdullahgohar1204@gmail.com"
            className="text-lime-400 font-mono text-sm sm:text-base hover:text-lime-300 transition-all break-all underline underline-offset-4 font-semibold"
          >
            abdullahgohar1204@gmail.com
          </a>
        </div>

        <p className="text-zinc-500 text-xs mt-6">
          We usually respond within 24–48 hours.
        </p>
      </div>
    </main>
  );
}