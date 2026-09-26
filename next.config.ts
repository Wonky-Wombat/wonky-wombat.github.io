import type { NextConfig } from "next";

// Static export: the site is served by GitHub Pages, so there is no Node server.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
