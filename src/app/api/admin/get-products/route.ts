import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const brand = searchParams.get('brand')
    
    if (!brand) {
      return NextResponse.json(
        { error: '缺少品牌参数' },
        { status: 400 }
      )
    }
    
    // 检查数据文件是否存在
    const dataFilePath = path.join(process.cwd(), 'src', 'data', `${brand}-products.ts`)
    if (!existsSync(dataFilePath)) {
      return NextResponse.json(
        { error: `品牌 ${brand} 的产品数据文件不存在` },
        { status: 404 }
      )
    }
    
    let products
    try {
      // 直接使用动态导入获取产品数据，避免复杂的字符串解析
      const modulePath = path.join(process.cwd(), 'src', 'data', `${brand}-products.ts`)
      
      // 删除require缓存，确保获取最新数据
      delete require.cache[modulePath]
      
      // 动态导入模块
      const productModule = await import(`@/data/${brand}-products`)
      const productKey = `${brand}Products`
      
      if (!productModule[productKey]) {
        throw new Error(`未找到${productKey}导出`)
      }
      
      products = productModule[productKey]
    } catch (error) {
      console.error('获取产品数据失败:', error)
      return NextResponse.json(
        { error: '获取产品数据失败', details: error instanceof Error ? error.message : '未知错误' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      brand: brand,
      products: products,
      count: products.length
    })
    
  } catch (error) {
    console.error('Get products error:', error)
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
} 