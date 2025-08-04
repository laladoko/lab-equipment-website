#!/bin/bash

# 实验室设备网站 - 后台日志监控脚本
# 用于实时监控网站运行状态和日志

SERVER_IP="103.44.245.79"
SERVER_USER="root"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 日志输出函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_header() {
    echo -e "${CYAN}========================================${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${CYAN}========================================${NC}"
}

# 显示使用帮助
show_help() {
    echo "实验室设备网站日志监控工具"
    echo ""
    echo "使用方法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  status    - 查看系统状态总览"
    echo "  app       - 实时监控应用日志"
    echo "  nginx     - 实时监控Nginx日志" 
    echo "  errors    - 查看最近的错误日志"
    echo "  access    - 查看最近的访问日志"
    echo "  live      - 实时监控所有日志"
    echo "  save      - 保存当前日志快照"
    echo "  help      - 显示此帮助信息"
    echo ""
    echo "示例:"
    echo "  $0 status  # 查看系统状态"
    echo "  $0 live    # 实时监控所有日志"
    echo ""
}

# 检查服务器连接
check_connection() {
    log_info "检查服务器连接..."
    if ssh -o ConnectTimeout=5 ${SERVER_USER}@${SERVER_IP} "echo 'Connection OK'" >/dev/null 2>&1; then
        log_info "✅ 服务器连接正常"
        return 0
    else
        log_error "❌ 无法连接到服务器"
        return 1
    fi
}

# 显示系统状态总览
show_status() {
    log_header "📊 系统状态总览 - $(date)"
    
    echo -e "${BLUE}🔍 PM2 应用状态:${NC}"
    ssh ${SERVER_USER}@${SERVER_IP} "pm2 status" 2>/dev/null || log_error "无法获取PM2状态"
    echo ""
    
    echo -e "${BLUE}💾 系统资源使用:${NC}"
    ssh ${SERVER_USER}@${SERVER_IP} "free -h && echo '' && df -h | grep -E '(Filesystem|/dev/sda)'" 2>/dev/null
    echo ""
    
    echo -e "${BLUE}🌐 网站访问测试:${NC}"
    if curl -s -I https://www.qple.net | head -1 | grep -q "200"; then
        log_info "✅ 网站访问正常"
    else
        log_error "❌ 网站访问异常"
    fi
    echo ""
    
    echo -e "${BLUE}📈 最近访问统计 (最近100条):${NC}"
    ssh ${SERVER_USER}@${SERVER_IP} "tail -100 /var/log/nginx/access.log | awk '{print \$1}' | sort | uniq -c | sort -nr | head -10" 2>/dev/null
    echo ""
}

# 实时监控应用日志
monitor_app_logs() {
    log_header "📱 实时监控应用日志 (按Ctrl+C退出)"
    ssh ${SERVER_USER}@${SERVER_IP} "pm2 logs lab-equipment-website --lines 20"
}

# 实时监控Nginx日志
monitor_nginx_logs() {
    log_header "🌐 实时监控Nginx访问日志 (按Ctrl+C退出)"
    ssh ${SERVER_USER}@${SERVER_IP} "tail -f /var/log/nginx/access.log"
}

# 查看错误日志
show_errors() {
    log_header "⚠️ 最近的错误日志"
    
    echo -e "${BLUE}🔴 应用错误日志 (最近30行):${NC}"
    ssh ${SERVER_USER}@${SERVER_IP} "pm2 logs lab-equipment-website --err --lines 30" 2>/dev/null
    echo ""
    
    echo -e "${BLUE}🔴 Nginx错误日志 (最近30行):${NC}"
    ssh ${SERVER_USER}@${SERVER_IP} "tail -30 /var/log/nginx/error.log" 2>/dev/null
    echo ""
}

# 查看访问日志
show_access() {
    log_header "📊 最近的访问日志"
    
    echo -e "${BLUE}🌐 最近访问记录 (最近50行):${NC}"
    ssh ${SERVER_USER}@${SERVER_IP} "tail -50 /var/log/nginx/access.log" 2>/dev/null
    echo ""
    
    echo -e "${BLUE}📈 今日访问统计:${NC}"
    TODAY=$(date +"%d/%b/%Y")
    ssh ${SERVER_USER}@${SERVER_IP} "grep '$TODAY' /var/log/nginx/access.log | wc -l" 2>/dev/null | xargs echo "今日总访问量:"
    echo ""
}

# 实时监控所有日志
monitor_live() {
    log_header "🔴 实时监控所有日志 (按Ctrl+C退出)"
    log_warn "正在启动实时监控，这将显示应用和Nginx的实时日志..."
    echo ""
    
    # 使用tmux在服务器上启动多窗口监控
    ssh ${SERVER_USER}@${SERVER_IP} "
        echo '=== 应用日志 ==='
        pm2 logs lab-equipment-website --lines 10
        echo ''
        echo '=== Nginx访问日志 (实时) ==='
        tail -f /var/log/nginx/access.log
    "
}

# 保存日志快照
save_logs() {
    TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
    LOG_DIR="logs_snapshot_${TIMESTAMP}"
    
    log_header "💾 保存日志快照"
    log_info "创建日志目录: ${LOG_DIR}"
    mkdir -p "${LOG_DIR}"
    
    log_info "📥 下载PM2日志..."
    ssh ${SERVER_USER}@${SERVER_IP} "pm2 logs lab-equipment-website --lines 200" > "${LOG_DIR}/pm2_logs.txt" 2>&1
    
    log_info "📥 下载Nginx访问日志..."
    ssh ${SERVER_USER}@${SERVER_IP} "tail -500 /var/log/nginx/access.log" > "${LOG_DIR}/nginx_access.log" 2>/dev/null
    
    log_info "📥 下载Nginx错误日志..."
    ssh ${SERVER_USER}@${SERVER_IP} "tail -200 /var/log/nginx/error.log" > "${LOG_DIR}/nginx_error.log" 2>/dev/null
    
    log_info "📥 获取系统状态..."
    ssh ${SERVER_USER}@${SERVER_IP} "pm2 status && echo '' && free -h && echo '' && df -h" > "${LOG_DIR}/system_status.txt" 2>/dev/null
    
    log_info "✅ 日志快照已保存到: ${LOG_DIR}/"
    ls -la "${LOG_DIR}/"
}

# 主程序
main() {
    case "${1:-help}" in
        "status")
            check_connection && show_status
            ;;
        "app")
            check_connection && monitor_app_logs
            ;;
        "nginx")
            check_connection && monitor_nginx_logs
            ;;
        "errors")
            check_connection && show_errors
            ;;
        "access")
            check_connection && show_access
            ;;
        "live")
            check_connection && monitor_live
            ;;
        "save")
            check_connection && save_logs
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# 运行主程序
main "$@"