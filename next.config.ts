import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Local blog-api dev server (e.g. http://localhost:9000/blog-api/xxx.jpg)
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/**",
      },
      // Production MinIO bucket on Railway
      {
        protocol: "https",
        hostname: "bucket-production-b1dc.up.railway.app",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
