import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BOT_URL: process.env.BOT_URL,
  },
};

export default nextConfig;
