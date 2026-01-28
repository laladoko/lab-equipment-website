import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'
import { updateProductData, validateProductData } from '../../../../utils/productDataUpdater'

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
    
    // 暂时禁用自动重新构建功能，因为它可能导致应用崩溃
    // TODO: 需要实现更安全的重新构建机制
    try {
      console.log('🔄 产品数据更新成功，请手动重新构建和重启以应用更改')
      // 注释掉自动重新构建，因为在运行时重新构建可能破坏.next目录
      /*
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
      }, 1000)
      */
    } catch (error) {
      console.warn('⚠️ 重新构建命令执行异常:', error)
    }
    
    return NextResponse.json({
      success: true,
      productId: productData.id,
      brand: brand,
      imagesUploaded: uploadedImages.length,
      message: '产品上传成功，数据已保存。请运行部署脚本以应用更改。',
      autoRestart: false
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