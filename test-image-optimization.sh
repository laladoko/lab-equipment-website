#!/bin/bash

# 测试图片优化功能
# 创建测试图片并验证优化效果

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_test() {
    echo -e "${BLUE}[TEST]${NC} $1"
}

log_result() {
    echo -e "${CYAN}[RESULT]${NC} $1"
}

# 创建测试目录
TEST_DIR="test-images"
mkdir -p "$TEST_DIR"

log_info "🧪 开始测试图片优化功能"
echo ""

# 检查 ImageMagick 是否可用
if ! command -v convert &> /dev/null; then
    log_info "ImageMagick 未安装，创建简单测试"
    
    # 检查是否有现有图片文件可以测试
    if find . -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" | head -1 >/dev/null 2>&1; then
        TEST_IMAGE=$(find . -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" | head -1)
        log_test "使用现有图片进行测试: $TEST_IMAGE"
        
        if [ -f "$TEST_IMAGE" ]; then
            ./optimize-images.sh "$TEST_IMAGE"
        fi
    else
        log_info "❌ 没有找到测试图片，请手动上传图片到网站进行测试"
        echo ""
        echo "测试步骤："
        echo "1. 访问 https://www.qple.net/admin/upload"
        echo "2. 选择一个大于2MB的图片文件"
        echo "3. 观察是否显示'正在优化图片...'消息"
        echo "4. 检查控制台是否有优化日志输出"
    fi
else
    log_test "创建测试图片（2000x1500，模拟大图片）"
    
    # 创建一个大的测试图片
    convert -size 2000x1500 xc:lightblue \
            -pointsize 60 -fill darkblue \
            -gravity center -annotate 0 "测试图片\n2000x1500" \
            "$TEST_DIR/test-large.jpg"
    
    if [ -f "$TEST_DIR/test-large.jpg" ]; then
        ORIGINAL_SIZE=$(wc -c < "$TEST_DIR/test-large.jpg")
        log_result "创建测试图片: $TEST_DIR/test-large.jpg ($(echo "scale=2; $ORIGINAL_SIZE / 1024 / 1024" | bc -l)MB)"
        
        log_test "使用优化脚本处理测试图片"
        ./optimize-images.sh "$TEST_DIR/test-large.jpg"
        
        if [ -f "optimized/test-large.jpg" ]; then
            OPTIMIZED_SIZE=$(wc -c < "optimized/test-large.jpg")
            COMPRESSION_RATIO=$(echo "scale=1; (1 - $OPTIMIZED_SIZE / $ORIGINAL_SIZE) * 100" | bc -l)
            
            log_result "优化完成！"
            log_result "原始大小: $(echo "scale=2; $ORIGINAL_SIZE / 1024 / 1024" | bc -l)MB"
            log_result "优化后大小: $(echo "scale=2; $OPTIMIZED_SIZE / 1024 / 1024" | bc -l)MB"
            log_result "压缩率: ${COMPRESSION_RATIO}%"
        fi
    fi
fi

echo ""
log_info "📋 Web端图片优化测试步骤："
echo ""
echo "1. 🌐 访问上传页面："
echo "   https://www.qple.net/admin/upload"
echo ""
echo "2. 📂 选择一个大图片文件（建议 > 2MB）"
echo ""
echo "3. 👀 观察优化过程："
echo "   - 应该显示 '正在优化图片...' 消息"
echo "   - 浏览器控制台会显示优化日志"
echo "   - 例如: '图片优化: 3000x2000 → 1200x800, 8.5MB → 0.8MB'"
echo ""
echo "4. ✅ 验证结果："
echo "   - 图片预览正常显示"
echo "   - 上传成功且速度较快"
echo "   - 没有 'client_max_body_size' 错误"

echo ""
log_info "🔧 问题排查："
echo ""
echo "如果遇到问题："
echo "• 检查浏览器控制台是否有JavaScript错误"
echo "• 确认 Nginx 上传限制已设置为 20MB"
echo "• 检查 Next.js 应用是否正常运行"
echo "• 查看服务器日志: ./monitor-logs.sh errors"

echo ""
log_info "✨ 测试完成！"