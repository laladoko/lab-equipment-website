#!/bin/bash

# 实验室设备网站服务器启动脚本
# 作者: 徐洪森 (lala)
# 日期: 2025-08-15

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查是否为root用户
check_root() {
    if [[ $EUID -ne 0 ]]; then
        log_error "此脚本需要root权限运行"
        exit 1
    fi
}

# 检查系统要求
check_system() {
    log_info "检查系统要求..."
    
    # 检查操作系统
    if [[ -f /etc/os-release ]]; then
        . /etc/os-release
        log_info "操作系统: $PRETTY_NAME"
    else
        log_warning "无法确定操作系统版本"
    fi
    
    # 检查Node.js
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        log_success "Node.js版本: $NODE_VERSION"
    else
        log_error "Node.js未安装，请先安装Node.js"
        exit 1
    fi
    
    # 检查PM2
    if command -v pm2 &> /dev/null; then
        log_success "PM2已安装"
    else
        log_error "PM2未安装，请先安装PM2: npm install -g pm2"
        exit 1
    fi
    
    # 检查Nginx
    if command -v nginx &> /dev/null; then
        log_success "Nginx已安装"
    else
        log_error "Nginx未安装，请先安装Nginx"
        exit 1
    fi
}

# 检查项目目录
check_project() {
    log_info "检查项目目录..."
    
    if [[ ! -d "/root/lab-equipment-website" ]]; then
        log_error "项目目录不存在: /root/lab-equipment-website"
        exit 1
    fi
    
    cd /root/lab-equipment-website
    
    if [[ ! -f "package.json" ]]; then
        log_error "package.json文件不存在"
        exit 1
    fi
    
    log_success "项目目录检查通过"
}

# 安装依赖
install_dependencies() {
    log_info "安装项目依赖..."
    
    if [[ ! -d "node_modules" ]]; then
        npm install
        log_success "依赖安装完成"
    else
        log_info "依赖已存在，跳过安装"
    fi
}

# 构建项目
build_project() {
    log_info "构建项目..."
    
    # 清理旧的构建文件
    if [[ -d ".next" ]]; then
        log_info "清理旧的构建文件..."
        rm -rf .next
    fi
    
    # 构建项目
    npm run build
    
    if [[ -d ".next" ]]; then
        log_success "项目构建成功"
    else
        log_error "项目构建失败"
        exit 1
    fi
}

# 配置PM2
setup_pm2() {
    log_info "配置PM2..."
    
    # 停止现有进程
    if pm2 list | grep -q "lab-equipment-website"; then
        log_info "停止现有PM2进程..."
        pm2 delete lab-equipment-website || true
    fi
    
    # 启动新进程
    pm2 start ecosystem.config.js
    
    # 保存PM2配置
    pm2 save
    
    # 设置开机自启
    pm2 startup
    
    log_success "PM2配置完成"
}

# 配置Nginx
setup_nginx() {
    log_info "配置Nginx..."
    
    # 检查Nginx配置
    if nginx -t; then
        log_success "Nginx配置检查通过"
    else
        log_error "Nginx配置检查失败"
        exit 1
    fi
    
    # 重载Nginx
    systemctl reload nginx
    
    log_success "Nginx配置完成"
}

# 验证部署
verify_deployment() {
    log_info "验证部署..."
    
    # 等待应用启动
    sleep 5
    
    # 检查PM2状态
    if pm2 list | grep -q "online"; then
        log_success "PM2进程运行正常"
    else
        log_error "PM2进程状态异常"
        pm2 status
        exit 1
    fi
    
    # 检查端口绑定
    if netstat -tlnp | grep -q ":3000"; then
        log_success "应用端口绑定正常"
    else
        log_error "应用端口绑定失败"
        exit 1
    fi
    
    # 测试应用访问
    if curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000 | grep -q "200"; then
        log_success "应用访问正常"
    else
        log_error "应用访问失败"
        exit 1
    fi
    
    log_success "部署验证完成"
}

# 显示状态信息
show_status() {
    log_info "显示部署状态..."
    
    echo ""
    echo "=== 部署状态 ==="
    echo ""
    
    # PM2状态
    echo "PM2进程状态:"
    pm2 status
    
    echo ""
    
    # 端口绑定
    echo "端口绑定状态:"
    netstat -tlnp | grep ":3000"
    
    echo ""
    
    # 磁盘使用
    echo "磁盘使用情况:"
    df -h /root/lab-equipment-website
    
    echo ""
    
    # 内存使用
    echo "内存使用情况:"
    free -h
    
    echo ""
    log_success "服务器启动完成！"
    log_info "网站地址: https://www.qple.net"
    log_info "管理页面: https://www.qple.net/admin/upload"
}

# 主函数
main() {
    echo "=================================="
    echo "  实验室设备网站服务器启动脚本"
    echo "=================================="
    echo ""
    
    check_root
    check_system
    check_project
    install_dependencies
    build_project
    setup_pm2
    setup_nginx
    verify_deployment
    show_status
}

# 执行主函数
main "$@"
