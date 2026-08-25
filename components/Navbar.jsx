"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Prevent server/client hydration mismatch glitches on reload
  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Generate", href: "/generate" },
  ];

  return (
    <header className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-5 sticky top-0 z-50">
      <nav className="bg-black/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-8 items-center">

          {/* Brand Logo */}
          <Link href={"/"} className="group flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.8)] group-hover:scale-125 transition-transform"></span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Trim<span className="text-lime-400">Link</span>
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 bg-zinc-900/90 border border-zinc-800/80 rounded-full p-1 max-w-full overflow-x-auto">
            {navLinks.map((link) => {
              // Only compute active state after client mount to prevent reload bugs
              const isActive = mounted && pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${isActive
                    ? "bg-lime-400 text-black shadow-md shadow-lime-400/20"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;