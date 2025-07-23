'use client';

import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Wrench, 
  GraduationCap, 
  Truck, 
  Shield, 
  Clock,
  CheckCircle,
  Star
} from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: ShoppingCart,
      title: '设备采购',
      description: '提供一站式实验室设备采购服务，包括需求分析、设备选型、价格谈判、合同签订等',
      features: ['需求分析', '设备选型', '价格谈判', '合同签订'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Wrench,
      title: '安装调试',
      description: '专业的技术团队提供设备安装、调试、校准等服务，确保设备正常运行',
      features: ['设备安装', '系统调试', '性能校准', '功能测试'],
      color: 'from-blue-400 to-blue-500'
    },
    {
      icon: GraduationCap,
      title: '技术培训',
      description: '为客户提供设备操作培训和技术指导，确保用户能够熟练使用设备',
      features: ['操作培训', '技术指导', '维护培训', '在线支持'],
      color: 'from-blue-300 to-blue-400'
    },
    {
      icon: Truck,
      title: '物流配送',
      description: '提供专业的物流配送服务，确保设备安全、及时送达客户指定地点',
      features: ['安全包装', '专业运输', '现场验收', '安装协调'],
      color: 'from-indigo-400 to-indigo-500'
    },
    {
      icon: Shield,
      title: '质量保证',
      description: '所有产品均为原厂正品，提供完整的质量保证和售后服务',
      features: ['原厂正品', '质量保证', '保修服务', '质量追溯'],
      color: 'from-indigo-300 to-indigo-400'
    },
    {
      icon: Clock,
      title: '售后服务',
      description: '提供7×24小时售后服务支持，快速响应客户需求',
      features: ['24小时响应', '远程支持', '现场服务', '备件供应'],
      color: 'from-blue-600 to-blue-700'
    }
  ];

  const advantages = [
    {
      icon: Star,
      title: '品牌优势',
      description: '代理国际知名品牌，产品质量有保障'
    },
    {
      icon: CheckCircle,
      title: '服务优势',
      description: '专业的技术团队，提供全方位服务支持'
    },
    {
      icon: Clock,
      title: '响应优势',
      description: '24小时快速响应，及时解决客户问题'
    },
    {
      icon: Shield,
      title: '保障优势',
      description: '完整的质量保证体系，确保客户权益'
    }
  ];

  return (
    <section id="services" className="py-20 bg-blue-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            我们的服务优势
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            从设备采购到售后服务，我们提供全流程的专业服务，确保客户获得最佳体验
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
            >
              <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">服务内容：</h4>
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Advantages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              为什么选择我们？
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              我们拥有丰富的行业经验和专业的服务团队，致力于为客户提供最优质的服务体验
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <advantage.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {advantage.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              准备开始您的项目？
            </h3>
            <p className="text-xl mb-8 opacity-90">
              联系我们的专业团队，获取个性化的解决方案
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              立即咨询
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 