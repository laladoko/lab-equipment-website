#!/bin/bash

# 测试自动重启功能脚本
echo "🧪 测试自动重启功能..."

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# 创建测试产品数据（修改现有产品）
TEST_DATA='{
  "id": 1,
  "name": "BRAVO 手持式拉曼光谱仪（自动重启测试）",
  "category": "手持式拉曼光谱仪",
  "description": "这是一个测试自动重启功能的产品描述修改。时间戳：'$(date)'",
  "features": [
    "便携式设计",
    "快速识别",
    "自动重启测试功能"
  ],
  "price": "自动重启测试价格",
  "link": "https://www.bruker.com/zh/products-and-solutions/raman-spectroscopy/raman-spectrometers/bravo-handheld-raman-spectrometer.html",
  "officialLink": "https://www.bruker.com/zh/products-and-solutions/raman-spectroscopy/raman-spectrometers/bravo-handheld-raman-spectrometer.html",
  "specifications": {
    "光谱范围": "176-3200 cm⁻¹",
    "激光波长": "1064 nm",
    "测试时间": "'$(date)'"
  }
}'

log_info "步骤1: 记录修改前的产品信息"
BEFORE_RESPONSE=$(curl -s "https://www.qple.net/api/admin/get-products?brand=bruker")
BEFORE_NAME=$(echo "$BEFORE_RESPONSE" | jq -r '.products[] | select(.id == 1) | .name')
BEFORE_PRICE=$(echo "$BEFORE_RESPONSE" | jq -r '.products[] | select(.id == 1) | .price')

echo "修改前名称: $BEFORE_NAME"
echo "修改前价格: $BEFORE_PRICE"

log_info "步骤2: 提交修改（测试自动重启）"
UPLOAD_RESPONSE=$(curl -s -X POST \
    -F "brand=bruker" \
    -F "productData=$TEST_DATA" \
    "https://www.qple.net/api/admin/upload-product")

echo "上传响应:"
echo "$UPLOAD_RESPONSE" | jq .

log_info "步骤3: 等待自动重启完成（30秒）"
echo "正在等待应用自动重启..."
for i in {1..30}; do
    echo -n "."
    sleep 1
done
echo ""

log_info "步骤4: 验证修改是否生效"
AFTER_RESPONSE=$(curl -s "https://www.qple.net/api/admin/get-products?brand=bruker")
AFTER_NAME=$(echo "$AFTER_RESPONSE" | jq -r '.products[] | select(.id == 1) | .name')
AFTER_PRICE=$(echo "$AFTER_RESPONSE" | jq -r '.products[] | select(.id == 1) | .price')

echo "修改后名称: $AFTER_NAME"
echo "修改后价格: $AFTER_PRICE"

log_info "步骤5: 检查结果"
if [[ "$AFTER_NAME" == *"自动重启测试"* ]]; then
    log_info "✅ 自动重启功能测试成功！"
    log_info "✅ 产品名称已更新"
    
    if [[ "$AFTER_PRICE" == *"自动重启测试价格"* ]]; then
        log_info "✅ 产品价格也已更新"
    fi
else
    log_warn "❌ 自动重启功能可能失败，名称未更新"
fi

log_info "步骤6: 恢复原始数据"
ORIGINAL_DATA='{
  "id": 1,
  "name": "BRAVO 手持式拉曼光谱仪",
  "category": "手持式拉曼光谱仪",
  "description": "BRAVO手持式拉曼光谱仪 是您手中的移动实验室，专用于工业原材料控制和未知物质的识别。这款便携式设备提供快速、准确的材料验证，适用于现场检测和质量控制应用。",
  "features": [
    "便携式设计",
    "快速识别",
    "工业原材料控制",
    "未知物质识别",
    "现场检测",
    "质量控制"
  ],
  "price": "询价",
  "link": "https://www.bruker.com/zh/products-and-solutions/raman-spectroscopy/raman-spectrometers/bravo-handheld-raman-spectrometer.html",
  "officialLink": "https://www.bruker.com/zh/products-and-solutions/raman-spectroscopy/raman-spectrometers/bravo-handheld-raman-spectrometer.html",
  "specifications": {
    "光谱范围": "176-3200 cm⁻¹",
    "激光波长": "1064 nm",
    "分辨率": "< 8 cm⁻¹",
    "检测器": "TE冷却InGaAs",
    "重量": "< 1.5 kg",
    "电池续航": "8小时"
  }
}'

RESTORE_RESPONSE=$(curl -s -X POST \
    -F "brand=bruker" \
    -F "productData=$ORIGINAL_DATA" \
    "https://www.qple.net/api/admin/upload-product")

log_info "恢复响应: $(echo "$RESTORE_RESPONSE" | jq -r '.message')"

echo ""
log_info "🎉 自动重启功能测试完成！" 