import { readFile, writeFile } from 'fs/promises'
import path from 'path'

export interface ProductData {
  id: number | string
  name: string
  description: string
  price: string
  images: string[]
  features?: string[]
  specifications?: Record<string, string>
  category?: string
  [key: string]: unknown
}

export async function updateProductData(brand: string, newProduct: ProductData): Promise<void> {
  const dataFilePath = path.join(process.cwd(), 'src', 'data', `${brand}-products.ts`)
  
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
    throw new Error('无法解析产品数据文件格式')
  }
  
  let existingProducts: ProductData[]
  try {
    // 安全地解析数组内容
    const arrayContent = arrayMatch[1]
    const safeArrayContent = arrayContent
      .replace(/'/g, '"')
      .replace(/(\w+):/g, '"$1":')
      .replace(/,(\s*[}\]])/g, '$1')
    
    existingProducts = JSON.parse(safeArrayContent)
  } catch {
    throw new Error('解析现有产品数据失败')
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

export function validateProductData(data: unknown): ProductData {
  if (typeof data !== 'object' || data === null) {
    throw new Error('数据必须是对象')
  }
  
  const productData = data as Record<string, unknown>
  const required = ['id', 'name', 'description', 'price', 'images']
  
  for (const field of required) {
    if (!productData[field]) {
      throw new Error(`缺少必填字段: ${field}`)
    }
  }
  
  if (!Array.isArray(productData.images)) {
    throw new Error('images字段必须是数组')
  }
  
  return productData as ProductData
} 