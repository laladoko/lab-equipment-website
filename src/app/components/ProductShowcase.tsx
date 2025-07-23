'use client';

import { motion } from 'framer-motion';
import { ExternalLink, ShoppingCart } from 'lucide-react';
import ProductImage from './ProductImage';
import { type OlympusProduct } from '../../data/olympus-products';

interface ProductShowcaseProps {
  products: OlympusProduct[];
  accentColor: string;
  onProductClick: (product: OlympusProduct) => void;
}

export default function ProductShowcase({ products, accentColor, onProductClick }: ProductShowcaseProps) {
  return (
    <div className="brand-card rounded-3xl p-8">
      <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <ShoppingCart className={`w-8 h-8 mr-3 text-${accentColor}-600`} />
        产品展示
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((product: OlympusProduct, index: number) => (
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
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 