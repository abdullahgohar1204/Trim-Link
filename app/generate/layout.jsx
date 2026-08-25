import React from "react";

// Page-specific metadata for /generate
export const metadata = {
    title: "Generate Short URL",
    description: "Create fast, clean, and custom short links with TrimLink.",
};

// Default component export is required by Next.js
export default function GenerateLayout({ children }) {
    return <>{children}</>;
}