'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Info } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

export default function ProductImage({ 
  src, 
  alt, 
  className = "object-contain", 
  containerClassName = "",
  priority = false 
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false);

  if (!src) {
    return (
      <div className={`relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center ${containerClassName}`}>
        <div className="text-gray-400 text-center">
          <Info className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">产品图片</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden ${containerClassName}`}>
      {!imageError ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={`${className} transition-transform duration-300`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}

          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-400 text-center">
            <Info className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">图片加载失败</p>
          </div>
        </div>
      )}
    </div>
  );
} 