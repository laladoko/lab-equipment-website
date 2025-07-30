#!/bin/bash

# 浏览器兼容性部署脚本
# 专门解决Safari和360浏览器兼容性问题

set -e

echo "🔧 开始浏览器兼容性部署..."

# 服务器信息
SERVER_IP="103.44.245.79"
SERVER_USER="root"
PROJECT_NAME="lab-equipment-website"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 本地清理和重新构建
log_info "🧹 清理本地构建缓存..."
rm -rf .next
rm -rf node_modules/.cache

log_info "📦 重新安装依赖..."
npm install

log_info "🏗️ 使用兼容性模式构建..."
NODE_ENV=production npm run build

# 远程部署
log_info "🚀 开始远程部署..."

ssh -o ConnectTimeout=10 ${SERVER_USER}@${SERVER_IP} << 'EOF'
    set -e
    
    echo "📦 进入项目目录..."
    cd /root/lab-equipment-website
    
    echo "🔄 拉取最新代码..."
    git fetch origin
    git reset --hard origin/main
    
    echo "🧹 清理服务器构建缓存..."
    rm -rf .next
    rm -rf node_modules/.cache
    
    echo "📋 检查文件变更..."
    git log --oneline -3
    
    echo "🔧 重新安装依赖..."
    npm ci --production=false
    
    echo "🏗️ 使用兼容性模式构建..."
    NODE_ENV=production npm run build
    
    echo "🛑 停止当前应用..."
    pm2 stop lab-equipment-website || true
    
    echo "🔄 重启应用..."
    pm2 start npm --name "lab-equipment-website" -- start
    
    echo "⏱️ 等待应用启动..."
    sleep 8
    
    echo "🔍 检查应用状态..."
    pm2 status
    
    echo "🌐 测试网站访问..."
    if curl -f -s http://localhost:3000 > /dev/null; then
        echo "✅ 网站访问正常"
    else
        echo "❌ 网站访问失败，查看日志:"
        pm2 logs lab-equipment-website --lines 10
        exit 1
    fi
    
    echo "🎉 浏览器兼容性部署完成！"
EOF

log_info "✅ 部署完成！"
log_info "🌐 网站地址: https://www.qple.net"
log_info "📱 请在Safari和360浏览器中测试访问"

echo ""
echo "🔍 测试建议:"
echo "1. 清除浏览器缓存后重新访问"
echo "2. 在Safari开发者工具中查看控制台错误"
echo "3. 在360浏览器中查看控制台错误"
echo "4. 如果仍有问题，请提供具体的错误信息" 