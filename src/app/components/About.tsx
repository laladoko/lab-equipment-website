'use client';

import { motion } from 'framer-motion';
import { Building2, Target, Users, Shield, Clock, Headphones } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Building2,
      title: '专业团队',
      description: '拥有多年实验室设备行业经验的专业团队，为客户提供最优质的服务'
    },
    {
      icon: Target,
      title: '精准选型',
      description: '根据客户具体需求，提供最适合的设备选型建议和解决方案'
    },
    {
      icon: Shield,
      title: '质量保证',
      description: '所有产品均为原厂正品，提供完整的质量保证和售后服务'
    },
    {
      icon: Clock,
      title: '快速响应',
      description: '24小时响应客户需求，提供及时的技术支持和售后服务'
    },
    {
      icon: Users,
      title: '客户至上',
      description: '以客户需求为中心，提供个性化的解决方案和贴心服务'
    },
    {
      icon: Headphones,
      title: '技术支持',
      description: '专业的技术团队提供设备安装、调试、培训等全方位支持'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              关于杭州全谱实验室设备有限公司
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              杭州全谱实验室设备有限公司成立于2014年，是一家专业从事实验室设备采购服务的综合性企业。
              我们致力于为科研院所、高等院校、医疗机构、企业研发中心等提供高品质的实验室设备解决方案。
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              作为多家国际知名品牌的官方授权代理商，我们拥有丰富的行业经验和专业的技术团队，
              能够为客户提供从设备选型、采购、安装调试到售后服务的全流程专业支持。
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
                <div className="text-gray-600">年行业经验</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                <div className="text-gray-600">合作客户</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">4</div>
                <div className="text-gray-600">国际品牌代理</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">24h</div>
                <div className="text-gray-600">快速响应</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">我们的服务优势</h3>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-200 rounded-full opacity-20"></div>
          </motion.div>
        </div>

        {/* Mission and Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">我们的使命</h3>
            <p className="text-blue-100 leading-relaxed">
              通过提供高品质的实验室设备和专业的技术服务，助力科研创新和学术发展，
              为中国的科技进步贡献我们的力量。
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">我们的愿景</h3>
            <p className="text-purple-100 leading-relaxed">
              成为中国领先的实验室设备服务商，建立长期稳定的客户关系，
              成为客户最信赖的实验室设备合作伙伴。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 