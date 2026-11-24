import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // /sertifikat/ → sertifikat/index.html (cocok untuk hosting Apache)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
