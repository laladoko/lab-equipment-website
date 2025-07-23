# 实验室设备网站 - 部署文档

## 📋 项目概述

**项目名称**：杭州全谱实验室设备有限公司官网  
**技术栈**：Next.js 15.1.6 + TypeScript + Tailwind CSS + Framer Motion  
**构建状态**：✅ 已成功构建  

## 🛠️ 系统要求

### 服务器最低配置
- **CPU**: 1核心 2.0GHz+
- **内存**: 2GB RAM+
- **存储**: 10GB+ 可用空间
- **网络**: 10Mbps+ 带宽
- **操作系统**: CentOS 7+, Ubuntu 18.04+, 或 Debian 9+

### 推荐配置（生产环境）
- **CPU**: 2核心 2.4GHz+
- **内存**: 4GB RAM+
- **存储**: 50GB+ SSD
- **网络**: 100Mbps+ 带宽

## 📦 构建产物说明

项目已成功构建，生成以下关键文件：
```
.next/
├── static/           # 静态资源文件
├── server/           # 服务器渲染代码
├── BUILD_ID          # 构建版本标识
└── ...              # 其他构建文件

out/ (如果使用静态导出)
public/              # 静态资源目录
├── brands/          # 品牌图片资源
└── ...

node_modules/        # 依赖包
package.json         # 项目配置
```

## 🚀 部署方式

### 方式一：传统服务器部署（推荐）

#### 1. 环境准备

```bash
# 安装 Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version  # 应该显示 v18.x.x+
npm --version

# 安装 PM2（进程管理器）
npm install -g pm2

# 安装 Nginx（可选，用于反向代理）
sudo apt update
sudo apt install nginx
```

#### 2. 项目部署

```bash
# 1. 创建项目目录
sudo mkdir -p /var/www/lab-equipment-website
sudo chown $USER:$USER /var/www/lab-equipment-website

# 2. 上传项目文件（将整个项目目录上传到服务器）
# 可以使用 scp, rsync 或 git clone

# 3. 安装依赖
cd /var/www/lab-equipment-website
npm ci --production

# 4. 构建项目（如果需要）
npm run build

# 5. 创建 PM2 配置文件
```

#### 3. PM2 配置文件

创建 `ecosystem.config.js`：

```javascript
module.exports = {
  apps: [{
    name: 'lab-equipment-website',
    script: 'npm start',
    cwd: '/var/www/lab-equipment-website',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/lab-equipment-website-error.log',
    out_file: '/var/log/pm2/lab-equipment-website-out.log',
    log_file: '/var/log/pm2/lab-equipment-website.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024'
  }]
}
```

#### 4. 启动应用

```bash
# 创建日志目录
sudo mkdir -p /var/log/pm2
sudo chown $USER:$USER /var/log/pm2

# 启动应用
pm2 start ecosystem.config.js

# 查看状态
pm2 list
pm2 logs lab-equipment-website

# 设置开机自启
pm2 startup
pm2 save
```

#### 5. Nginx 配置（推荐）

创建 `/etc/nginx/sites-available/lab-equipment-website`：

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # 安全头部
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;

    # 静态文件缓存
    location /_next/static/ {
        alias /var/www/lab-equipment-website/.next/static/;
        expires 1y;
        access_log off;
        add_header Cache-Control "public, immutable";
    }

    location /brands/ {
        alias /var/www/lab-equipment-website/public/brands/;
        expires 30d;
        access_log off;
        add_header Cache-Control "public";
    }

    # 代理到 Next.js
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
    }
}
```

启用配置：
```bash
sudo ln -s /etc/nginx/sites-available/lab-equipment-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 方式二：Docker 部署

#### 1. 创建 Dockerfile

```dockerfile
# 生产环境 Dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
```

#### 2. 创建 docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    volumes:
      - ./logs:/app/logs
    networks:
      - lab-equipment-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped
    networks:
      - lab-equipment-network

networks:
  lab-equipment-network:
    driver: bridge
```

#### 3. 部署命令

```bash
# 构建并启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 方式三：静态导出部署（适用于简单托管）

如果不需要服务器端渲染，可以导出为静态网站：

#### 1. 修改 next.config.ts

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  distDir: 'out'
}

module.exports = nextConfig
```

#### 2. 构建和部署

```bash
# 重新构建（静态导出）
npm run build

# 上传 out/ 目录到任何静态托管服务
# 如：阿里云 OSS、腾讯云 COS、七牛云等
```

## 🇨🇳 国内服务器优化建议

### 1. 依赖安装优化

```bash
# 使用淘宝镜像源
npm config set registry https://registry.npmmirror.com
npm config set disturl https://npmmirror.com/dist
npm config set electron_mirror https://npmmirror.com/mirrors/electron/
npm config set sass_binary_site https://npmmirror.com/mirrors/node-sass/

# 或使用 cnpm
npm install -g cnpm --registry=https://registry.npmmirror.com
cnpm install
```

### 2. CDN 加速配置

推荐使用国内 CDN 服务商：
- **阿里云 CDN**
- **腾讯云 CDN** 
- **百度云 CDN**
- **又拍云**

#### CDN 配置建议：
```bash
# 静态资源 CDN 配置
/_next/static/*     # 缓存 1 年
/brands/*          # 缓存 30 天
/*.js, /*.css      # 缓存 7 天
/*.html            # 缓存 1 小时
```

### 3. 域名备案

⚠️ **重要提醒**：如果使用国内服务器，域名必须完成 ICP 备案。

备案流程：
1. 购买国内服务器
2. 在服务商平台提交备案申请
3. 等待管局审核（10-20个工作日）
4. 备案成功后解析域名

## 🔧 性能优化建议

### 1. 服务器级别优化

```bash
# 增加文件描述符限制
echo "* soft nofile 65535" >> /etc/security/limits.conf
echo "* hard nofile 65535" >> /etc/security/limits.conf

# 优化内核参数
echo "net.core.somaxconn = 65535" >> /etc/sysctl.conf
echo "net.ipv4.tcp_max_tw_buckets = 6000" >> /etc/sysctl.conf
sysctl -p
```

### 2. Node.js 内存优化

```bash
# 设置 Node.js 内存限制
export NODE_OPTIONS="--max-old-space-size=2048"

# PM2 配置中添加
node_args: ['--max-old-space-size=2048']
```

### 3. 监控配置

```bash
# PM2 监控
pm2 install pm2-server-monit

# 系统监控工具
sudo apt install htop iotop nethogs

# 日志轮转
sudo logrotate -d /etc/logrotate.d/pm2
```

## 📊 监控和维护

### 1. 应用监控

```bash
# 查看 PM2 状态
pm2 status
pm2 monit

# 查看系统资源
htop
df -h
free -h
```

### 2. 日志管理

```bash
# 查看应用日志
pm2 logs lab-equipment-website

# 清理日志
pm2 flush

# 查看 Nginx 日志
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 3. 自动化部署脚本

创建 `deploy.sh`：

```bash
#!/bin/bash

# 自动化部署脚本
APP_NAME="lab-equipment-website"
APP_DIR="/var/www/lab-equipment-website"

echo "🚀 开始部署 $APP_NAME..."

# 备份当前版本
if [ -d "$APP_DIR.backup" ]; then
    rm -rf "$APP_DIR.backup"
fi
cp -r "$APP_DIR" "$APP_DIR.backup"

# 拉取最新代码
cd "$APP_DIR"
git pull origin main

# 安装依赖
npm ci --production

# 构建项目
npm run build

# 重启应用
pm2 restart "$APP_NAME"

# 检查状态
sleep 5
if pm2 show "$APP_NAME" | grep -q "online"; then
    echo "✅ 部署成功！"
    # 清理备份
    rm -rf "$APP_DIR.backup"
else
    echo "❌ 部署失败，回滚到之前版本..."
    pm2 stop "$APP_NAME"
    rm -rf "$APP_DIR"
    mv "$APP_DIR.backup" "$APP_DIR"
    pm2 start "$APP_NAME"
fi

# 重载 Nginx
sudo nginx -s reload

echo "🎉 部署完成！"
```

## 🛡️ 安全配置

### 1. 防火墙设置

```bash
# UFW 防火墙配置
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw deny 3000/tcp  # 隐藏 Node.js 端口
```

### 2. SSL 证书配置

```bash
# 使用 Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 自动续期
sudo crontab -e
# 添加：0 12 * * * /usr/bin/certbot renew --quiet
```

### 3. 定期备份

```bash
# 创建备份脚本 backup.sh
#!/bin/bash
BACKUP_DIR="/backup/lab-equipment-website"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_DIR/website_$DATE.tar.gz" /var/www/lab-equipment-website

# 保留最近7天的备份
find "$BACKUP_DIR" -name "website_*.tar.gz" -mtime +7 -delete

# 添加到定时任务
# 0 2 * * * /path/to/backup.sh
```

## ❗ 故障排除

### 常见问题解决

1. **端口占用**
```bash
sudo netstat -tulpn | grep :3000
sudo kill -9 <PID>
```

2. **内存不足**
```bash
# 创建 swap 文件
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

3. **权限问题**
```bash
sudo chown -R $USER:$USER /var/www/lab-equipment-website
sudo chmod -R 755 /var/www/lab-equipment-website
```

4. **依赖安装失败**
```bash
# 清理缓存重新安装
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## 📞 技术支持

如有部署问题，请联系：
- **邮箱**: tech@labequipment.com
- **技术支持**: 400-123-4567

---

**最后更新**: 2024年7月23日  
**文档版本**: v1.0  
**项目版本**: Next.js 15.1.6 