#!/bin/bash

# 实验室设备网站 - 智能自动部署系统
# 监控产品数据变化并自动部署

# 配置
WATCH_FILES=(
    "src/data/bruker-products.ts"
    "src/data/fritsch-products.ts" 
    "src/data/olympus-products.ts"
    "src/data/wiggens-products.ts"
)
DEPLOY_SCRIPT="./safe-deploy.sh"
LOCK_FILE="/tmp/auto-deploy.lock"
LOG_FILE="auto-deploy.log"
COUNTER_FILE="/tmp/auto-deploy-counter"
TIMESTAMP_FILE="/tmp/auto-deploy-timestamp"
CHECK_INTERVAL=10     # 检查间隔（秒）
DEPLOY_DELAY=30       # 部署延迟（秒），避免频繁部署
DEPLOY_COUNT_LIMIT=5  # 累计修改次数触发部署
DEPLOY_TIME_LIMIT=120 # 时间限制（秒）：2分钟后强制部署

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# 日志函数
log_info() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] INFO:${NC} $1" | tee -a "$LOG_FILE"
}

log_warn() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] WARN:${NC} $1" | tee -a "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1" | tee -a "$LOG_FILE"
}

log_header() {
    echo -e "${CYAN}========================================${NC}" | tee -a "$LOG_FILE"
    echo -e "${CYAN}[$(date '+%Y-%m-%d %H:%M:%S')] $1${NC}" | tee -a "$LOG_FILE"
    echo -e "${CYAN}========================================${NC}" | tee -a "$LOG_FILE"
}

# 检查是否有其他部署进程在运行
check_lock() {
    if [ -f "$LOCK_FILE" ]; then
        local lock_pid=$(cat "$LOCK_FILE" 2>/dev/null)
        if [ -n "$lock_pid" ] && kill -0 "$lock_pid" 2>/dev/null; then
            return 1  # 锁定文件存在且进程活跃
        else
            rm -f "$LOCK_FILE"  # 清理过期的锁定文件
        fi
    fi
    return 0
}

# 创建锁定文件
create_lock() {
    echo $$ > "$LOCK_FILE"
}

# 清理锁定文件
remove_lock() {
    rm -f "$LOCK_FILE"
}

# 获取文件的最后修改时间
get_file_mtime() {
    local file="$1"
    if [ -f "$file" ]; then
        stat -f %m "$file" 2>/dev/null || stat -c %Y "$file" 2>/dev/null
    else
        echo "0"
    fi
}

# 检查文件是否有变化
check_file_changes() {
    local changes_detected=false
    
    for file in "${WATCH_FILES[@]}"; do
        if [ -f "$file" ]; then
            local current_mtime=$(get_file_mtime "$file")
            local stored_mtime_file=".${file//\//_}_mtime"
            local stored_mtime="0"
            
            if [ -f "$stored_mtime_file" ]; then
                stored_mtime=$(cat "$stored_mtime_file")
            fi
            
            if [ "$current_mtime" != "$stored_mtime" ]; then
                log_info "检测到文件变化: $file"
                echo "$current_mtime" > "$stored_mtime_file"
                changes_detected=true
                
                # 记录变化计数和时间
                record_change
            fi
        fi
    done
    
    if [ "$changes_detected" = true ]; then
        return 0
    else
        return 1
    fi
}

# 记录变化计数和时间戳
record_change() {
    local current_time=$(date +%s)
    local change_count=1
    
    # 读取现有计数
    if [ -f "$COUNTER_FILE" ]; then
        change_count=$(cat "$COUNTER_FILE")
        change_count=$((change_count + 1))
    fi
    
    # 更新计数
    echo "$change_count" > "$COUNTER_FILE"
    
    # 记录首次变化时间戳（如果不存在）
    if [ ! -f "$TIMESTAMP_FILE" ]; then
        echo "$current_time" > "$TIMESTAMP_FILE"
        log_info "📝 开始记录变化：第1次修改"
    else
        log_info "📝 累计变化：第${change_count}次修改"
    fi
}

# 检查是否需要部署
should_deploy() {
    local current_time=$(date +%s)
    local change_count=0
    local first_change_time=0
    
    # 读取计数和时间戳
    if [ -f "$COUNTER_FILE" ]; then
        change_count=$(cat "$COUNTER_FILE")
    fi
    
    if [ -f "$TIMESTAMP_FILE" ]; then
        first_change_time=$(cat "$TIMESTAMP_FILE")
    fi
    
    # 检查是否没有变化
    if [ "$change_count" -eq 0 ]; then
        return 1
    fi
    
    # 检查是否达到计数限制
    if [ "$change_count" -ge "$DEPLOY_COUNT_LIMIT" ]; then
        log_info "🔢 达到修改次数限制（${change_count}/${DEPLOY_COUNT_LIMIT}），触发部署"
        return 0
    fi
    
    # 检查是否达到时间限制
    local elapsed_time=$((current_time - first_change_time))
    if [ "$elapsed_time" -ge "$DEPLOY_TIME_LIMIT" ]; then
        log_info "⏰ 达到时间限制（${elapsed_time}/${DEPLOY_TIME_LIMIT}秒），触发部署"
        return 0
    fi
    
    # 显示当前状态
    local remaining_count=$((DEPLOY_COUNT_LIMIT - change_count))
    local remaining_time=$((DEPLOY_TIME_LIMIT - elapsed_time))
    log_info "📊 当前状态：${change_count}/${DEPLOY_COUNT_LIMIT}次修改，剩余${remaining_time}秒"
    
    return 1
}

# 重置计数器和时间戳
reset_counters() {
    rm -f "$COUNTER_FILE" "$TIMESTAMP_FILE"
    log_info "🧹 已重置变化计数器"
}

# 执行自动部署
execute_deploy() {
    log_header "🚀 开始智能批量部署"
    
    # 检查锁定
    if ! check_lock; then
        log_warn "⏳ 另一个部署进程正在运行，跳过此次部署"
        return
    fi
    
    # 创建锁定
    create_lock
    
    # 显示部署原因
    local change_count=0
    if [ -f "$COUNTER_FILE" ]; then
        change_count=$(cat "$COUNTER_FILE")
    fi
    log_info "📊 部署原因：累计${change_count}次修改"
    
    # 等待部署延迟
    log_info "⏳ 等待 ${DEPLOY_DELAY} 秒后开始部署（最后检查）..."
    sleep "$DEPLOY_DELAY"
    
    # 执行部署
    log_info "🚀 执行部署脚本..."
    if [ -x "$DEPLOY_SCRIPT" ]; then
        if timeout 120 "$DEPLOY_SCRIPT" >> "$LOG_FILE" 2>&1; then
            log_info "✅ 智能批量部署成功完成（处理了${change_count}次修改）"
            
            # 重置计数器
            reset_counters
            
            # 发送通知（如果配置了）
            if command -v osascript >/dev/null 2>&1; then
                osascript -e "display notification \"实验室设备网站已自动更新完成（${change_count}次修改）\" with title \"智能批量部署成功\" sound name \"Glass\""
            fi
        else
            log_error "❌ 自动部署失败，请检查日志"
            
            # 发送错误通知
            if command -v osascript >/dev/null 2>&1; then
                osascript -e 'display notification "自动部署失败，请检查日志" with title "部署错误" sound name "Basso"'
            fi
        fi
    else
        log_error "❌ 部署脚本不存在或不可执行: $DEPLOY_SCRIPT"
    fi
    
    # 清理锁定
    remove_lock
}

# 监控模式
monitor_mode() {
    log_header "🔍 启动智能监控模式"
    log_info "监控文件: ${WATCH_FILES[*]}"
    log_info "检查间隔: ${CHECK_INTERVAL} 秒"
    log_info "部署延迟: ${DEPLOY_DELAY} 秒"
    log_info "智能触发条件: ${DEPLOY_COUNT_LIMIT}次修改 或 ${DEPLOY_TIME_LIMIT}秒时间限制"
    log_info "按 Ctrl+C 停止监控"
    
    # 初始化文件时间戳
    for file in "${WATCH_FILES[@]}"; do
        if [ -f "$file" ]; then
            local mtime=$(get_file_mtime "$file")
            local stored_mtime_file=".${file//\//_}_mtime"
            echo "$mtime" > "$stored_mtime_file"
        fi
    done
    
    # 监控循环
    while true; do
        # 检查文件变化
        check_file_changes
        
        # 检查是否需要部署
        if should_deploy; then
            execute_deploy
        fi
        
        sleep "$CHECK_INTERVAL"
    done
}

# 手动检查模式
check_mode() {
    log_header "🔍 手动检查文件变化"
    
    if check_file_changes; then
        log_info "✅ 检测到文件变化，需要部署"
        echo "是否立即执行部署？(y/N): "
        read -r response
        if [[ "$response" =~ ^[Yy]$ ]]; then
            execute_deploy
        else
            log_info "⏭️ 跳过部署"
        fi
    else
        log_info "ℹ️ 未检测到文件变化"
    fi
}

# 立即部署模式
deploy_now() {
    log_header "🚀 立即执行部署"
    execute_deploy
}

# 状态检查
status_check() {
    log_header "📊 自动部署系统状态"
    
    echo "📁 监控的文件:"
    for file in "${WATCH_FILES[@]}"; do
        if [ -f "$file" ]; then
            local mtime=$(get_file_mtime "$file")
            local date_str=$(date -r "$mtime" '+%Y-%m-%d %H:%M:%S' 2>/dev/null || date -d "@$mtime" '+%Y-%m-%d %H:%M:%S' 2>/dev/null)
            echo "  ✅ $file (最后修改: $date_str)"
        else
            echo "  ❌ $file (文件不存在)"
        fi
    done
    
    echo ""
    echo "🔐 锁定状态:"
    if [ -f "$LOCK_FILE" ]; then
        local lock_pid=$(cat "$LOCK_FILE" 2>/dev/null)
        if [ -n "$lock_pid" ] && kill -0 "$lock_pid" 2>/dev/null; then
            echo "  🔒 部署进程正在运行 (PID: $lock_pid)"
        else
            echo "  🔓 发现过期锁定文件，已清理"
            rm -f "$LOCK_FILE"
        fi
    else
        echo "  🔓 没有活跃的部署进程"
    fi
    
    echo ""
    echo "📊 智能部署状态:"
    local change_count=0
    local first_change_time=0
    local current_time=$(date +%s)
    
    if [ -f "$COUNTER_FILE" ]; then
        change_count=$(cat "$COUNTER_FILE")
    fi
    
    if [ -f "$TIMESTAMP_FILE" ]; then
        first_change_time=$(cat "$TIMESTAMP_FILE")
        local elapsed_time=$((current_time - first_change_time))
        local remaining_time=$((DEPLOY_TIME_LIMIT - elapsed_time))
        echo "  📝 累计修改次数: ${change_count}/${DEPLOY_COUNT_LIMIT}"
        echo "  ⏰ 距离首次修改: ${elapsed_time}秒（${remaining_time}秒后强制部署）"
    else
        echo "  ℹ️ 暂无待处理的修改"
    fi
    
    echo ""
    echo "📋 最近的日志:"
    if [ -f "$LOG_FILE" ]; then
        tail -10 "$LOG_FILE"
    else
        echo "  ℹ️ 暂无日志文件"
    fi
}

# 显示帮助
show_help() {
    cat << EOF
实验室设备网站 - 智能自动部署系统

这个工具会监控产品数据文件的变化，并在检测到更改时自动执行部署。

使用方法: $0 [命令]

命令:
  monitor     启动持续监控模式（推荐）
  check       手动检查一次文件变化
  deploy      立即执行部署
  status      显示系统状态
  stop        停止所有监控进程
  logs        查看部署日志
  help        显示此帮助信息

示例:
  $0 monitor          # 启动后台监控
  $0 check           # 检查是否需要部署
  $0 deploy          # 立即部署
  $0 status          # 查看状态

配置:
  - 监控文件: ${WATCH_FILES[*]}
  - 检查间隔: ${CHECK_INTERVAL} 秒
  - 部署延迟: ${DEPLOY_DELAY} 秒

注意:
  - 监控模式会在前台运行，按 Ctrl+C 停止
  - 如需后台运行，请使用: nohup $0 monitor &
  - 部署日志保存在: $LOG_FILE

EOF
}

# 停止监控进程
stop_monitoring() {
    log_header "🛑 停止自动监控"
    
    # 查找并停止监控进程
    local pids=$(pgrep -f "auto-deploy.sh monitor")
    if [ -n "$pids" ]; then
        echo "$pids" | xargs kill
        log_info "✅ 已停止监控进程: $pids"
    else
        log_info "ℹ️ 没有发现运行中的监控进程"
    fi
    
    # 清理锁定文件
    remove_lock
    log_info "🧹 已清理锁定文件"
}

# 查看日志
show_logs() {
    if [ -f "$LOG_FILE" ]; then
        echo "📋 自动部署日志 (最近50行):"
        echo "================================"
        tail -50 "$LOG_FILE"
    else
        echo "ℹ️ 暂无日志文件"
    fi
}

# 清理退出
cleanup() {
    echo ""
    log_info "🛑 收到停止信号，正在清理..."
    remove_lock
    reset_counters
    exit 0
}

# 设置信号处理
trap cleanup SIGINT SIGTERM

# 主程序
case "${1:-help}" in
    "monitor")
        monitor_mode
        ;;
    "check")
        check_mode
        ;;
    "deploy")
        deploy_now
        ;;
    "status")
        status_check
        ;;
    "stop")
        stop_monitoring
        ;;
    "logs")
        show_logs
        ;;
    "help"|*)
        show_help
        ;;
esac