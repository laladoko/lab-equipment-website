# 自动部署系统使用指南

## 🚀 快速开始

### 1. 前台监控（推荐用于测试）
```bash
./auto-deploy.sh monitor
```

### 2. 后台监控（推荐用于生产）
```bash
./start-auto-deploy-background.sh
```

### 3. 手动检查
```bash
./auto-deploy.sh check
```

## 📊 系统监控

### 查看状态
```bash
./auto-deploy.sh status
```

### 查看日志
```bash
./auto-deploy.sh logs
# 或查看详细日志
tail -f auto-deploy.log
```

### 停止监控
```bash
./auto-deploy.sh stop
```

## 🔧 工作原理

1. **文件监控**: 系统监控以下产品数据文件:
   - `src/data/bruker-products.ts`
   - `src/data/fritsch-products.ts`
   - `src/data/olympus-products.ts`
   - `src/data/wiggens-products.ts`

2. **变化检测**: 每10秒检查一次文件修改时间

3. **智能延迟**: 检测到变化后等待30秒，避免频繁部署

4. **自动部署**: 执行 `./deploy.sh` 进行完整部署

5. **通知系统**: macOS用户会收到系统通知

## 📋 日常使用流程

### 用户修改产品信息后:
1. 用户在 https://www.qple.net/admin/upload 修改产品
2. API保存数据到文件
3. 自动监控系统检测到文件变化
4. 等待30秒（合并多个快速变化）
5. 自动执行部署脚本
6. 网站更新完成，用户可看到最新数据

### 管理员监控:
1. 查看实时状态: `./auto-deploy.sh status`
2. 查看部署日志: `./auto-deploy.sh logs`
3. 手动触发部署: `./auto-deploy.sh deploy`

## 🛡️ 安全特性

- **进程锁定**: 防止同时运行多个部署
- **错误处理**: 部署失败时记录详细日志
- **通知系统**: 成功/失败都有通知
- **日志记录**: 所有操作都有时间戳记录

## 🔧 故障排除

### 监控未启动
```bash
# 检查进程
ps aux | grep auto-deploy

# 重新启动
./start-auto-deploy-background.sh
```

### 部署失败
```bash
# 查看错误日志
./auto-deploy.sh logs

# 手动测试部署
./deploy.sh
```

### 文件变化未检测
```bash
# 手动检查
./auto-deploy.sh check

# 查看文件状态
./auto-deploy.sh status
```

## 📈 性能优化

- 默认检查间隔: 10秒
- 部署延迟: 30秒
- 可在 `auto-deploy.sh` 中调整这些参数

## 🔄 维护建议

1. **定期查看日志**: 每周检查一次部署日志
2. **清理旧日志**: 定期清理过大的日志文件
3. **监控系统资源**: 确保服务器资源充足
4. **测试部署**: 定期手动测试部署流程

---

💡 **提示**: 系统启动后会自动监控，无需人工干预。用户修改产品后1-2分钟内自动完成部署。
