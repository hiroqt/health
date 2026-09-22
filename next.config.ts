import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
  async redirects() {
    return [
      {
        source: "/before-after",
        destination: "/before-and-after",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
