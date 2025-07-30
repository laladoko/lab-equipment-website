import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'
import { updateProductData, validateProductData } from '@/utils/productDataUpdater'

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
    
    return NextResponse.json({
      success: true,
      productId: productData.id,
      brand: brand,
      imagesUploaded: uploadedImages.length,
      message: '产品上传成功'
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