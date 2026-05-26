import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/iot', destination: '/', permanent: true },
      { source: '/iot/:path*', destination: '/:path*', permanent: true },
    ];
  },
};

export default nextConfig;
