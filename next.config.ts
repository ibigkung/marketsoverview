import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "marketsoverview"; // ← ชื่อ GitHub repo ของคุณ

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: {
    unoptimized: true, // GitHub Pages ไม่รองรับ Next.js Image Optimization
  },
  trailingSlash: true,
};

export default nextConfig;
