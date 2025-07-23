'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface ProductListProps {
  products: string[];
  color: string;
  accentColor: string;
}

export default function ProductList({ products, color, accentColor }: ProductListProps) {
  return (
    <div className="brand-card rounded-3xl p-8">
      <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <CheckCircle className={`w-8 h-8 mr-3 text-${accentColor}-600`} />
        主要产品
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 group card-hover"
          >
            <div className={`w-3 h-3 bg-gradient-to-r ${color} rounded-full mr-4 flex-shrink-0`}></div>
            <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{product}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 