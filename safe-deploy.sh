#!/bin/bash

echo "[$(date)] 🚀 开始安全部署..."

cd /root/lab-equipment-website

# 添加环境变量避免构建问题
export NODE_OPTIONS="--max-old-space-size=1024"
export NEXT_TELEMETRY_DISABLED=1

# 重新构建（有超时保护）
echo "[$(date)] 📦 重新构建（60秒超时）..."
timeout 60 npm run build 2>&1
build_result=$?

if [ $build_result -eq 0 ]; then
    echo "[$(date)] ✅ 构建成功"
elif [ $build_result -eq 124 ]; then
    echo "[$(date)] ⚠️ 构建超时，尝试重启应用..."
else
    echo "[$(date)] ❌ 构建失败，尝试重启应用..."
fi

# 无论构建是否成功，都重启应用以应用文件变化
echo "[$(date)] 🔄 重启应用..."
pm2 restart lab-equipment-website 2>&1

echo "[$(date)] ✅ 安全部署完成"
