import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, unlink } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

export async function DELETE(request: NextRequest) {
  try {
    const { brand, productId } = await request.json()
    
    if (!brand || (productId === undefined || productId === null)) {
      return NextResponse.json(
        { error: '缺少必要参数' },
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
    
    // 读取现有文件内容
    const fileContent = await readFile(dataFilePath, 'utf-8')
    
    // 提取接口定义
    const interfaceMatch = fileContent.match(/export interface \w+Product \{[\s\S]*?\}/g)
    const interfaceDef = interfaceMatch ? interfaceMatch[0] : ''
    
    // 提取类别和应用领域定义
    const categoriesMatch = fileContent.match(/export const \w+ProductCategories[\s\S]*?(?=export const \w+ApplicationAreas)/g)
    const categoriesDef = categoriesMatch ? categoriesMatch[0] : ''
    
    const applicationAreasMatch = fileContent.match(/export const \w+ApplicationAreas[\s\S]*?(?=export const \w+Products)/g)
    const applicationAreasDef = applicationAreasMatch ? applicationAreasMatch[0] : ''
    
    // 提取产品数组
    const arrayMatch = fileContent.match(/export const \w+Products: \w+Product\[\] = (\[[\s\S]*?\]);/)
    if (!arrayMatch) {
      return NextResponse.json(
        { error: '无法解析产品数据文件格式' },
        { status: 500 }
      )
    }
    
    let existingProducts
    try {
      // 安全地解析数组内容
      const arrayContent = arrayMatch[1]
      const safeArrayContent = arrayContent
        .replace(/'/g, '"')
        .replace(/(\w+):/g, '"$1":')
        .replace(/,(\s*[}\]])/g, '$1')
      
      existingProducts = JSON.parse(safeArrayContent)
    } catch {
      return NextResponse.json(
        { error: '解析现有产品数据失败' },
        { status: 500 }
      )
    }
    
    // 查找要删除的产品
    const productIndex = existingProducts.findIndex((p: Record<string, unknown>) => p.id?.toString() === productId.toString())
    if (productIndex === -1) {
      return NextResponse.json(
        { error: `未找到产品 ID: ${productId}` },
        { status: 404 }
      )
    }
    
    const productToDelete = existingProducts[productIndex]
    
    // 删除相关图片文件
    if (productToDelete.images && Array.isArray(productToDelete.images)) {
      for (const imagePath of productToDelete.images) {
        try {
          // 转换相对路径为绝对路径
          const fullImagePath = path.join(process.cwd(), 'public', imagePath)
          if (existsSync(fullImagePath)) {
            await unlink(fullImagePath)
          }
        } catch (error) {
          console.warn(`删除图片文件失败: ${imagePath}`, error)
        }
      }
    }
    
    // 从数组中移除产品
    existingProducts.splice(productIndex, 1)
    
    // 生成新的TypeScript代码
    const brandCapitalized = brand.charAt(0).toUpperCase() + brand.slice(1)
    const productsArrayStr = formatProductsArray(existingProducts)
    
    const newFileContent = `${interfaceDef}

${categoriesDef}

${applicationAreasDef}

export const ${brand}Products: ${brandCapitalized}Product[] = ${productsArrayStr};`
    
    // 写入更新的文件
    await writeFile(dataFilePath, newFileContent, 'utf-8')
    
    return NextResponse.json({
      success: true,
      productId: productId,
      brand: brand,
      message: '产品删除成功',
      remainingCount: existingProducts.length
    })
    
  } catch (error) {
    console.error('Delete product error:', error)
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
}

function formatProductsArray(products: Record<string, unknown>[]): string {
  if (products.length === 0) {
    return '[]'
  }
  
  const formatted = products.map(product => {
    const entries = Object.entries(product).map(([key, value]) => {
      if (Array.isArray(value)) {
        const arrayItems = value.map(item => `'${item}'`).join(', ')
        return `    ${key}: [${arrayItems}]`
      } else if (typeof value === 'object' && value !== null) {
        const objectEntries = Object.entries(value)
          .map(([k, v]) => `      '${k}': '${v}'`)
          .join(',\n')
        return `    ${key}: {\n${objectEntries}\n    }`
      } else if (typeof value === 'string') {
        return `    ${key}: '${value}'`
      } else {
        return `    ${key}: ${value}`
      }
    })
    
    return `  {\n${entries.join(',\n')}\n  }`
  })
  
  return `[\n${formatted.join(',\n')}\n]`
} 