'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import BrandHeader from '../../components/BrandHeader';
import BrandIntroduction from '../../components/BrandIntroduction';
import BrandSidebar from '../../components/BrandSidebar';
import GenericProductDetail from '../../components/GenericProductDetail';
import GenericProductShowcase from '../../components/GenericProductShowcase';

import { getBrandData } from '../../../data/brand-data';
import { brukerProducts, type BrukerProduct } from '../../../data/bruker-products';
import { olympusProducts, type OlympusProduct } from '../../../data/olympus-products';
import { wiggensProducts, type WiggensProduct } from '../../../data/wiggens-products';
import { fritschProducts, type FritschProduct } from '../../../data/fritsch-products';

type GenericProduct = OlympusProduct | BrukerProduct | WiggensProduct | FritschProduct;

export default function BrandPage() {
  const params = useParams();
  const brandName = params.brand as string;
  const [selectedProduct, setSelectedProduct] = useState<GenericProduct | null>(null);

  const brand = getBrandData(brandName);

  if (!brand) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">品牌未找到</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  // 根据品牌获取产品数据
  const getProducts = () => {
    switch (brandName) {
      case 'olympus':
        return olympusProducts;
      case 'bruker':
        return brukerProducts;
      case 'wiggens':
        return wiggensProducts;
      case 'fritsch':
        return fritschProducts;
      default:
        return [];
    }
  };

  const products = getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* 品牌头部 */}
      <BrandHeader brand={brand} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 主要内容 */}
          <div className="lg:col-span-2">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              {/* 品牌介绍 */}
              <BrandIntroduction 
                longDescription={brand.longDescription} 
                accentColor={brand.accentColor} 
              />

              {/* 产品展示 - 支持Olympus、Bruker、Wiggens和Fritsch */}
              {products.length > 0 && (
                <GenericProductShowcase
                  products={products}
                  accentColor={brand.accentColor}
                  onProductClick={setSelectedProduct}
                  brandName={brandName}
                />
              )}
            </motion.div>
          </div>

          {/* 侧边栏 */}
          <div className="lg:col-span-1">
            <BrandSidebar 
              features={brand.features} 
              color={brand.color} 
              accentColor={brand.accentColor}
              brandName={brandName}
            />
          </div>
        </div>
      </div>

      {/* 产品详情弹窗 */}
      {selectedProduct && (
        <GenericProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          brandName={brandName}
        />
      )}
    </div>
  );
} 