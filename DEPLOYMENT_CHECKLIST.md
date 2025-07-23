# 🚀 部署人员文件清单

## 📋 必须提供的文件

### 🎯 方式一：自动化部署（推荐）

**只需提供1个文件**：
```
📦 lab-equipment-website-v0.1.0-20250723_143203.tar.gz (93MB)
```

**包含内容**：
- ✅ 完整的项目代码
- ✅ 生产构建产物
- ✅ 所有配置文件
- ✅ 自动化部署脚本
- ✅ 完整文档

**部署命令**：
```bash
tar -xzf lab-equipment-website-v0.1.0-20250723_143203.tar.gz
cd lab-equipment-website-v0.1.0-20250723_143203
chmod +x deploy.sh
./deploy.sh production
```

---

### 🎯 方式二：手动部署

**核心配置文件（必须）**：

| 文件名 | 大小 | 作用 | 重要性 |
|--------|------|------|--------|
| `ecosystem.config.js` | 859B | PM2进程管理配置 | ⭐⭐⭐ |
| `deploy.sh` | 8.7KB | 自动化部署脚本 | ⭐⭐⭐ |
| `package.json` | 646B | 项目依赖配置 | ⭐⭐⭐ |
| `next.config.ts` | 133B | Next.js配置 | ⭐⭐⭐ |

**Docker部署文件（可选）**：

| 文件名 | 大小 | 作用 | 重要性 |
|--------|------|------|--------|
| `Dockerfile` | 1.4KB | Docker镜像构建 | ⭐⭐ |
| `docker-compose.yml` | 1.3KB | Docker编排配置 | ⭐⭐ |
| `.dockerignore` | 788B | Docker构建优化 | ⭐ |

**文档文件（推荐）**：

| 文件名 | 大小 | 作用 | 重要性 |
|--------|------|------|--------|
| `DEPLOYMENT.md` | 11.5KB | 详细部署指南 | ⭐⭐⭐ |
| `DEPLOYMENT_SUMMARY.md` | 4.9KB | 部署总结 | ⭐⭐ |
| `README.md` | 1.5KB | 项目说明 | ⭐ |

---

## 🔧 部署方式选择

### 📦 选项1：提供完整部署包（推荐）

**优点**：
- ✅ 一键部署，简单快捷
- ✅ 包含所有必要文件
- ✅ 自动错误处理和回滚
- ✅ 支持多种部署模式

**文件清单**：
```
lab-equipment-website-v0.1.0-20250723_143203.tar.gz
lab-equipment-website-v0.1.0-20250723_143203.md5  (可选，用于校验)
```

### 📋 选项2：提供单独配置文件

**适用情况**：
- 部署人员有自己的部署流程
- 需要自定义配置
- 已有现成的服务器环境

**最小文件集**：
```
ecosystem.config.js     # PM2配置
deploy.sh              # 部署脚本
DEPLOYMENT.md          # 部署说明
package.json           # 依赖配置
```

---

## 📞 给部署人员的说明

### 🖥️ 系统要求

**最低配置**：
- CPU: 1核 2.0GHz+
- 内存: 2GB RAM+
- 存储: 10GB+
- 系统: CentOS 7+, Ubuntu 18.04+

**软件要求**：
- Node.js 18.0+
- PM2 (会自动安装)
- Nginx (可选，用于反向代理)

### 🚀 快速部署步骤

**如果使用tar.gz包**：
```bash
# 1. 上传文件到服务器
scp lab-equipment-website-v0.1.0-20250723_143203.tar.gz root@server:/tmp/

# 2. 解压和部署
ssh root@server
cd /tmp
tar -xzf lab-equipment-website-v0.1.0-20250723_143203.tar.gz
cd lab-equipment-website-v0.1.0-20250723_143203
chmod +x deploy.sh
./deploy.sh production
```

**如果使用Git仓库**：
```bash
# 1. 克隆代码
git clone https://github.com/laladoko/lab-equipment-website.git
cd lab-equipment-website

# 2. 部署
chmod +x deploy.sh
./deploy.sh production
```

### 🔍 部署后验证

**检查项目**：
```bash
# 检查应用状态
pm2 status

# 查看日志
pm2 logs lab-equipment-website

# 测试访问
curl http://localhost:3000
```

**预期结果**：
- ✅ PM2显示应用 "online" 状态
- ✅ 端口3000正常响应
- ✅ 网站页面正常加载

---

## 🆘 紧急联系方式

**开发者**：徐洪森 (laladoko)  
**邮箱**：tech@labequipment.com  
**GitHub**：https://github.com/laladoko  

**支持时间**：周一至周五 9:00-18:00  

---

## 📝 部署检查清单

**部署前** ✅：
- [ ] 服务器环境准备完成
- [ ] 防火墙配置正确（80、443端口开放）
- [ ] 域名解析已设置
- [ ] 文件上传完成

**部署中** ✅：
- [ ] 部署脚本执行成功
- [ ] 应用启动正常
- [ ] 健康检查通过

**部署后** ✅：
- [ ] 网站可正常访问
- [ ] 所有页面功能正常
- [ ] 移动端适配正常
- [ ] SSL证书配置（生产环境）

---

**最后更新**：2025年7月23日  
**适用版本**：v0.1.0 