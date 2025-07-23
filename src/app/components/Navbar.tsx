'use client';

import { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: '首页', href: '#home' },
    { name: '产品品牌', href: '#brands' },
    { name: '服务优势', href: '#services' },
    { name: '联系我们', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <div className="relative w-28 h-12">
                <Image
                  src="/brands/quanpu-logo-small.png"
                  alt="杭州全谱实验室设备有限公司"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">杭州全谱实验室设备</h1>
                <p className="text-xs text-gray-500">专业实验室器材采购服务</p>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
                     <div className="hidden lg:flex items-center space-x-4">
             <div className="flex items-center text-sm text-gray-600">
               <Phone className="w-4 h-4 mr-1" />
               <span>0571-89988123</span>
             </div>
             <div className="flex items-center text-sm text-gray-600">
               <Mail className="w-4 h-4 mr-1" />
               <span>13305715395@163.com</span>
             </div>
           </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600 px-3 py-2">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>0571-89988123</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 px-3 py-2">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>13305715395@163.com</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 