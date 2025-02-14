import type { NextConfig } from "next";
import { RemotePattern } from "next/dist/shared/lib/image-config";

// Validate 10 of these random image URLs for this project
// Want to go by picsum's documentation and avoid either hardcoding the urls or disabling caching
// There's a chance there will be identical images once in a blue moon but that's fine for this project
const generateRemotePatterns = (count: number): RemotePattern[] => {
  const patterns: RemotePattern[] = [];
  for (let i = 1; i <= count; i++) {
    patterns.push({
      protocol: 'https',
      hostname: 'picsum.photos',
      port: '',
      pathname: '/**',
      search: `?random=${i}`,
    });
  }
  return patterns;
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: generateRemotePatterns(10),
  },
};

export default nextConfig;
