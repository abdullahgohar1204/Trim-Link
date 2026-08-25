import Navbar from "@/components/Navbar"; // 👈 Add this import at the top
import "./globals.css"; // (keep your existing CSS import if you have one)

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-black text-white antialiased relative overflow-x-hidden">
        
        {/* Global Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-lime-500/15 rounded-full blur-[150px] pointer-events-none -z-10"></div>

        {/* Navbar */}
        <Navbar />

        <main className="flex-grow">
          {children}
        </main>
        
      </body>
    </html>
  );
}