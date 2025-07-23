#!/bin/bash

# 杭州全谱实验室设备网站 - 自动化部署脚本
# 使用方法: ./deploy.sh [production|staging|docker]

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置变量
APP_NAME="lab-equipment-website"
DEPLOY_MODE="${1:-production}"
PROJECT_DIR="/var/www/lab-equipment-website"
BACKUP_DIR="/backup/lab-equipment-website"
LOG_FILE="/var/log/deploy-$(date +%Y%m%d_%H%M%S).log"

# 日志函数
log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] $1${NC}" | tee -a "$LOG_FILE"
}

warn() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}" | tee -a "$LOG_FILE"
    exit 1
}

info() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')] INFO: $1${NC}" | tee -a "$LOG_FILE"
}

# 检查系统要求
check_requirements() {
    log "检查系统要求..."
    
    # 检查 Node.js
    if ! command -v node &> /dev/null; then
        error "Node.js 未安装，请先安装 Node.js 18+"
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        error "Node.js 版本过低，需要 v18+，当前版本: $(node --version)"
    fi
    
    # 检查 PM2 (非Docker模式)
    if [ "$DEPLOY_MODE" != "docker" ] && ! command -v pm2 &> /dev/null; then
        warn "PM2 未安装，正在安装..."
        npm install -g pm2 || error "PM2 安装失败"
    fi
    
    # 检查 Docker (Docker模式)
    if [ "$DEPLOY_MODE" == "docker" ]; then
        if ! command -v docker &> /dev/null; then
            error "Docker 未安装，请先安装 Docker"
        fi
        if ! command -v docker-compose &> /dev/null; then
            error "Docker Compose 未安装，请先安装 Docker Compose"
        fi
    fi
    
    log "系统要求检查完成 ✅"
}

# 备份当前版本
backup_current() {
    if [ "$DEPLOY_MODE" == "docker" ]; then
        return 0
    fi
    
    log "备份当前版本..."
    
    if [ -d "$PROJECT_DIR" ]; then
        # 创建备份目录
        mkdir -p "$BACKUP_DIR"
        
        # 删除旧备份（保留最近3个）
        find "$BACKUP_DIR" -maxdepth 1 -type d -name "backup_*" | sort -r | tail -n +4 | xargs rm -rf
        
        # 创建新备份
        BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S)"
        cp -r "$PROJECT_DIR" "$BACKUP_DIR/$BACKUP_NAME"
        log "备份完成: $BACKUP_DIR/$BACKUP_NAME"
    else
        warn "项目目录不存在，跳过备份"
    fi
}

# 部署到生产环境
deploy_production() {
    log "开始生产环境部署..."
    
    # 创建项目目录
    if [ ! -d "$PROJECT_DIR" ]; then
        info "创建项目目录: $PROJECT_DIR"
        sudo mkdir -p "$PROJECT_DIR"
        sudo chown -R $USER:$USER "$PROJECT_DIR"
    fi
    
    # 复制文件到生产目录
    info "复制项目文件..."
    rsync -av --exclude=node_modules --exclude=.git --exclude=.next ./ "$PROJECT_DIR/"
    
    # 切换到项目目录
    cd "$PROJECT_DIR"
    
    # 安装依赖
    log "安装生产依赖..."
    npm ci --only=production
    
    # 构建项目
    log "构建项目..."
    npm run build
    
    # 创建日志目录
    sudo mkdir -p /var/log/pm2
    sudo chown -R $USER:$USER /var/log/pm2
    
    # 停止旧进程
    if pm2 show "$APP_NAME" > /dev/null 2>&1; then
        log "停止旧进程..."
        pm2 stop "$APP_NAME"
        pm2 delete "$APP_NAME"
    fi
    
    # 启动新进程
    log "启动应用..."
    pm2 start ecosystem.config.js
    
    # 保存 PM2 配置
    pm2 save
    
    # 检查应用状态
    sleep 5
    if pm2 show "$APP_NAME" | grep -q "online"; then
        log "✅ 应用启动成功！"
        
        # 显示应用信息
        info "应用状态:"
        pm2 show "$APP_NAME"
        
        # 重载 Nginx（如果存在）
        if command -v nginx &> /dev/null; then
            log "重载 Nginx 配置..."
            sudo nginx -t && sudo nginx -s reload
        fi
        
    else
        error "❌ 应用启动失败！"
    fi
}

# Docker 部署
deploy_docker() {
    log "开始 Docker 部署..."
    
    # 停止现有容器
    if docker-compose ps | grep -q "$APP_NAME"; then
        log "停止现有容器..."
        docker-compose down
    fi
    
    # 构建并启动
    log "构建和启动 Docker 容器..."
    docker-compose up -d --build
    
    # 等待容器启动
    log "等待容器启动..."
    sleep 10
    
    # 检查容器状态
    if docker-compose ps | grep -q "Up"; then
        log "✅ Docker 容器启动成功！"
        info "容器状态:"
        docker-compose ps
    else
        error "❌ Docker 容器启动失败！"
    fi
}

# 健康检查
health_check() {
    log "执行健康检查..."
    
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f http://localhost:3000/ > /dev/null 2>&1; then
            log "✅ 健康检查通过！"
            return 0
        fi
        
        info "健康检查尝试 $attempt/$max_attempts..."
        sleep 2
        ((attempt++))
    done
    
    error "❌ 健康检查失败！应用可能未正常启动"
}

# 回滚函数
rollback() {
    error "部署失败，开始回滚..."
    
    if [ "$DEPLOY_MODE" == "docker" ]; then
        log "Docker 回滚暂不支持，请手动处理"
        return 1
    fi
    
    # 寻找最新备份
    local latest_backup=$(find "$BACKUP_DIR" -maxdepth 1 -type d -name "backup_*" | sort -r | head -n 1)
    
    if [ -n "$latest_backup" ]; then
        log "发现备份: $latest_backup"
        
        # 停止当前应用
        pm2 stop "$APP_NAME" || true
        pm2 delete "$APP_NAME" || true
        
        # 恢复备份
        rm -rf "$PROJECT_DIR"
        cp -r "$latest_backup" "$PROJECT_DIR"
        
        # 重启应用
        cd "$PROJECT_DIR"
        pm2 start ecosystem.config.js
        
        log "✅ 回滚完成！"
    else
        error "❌ 未找到备份文件，无法回滚"
    fi
}

# 清理函数
cleanup() {
    log "执行清理..."
    
    # 清理旧的构建缓存
    if [ -d ".next" ]; then
        rm -rf .next
    fi
    
    # 清理 Docker（如果是Docker模式）
    if [ "$DEPLOY_MODE" == "docker" ]; then
        log "清理未使用的 Docker 镜像..."
        docker system prune -f || true
    fi
    
    log "清理完成"
}

# 显示部署信息
show_deploy_info() {
    log "=========================================="
    log "  杭州全谱实验室设备网站部署完成!"
    log "=========================================="
    log "部署模式: $DEPLOY_MODE"
    log "部署时间: $(date)"
    log "访问地址: http://localhost:3000"
    log "日志文件: $LOG_FILE"
    
    if [ "$DEPLOY_MODE" != "docker" ]; then
        log "PM2 状态: pm2 status"
        log "查看日志: pm2 logs $APP_NAME"
    else
        log "Docker 状态: docker-compose ps"
        log "查看日志: docker-compose logs -f"
    fi
    
    log "=========================================="
}

# 主函数
main() {
    log "开始部署 $APP_NAME (模式: $DEPLOY_MODE)"
    
    # 捕获错误信号，执行回滚
    trap rollback ERR
    
    # 执行部署流程
    check_requirements
    backup_current
    
    case "$DEPLOY_MODE" in
        "production"|"staging")
            deploy_production
            ;;
        "docker")
            deploy_docker
            ;;
        *)
            error "未知的部署模式: $DEPLOY_MODE. 支持的模式: production, staging, docker"
            ;;
    esac
    
    health_check
    cleanup
    show_deploy_info
    
    log "🎉 部署成功完成！"
}

# 显示帮助信息
show_help() {
    echo "杭州全谱实验室设备网站 - 自动化部署脚本"
    echo ""
    echo "用法: $0 [MODE]"
    echo ""
    echo "部署模式:"
    echo "  production  - 生产环境部署 (默认)"
    echo "  staging     - 预发布环境部署"
    echo "  docker      - Docker 容器部署"
    echo ""
    echo "示例:"
    echo "  $0                    # 生产环境部署"
    echo "  $0 production        # 生产环境部署"
    echo "  $0 docker           # Docker 部署"
    echo ""
    echo "注意事项:"
    echo "  - 确保已安装 Node.js 18+"
    echo "  - 生产部署需要安装 PM2"
    echo "  - Docker 部署需要安装 Docker 和 Docker Compose"
    echo "  - 首次部署可能需要 sudo 权限"
}

# 检查命令行参数
if [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
    show_help
    exit 0
fi

# 执行主函数
main "$@" 