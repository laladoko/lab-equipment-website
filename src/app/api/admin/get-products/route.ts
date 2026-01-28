import { NextRequest, NextResponse } from 'next/server'

// 静态导入所有品牌数据，避免动态 import 内存泄漏
import { brukerProducts } from '@/data/bruker-products'
import { olympusProducts } from '@/data/olympus-products'
import { wiggensProducts } from '@/data/wiggens-products'
import { fritschProducts } from '@/data/fritsch-products'

// 品牌数据映射
const brandProductsMap: Record<string, unknown[]> = {
  bruker: brukerProducts,
  olympus: olympusProducts,
  wiggens: wiggensProducts,
  fritsch: fritschProducts,
}

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
    
    // 从静态导入的映射中获取产品数据
    const products = brandProductsMap[brand]
    
    if (!products) {
      return NextResponse.json(
        { error: `品牌 ${brand} 不存在` },
        { status: 404 }
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