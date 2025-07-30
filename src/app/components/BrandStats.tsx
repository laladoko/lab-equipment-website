'use client';

import { motion } from 'framer-motion';
import { Users, Award, Globe, Clock } from 'lucide-react';

interface BrandStatsProps {
  stats: {
    customers: number;
    years: number;
    countries: number;
    awards: number;
  };
}

export default function BrandStats({ stats }: BrandStatsProps) {
  const statItems = [
    {
      icon: Users,
      value: stats.customers,
      label: '服务客户',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Clock,
      value: stats.years,
      label: '成立年限',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Globe,
      value: stats.countries,
      label: '服务国家',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Award,
      value: stats.awards,
      label: '获得奖项',
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            品牌实力数据
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            用数据说话，展示我们的专业实力和服务能力
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <item.icon className="w-10 h-10 text-white" />
              </div>
              <div className="mb-2">
                <span className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {item.value}
                </span>
                {item.label === '服务客户' && <span className="text-2xl font-bold text-gray-900">+</span>}
                {item.label === '成立年限' && <span className="text-2xl font-bold text-gray-900">年</span>}
                {item.label === '服务国家' && <span className="text-2xl font-bold text-gray-900">+</span>}
                {item.label === '获得奖项' && <span className="text-2xl font-bold text-gray-900">+</span>}
              </div>
              <p className="text-gray-600 font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 