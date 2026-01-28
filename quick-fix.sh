#!/bin/bash

echo "快速修复脚本 - 重启所有服务"
echo "================================"

# 重启Nginx
echo "1. 重启Nginx..."
systemctl restart nginx
sleep 2

# 重启PM2应用
echo "2. 重启PM2应用..."
cd /root/lab-equipment-website 2>/dev/null || cd /var/www/lab-equipment-website 2>/dev/null
pm2 restart lab-equipment-website
sleep 3

# 检查状态
echo ""
echo "3. 检查服务状态..."
echo "Nginx: $(systemctl is-active nginx)"
echo "PM2:"
pm2 status

echo ""
echo "4. 检查端口..."
netstat -tlnp 2>/dev/null | grep -E ':(80|443|3000)' || ss -tlnp 2>/dev/null | grep -E ':(80|443|3000)'

echo ""
echo "修复完成！"
