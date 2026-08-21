"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Generate", href: "/generate" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <nav className="bg-black border border-gray-800 rounded-full px-6 py-3">
        <div className="flex justify-between gap-8 items-center">
          <Link href={"/"}>
            <h1 className="text-2xl font-bold text-white">URL Shortener</h1>
          </Link>
          <div className="flex items-center gap-1 bg-gray-800 rounded-full px-1 py-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-6 py-1.5 rounded-full text-sm font-medium transition ${
                    isActive
                      ? "bg-white text-black shadow-sm"
                      : "text-gray-400 hover:bg-grey-400 hover:text-black hover:shadow-sm"
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
