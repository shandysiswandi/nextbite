import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: false,
  logging: false,
  output: "standalone",
};

export default nextConfig;
