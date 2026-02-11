import type { NextConfig } from 'next'

const useStaticExport = process.env.USE_STATIC_EXPORT === '1'

const nextConfig: NextConfig = {
  // 静态导出时图片不经过 Node 优化，直接使用原图
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: useStaticExport,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
  // 默认 standalone（Docker/Node 部署）；USE_STATIC_EXPORT=1 时为纯静态（Nginx 部署、最小负载）
  output: useStaticExport ? 'export' : 'standalone',
}

export default nextConfig 