if (process.platform === 'win32') {
  process.env.FAST_GLOB_NOFOLLOW_SYMLINKS = '1';
}

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 🚨 هذا يمنع ESLint من العمل وقت الـ build
  },
};

export default nextConfig;