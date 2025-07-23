'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface BrandLogoProps {
  brandName: string;
  size?: number; // Logo的最大尺寸，单位：像素，默认48px
  className?: string;
  animated?: boolean; // 是否启用动画效果
}

/**
 * BrandLogo组件 - 品牌Logo显示组件
 * 
 * 使用示例：
 * - 小尺寸Logo: <BrandLogo brandName="WIGGENS" size={48} />
 * - 中等尺寸Logo: <BrandLogo brandName="WIGGENS" size={300} animated={true} />
 * - 大尺寸Logo: <BrandLogo brandName="WIGGENS" size={300} animated={true} />
 * - 超大尺寸Logo: <BrandLogo brandName="WIGGENS" size={300} animated={true} />
 */
export default function BrandLogo({ 
  brandName, 
  size = 48, 
  className = "",
  animated = false 
}: BrandLogoProps) {
  // 根据品牌名称确定图片路径
  const getLogoPath = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('evident') || lowerName.includes('olympus')) {
      return '/brands/olympus.png';
    } else if (lowerName.includes('bruker')) {
      return '/brands/logo.png'; // 使用通用logo作为bruker的logo
    } else if (lowerName.includes('wiggens')) {
      return '/brands/wiggens.png';
    } else if (lowerName.includes('fritsch')) {
      return '/brands/fritsch.png';
    } else {
      return '/brands/quanpu-logo.png'; // 默认使用全谱logo
    }
  };

  const logoPath = getLogoPath(brandName);

  const LogoWrapper = animated ? motion.div : 'div';

  return (
    <LogoWrapper 
      className={`relative inline-block ${className}`} 
      style={{ maxWidth: size, maxHeight: size }}
      {...(animated && {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, ease: "easeOut" },
        whileHover: { scale: 1.05, rotate: 2 },
        whileTap: { scale: 0.95 }
      })}
    >
      <Image
        src={logoPath}
        alt={`${brandName} logo`}
        width={size}
        height={size}
        className="object-contain transition-all duration-300 hover:filter hover:brightness-110"
        priority={true}
        style={{
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
          width: 'auto',
          height: 'auto',
          maxWidth: '100%',
          maxHeight: '100%'
        }}
      />
      {/* 悬停时的光晕效果 */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </LogoWrapper>
  );
} 