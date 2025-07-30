'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import BrandLogo from './BrandLogo';

interface BrandHeaderProps {
  brand: {
    name: string;
    category: string;
    description: string;
    yearEstablished: number;
  };
}

export default function BrandHeader({ brand }: BrandHeaderProps) {
  return (
    <div className="bg-white relative overflow-hidden border-b border-gray-100">
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 group">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            返回首页
          </Link>
          
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12">
            {/* 放大的Logo - 紧凑容器 */}
            <motion.div 
              className="flex items-center justify-center flex-shrink-0"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <BrandLogo brandName={brand.name} size={300} animated={true} />
            </motion.div>
            
            <div className="text-center lg:text-left flex-1">
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">{brand.name}</h1>
                <p className="text-2xl text-gray-600 font-medium mb-6">{brand.category}</p>
                <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mb-6">
                  {brand.description}
                </p>
                
                <div className="text-gray-500 text-sm">
                  成立于 {brand.yearEstablished} 年
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 