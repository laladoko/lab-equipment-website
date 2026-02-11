# 杭州全谱实验室设备有限公司官网

## 📋 项目概述

**项目名称**：杭州全谱实验室设备有限公司官网  
**技术栈**：Next.js 15.1.6 + TypeScript + Tailwind CSS + Framer Motion  
**构建状态**：✅ 已成功构建  

## 🚀 快速开始

### 开发环境
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

### 生产部署

**低配服务器（2核2G，最小负载，推荐）**  
静态导出 + Nginx，不跑 Node，内存约 50MB 内：

```bash
# 本机：打包并上传到服务器
./scripts/deploy-to-server.sh root@103.44.245.79
```

服务器上解压到 `/var/www/lab-equipment`，用 Nginx 托管。详见 `server-config/README-STATIC-DEPLOY.md`。

**需要 Node 时（含后台管理）**  
使用 `npm run build` + `npm start` 或 Docker，见下方部署方式。

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

## 🔧 自动部署系统

### 快速使用
```bash
# 前台监控（测试用）
./auto-deploy.sh monitor

# 后台监控（生产用）
./start-auto-deploy-background.sh

# 查看状态
./auto-deploy.sh status

# 查看日志
./auto-deploy.sh logs
```

### 工作原理
1. **文件监控**: 监控产品数据文件变化
2. **智能延迟**: 检测到变化后等待30秒，避免频繁部署
3. **自动部署**: 执行完整部署流程
4. **通知系统**: macOS用户会收到系统通知

### 监控的文件
- `src/data/bruker-products.ts`
- `src/data/fritsch-products.ts`
- `src/data/olympus-products.ts`
- `src/data/wiggens-products.ts`

## 📦 部署方式

### 方式一：静态站点（2核2G 最小负载）
```bash
# 本机生成静态包
./scripts/build-static.sh
# 将 out/ 上传到服务器，用 Nginx 配置 root 指向该目录
# 详见 server-config/README-STATIC-DEPLOY.md
```

### 方式二：传统服务器部署（Node）
```bash
# 1. 安装 Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. 安装 PM2
npm install -g pm2

# 3. 安装依赖并构建
npm ci --production
npm run build

# 4. 启动服务
pm2 start ecosystem.config.js
```

### 方式三：Docker 部署
```bash
# 构建镜像
docker build -t lab-equipment-website .

# 运行容器
docker run -d -p 3000:3000 lab-equipment-website
```

## 🗂️ 项目结构

```
src/
├── app/                 # Next.js 应用主目录
│   ├── admin/          # 管理后台
│   ├── api/            # API 接口
│   ├── brands/         # 品牌页面
│   └── components/     # 可复用组件
├── data/               # 产品数据
│   ├── bruker-products.ts
│   ├── fritsch-products.ts
│   ├── olympus-products.ts
│   └── wiggens-products.ts
└── utils/              # 工具函数
```

## 🔍 故障排除

### 常见问题
1. **监控未启动**: 检查进程 `ps aux | grep auto-deploy`
2. **部署失败**: 查看日志 `./auto-deploy.sh logs`
3. **文件变化未检测**: 手动检查 `./auto-deploy.sh check`

### 日志查看
```bash
# 查看自动部署日志
tail -f auto-deploy.log

# 查看PM2日志
pm2 logs lab-equipment-website
```

## 📞 技术支持

如有问题，请联系开发团队或查看相关部署文档。

---

*本项目使用 Next.js 构建，支持自动部署和监控。*
