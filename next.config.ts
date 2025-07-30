import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 基本图片配置
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // 确保浏览器兼容性
    dangerouslyAllowSVG: true,
    unoptimized: false,
  },
  // 实验性特性配置
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig 