'use client';

import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle, ArrowLeft } from 'lucide-react';
import ProductImage from './ProductImage';

interface GenericProduct {
  id: number;
  name: string;
  category: string;
  image?: string;
  description: string;
  features?: string[];           // 设为可选
  price: string;
  link?: string;                // 设为可选
  specifications?: Record<string, string>;  // 设为可选
  officialLink?: string;        // 设为可选
}

interface GenericProductDetailProps {
  product: GenericProduct;
  onClose: () => void;
  brandName?: string;
}

export default function GenericProductDetail({ product, onClose, brandName }: GenericProductDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回
            </button>
          </div>
        </div>

        {/* 内容 */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左侧：产品图片和基本信息 */}
            <div>
              {/* 产品图片 */}
              <ProductImage
                src={product.image || '/placeholder-product.png'}
                alt={product.name}
                className="object-contain rounded-2xl"
                containerClassName="h-80 rounded-2xl mb-6"
                priority
              />

              {/* 产品基本信息 */}
              <div className="space-y-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-2">
                    {product.category}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                {/* 价格 */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">价格</span>
                    <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：产品分类和规格 */}
            <div className="space-y-6">
              {/* 产品分类 */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-blue-600" />
                  产品分类
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features?.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 技术规格 */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-blue-600" />
                  技术规格
                </h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="space-y-3">
                    {Object.entries(product.specifications || {}).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                      >
                        <span className="text-gray-600 font-medium">{key}</span>
                        <span className="text-gray-900 font-semibold">{value}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 应用领域 */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">应用领域</h3>
                <div className="flex flex-wrap gap-2">
                  {['材料科学', '药物研发', '食品安全', '环境监测', '法医分析', '质量控制'].map((app, index) => (
                    <motion.span
                      key={app}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-full"
                    >
                      {app}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 底部操作按钮 */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              {(() => {
                // 判断是否为需要显示"联系我们"的品牌
                const shouldShowContact = brandName && ['wiggens', 'fritsch', 'bruker'].includes(brandName);
                
                if (shouldShowContact) {
                  return (
                    <a
                      href="/contact"
                      className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      联系我们
                    </a>
                  );
                } else {
                  return (
                    <a
                      href={product.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      立即咨询
                    </a>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 