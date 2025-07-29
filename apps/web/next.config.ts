import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "**/*.module.scss")],
  },
};

export default nextConfig;
