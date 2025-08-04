#!/bin/bash

# 实验室设备网站 - 日志分析脚本
# 用于分析网站访问模式、性能指标和潜在问题

SERVER_IP="103.44.245.79"
SERVER_USER="root"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
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

# 生成详细的日志分析报告
generate_report() {
    local output_file="log_analysis_$(date +%Y%m%d_%H%M%S).txt"
    
    log_header "📊 生成日志分析报告"
    log_info "报告将保存为: $output_file"
    
    {
        echo "实验室设备网站日志分析报告"
        echo "生成时间: $(date)"
        echo "=================================================="
        echo ""
        
        echo "1. 系统状态概览"
        echo "----------------------------------------"
        ssh ${SERVER_USER}@${SERVER_IP} "pm2 status && echo '' && free -h && echo '' && df -h"
        echo ""
        
        echo "2. 今日访问统计"
        echo "----------------------------------------"
        TODAY=$(date +"%d/%b/%Y")
        ssh ${SERVER_USER}@${SERVER_IP} "
            echo '今日总访问量:'
            grep '$TODAY' /var/log/nginx/access.log 2>/dev/null | wc -l
            echo ''
            echo '今日独立访客:'
            grep '$TODAY' /var/log/nginx/access.log 2>/dev/null | awk '{print \$1}' | sort | uniq | wc -l
            echo ''
            echo '今日热门页面 (Top 10):'
            grep '$TODAY' /var/log/nginx/access.log 2>/dev/null | awk '{print \$7}' | grep -v '\\.\\|_next' | sort | uniq -c | sort -nr | head -10
            echo ''
            echo '今日访问来源 IP (Top 10):'
            grep '$TODAY' /var/log/nginx/access.log 2>/dev/null | awk '{print \$1}' | sort | uniq -c | sort -nr | head -10
        "
        echo ""
        
        echo "3. 错误分析"
        echo "----------------------------------------"
        ssh ${SERVER_USER}@${SERVER_IP} "
            echo '今日4xx错误:'
            grep '$TODAY' /var/log/nginx/access.log 2>/dev/null | grep ' 4[0-9][0-9] ' | wc -l
            echo ''
            echo '今日5xx错误:'
            grep '$TODAY' /var/log/nginx/access.log 2>/dev/null | grep ' 5[0-9][0-9] ' | wc -l
            echo ''
            echo '最近的错误记录:'
            grep '$TODAY' /var/log/nginx/access.log 2>/dev/null | grep -E ' [45][0-9][0-9] ' | tail -5
        "
        echo ""
        
        echo "4. 性能分析"
        echo "----------------------------------------"
        ssh ${SERVER_USER}@${SERVER_IP} "
            echo '平均响应时间分析:'
            grep '$TODAY' /var/log/nginx/access.log 2>/dev/null | awk '{
                if(\$10 ~ /^[0-9]+\\.?[0-9]*$/) {
                    total += \$10; count++
                }
            } END {
                if(count > 0) print \"平均响应时间: \" total/count \" 秒\"
                else print \"无有效响应时间数据\"
            }'
            echo ''
            echo '响应状态码分布:'
            grep '$TODAY' /var/log/nginx/access.log 2>/dev/null | awk '{print \$9}' | sort | uniq -c | sort -nr
        "
        echo ""
        
        echo "5. 应用日志摘要"
        echo "----------------------------------------"
        ssh ${SERVER_USER}@${SERVER_IP} "
            echo '最近的应用日志 (最后20行):'
            pm2 logs lab-equipment-website --lines 20 2>/dev/null | tail -20
        "
        echo ""
        
        echo "6. 安全分析"
        echo "----------------------------------------"
        ssh ${SERVER_USER}@${SERVER_IP} "
            echo '可疑访问模式:'
            grep '$TODAY' /var/log/nginx/access.log 2>/dev/null | grep -E '(admin|login|wp-|phpmyadmin)' | head -10
            echo ''
            echo '大量请求的IP (可能的爬虫或攻击):'
            grep '$TODAY' /var/log/nginx/access.log 2>/dev/null | awk '{print \$1}' | sort | uniq -c | sort -nr | awk '\$1 > 100' | head -5
        "
        echo ""
        
        echo "报告生成完成: $(date)"
        
    } > "$output_file"
    
    log_info "✅ 报告已生成: $output_file"
    echo "📋 报告摘要:"
    head -30 "$output_file"
}

# 实时性能监控
monitor_performance() {
    log_header "⚡ 实时性能监控 (每5秒更新，按Ctrl+C退出)"
    
    while true; do
        clear
        echo "🕐 $(date)"
        echo "----------------------------------------"
        
        echo "📊 系统负载:"
        ssh ${SERVER_USER}@${SERVER_IP} "uptime"
        echo ""
        
        echo "💾 内存使用:"
        ssh ${SERVER_USER}@${SERVER_IP} "free -h | head -2"
        echo ""
        
        echo "🚀 应用状态:"
        ssh ${SERVER_USER}@${SERVER_IP} "pm2 status | grep lab-equipment"
        echo ""
        
        echo "🌐 最近访问 (最后5条):"
        ssh ${SERVER_USER}@${SERVER_IP} "tail -5 /var/log/nginx/access.log | awk '{print \$4, \$7, \$9, \$1}'"
        echo ""
        
        echo "⏱️ 5秒后自动刷新..."
        sleep 5
    done
}

# 创建定时监控任务
setup_cron_monitoring() {
    log_header "⏰ 设置定时日志监控"
    
    cat > "daily-log-check.sh" << 'EOF'
#!/bin/bash
# 每日日志检查脚本

DATE=$(date +%Y%m%d)
REPORT_DIR="/tmp/daily_reports"
mkdir -p "$REPORT_DIR"

# 生成每日报告
/Users/hsx/Desktop/local/lab-equipment-website/log-analyzer.sh report > "$REPORT_DIR/daily_report_$DATE.txt"

# 检查是否有异常
ERROR_COUNT=$(ssh root@103.44.245.79 "grep '$(date +%d/%b/%Y)' /var/log/nginx/access.log | grep -E ' [45][0-9][0-9] ' | wc -l")

if [ "$ERROR_COUNT" -gt 10 ]; then
    echo "警告: 今日发现 $ERROR_COUNT 个错误，请检查日志" | mail -s "网站异常报告" your-email@example.com
fi
EOF

    chmod +x daily-log-check.sh
    
    log_info "✅ 创建了每日检查脚本: daily-log-check.sh"
    log_info "💡 要添加到crontab，请运行:"
    echo "   crontab -e"
    echo "   添加行: 0 6 * * * /Users/hsx/Desktop/local/lab-equipment-website/daily-log-check.sh"
}

# 主程序
case "${1:-help}" in
    "report")
        generate_report
        ;;
    "performance")
        monitor_performance
        ;;
    "setup-cron")
        setup_cron_monitoring
        ;;
    *)
        echo "实验室设备网站日志分析工具"
        echo ""
        echo "使用方法: $0 [选项]"
        echo ""
        echo "选项:"
        echo "  report      - 生成详细的日志分析报告"
        echo "  performance - 实时性能监控"
        echo "  setup-cron  - 设置定时监控任务"
        echo ""
        ;;
esac