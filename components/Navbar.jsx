"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Generate", href: "/generate" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4">
      <nav className="bg-black border border-gray-800 rounded-2xl sm:rounded-full px-4 sm:px-6 py-3">
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-8 items-center">
          <Link href={"/"}>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              URL Shortener
            </h1>
          </Link>
          <div className="flex items-center gap-0.5 sm:gap-1 bg-gray-900 border border-gray-800 rounded-full p-1 max-w-full overflow-x-auto">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                    isActive
                      ? "bg-white text-black shadow-sm"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
