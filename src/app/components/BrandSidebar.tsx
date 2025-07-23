'use client';

import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle, Phone, Mail, MapPin } from 'lucide-react';

interface BrandSidebarProps {
  features: string[];
  color: string;
  accentColor: string;
  brandName?: string;
}

export default function BrandSidebar({ features, color, accentColor, brandName }: BrandSidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="space-y-6"
    >
      {/* 产品特点 */}
      <div className="brand-card rounded-3xl p-8 sticky top-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <CheckCircle className={`w-6 h-6 mr-3 text-${accentColor}-600`} />
          产品特点
        </h3>
        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <motion.div 
              key={feature} 
              className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={`w-3 h-3 bg-gradient-to-r ${color} rounded-full mr-4 flex-shrink-0`}></div>
              <span className="text-gray-700 font-medium">{feature}</span>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-xl font-bold text-gray-900 mb-4">联系我们</h4>
          <p className="text-gray-600 mb-6 leading-relaxed">
            了解更多产品信息，请联系我们的专业团队
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
              <Phone className="w-5 h-5 mr-3 text-blue-600" />
              <span>400-123-4567</span>
            </div>
            <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
              <Mail className="w-5 h-5 mr-3 text-blue-600" />
              <span>info@labequipment.com</span>
            </div>
            <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
              <MapPin className="w-5 h-5 mr-3 text-blue-600" />
              <span>浙江省杭州西湖区博科大厦</span>
            </div>
          </div>

          {(() => {
            // 判断是否为需要显示"联系我们"的品牌
            const shouldShowContact = brandName && ['wiggens', 'fritsch', 'bruker'].includes(brandName);
            
            if (shouldShowContact) {
              return (
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full btn-primary text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center shadow-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800`}
                >
                  <span>联系我们</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </motion.a>
              );
            } else {
              return (
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full btn-primary text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center shadow-lg`}
                >
                  <span>立即咨询</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </motion.a>
              );
            }
          })()}
        </div>
      </div>
    </motion.div>
  );
} 