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
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // 生产环境优化
  productionBrowserSourceMaps: false,
  // 压缩配置
  compress: true,
  // 禁用 x-powered-by header
  poweredByHeader: false,
  // 生成静态页面以减少服务器负载
  output: 'standalone',
}

export default nextConfig 