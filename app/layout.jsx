import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-black text-white antialiased relative overflow-x-hidden">

        {/* Global Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-87.5 bg-lime-500/15 rounded-full blur-[150px] pointer-events-none -z-10"></div>

        {/* Navbar */}
        <Navbar />

        <main className="grow">
          {children}
        </main>

      </body>
    </html>
  );
}