import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Allow the preview sandbox domain to load Next.js assets (/_next/*) without
  // being blocked by the cross-origin dev protection.
  allowedDevOrigins: [
    "https://preview-chat-2f55dc9d-11cd-4ea1-90a3-09c8e123b026.space-z.ai",
    "*.space-z.ai",
  ],
};

export default nextConfig;
