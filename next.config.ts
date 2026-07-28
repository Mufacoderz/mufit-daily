import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.googleusercontent.com" },
    ],
  },
  outputFileTracingIncludes: {
    "/api/reports/*": ["./public/fonts/**/*"],
  },
};

export default nextConfig;