#!/bin/bash

# 实验室设备网站自动部署脚本
# 使用方法: ./deploy.sh

set -e  # 遇到错误立即退出

echo "🚀 开始自动部署..."

# 服务器信息
SERVER_IP="103.44.245.79"
SERVER_USER="root"
PROJECT_NAME="lab-equipment-website"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查SSH连接
log_info "检查服务器连接..."
log_info "请输入服务器密码进行连接..."

# 远程部署函数
remote_deploy() {
    log_info "连接到服务器 ${SERVER_IP}..."
    
    ssh -o ConnectTimeout=10 ${SERVER_USER}@${SERVER_IP} << 'EOF'
        set -e
        
        echo "📦 进入项目目录..."
        cd /root/lab-equipment-website
        
        echo "🔄 拉取最新代码..."
        git fetch origin
        git reset --hard origin/main
        
        echo "📋 检查文件变更..."
        git log --oneline -5
        
        echo "🔧 安装依赖..."
        npm install
        
        echo "🏗️ 构建项目..."
        npm run build
        
        echo "🔄 重启应用..."
        pm2 restart lab-equipment-website
        
        echo "⏱️ 等待应用启动..."
        sleep 5
        
        echo "🔍 检查应用状态..."
        pm2 status
        
        echo "🌐 测试网站访问..."
        if curl -f -s http://localhost:3000 > /dev/null; then
            echo "✅ 网站访问正常"
        else
            echo "❌ 网站访问失败"
            exit 1
        fi
        
        echo "📊 显示资源使用情况..."
        echo "内存使用:"
        free -h | head -2
        echo ""
        echo "磁盘使用:"
        df -h / | tail -1
        
        echo "🎉 部署完成！"
EOF
}

# 执行部署
log_info "开始远程部署..."
remote_deploy

log_info "部署完成！"
log_info "网站地址: https://www.qple.net"
log_info "您可以在浏览器中访问查看最新版本"

echo ""
echo "📝 后续更新流程:"
echo "1. 在开发机上修改代码"
echo "2. git add . && git commit -m '更新说明'"
echo "3. git push origin main"
echo "4. 运行 ./deploy.sh 自动部署"
echo ""
echo "🔧 常用管理命令:"
echo "• 查看应用状态: ssh root@${SERVER_IP} 'pm2 status'"
echo "• 查看应用日志: ssh root@${SERVER_IP} 'pm2 logs lab-equipment-website'"
echo "• 重启应用: ssh root@${SERVER_IP} 'pm2 restart lab-equipment-website'" 