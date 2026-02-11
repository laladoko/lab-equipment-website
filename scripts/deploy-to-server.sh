#!/usr/bin/env bash
# 打包静态站点并上传到服务器（低配机最小负载部署）
# 用法: ./scripts/deploy-to-server.sh [user@host]
# 例:   ./scripts/deploy-to-server.sh root@103.44.245.79
set -e
cd "$(dirname "$0")/.."

HOST="${1:-root@103.44.245.79}"
REMOTE_DIR="/var/www/lab-equipment"
ARCHIVE="out.tar.gz"

echo ">>> 1. 静态构建..."
"$(dirname "$0")/build-static.sh"

echo ">>> 2. 打包 out/ ..."
tar -czf "$ARCHIVE" -C out .

echo ">>> 3. 上传到 $HOST ..."
ssh -p 22 "$HOST" "mkdir -p $REMOTE_DIR"
scp -P 22 "$ARCHIVE" "$HOST:$REMOTE_DIR/"

echo ">>> 4. 服务器端解压并设置权限..."
ssh -p 22 "$HOST" "cd $REMOTE_DIR && tar -xzf $ARCHIVE && rm -f $ARCHIVE && chown -R www-data:www-data . 2>/dev/null || true"

rm -f "$ARCHIVE"
echo ">>> 完成。请在服务器上配置 Nginx 指向 $REMOTE_DIR（见 README 或 server-config/nginx-static.conf）。"
