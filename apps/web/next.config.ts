import type { NextConfig } from "next";
import path from "path";
import { withNetlify } from "@netlify/plugin-nextjs";

const nextConfig: NextConfig = withNetlify({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "**/*.module.scss")],
  },
});

export default nextConfig;
