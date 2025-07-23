# URL错误修复说明

## 问题描述
在Bruker品牌页面访问时出现以下错误：
```
TypeError: Failed to construct 'URL': Invalid URL
```

## 问题原因
1. **图片路径错误**：`src/data/bruker-products.ts` 中第47行的图片路径缺少开头的斜杠
   ```typescript
   // 错误
   image: 'brands/bruker/banner-raman-spectroscopy-multiram-bruker.png',
   
   // 正确
   image: '/brands/bruker/banner-raman-spectroscopy-multiram-bruker.png',
   ```

2. **无效的产品链接**：Bruker产品数据中使用了无效的第三方链接
   ```typescript
   // 错误 - 无效链接
   link: 'https://www.instrument.com.cn/netshow/SH103060/C234567.htm',
   link: 'https://www.instrument.com.cn/netshow/SH103060/C345678.htm',
   
   // 正确 - 官方链接
   link: 'https://www.bruker.com/zh/products-and-solutions/raman-spectroscopy/raman-spectrometers/multiram.html',
   link: 'https://www.bruker.com/zh/products-and-solutions/raman-spectroscopy/raman-spectrometers/ram-ii.html',
   ```

## 修复内容

### 1. 图片路径修复
- 修复了RAM II FT-拉曼模块的图片路径
- 确保所有图片路径都以 `/` 开头，符合Next.js静态资源路径规范

### 2. 产品链接修复
- 将MultiRAM产品的无效链接替换为官方链接
- 将RAM II产品的无效链接替换为官方链接
- 确保所有产品链接都指向有效的Bruker官方网站

### 3. 服务器重启
- 停止了多个并行的开发服务器进程
- 重新启动开发服务器以确保修复生效

## 验证结果
- ✅ 开发服务器正常运行在 http://localhost:3000
- ✅ Bruker品牌页面可正常访问
- ✅ 产品图片正常显示
- ✅ 产品链接指向正确的官方页面

## 预防措施
1. 确保所有图片路径都以 `/` 开头
2. 使用官方产品链接而非第三方链接
3. 定期检查链接的有效性
4. 避免运行多个开发服务器实例

## 相关文件
- `src/data/bruker-products.ts` - Bruker产品数据文件
- `src/app/components/ProductImage.tsx` - 产品图片组件
- `src/app/components/GenericProductShowcase.tsx` - 通用产品展示组件 