#!/usr/bin/env bash
# 静态导出构建（用于低配服务器 Nginx 部署，零 Node 进程）
# 会临时移开 api 与 admin（静态导出不支持），构建后恢复
set -e
cd "$(dirname "$0")/.."
ROOT="$(pwd)"
BACKUP="$ROOT/.static-build-backup"
trap 'rm -rf "$BACKUP"' EXIT

echo ">>> 临时移开 api、admin（静态导出不支持）..."
mkdir -p "$BACKUP"
[ -d src/app/api ]   && mv src/app/api   "$BACKUP/"
[ -d src/app/admin ] && mv src/app/admin "$BACKUP/"

echo ">>> 静态构建 (USE_STATIC_EXPORT=1)..."
USE_STATIC_EXPORT=1 npm run build

echo ">>> 恢复 api、admin..."
[ -d "$BACKUP/api" ]   && mv "$BACKUP/api"   src/app/
[ -d "$BACKUP/admin" ] && mv "$BACKUP/admin" src/app/

echo ">>> 完成。构建产物在 out/ 目录，可直接用 Nginx 托管。"
