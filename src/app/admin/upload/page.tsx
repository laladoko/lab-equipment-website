'use client'

import { useState } from 'react'
import { Upload, FileText, Image, Save, AlertCircle, CheckCircle } from 'lucide-react'

interface Brand {
  id: string
  name: string
  slug: string
}

const brands: Brand[] = [
  { id: 'bruker', name: 'BRUKER', slug: 'bruker' },
  { id: 'olympus', name: 'EVIDENT/OLYMPUS', slug: 'olympus' },
  { id: 'wiggens', name: 'WIGGENS', slug: 'wiggens' },
  { id: 'fritsch', name: 'FRITSCH', slug: 'fritsch' }
]

export default function ProductUploadPage() {
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [productData, setProductData] = useState<string>('')
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setSelectedImages(Array.from(files))
    }
  }

  const handleJsonUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/json') {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string
          const parsed = JSON.parse(content)
          setProductData(JSON.stringify(parsed, null, 2))
        } catch {
          setMessage('JSON文件格式错误')
          setUploadStatus('error')
        }
      }
      reader.readAsText(file)
    }
  }

  const validateProductData = () => {
    try {
      const data = JSON.parse(productData)
      const required = ['id', 'name', 'description', 'price', 'images']
      
      for (const field of required) {
        if (!data[field]) {
          throw new Error(`缺少必填字段: ${field}`)
        }
      }
      
      if (!Array.isArray(data.images)) {
        throw new Error('images字段必须是数组')
      }
      
      return data
    } catch (error) {
      throw new Error(`JSON数据验证失败: ${error instanceof Error ? error.message : '未知错误'}`)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!selectedBrand) {
      setMessage('请选择品牌')
      setUploadStatus('error')
      return
    }
    
    if (!productData.trim()) {
      setMessage('请输入产品数据')
      setUploadStatus('error')
      return
    }
    
    if (selectedImages.length === 0) {
      setMessage('请选择产品图片')
      setUploadStatus('error')
      return
    }

    try {
      setIsUploading(true)
      setUploadStatus('idle')
      
      // 验证JSON数据
      const validatedData = validateProductData()
      
      // 创建FormData
      const formData = new FormData()
      formData.append('brand', selectedBrand)
      formData.append('productData', JSON.stringify(validatedData))
      
      // 添加图片文件
      selectedImages.forEach((image, index) => {
        formData.append(`image_${index}`, image)
      })
      
      // 发送到API
      const response = await fetch('/api/admin/upload-product', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '上传失败')
      }
      
      const result = await response.json()
      setMessage(`产品上传成功! 产品ID: ${result.productId}`)
      setUploadStatus('success')
      
      // 重置表单
      setSelectedBrand('')
      setProductData('')
      setSelectedImages([])
      
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '上传失败，请重试')
      setUploadStatus('error')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <Upload className="w-6 h-6 mr-2" />
              产品上传管理
            </h1>
            <p className="text-blue-100 mt-1">上传新产品数据和图片到指定品牌</p>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* 品牌选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                选择品牌 *
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">请选择品牌...</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.slug}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* JSON数据输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                产品数据 (JSON格式) *
              </label>
              <div className="space-y-3">
                {/* JSON文件上传 */}
                <div className="flex items-center space-x-3">
                  <label className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                    <FileText className="w-4 h-4 mr-2" />
                    上传JSON文件
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleJsonUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-sm text-gray-500">或手动输入JSON数据</span>
                </div>
                
                {/* JSON文本区域 */}
                <textarea
                  value={productData}
                  onChange={(e) => setProductData(e.target.value)}
                  placeholder={`{
  "id": 1,
  "name": "产品名称",
  "description": "产品描述",
  "price": "询价",
  "images": ["image1.jpg", "image2.jpg"],
  "features": ["特性1", "特性2"],
  "specifications": {
    "规格1": "值1",
    "规格2": "值2"
  }
}`}
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  required
                />
              </div>
            </div>

            {/* 图片上传 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                产品图片 *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <label className="cursor-pointer">
                  <div className="space-y-2">
                    <Image className="w-12 h-12 text-gray-400 mx-auto" />
                    <div className="text-sm text-gray-600">
                      <span className="text-blue-600 hover:text-blue-500">点击选择图片</span>
                      <span> 或拖拽图片到此处</span>
                    </div>
                    <p className="text-xs text-gray-500">支持 JPG、PNG、WebP 格式</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    required
                  />
                </label>
              </div>
              
              {/* 已选择的图片预览 */}
              {selectedImages.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    已选择 {selectedImages.length} 张图片:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`预览 ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b truncate">
                          {image.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 状态消息 */}
            {message && (
              <div className={`flex items-center p-4 rounded-md ${
                uploadStatus === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {uploadStatus === 'success' ? (
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                )}
                <span>{message}</span>
              </div>
            )}

            {/* 提交按钮 */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isUploading}
                className={`flex items-center px-6 py-3 rounded-md font-medium transition-colors ${
                  isUploading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                <Save className="w-4 h-4 mr-2" />
                {isUploading ? '上传中...' : '上传产品'}
              </button>
            </div>
          </form>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-3">使用说明</h3>
          <div className="text-sm text-blue-700 space-y-2">
            <p>• <strong>品牌选择:</strong> 选择要添加产品的品牌，产品将添加到对应品牌的产品列表中</p>
            <p>• <strong>JSON数据:</strong> 可以上传JSON文件或手动输入产品数据，必须包含id、name、description、price、images等字段</p>
            <p>• <strong>图片上传:</strong> 支持多张图片上传，图片将保存到 /public/brands/[品牌]/products/ 目录下</p>
            <p>• <strong>文件命名:</strong> 上传的图片会自动重命名为产品ID对应的格式</p>
          </div>
        </div>
      </div>
    </div>
  )
} 