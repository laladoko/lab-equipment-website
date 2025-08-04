#!/bin/bash

# 自动部署系统设置脚本
# 一键设置智能自动更新系统

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_header() {
    echo -e "${CYAN}========================================${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${CYAN}========================================${NC}"
}

# 检查依赖
check_dependencies() {
    log_header "🔍 检查系统依赖"
    
    # 检查必要文件
    local required_files=("deploy.sh" "auto-deploy.sh")
    for file in "${required_files[@]}"; do
        if [ -f "$file" ]; then
            log_info "✅ $file 存在"
        else
            log_error "❌ $file 不存在"
            exit 1
        fi
    done
    
    # 检查监控目录
    if [ -d "src/data" ]; then
        log_info "✅ 产品数据目录存在"
    else
        log_warn "⚠️ 产品数据目录不存在"
    fi
}

# 测试自动部署系统
test_system() {
    log_header "🧪 测试自动部署系统"
    
    log_info "📊 检查系统状态..."
    ./auto-deploy.sh status
    
    echo ""
    log_info "🔍 手动检查文件变化..."
    ./auto-deploy.sh check
}

# 创建启动脚本
create_launcher() {
    log_header "📝 创建启动脚本"
    
    cat > start-auto-deploy.sh << 'EOF'
#!/bin/bash
# 启动自动部署监控

cd "$(dirname "$0")"

echo "🚀 启动实验室设备网站自动部署监控..."
echo "📍 工作目录: $(pwd)"
echo "⏰ 开始时间: $(date)"
echo ""

# 启动监控
./auto-deploy.sh monitor
EOF

    chmod +x start-auto-deploy.sh
    log_info "✅ 创建启动脚本: start-auto-deploy.sh"
    
    # 创建后台启动脚本
    cat > start-auto-deploy-background.sh << 'EOF'
#!/bin/bash
# 后台启动自动部署监控

cd "$(dirname "$0")"

echo "🚀 后台启动自动部署监控..."
nohup ./auto-deploy.sh monitor > auto-deploy-background.log 2>&1 &
echo "✅ 监控已在后台启动，PID: $!"
echo "📋 查看日志: tail -f auto-deploy-background.log"
echo "🛑 停止监控: ./auto-deploy.sh stop"
EOF

    chmod +x start-auto-deploy-background.sh
    log_info "✅ 创建后台启动脚本: start-auto-deploy-background.sh"
}

# 创建使用指南
create_guide() {
    log_header "📖 创建使用指南"
    
    cat > AUTO_DEPLOY_GUIDE.md << 'EOF'
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
EOF

    log_info "✅ 创建使用指南: AUTO_DEPLOY_GUIDE.md"
}

# 主程序
main() {
    log_header "🛠️ 设置智能自动部署系统"
    
    check_dependencies
    test_system
    create_launcher
    create_guide
    
    echo ""
    log_header "✅ 自动部署系统设置完成"
    
    echo ""
    echo "🚀 使用方法:"
    echo "  前台监控: ./auto-deploy.sh monitor"
    echo "  后台监控: ./start-auto-deploy-background.sh"
    echo "  查看状态: ./auto-deploy.sh status"
    echo "  查看帮助: ./auto-deploy.sh help"
    echo ""
    echo "📖 详细文档: AUTO_DEPLOY_GUIDE.md"
    echo ""
    
    # 询问是否立即启动
    echo "是否立即启动自动监控? (y/N): "
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        log_info "🚀 启动自动监控..."
        ./auto-deploy.sh monitor
    else
        log_info "ℹ️ 请稍后手动启动监控"
    fi
}

# 运行主程序
main "$@"