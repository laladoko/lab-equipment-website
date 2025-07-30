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
    
    // 读取文件内容
    const fileContent = await readFile(dataFilePath, 'utf-8')
    
    // 提取产品数组
    const arrayMatch = fileContent.match(/export const \w+Products: \w+Product\[\] = (\[[\s\S]*?\]);/)
    if (!arrayMatch) {
      return NextResponse.json(
        { error: '无法解析产品数据文件格式' },
        { status: 500 }
      )
    }
    
    let products
    try {
      // 安全地解析数组内容
      const arrayContent = arrayMatch[1]
      
      // 更安全的字符串处理
      let safeArrayContent = arrayContent
        // 处理单引号
        .replace(/'/g, '"')
        // 处理对象键名
        .replace(/(\w+):/g, '"$1":')
        // 移除尾随逗号
        .replace(/,(\s*[}\]])/g, '$1')
        // 处理特殊字符
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
      
      // 先尝试直接解析
      try {
        products = JSON.parse(safeArrayContent)
      } catch (firstError) {
        console.error('第一次解析失败:', firstError)
        console.log('数组内容示例:', arrayContent.substring(0, 300))
        
        // 更激进的清理
        safeArrayContent = arrayContent
          .replace(/'/g, '"')
          .replace(/(\w+):/g, '"$1":')
          .replace(/,(\s*[}\]])/g, '$1')
          .replace(/\r?\n/g, ' ')
          .replace(/\s+/g, ' ')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
        
        products = JSON.parse(safeArrayContent)
      }
    } catch (error) {
      console.error('解析产品数据失败:', error)
      return NextResponse.json(
        { error: '解析产品数据失败', details: error instanceof Error ? error.message : '未知错误' },
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