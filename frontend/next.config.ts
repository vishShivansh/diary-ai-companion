import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   reactStrictMode: true,
  env: {
    HUGGINGFACE_API_TOKEN: process.env.HUGGINGFACE_API_TOKEN,
  },
};

export default nextConfig;
