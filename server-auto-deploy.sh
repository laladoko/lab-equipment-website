#!/bin/bash

# 服务器端自动部署启动脚本
# 在服务器上启动持续监控，当API修改文件时自动部署

SERVER_IP="103.44.245.79"
SERVER_USER="root"
PROJECT_DIR="/root/lab-equipment-website"

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_header() {
    echo -e "${CYAN}========================================${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${CYAN}========================================${NC}"
}

# 在服务器上启动监控
start_server_monitoring() {
    log_header "🚀 在服务器上启动自动监控"
    
    log_info "📤 上传监控脚本到服务器..."
    scp auto-deploy.sh ${SERVER_USER}@${SERVER_IP}:${PROJECT_DIR}/
    
    log_info "🔧 设置服务器端监控..."
    ssh ${SERVER_USER}@${SERVER_IP} "
        cd ${PROJECT_DIR}
        chmod +x auto-deploy.sh
        
        # 停止可能存在的旧监控进程
        ./auto-deploy.sh stop
        
        # 创建systemd服务文件
        cat > /etc/systemd/system/lab-equipment-auto-deploy.service << 'EOF'
[Unit]
Description=Lab Equipment Website Auto Deploy Monitor
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=${PROJECT_DIR}
ExecStart=${PROJECT_DIR}/auto-deploy.sh monitor
Restart=always
RestartSec=10
StandardOutput=append:${PROJECT_DIR}/auto-deploy.log
StandardError=append:${PROJECT_DIR}/auto-deploy-error.log

[Install]
WantedBy=multi-user.target
EOF

        # 重新加载systemd并启动服务
        systemctl daemon-reload
        systemctl enable lab-equipment-auto-deploy.service
        systemctl start lab-equipment-auto-deploy.service
        
        echo '✅ 自动监控服务已启动'
        systemctl status lab-equipment-auto-deploy.service --no-pager
    "
}

# 检查服务器监控状态
check_server_status() {
    log_header "📊 检查服务器监控状态"
    
    ssh ${SERVER_USER}@${SERVER_IP} "
        cd ${PROJECT_DIR}
        
        echo '🔍 服务状态:'
        systemctl status lab-equipment-auto-deploy.service --no-pager || echo '服务未运行'
        
        echo ''
        echo '📋 最近日志:'
        tail -10 auto-deploy.log 2>/dev/null || echo '暂无日志'
        
        echo ''
        echo '📁 监控文件状态:'
        ./auto-deploy.sh status 2>/dev/null || echo '监控脚本未找到'
    "
}

# 停止服务器监控
stop_server_monitoring() {
    log_header "🛑 停止服务器监控"
    
    ssh ${SERVER_USER}@${SERVER_IP} "
        systemctl stop lab-equipment-auto-deploy.service
        systemctl disable lab-equipment-auto-deploy.service
        echo '✅ 自动监控服务已停止'
    "
}

# 查看服务器日志
show_server_logs() {
    log_header "📋 查看服务器监控日志"
    
    ssh ${SERVER_USER}@${SERVER_IP} "
        cd ${PROJECT_DIR}
        echo '📋 自动部署日志 (最近50行):'
        echo '================================'
        tail -50 auto-deploy.log 2>/dev/null || echo '暂无日志文件'
        
        echo ''
        echo '📋 systemd服务日志:'
        echo '================================'
        journalctl -u lab-equipment-auto-deploy.service --no-pager -n 20
    "
}

# 测试自动部署功能
test_auto_deploy() {
    log_header "🧪 测试自动部署功能"
    
    log_info "📝 模拟文件变化来测试自动部署..."
    ssh ${SERVER_USER}@${SERVER_IP} "
        cd ${PROJECT_DIR}
        
        # 备份原文件
        cp src/data/fritsch-products.ts src/data/fritsch-products.ts.backup
        
        # 添加测试注释来触发文件变化
        echo '// 自动部署测试 - $(date)' >> src/data/fritsch-products.ts
        
        echo '✅ 文件已修改，监控系统应该在30秒内检测到变化并自动部署'
        echo '📋 监控日志:'
    "
    
    log_info "⏳ 等待60秒观察自动部署情况..."
    sleep 60
    
    log_info "📊 检查部署结果..."
    ssh ${SERVER_USER}@${SERVER_IP} "
        cd ${PROJECT_DIR}
        
        # 查看最近的日志
        echo '📋 最近的监控日志:'
        tail -20 auto-deploy.log
        
        # 恢复原文件
        mv src/data/fritsch-products.ts.backup src/data/fritsch-products.ts
        
        echo ''
        echo '📊 应用状态:'
        pm2 status
    "
}

# 显示使用帮助
show_help() {
    cat << EOF
服务器端自动部署管理工具

这个工具用于在服务器上设置和管理自动监控系统，
当用户通过API修改产品信息时自动触发部署。

使用方法: $0 [命令]

命令:
  start       在服务器上启动自动监控服务
  stop        停止服务器上的自动监控服务  
  status      检查服务器监控状态
  logs        查看服务器监控日志
  test        测试自动部署功能
  restart     重启监控服务
  help        显示此帮助信息

示例:
  $0 start       # 启动服务器端自动监控
  $0 status      # 查看监控状态
  $0 logs        # 查看日志
  $0 test        # 测试自动部署

工作原理:
  1. 用户在 https://www.qple.net/admin/upload 修改产品
  2. API保存数据到服务器文件系统
  3. 自动监控系统检测到文件变化
  4. 自动执行构建和部署
  5. 用户看到最新数据（1-2分钟内）

EOF
}

# 重启监控服务
restart_server_monitoring() {
    log_header "🔄 重启服务器监控服务"
    
    ssh ${SERVER_USER}@${SERVER_IP} "
        systemctl restart lab-equipment-auto-deploy.service
        echo '✅ 监控服务已重启'
        systemctl status lab-equipment-auto-deploy.service --no-pager
    "
}

# 主程序
case "${1:-help}" in
    "start")
        start_server_monitoring
        ;;
    "stop")
        stop_server_monitoring
        ;;
    "status")
        check_server_status
        ;;
    "logs")
        show_server_logs
        ;;
    "test")
        test_auto_deploy
        ;;
    "restart")
        restart_server_monitoring
        ;;
    "help"|*)
        show_help
        ;;
esac