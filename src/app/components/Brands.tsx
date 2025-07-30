'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Award, Microscope, Beaker, Settings, CheckCircle } from 'lucide-react';
import BrandLogo from './BrandLogo';
import Link from 'next/link';

export default function Brands() {
  const brands = [
    {
      name: 'EVIDENT / OLYMPUS',
          description: '全球领先的光学仪器制造商，专业提供显微镜等精密光学设备',
    features: ['高精度显微镜', '生命科学仪器'],
      color: 'from-blue-600 to-blue-700',
      accentColor: 'blue',
      logo: '/brands/evident-olympus-logo.png',
      icon: Microscope,
      official: true,
      category: '光学仪器',
      slug: 'olympus'
    },
    {
      name: 'BRUKER',
      description: '世界知名的分析仪器制造商，专注于光谱，核磁共振、质谱、X射线分析等高端分析设备',
      features: ['核磁共振仪', '质谱仪', 'X射线衍射仪', '分子光谱仪'],
      color: 'from-blue-500 to-blue-600',
      accentColor: 'blue',
      logo: '/brands/bruker-logo.png',
      icon: Beaker,
      official: true,
      category: '分析仪器',
      slug: 'bruker'
    },
    {
      name: 'WIGGENS',
      description: '德国知名实验室设备制造商，提供高品质的实验室通用设备和耗材',
      features: ['实验室通用设备', '精密天平', '离心机', '实验室耗材'],
      color: 'from-blue-400 to-blue-500',
      accentColor: 'blue',
      logo: '/brands/wiggens-logo.png',
      icon: Settings,
      official: true,
      category: '实验室设备',
      slug: 'wiggens'
    },
    {
      name: 'FRITSCH',
      description: '德国专业研磨设备制造商，在样品制备和颗粒分析领域享有盛誉',
      features: ['研磨设备', '筛分设备', '激光粒度仪', '样品制备设备'],
      color: 'from-indigo-500 to-indigo-600',
      accentColor: 'indigo',
      logo: '/brands/fritsch-logo.png',
      icon: Award,
      official: true,
      category: '样品制备',
      slug: 'fritsch'
    }
  ];

  return (
    <section id="brands" className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* 背景装饰元素 */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-36 -translate-y-36 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full translate-x-48 translate-y-48 opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-semibold mb-8 shadow-lg">
            <Award className="w-5 h-5 mr-2" />
            官方授权代理
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            国际知名品牌
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            我们代理全球顶尖的实验室设备品牌，为您的科研工作提供最优质的产品和专业服务
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group brand-card rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* 简化的卡片头部 - 白色背景 */}
              <div className="bg-white p-8 relative">
                <div className="flex flex-col items-center text-center">
                  {/* 放大的Logo - 紧凑容器 */}
                  <div className="mb-6 flex justify-center">
                    <BrandLogo brandName={brand.name} size={300} animated={true} />
                  </div>
                  
                  {/* 品牌信息 */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{brand.name}</h3>
                    <p className="text-gray-600 font-medium">{brand.category}</p>
                  </div>
                </div>
              </div>

              {/* 卡片内容 */}
              <div className="p-8 bg-white border-t border-gray-100">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {brand.description}
                </p>

                <div className="space-y-4 mb-6">
                  <h4 className="font-bold text-gray-900 flex items-center text-sm">
                    <CheckCircle className={`w-4 h-4 mr-2 text-${brand.accentColor}-600`} />
                    主要产品
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {brand.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                        className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group-hover:bg-blue-50"
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${brand.color} rounded-full mr-3 flex-shrink-0`}></div>
                        <span className="text-sm text-gray-700 font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <Link href={`/brands/${brand.slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full btn-primary text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center text-sm shadow-lg`}
                    >
                      <span>了解更多</span>
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* 悬停效果覆盖层 */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* 为什么选择我们部分 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-white rounded-3xl shadow-xl p-12 max-w-6xl mx-auto border border-gray-100 relative overflow-hidden">
            {/* 背景装饰 */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-50 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  为什么选择我们的品牌代理服务？
                </h3>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  我们不仅提供优质产品，更提供全方位的专业服务支持
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div 
                  className="text-center group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-3 text-lg">官方授权</h4>
                  <p className="text-gray-600 leading-relaxed">获得品牌官方授权，确保产品正品质量和售后服务保障</p>
                </motion.div>
                
                <motion.div 
                  className="text-center group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Settings className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-3 text-lg">技术支持</h4>
                  <p className="text-gray-600 leading-relaxed">专业的技术团队提供安装调试、培训指导和售后维护服务</p>
                </motion.div>
                
                <motion.div 
                  className="text-center group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Beaker className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-3 text-lg">一站式服务</h4>
                  <p className="text-gray-600 leading-relaxed">从选型咨询到安装调试，从人员培训到维护保养，全程专业服务</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 