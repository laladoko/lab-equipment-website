'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, User, MessageSquare, Building2 } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 构建邮件内容
    const emailSubject = `来自${formData.company}的咨询 - ${formData.name}`;
    const emailBody = `
姓名：${formData.name}
公司/机构：${formData.company}
邮箱：${formData.email}
电话：${formData.phone}

咨询内容：
${formData.message}
    `.trim();
    
    // 使用mailto协议发送邮件
    const mailtoLink = `mailto:13305715395@163.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    
    // 提示用户
    alert('正在打开邮件客户端发送咨询，感谢您的咨询！');
    
    // 清空表单
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 text-center">
          <motion.h1 
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            联系我们
          </motion.h1>
          <motion.p 
            className="text-xl text-blue-100 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            杭州全谱实验室设备有限公司是一家致力于为客户提供先进的仪器设备和专业解决方案的公司。经过十几年的努力深耕，专业服务新材料、5G、半导体、电子、新能源领域和生物发酵、生物制药等行业的科研和企事业单位。
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* 联系信息 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">联系信息</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">公司地址</h3>
                  <p className="text-gray-600">杭州市三墩西湖科技园西园路9号博科大厦8楼A22</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">联系电话</h3>
                  <p className="text-gray-600">0571-89988123</p>
                  <p className="text-gray-600">13305715395</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">邮箱地址</h3>
                  <p className="text-gray-600">13305715395@163.com</p>
                </div>
              </div>
            </div>

            {/* 服务特色 */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">我们的服务</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h4 className="font-semibold text-blue-600 mb-2">专业咨询</h4>
                  <p className="text-gray-600 text-sm">提供专业的设备选型和技术咨询服务</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h4 className="font-semibold text-green-600 mb-2">快速响应</h4>
                  <p className="text-gray-600 text-sm">24小时内响应客户咨询和技术支持</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h4 className="font-semibold text-purple-600 mb-2">售后保障</h4>
                  <p className="text-gray-600 text-sm">完善的售后服务体系和技术支持</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h4 className="font-semibold text-orange-600 mb-2">定制方案</h4>
                  <p className="text-gray-600 text-sm">根据客户需求提供个性化解决方案</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 联系表单 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">发送咨询</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      姓名 *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="请输入您的姓名"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Building2 className="w-4 h-4 inline mr-1" />
                      公司名称 *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="请输入公司名称"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      邮箱地址 *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="请输入邮箱地址"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      联系电话 *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="请输入联系电话"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    咨询内容 *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="请详细描述您的需求或问题..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>发送咨询</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>


      </div>
    </div>
  );
} 