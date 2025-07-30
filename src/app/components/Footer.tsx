'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: '关于我们', href: '#about' },
      { name: '服务优势', href: '#services' },
      { name: '联系我们', href: '/contact' },
      { name: '公司新闻', href: '#' }
    ],
    brands: [
      { name: 'EVIDENT/OLYMPUS', href: '/brands/olympus' },
      { name: 'BRUKER', href: '/brands/bruker' },
      { name: 'WIGGENS', href: '/brands/wiggens' },
      { name: 'FRITSCH', href: '/brands/fritsch' }
    ],
    services: [
      { name: '设备采购', href: '#services' },
      { name: '安装调试', href: '#services' },
      { name: '技术培训', href: '#services' },
      { name: '售后服务', href: '#services' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="relative w-20 h-14 mr-4">
                  <Image
                    src="/brands/quanpu-logo-optimized.png"
                    alt="杭州全谱实验室设备有限公司"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">杭州全谱实验室设备有限公司</h3>
                  <p className="text-gray-400 text-sm">先进仪器设备和专业解决方案</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                杭州全谱实验室设备有限公司是一家致力于为客户提供先进的仪器设备和专业解决方案的公司。经过十几年的努力深耕，专业服务新材料、5G、半导体、电子、新能源领域和生物发酵、生物制药等行业的科研和企事业单位。
              </p>

                             <div className="space-y-3">
                 <div className="flex items-center text-gray-300">
                   <Phone className="w-4 h-4 mr-3" />
                   <span>0571-89988123 / 13305715395</span>
                 </div>
                 <div className="flex items-center text-gray-300">
                   <Mail className="w-4 h-4 mr-3" />
                   <span>13305715395@163.com</span>
                 </div>
                 <div className="flex items-center text-gray-300">
                   <MapPin className="w-4 h-4 mr-3" />
                   <span>杭州市三墩西湖科技园西园路9号博科大厦8楼</span>
                 </div>

               </div>
            </motion.div>
          </div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">公司信息</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Brand Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">代理品牌</h4>
            <ul className="space-y-3">
              {footerLinks.brands.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Service Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">服务项目</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <div>© {currentYear} 杭州全谱实验室设备有限公司. 保留所有权利.</div>
              <div className="mt-2">
                <a 
                  href="https://beian.miit.gov.cn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  浙ICP备13034799号-1
                </a>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 