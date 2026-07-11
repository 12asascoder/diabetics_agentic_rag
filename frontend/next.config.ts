import type { NextConfig } from "next";

let API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5005';
if (API_URL.endsWith('/')) {
  API_URL = API_URL.slice(0, -1);
}
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}/api/:path*`, // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
