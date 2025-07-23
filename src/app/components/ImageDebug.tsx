'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageDebugProps {
  src: string;
  alt: string;
}

export default function ImageDebug({ src, alt }: ImageDebugProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 m-4">
      <h3 className="text-lg font-bold mb-2">图片调试: {alt}</h3>
      <p className="text-sm text-gray-600 mb-2">路径: {src}</p>
      
      <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
        {!imageError ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-red-500 text-center">
              <p>❌ 图片加载失败</p>
              <p className="text-sm">路径: {src}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-2">
        <p className="text-sm">
          状态: {imageLoaded ? '✅ 已加载' : imageError ? '❌ 加载失败' : '⏳ 加载中...'}
        </p>
      </div>
      
      {/* 备用方案：使用普通img标签 */}
      <div className="mt-4">
        <h4 className="font-semibold mb-2">备用方案 (普通img标签):</h4>
        <img
          src={src}
          alt={alt}
          className="w-full h-32 object-cover rounded border"
          onLoad={() => console.log('普通img标签加载成功:', src)}
          onError={() => console.log('普通img标签加载失败:', src)}
        />
      </div>
    </div>
  );
} 