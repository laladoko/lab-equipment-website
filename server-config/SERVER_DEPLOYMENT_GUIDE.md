# 服务器端部署指南

## 🚀 部署概述

本指南详细说明了如何将实验室设备网站部署到生产服务器，包括所有必要的配置和脚本。

## 📋 系统要求

- **操作系统**: Ubuntu 20.04+ / CentOS 7+
- **Node.js**: 18.x+ (推荐 20.x)
- **内存**: 最少 2GB RAM
- **存储**: 最少 10GB 可用空间
- **域名**: 已配置的域名和SSL证书

## 🛠️ 安装依赖

### 1. 系统包更新
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. 安装Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. 安装PM2
```bash
sudo npm install -g pm2
```

### 4. 安装Nginx
```bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 5. 安装SSL证书 (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d www.qple.net -d qple.net
```

## 📁 项目部署

### 1. 克隆项目
```bash
cd /root
git clone https://github.com/laladoko/lab-equipment-website.git
cd lab-equipment-website
```

### 2. 安装依赖
```bash
npm install
```

### 3. 构建项目
```bash
npm run build
```

## ⚙️ 配置管理

### 1. PM2配置 (ecosystem.config.js)
```javascript
module.exports = {
  apps: [{
    name: 'lab-equipment-website',
    script: 'npm',
    args: 'run start -- --hostname 127.0.0.1',
    cwd: '/root/lab-equipment-website',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

### 2. Nginx配置
配置文件位置: `/etc/nginx/sites-enabled/lab-equipment-website`

主要特性:
- HTTPS重定向
- 反向代理到Node.js应用
- 静态资源缓存优化
- CORS支持
- 文件上传大小限制 (20MB)

### 3. 环境变量
```bash
export NODE_ENV=production
export PORT=3000
export HOSTNAME=127.0.0.1
```

## 🚀 启动服务

### 1. 启动应用
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 2. 配置Nginx
```bash
sudo cp server-config/nginx-lab-equipment-website.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/nginx-lab-equipment-website.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 3. 验证部署
```bash
# 检查应用状态
pm2 status

# 检查端口绑定
netstat -tlnp | grep :3000

# 测试应用访问
curl -I http://127.0.0.1:3000
```

## 📊 监控和维护

### 1. 日志监控
```bash
# 实时监控日志
./monitor-logs.sh

# 分析日志
./log-analyzer.sh
```

### 2. 性能监控
```bash
# 查看PM2状态
pm2 monit

# 查看系统资源
htop
df -h
```

### 3. 自动部署
```bash
# 设置自动部署
./setup-auto-deploy.sh

# 执行部署
./auto-deploy.sh
```

## 🔧 故障排除

### 常见问题

#### 1. 502 Bad Gateway
- 检查PM2进程状态: `pm2 status`
- 检查端口绑定: `netstat -tlnp | grep :3000`
- 查看应用日志: `pm2 logs lab-equipment-website`

#### 2. 构建失败
- 清理构建缓存: `rm -rf .next`
- 重新安装依赖: `rm -rf node_modules && npm install`
- 重新构建: `npm run build`

#### 3. 内存不足
- 检查内存使用: `free -h`
- 重启应用: `pm2 restart lab-equipment-website`
- 增加swap空间

#### 4. 磁盘空间不足
- 检查磁盘使用: `df -h`
- 清理日志文件: `./log-analyzer.sh --cleanup`
- 清理构建缓存: `rm -rf .next`

## 📈 性能优化

### 1. 图片优化
```bash
# 批量优化图片
./optimize-images.sh /path/to/images

# 测试优化效果
./test-image-optimization.sh
```

### 2. 缓存优化
- 静态资源: 30天缓存
- HTML页面: 禁用缓存
- Next.js chunks: 禁用缓存

### 3. 安全优化
- SSL/TLS 1.2+ 支持
- 安全头设置
- CORS配置
- 文件上传限制

## 🔄 更新部署

### 1. 代码更新
```bash
git pull origin main
npm install
npm run build
pm2 restart lab-equipment-website
```

### 2. 配置更新
```bash
# 更新Nginx配置
sudo cp server-config/nginx-lab-equipment-website.conf /etc/nginx/sites-available/
sudo nginx -t && sudo systemctl reload nginx

# 更新PM2配置
pm2 reload ecosystem.config.js
```

### 3. 回滚策略
```bash
# 回滚到上一个版本
git reset --hard HEAD~1
npm run build
pm2 restart lab-equipment-website
```

## 📞 技术支持

如有问题，请检查:
1. 应用日志: `pm2 logs`
2. Nginx错误日志: `sudo tail -f /var/log/nginx/error.log`
3. 系统日志: `journalctl -u nginx -f`

## 📝 更新日志

- **2025-08-15**: 初始部署配置
- **2025-08-15**: 增强产品上传功能
- **2025-08-15**: 优化产品数据结构
- **2025-08-15**: 添加完整字段验证系统
