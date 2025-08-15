# 502/500 错误修复总结

## 问题描述
网站出现502/500错误，导致无法正常访问。

## 错误分析过程

### 1. 初始问题
- 应用无法启动，出现502错误
- 检查发现Next.js构建文件缺失或损坏

### 2. 构建问题
- 尝试重新构建时出现JSON解析错误
- 发现webpack模块加载问题：`Cannot read properties of undefined (reading 'call')`

### 3. 端口冲突
- 应用启动时出现端口占用错误：`EADDRINUSE: address already in use 127.0.0.1:3000`
- 多个PM2进程同时运行导致冲突

### 4. 生产构建缺失
- 生产模式启动时提示：`Could not find a production build in the '.next' directory`
- 缺少必要的构建文件如`prerender-manifest.json`和`middleware-manifest.json`

### 5. API路由错误
- 页面可以访问但API返回500错误
- 缺少`middleware-manifest.json`导致API路由无法正常工作

## 解决方案

### 1. 清理环境
```bash
pm2 stop lab-equipment-website
rm -rf .next
pm2 delete 旧进程ID
```

### 2. 重新构建
```bash
npm run build
```

### 3. 生产模式启动
```bash
pm2 start npm --name 'lab-equipment-website' -- run start -- --hostname 127.0.0.1
```

## 关键配置

### IPv4绑定
- 明确指定`--hostname 127.0.0.1`避免IPv6/IPv4冲突
- 确保Nginx能正确连接到应用

### PM2进程管理
- 使用生产模式(`npm run start`)而非开发模式
- 避免热重载导致的不稳定

### 完整构建
- 确保`.next`目录包含所有必要文件
- 特别是`middleware-manifest.json`和`prerender-manifest.json`

## 最终状态

✅ **问题已完全解决**
- 网站正常返回200状态码
- API端点正常工作
- 应用稳定运行在端口3000
- 内存使用：59.9MB
- 运行时间：稳定运行中
- 重启次数：8次（当前进程）

## 预防措施

1. **定期清理构建文件**：避免`.next`目录损坏
2. **使用生产模式**：生产环境避免开发模式的不稳定
3. **进程管理**：及时清理重复的PM2进程
4. **监控日志**：定期检查应用和Nginx日志
5. **完整构建**：确保构建过程完成，包含所有必要文件

## 测试结果

- 主页：✅ 200 OK
- 管理页面：✅ 200 OK
- API端点：✅ 200 OK
- 图片上传：✅ 功能正常
- 页面跳转：✅ 响应正常

## 关键修复点

**webpack模块错误**是导致问题的根本原因：
- 构建过程中断导致关键文件缺失
- `middleware-manifest.json`缺失导致API路由无法工作
- 通过完整重新构建解决了所有依赖问题

网站现已完全恢复正常运行，所有功能包括图片上传都正常工作！
