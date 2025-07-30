import { readFile, writeFile } from 'fs/promises'
import path from 'path'

export interface ProductData {
  id: number | string
  name: string
  description: string
  price: string
  image?: string
  features?: string[]
  specifications?: Record<string, string>
  category?: string
  [key: string]: unknown
}

export async function updateProductData(brand: string, newProduct: ProductData): Promise<void> {
  const dataFilePath = path.join(process.cwd(), 'src', 'data', `${brand}-products.ts`)
  
  // 读取现有文件内容（用于保留文件结构）
  const fileContent = await readFile(dataFilePath, 'utf-8')
  
  // 提取接口定义
  const interfaceMatch = fileContent.match(/export interface \w+Product \{[\s\S]*?\}/g)
  const interfaceDef = interfaceMatch ? interfaceMatch[0] : ''
  
  // 提取类别和应用领域定义
  const categoriesMatch = fileContent.match(/export const \w+ProductCategories[\s\S]*?(?=export const \w+ApplicationAreas)/g)
  const categoriesDef = categoriesMatch ? categoriesMatch[0] : ''
  
  const applicationAreasMatch = fileContent.match(/export const \w+ApplicationAreas[\s\S]*?(?=export const \w+Products)/g)
  const applicationAreasDef = applicationAreasMatch ? applicationAreasMatch[0] : ''
  
  // 使用动态导入获取现有产品数据
  let existingProducts: ProductData[]
  try {
    // 删除require缓存，确保获取最新数据
    const modulePath = path.join(process.cwd(), 'src', 'data', `${brand}-products.ts`)
    delete require.cache[modulePath]
    
    // 动态导入模块
    const productModule = await import(`@/data/${brand}-products`)
    const productKey = `${brand}Products`
    
    if (!productModule[productKey]) {
      throw new Error(`未找到${productKey}导出`)
    }
    
    // 深拷贝现有产品数据
    existingProducts = JSON.parse(JSON.stringify(productModule[productKey]))
  } catch (error) {
    console.error('获取现有产品数据失败:', error)
    throw new Error('获取现有产品数据失败')
  }
  
  // 检查产品ID是否已存在
  const existingIndex = existingProducts.findIndex((p: ProductData) => p.id === newProduct.id)
  if (existingIndex !== -1) {
    // 更新现有产品
    existingProducts[existingIndex] = newProduct
  } else {
    // 添加新产品
    existingProducts.push(newProduct)
  }
  
  // 生成新的TypeScript代码
  const brandCapitalized = brand.charAt(0).toUpperCase() + brand.slice(1)
  const productsArrayStr = formatProductsArray(existingProducts)
  
  const newFileContent = `${interfaceDef}

${categoriesDef}

${applicationAreasDef}

export const ${brand}Products: ${brandCapitalized}Product[] = ${productsArrayStr};`
  
  // 写入更新的文件
  await writeFile(dataFilePath, newFileContent, 'utf-8')
}

function formatProductsArray(products: ProductData[]): string {
  // 辅助函数：转义字符串中的单引号
  const escapeString = (str: string): string => {
    return str.replace(/'/g, "\\'")
  }

  const formatted = products.map(product => {
    const entries = Object.entries(product).map(([key, value]) => {
      if (Array.isArray(value)) {
        const arrayItems = value.map(item => `'${escapeString(String(item))}'`).join(', ')
        return `    ${key}: [${arrayItems}]`
      } else if (typeof value === 'object' && value !== null) {
        const objectEntries = Object.entries(value)
          .map(([k, v]) => `      '${escapeString(String(k))}': '${escapeString(String(v))}'`)
          .join(',\n')
        return `    ${key}: {\n${objectEntries}\n    }`
      } else if (typeof value === 'string') {
        return `    ${key}: '${escapeString(value)}'`
      } else {
        return `    ${key}: ${value}`
      }
    })
    
    return `  {\n${entries.join(',\n')}\n  }`
  })
  
  return `[\n${formatted.join(',\n')}\n]`
}

export function validateProductData(data: unknown): ProductData {
  if (typeof data !== 'object' || data === null) {
    throw new Error('数据必须是对象')
  }
  
  const productData = data as Record<string, unknown>
  const required = ['id', 'name', 'description', 'price']
  
  // 检查基本必填字段
  for (const field of required) {
    if (!productData[field]) {
      throw new Error(`缺少必填字段: ${field}`)
    }
  }
  
  // 检查图片字段 - image字段可选，但如果存在必须是字符串
  if (productData.image && typeof productData.image !== 'string') {
    throw new Error('image字段必须是字符串')
  }
  
  // 移除images字段（如果存在）
  delete productData.images
  
  return productData as ProductData
} 