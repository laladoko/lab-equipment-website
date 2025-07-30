import { ChevronDown, Award, Users, Globe, Zap } from 'lucide-react';

export default function Hero() {
  const stats = [
    { icon: Award, value: '20+', label: '年专业经验' },
    { icon: Users, value: '500+', label: '合作客户' },
    { icon: Globe, value: '4', label: '国际品牌代理' },
    { icon: Zap, value: '24h', label: '快速响应' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, #dbeafe, #e0e7ff)'}}>
      {/* 简化背景 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full opacity-30"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            专业实验室器材
            <span className="text-blue-600">
              采购服务
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            杭州全谱实验室设备有限公司致力于为科研院所、高校、企业提供高品质的实验室设备解决方案，
            代理国际知名品牌，助力科研创新
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#brands"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-700 text-center"
            >
              了解我们的产品
            </a>
            <a
              href="/contact"
              className="inline-block border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:text-white text-center"
            >
              联系我们
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </section>
  );
} 