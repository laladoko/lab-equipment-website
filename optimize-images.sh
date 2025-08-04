#!/bin/bash

# 实验室设备网站 - 图片优化脚本
# 自动将大图片转换为适合网页显示的大小

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 默认配置
MAX_WIDTH=1200          # 最大宽度
MAX_HEIGHT=800          # 最大高度
QUALITY=85              # JPEG质量 (1-100)
MAX_SIZE_MB=2           # 最大文件大小 (MB)
OUTPUT_DIR="optimized"  # 输出目录

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

log_header() {
    echo -e "${CYAN}========================================${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${CYAN}========================================${NC}"
}

# 检查依赖
check_dependencies() {
    local missing_deps=()
    
    # 检查ImageMagick
    if ! command -v convert &> /dev/null; then
        missing_deps+=("imagemagick")
    fi
    
    # 检查identify
    if ! command -v identify &> /dev/null; then
        missing_deps+=("imagemagick")
    fi
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        log_error "缺少依赖工具: ${missing_deps[*]}"
        echo ""
        echo "请安装缺少的工具："
        if [[ "$OSTYPE" == "darwin"* ]]; then
            echo "  brew install imagemagick"
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            echo "  sudo apt-get install imagemagick  # Ubuntu/Debian"
            echo "  sudo yum install ImageMagick       # CentOS/RHEL"
        fi
        exit 1
    fi
}

# 获取图片信息
get_image_info() {
    local file="$1"
    local info=$(identify "$file" 2>/dev/null)
    
    if [ $? -ne 0 ]; then
        return 1
    fi
    
    # 解析尺寸
    local dimensions=$(echo "$info" | awk '{print $3}' | head -1)
    local width=$(echo "$dimensions" | cut -d'x' -f1)
    local height=$(echo "$dimensions" | cut -d'x' -f2)
    
    # 获取文件大小 (字节)
    local size_bytes
    if [[ "$OSTYPE" == "darwin"* ]]; then
        size_bytes=$(stat -f%z "$file")
    else
        size_bytes=$(stat -c%s "$file")
    fi
    
    local size_mb=$(echo "scale=2; $size_bytes / 1024 / 1024" | bc -l)
    
    echo "$width:$height:$size_mb"
}

# 优化单个图片
optimize_image() {
    local input_file="$1"
    local output_file="$2"
    
    # 获取图片信息
    local image_info=$(get_image_info "$input_file")
    if [ $? -ne 0 ]; then
        log_error "无法读取图片信息: $input_file"
        return 1
    fi
    
    local width=$(echo "$image_info" | cut -d':' -f1)
    local height=$(echo "$image_info" | cut -d':' -f2)
    local size_mb=$(echo "$image_info" | cut -d':' -f3)
    
    log_info "原始尺寸: ${width}x${height}, 大小: ${size_mb}MB"
    
    # 检查是否需要优化
    local needs_resize=false
    local needs_compress=false
    
    if [ "$width" -gt "$MAX_WIDTH" ] || [ "$height" -gt "$MAX_HEIGHT" ]; then
        needs_resize=true
    fi
    
    if [ $(echo "$size_mb > $MAX_SIZE_MB" | bc -l) -eq 1 ]; then
        needs_compress=true
    fi
    
    if [ "$needs_resize" = false ] && [ "$needs_compress" = false ]; then
        log_info "图片已经是最优大小，直接复制"
        cp "$input_file" "$output_file"
        return 0
    fi
    
    # 构建convert命令
    local convert_cmd="convert \"$input_file\""
    
    # 调整尺寸
    if [ "$needs_resize" = true ]; then
        convert_cmd="$convert_cmd -resize ${MAX_WIDTH}x${MAX_HEIGHT}>"
        log_info "调整尺寸到最大 ${MAX_WIDTH}x${MAX_HEIGHT}"
    fi
    
    # 设置质量和优化
    convert_cmd="$convert_cmd -quality $QUALITY"
    convert_cmd="$convert_cmd -strip"  # 移除元数据
    convert_cmd="$convert_cmd -interlace Plane"  # 渐进式JPEG
    
    # 自动优化颜色
    convert_cmd="$convert_cmd -colorspace sRGB"
    
    convert_cmd="$convert_cmd \"$output_file\""
    
    # 执行转换
    log_info "执行优化..."
    eval $convert_cmd
    
    if [ $? -eq 0 ]; then
        # 获取优化后的信息
        local new_info=$(get_image_info "$output_file")
        local new_width=$(echo "$new_info" | cut -d':' -f1)
        local new_height=$(echo "$new_info" | cut -d':' -f2)
        local new_size_mb=$(echo "$new_info" | cut -d':' -f3)
        
        local compression_ratio=$(echo "scale=1; (1 - $new_size_mb / $size_mb) * 100" | bc -l)
        
        log_info "优化完成: ${new_width}x${new_height}, 大小: ${new_size_mb}MB"
        log_info "压缩率: ${compression_ratio}%"
        return 0
    else
        log_error "图片优化失败"
        return 1
    fi
}

# 批量优化目录中的图片
optimize_directory() {
    local input_dir="$1"
    local output_dir="$2"
    
    if [ ! -d "$input_dir" ]; then
        log_error "输入目录不存在: $input_dir"
        return 1
    fi
    
    # 创建输出目录
    mkdir -p "$output_dir"
    
    local total_files=0
    local processed_files=0
    local failed_files=0
    
    # 支持的图片格式
    local image_extensions="jpg jpeg png gif bmp tiff webp"
    
    for ext in $image_extensions; do
        for file in "$input_dir"/*."$ext" "$input_dir"/*."${ext^^}"; do
            if [ -f "$file" ]; then
                total_files=$((total_files + 1))
                
                local filename=$(basename "$file")
                local name_without_ext="${filename%.*}"
                local extension="${filename##*.}"
                
                # 统一转换为 .jpg 格式以获得更好的压缩
                local output_file="$output_dir/${name_without_ext}.jpg"
                
                echo ""
                log_info "处理文件: $filename"
                
                if optimize_image "$file" "$output_file"; then
                    processed_files=$((processed_files + 1))
                    log_info "✅ 成功处理: $filename"
                else
                    failed_files=$((failed_files + 1))
                    log_error "❌ 处理失败: $filename"
                fi
            fi
        done
    done
    
    echo ""
    log_header "批量优化完成"
    log_info "总文件数: $total_files"
    log_info "成功处理: $processed_files"
    log_info "处理失败: $failed_files"
    
    if [ $processed_files -gt 0 ]; then
        log_info "优化后的图片保存在: $output_dir"
    fi
}

# 显示帮助
show_help() {
    echo "图片优化工具 - 自动调整图片大小以适合网页显示"
    echo ""
    echo "使用方法: $0 [选项] <输入文件/目录>"
    echo ""
    echo "选项:"
    echo "  -w, --width <数值>     设置最大宽度 (默认: $MAX_WIDTH)"
    echo "  -h, --height <数值>    设置最大高度 (默认: $MAX_HEIGHT)"
    echo "  -q, --quality <数值>   设置JPEG质量 1-100 (默认: $QUALITY)"
    echo "  -s, --size <数值>      设置最大文件大小 MB (默认: $MAX_SIZE_MB)"
    echo "  -o, --output <目录>    设置输出目录 (默认: $OUTPUT_DIR)"
    echo "  --help                 显示此帮助信息"
    echo ""
    echo "示例:"
    echo "  $0 image.jpg                    # 优化单个图片"
    echo "  $0 images/                      # 优化整个目录"
    echo "  $0 -w 800 -q 80 image.jpg       # 自定义参数"
    echo "  $0 -o web-images images/        # 指定输出目录"
    echo ""
    echo "优化策略:"
    echo "  • 尺寸超过 ${MAX_WIDTH}x${MAX_HEIGHT} 时自动缩放"
    echo "  • 文件大小超过 ${MAX_SIZE_MB}MB 时压缩质量"
    echo "  • 移除图片元数据减小文件大小"
    echo "  • 转换为最优的网页格式"
    echo ""
}

# 解析命令行参数
while [[ $# -gt 0 ]]; do
    case $1 in
        -w|--width)
            MAX_WIDTH="$2"
            shift 2
            ;;
        -h|--height)
            MAX_HEIGHT="$2"
            shift 2
            ;;
        -q|--quality)
            QUALITY="$2"
            shift 2
            ;;
        -s|--size)
            MAX_SIZE_MB="$2"
            shift 2
            ;;
        -o|--output)
            OUTPUT_DIR="$2"
            shift 2
            ;;
        --help)
            show_help
            exit 0
            ;;
        -*)
            log_error "未知选项: $1"
            show_help
            exit 1
            ;;
        *)
            INPUT="$1"
            shift
            ;;
    esac
done

# 主程序
main() {
    log_header "🖼️  图片优化工具"
    
    # 检查输入参数
    if [ -z "$INPUT" ]; then
        log_error "请指定输入文件或目录"
        show_help
        exit 1
    fi
    
    # 检查依赖
    check_dependencies
    
    # 显示配置
    echo "配置参数:"
    echo "  最大尺寸: ${MAX_WIDTH}x${MAX_HEIGHT}"
    echo "  JPEG质量: ${QUALITY}"
    echo "  最大大小: ${MAX_SIZE_MB}MB"
    echo "  输出目录: $OUTPUT_DIR"
    echo ""
    
    if [ -f "$INPUT" ]; then
        # 单个文件
        log_info "优化单个文件: $INPUT"
        
        local filename=$(basename "$INPUT")
        local name_without_ext="${filename%.*}"
        
        mkdir -p "$OUTPUT_DIR"
        local output_file="$OUTPUT_DIR/${name_without_ext}.jpg"
        
        if optimize_image "$INPUT" "$output_file"; then
            log_info "✅ 优化完成，保存为: $output_file"
        else
            log_error "❌ 优化失败"
            exit 1
        fi
        
    elif [ -d "$INPUT" ]; then
        # 目录
        log_info "批量优化目录: $INPUT"
        optimize_directory "$INPUT" "$OUTPUT_DIR"
        
    else
        log_error "输入路径不存在: $INPUT"
        exit 1
    fi
    
    echo ""
    log_info "🎉 所有任务完成！"
}

# 运行主程序
main