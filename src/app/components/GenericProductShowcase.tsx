'use client';

import { motion } from 'framer-motion';
import { ExternalLink, ShoppingCart, X } from 'lucide-react';
import ProductImage from './ProductImage';
import { useState, useMemo } from 'react';

interface GenericProduct {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  features: string[];
  price: string;
  link: string;
  specifications: Record<string, string>;
  officialLink: string;
}

interface GenericProductShowcaseProps {
  products: GenericProduct[];
  accentColor: string;
  onProductClick: (product: GenericProduct) => void;
  brandName?: string;
}

export default function GenericProductShowcase({ products, accentColor, onProductClick, brandName }: GenericProductShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 获取所有唯一的产品分类
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return uniqueCategories;
  }, [products]);

  // 根据选中的分类筛选产品
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(product => product.category === selectedCategory);
  }, [products, selectedCategory]);

  // 处理分类点击
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };
  return (
    <div className="brand-card rounded-3xl p-8">
      <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <ShoppingCart className={`w-8 h-8 mr-3 text-${accentColor}-600`} />
        产品展示
      </h3>
      
      {/* 产品分类筛选 */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 items-center">
          {/* 分类标签 */}
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
          
          {/* 全选按钮 - 只在有筛选时显示 */}
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-gray-500 text-white hover:bg-gray-600 flex items-center gap-2`}
            >
              <X className="w-4 h-4" />
              全选
            </button>
          )}
        </div>
        
        {/* 筛选结果提示 */}
        {selectedCategory && (
                     <div className="mt-4 text-sm text-gray-600">
             显示 &ldquo;{selectedCategory}&rdquo; 分类下的 {filteredProducts.length} 个产品
           </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProducts.map((product: GenericProduct, index: number) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer"
            onClick={() => onProductClick(product)}
          >
            {/* 产品图片 */}
            <ProductImage
              src={product.image}
              alt={product.name}
              className="object-contain group-hover:scale-105"
              containerClassName="h-64"
              priority={index < 2}
            />
            
            {/* 产品信息 */}
            <div className="p-6">
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-2">
                  {product.category}
                </span>
                <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h4>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
              </div>
              
              {/* 产品特点 */}
              <div className="mb-4">
                <h5 className="font-semibold text-gray-900 mb-2 text-sm">产品特点</h5>
                <div className="flex flex-wrap gap-1">
                  {product.features.slice(0, 3).map((feature: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {feature}
                    </span>
                  ))}
                  {product.features.length > 3 && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      +{product.features.length - 3}
                    </span>
                  )}
                </div>
              </div>
              
              {/* 价格和按钮 */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">{product.price}</span>
                <div className="flex gap-2">
                  {(() => {
                    // 判断是否为需要显示"联系我们"的品牌
                    const shouldShowContact = brandName && ['wiggens', 'fritsch', 'bruker'].includes(brandName);
                    
                    if (shouldShowContact) {
                      return (
                        <a
                          href="/contact"
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white text-sm font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          联系我们
                        </a>
                      );
                    } else {
                      return (
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          查看详情
                        </a>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 