#!/bin/bash

# 项目打包脚本 - 生成部署包

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_NAME="lab-equipment-website"
VERSION=$(node -p "require('./package.json').version")
BUILD_DATE=$(date +%Y%m%d_%H%M%S)
PACKAGE_NAME="${PROJECT_NAME}-v${VERSION}-${BUILD_DATE}"

log() {
    echo -e "${GREEN}[$(date '+%H:%M:%S')] $1${NC}"
}

info() {
    echo -e "${BLUE}[$(date '+%H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date '+%H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[$(date '+%H:%M:%S')] $1${NC}"
    exit 1
}

log "🚀 开始打包 $PROJECT_NAME v$VERSION"

# 1. 清理旧的构建文件
log "清理旧文件..."
rm -rf .next out node_modules

# 2. 安装依赖
log "安装依赖..."
npm ci

# 3. 构建项目
log "构建项目..."
npm run build

# 4. 创建部署目录
DEPLOY_DIR="./deploy-package"
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR/$PACKAGE_NAME"

# 5. 复制必要文件
log "复制文件到部署包..."

# 复制构建产物
cp -r .next "$DEPLOY_DIR/$PACKAGE_NAME/"
cp -r public "$DEPLOY_DIR/$PACKAGE_NAME/"

# 复制配置文件
cp package.json "$DEPLOY_DIR/$PACKAGE_NAME/"
cp package-lock.json "$DEPLOY_DIR/$PACKAGE_NAME/"
cp next.config.ts "$DEPLOY_DIR/$PACKAGE_NAME/"
cp tailwind.config.ts "$DEPLOY_DIR/$PACKAGE_NAME/"
cp tsconfig.json "$DEPLOY_DIR/$PACKAGE_NAME/"
cp postcss.config.mjs "$DEPLOY_DIR/$PACKAGE_NAME/"

# 复制源代码
cp -r src "$DEPLOY_DIR/$PACKAGE_NAME/"

# 复制部署配置
cp ecosystem.config.js "$DEPLOY_DIR/$PACKAGE_NAME/"
cp Dockerfile "$DEPLOY_DIR/$PACKAGE_NAME/"
cp docker-compose.yml "$DEPLOY_DIR/$PACKAGE_NAME/"
cp .dockerignore "$DEPLOY_DIR/$PACKAGE_NAME/"
cp deploy.sh "$DEPLOY_DIR/$PACKAGE_NAME/"
cp DEPLOYMENT.md "$DEPLOY_DIR/$PACKAGE_NAME/"

# 6. 安装生产依赖
log "安装生产依赖..."
cd "$DEPLOY_DIR/$PACKAGE_NAME"
npm ci --only=production
cd ../..

# 7. 创建部署说明
cat > "$DEPLOY_DIR/$PACKAGE_NAME/README_DEPLOY.md" << EOF
# 杭州全谱实验室设备网站 - 部署包

**版本**: v$VERSION  
**构建时间**: $(date)  
**包含内容**: 生产构建 + 运行时依赖

## 快速部署

### 方式一：传统服务器部署
\`\`\`bash
# 1. 解压到服务器
tar -xzf $PACKAGE_NAME.tar.gz
cd $PACKAGE_NAME

# 2. 运行自动部署脚本
chmod +x deploy.sh
./deploy.sh production
\`\`\`

### 方式二：Docker部署
\`\`\`bash
# 1. 解压到服务器
tar -xzf $PACKAGE_NAME.tar.gz
cd $PACKAGE_NAME

# 2. Docker 部署
./deploy.sh docker
\`\`\`

### 方式三：手动部署
\`\`\`bash
# 1. 解压到服务器
tar -xzf $PACKAGE_NAME.tar.gz
cd $PACKAGE_NAME

# 2. 安装 PM2 (如果没有)
npm install -g pm2

# 3. 启动应用
pm2 start ecosystem.config.js

# 4. 查看状态
pm2 status
\`\`\`

## 系统要求

- Node.js 18.0+
- 2GB+ RAM
- 10GB+ 磁盘空间

## 端口配置

- 应用端口: 3000
- Nginx端口: 80, 443

## 详细文档

请参考 \`DEPLOYMENT.md\` 获取完整部署文档。

## 技术支持

如有问题请联系技术支持：
- 邮箱: tech@labequipment.com  
- 电话: 400-123-4567
EOF

# 8. 创建压缩包
log "创建压缩包..."
cd "$DEPLOY_DIR"
tar -czf "../${PACKAGE_NAME}.tar.gz" "$PACKAGE_NAME"
cd ..

# 9. 生成MD5校验
log "生成校验文件..."
if command -v md5sum &> /dev/null; then
    # Linux
    md5sum "${PACKAGE_NAME}.tar.gz" > "${PACKAGE_NAME}.md5"
elif command -v md5 &> /dev/null; then
    # macOS
    md5 "${PACKAGE_NAME}.tar.gz" > "${PACKAGE_NAME}.md5"
else
    warn "未找到MD5命令，跳过校验文件生成"
fi

# 10. 显示包信息
PACKAGE_SIZE=$(du -h "${PACKAGE_NAME}.tar.gz" | cut -f1)
log "=========================================="
log "✅ 打包完成！"
log "=========================================="
info "包名称: ${PACKAGE_NAME}.tar.gz"
info "包大小: $PACKAGE_SIZE"
info "MD5文件: ${PACKAGE_NAME}.md5"
info "包位置: $(pwd)/${PACKAGE_NAME}.tar.gz"
log "=========================================="

# 11. 清理临时目录
rm -rf "$DEPLOY_DIR"

# 12. 显示部署命令
log "🚀 部署命令示例："
echo ""
echo "# 上传到服务器"
echo "scp ${PACKAGE_NAME}.tar.gz root@your-server:/tmp/"
echo "scp ${PACKAGE_NAME}.md5 root@your-server:/tmp/"
echo ""
echo "# 在服务器上执行"
echo "cd /tmp"
echo "md5sum -c ${PACKAGE_NAME}.md5"  
echo "tar -xzf ${PACKAGE_NAME}.tar.gz"
echo "cd ${PACKAGE_NAME}"
echo "chmod +x deploy.sh"
echo "./deploy.sh production"
echo ""

log "🎉 打包完成，可以部署了！" 