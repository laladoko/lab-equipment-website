import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'
import { updateProductData, validateProductData } from '@/utils/productDataUpdater'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const brand = formData.get('brand') as string
    const productDataStr = formData.get('productData') as string
    
    if (!brand || !productDataStr) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      )
    }
    
    // 解析产品数据
    let productData
    try {
      productData = JSON.parse(productDataStr)
    } catch {
      return NextResponse.json(
        { error: 'JSON数据格式错误' },
        { status: 400 }
      )
    }
    
    // 创建品牌产品目录
    const brandDir = path.join(process.cwd(), 'public', 'brands', brand, 'products')
    if (!existsSync(brandDir)) {
      await mkdir(brandDir, { recursive: true })
    }
    
    // 处理图片上传
    const uploadedImages: string[] = []
    let imageIndex = 0
    
    while (true) {
      const imageFile = formData.get(`image_${imageIndex}`) as File
      if (!imageFile) break
      
      // 生成文件名
      const fileExtension = path.extname(imageFile.name)
      const fileName = `${productData.id}-${imageIndex + 1}${fileExtension}`
      const filePath = path.join(brandDir, fileName)
      
      // 保存文件
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      await writeFile(filePath, buffer)
      
      // 记录相对路径
      uploadedImages.push(`/brands/${brand}/products/${fileName}`)
      imageIndex++
    }
    
    // 更新产品数据中的图片路径
    if (uploadedImages.length > 0) {
      if (uploadedImages.length === 1) {
        productData.image = uploadedImages[0]
        delete productData.images
      } else {
        productData.images = uploadedImages
        delete productData.image
      }
    }
    
    // 验证产品数据（在处理图片后）
    try {
      productData = validateProductData(productData)
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : '数据验证失败' },
        { status: 400 }
      )
    }
    
    // 检查产品数据文件是否存在
    const dataFilePath = path.join(process.cwd(), 'src', 'data', `${brand}-products.ts`)
    if (!existsSync(dataFilePath)) {
      return NextResponse.json(
        { error: `品牌 ${brand} 的产品数据文件不存在` },
        { status: 404 }
      )
    }
    
    // 更新产品数据
    await updateProductData(brand, productData)
    
    // 自动重新构建和重启应用以清除缓存
    try {
      console.log('🔄 产品数据更新成功，正在重新构建和重启应用...')
      // 异步重新构建和重启，不等待结果，避免请求超时
      setTimeout(async () => {
        try {
          console.log('📦 正在重新构建应用...')
          await execAsync('cd /root/lab-equipment-website && npm run build')
          console.log('🔄 正在重启应用...')
          await execAsync('pm2 restart lab-equipment-website')
          console.log('✅ 应用重新构建和重启成功，新数据已生效')
        } catch (error) {
          console.error('❌ 重新构建或重启失败:', error)
        }
      }, 1000) // 1秒后执行重新构建和重启
    } catch (error) {
      console.warn('⚠️ 重新构建命令执行异常:', error)
    }
    
    return NextResponse.json({
      success: true,
      productId: productData.id,
      brand: brand,
      imagesUploaded: uploadedImages.length,
      message: '产品上传成功，应用将在1-2分钟内自动重新构建和重启以应用更改',
      autoRestart: true
    })
    
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Product upload API - Use POST method',
    supportedBrands: ['bruker', 'olympus', 'wiggens', 'fritsch'],
    requiredFields: ['id', 'name', 'description', 'price', 'images']
  })
} 