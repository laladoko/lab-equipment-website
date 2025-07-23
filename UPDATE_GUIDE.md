# 🚀 网站更新部署指南

## 📋 更新流程概述

您的网站已经部署在服务器 `103.44.245.79` 上，后续更新非常简单！

## 🔄 完整更新流程

### 1. 开发机上修改代码
```bash
# 在您的开发机上修改代码
# 例如：修改 src/app/components/Navbar.tsx
```

### 2. 提交到GitHub
```bash
# 添加所有更改
git add .

# 提交更改
git commit -m "更新说明：例如'优化导航栏样式'"

# 推送到GitHub
git push origin main
```

### 3. 自动部署到服务器
```bash
# 运行部署脚本（会自动从GitHub拉取最新代码）
./deploy.sh
```

## 🎯 一键更新命令

如果您想一次性完成所有操作，可以运行：

```bash
# 提交并推送代码
git add . && git commit -m "更新说明" && git push origin main

# 自动部署
./deploy.sh
```

## 📊 部署脚本功能

`deploy.sh` 脚本会自动执行以下操作：

1. **连接服务器** - 自动连接到 `103.44.245.79`
2. **拉取代码** - 从GitHub拉取最新代码
3. **安装依赖** - 自动安装新的npm包
4. **构建项目** - 重新构建Next.js应用
5. **重启应用** - 使用PM2重启应用
6. **健康检查** - 验证网站是否正常运行
7. **状态报告** - 显示部署结果和资源使用情况

## 🔧 常用管理命令

### 查看应用状态
```bash
ssh root@103.44.245.79 'pm2 status'
```

### 查看应用日志
```bash
ssh root@103.44.245.79 'pm2 logs lab-equipment-website'
```

### 重启应用
```bash
ssh root@103.44.245.79 'pm2 restart lab-equipment-website'
```

### 停止应用
```bash
ssh root@103.44.245.79 'pm2 stop lab-equipment-website'
```

### 查看服务器资源
```bash
ssh root@103.44.245.79 'free -h && df -h'
```

## 🌐 访问信息

- **网站地址**: https://www.qple.net
- **服务器**: Ubuntu 20.04 LTS
- **应用**: Next.js 15.1.6
- **进程管理**: PM2
- **反向代理**: Nginx

## ⚠️ 注意事项

1. **确保SSH连接正常** - 部署脚本需要SSH访问权限
2. **GitHub仓库权限** - 确保服务器可以访问您的GitHub仓库
3. **依赖兼容性** - 新增依赖时确保与生产环境兼容
4. **备份重要数据** - 重要更改前建议备份

## 🚨 故障排除

### 如果部署失败
```bash
# 查看详细错误信息
ssh root@103.44.245.79 'pm2 logs lab-equipment-website --lines 50'

# 手动重启应用
ssh root@103.44.245.79 'pm2 restart lab-equipment-website'
```

### 如果网站无法访问
```bash
# 检查Nginx状态
ssh root@103.44.245.79 'systemctl status nginx'

# 重启Nginx
ssh root@103.44.245.79 'systemctl restart nginx'
```

## 📈 性能监控

部署脚本会自动显示：
- 应用运行状态
- 内存使用情况
- 磁盘使用情况
- 网站访问状态

---

**总结**: 您只需要在开发机上修改代码 → 推送到GitHub → 运行 `./deploy.sh`，就能完成整个更新流程！🎉 