#!/usr/bin/env bash
# 将 Nginx 静态站点配置上传到服务器并启用（域名 www.qple.net）
# 用法: ./scripts/setup-nginx-on-server.sh [user@host]
# 例:   ./scripts/setup-nginx-on-server.sh root@103.44.245.79
set -e
cd "$(dirname "$0")/.."
HOST="${1:-root@103.44.245.79}"
CONF="server-config/nginx-static.conf"

if [ ! -f "$CONF" ]; then
  echo "错误: 找不到 $CONF"
  exit 1
fi

echo ">>> 上传 Nginx 配置到 $HOST ..."
scp -P 22 "$CONF" "$HOST:/tmp/lab-equipment-nginx.conf"

echo ">>> 在服务器上安装并启用配置..."
ssh -p 22 "$HOST" "
  rm -f /etc/nginx/sites-enabled/lab-equipment
  mv /tmp/lab-equipment-nginx.conf /etc/nginx/sites-available/lab-equipment
  ln -sf /etc/nginx/sites-available/lab-equipment /etc/nginx/sites-enabled/lab-equipment
  nginx -t && systemctl reload nginx
  echo '>>> Nginx 已重载，站点配置已启用（www.qple.net / qple.net -> /var/www/lab-equipment）'
"
