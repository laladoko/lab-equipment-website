# 使用 Docker 部署（重置后的服务器）

在**已重置的 Ubuntu 服务器**上，从零用 Docker 跑本项目。

---

## 一、服务器上安装 Docker（一次性）

SSH 登录后执行：

```bash
# 安装 Docker
curl -fsSL https://get.docker.com | sh

# 当前用户（如 root）加入 docker 组，可直接 docker 命令
usermod -aG docker $USER
# 若当前是 root，已能直接用 docker，可省略上面一行；重新登录后生效

# 验证
docker --version
docker compose version
```

---

## 二、拉代码并构建运行

```bash
cd /root
git clone https://github.com/laladoko/lab-equipment-website.git
cd lab-equipment-website
```

**只跑 Next 应用（推荐 2G 内存）：**

```bash
docker compose -f docker-compose.simple.yml up -d --build
```

首次会拉镜像并构建，约 3～8 分钟。完成后访问：**http://你的服务器IP:3000**

---

## 三、常用命令

```bash
cd /root/lab-equipment-website

# 查看容器状态与日志
docker compose -f docker-compose.simple.yml ps
docker compose -f docker-compose.simple.yml logs -f app

# 停止
docker compose -f docker-compose.simple.yml down

# 重启（例如改代码后重新构建）
docker compose -f docker-compose.simple.yml up -d --build
```

---

## 四、更新代码后重新部署

```bash
cd /root/lab-equipment-website
git pull origin main
docker compose -f docker-compose.simple.yml up -d --build
```

---

## 五、若使用完整 docker-compose（含 Nginx/Redis）

需要先准备 Nginx 配置和（可选）SSL：

- 创建 `nginx/` 目录及 `nginx.conf`、`conf.d/default.conf`
- 若用 HTTPS，把证书放到 `ssl/`

然后：

```bash
docker compose up -d --build
```

当前仓库暂无 `nginx/` 目录时，请用上面的 **docker-compose.simple.yml** 只跑应用。

---

## 六、内存不足时

若构建或运行中被 Kill，可先加 swap 再构建：

```bash
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
free -h
```

然后再执行 `docker compose -f docker-compose.simple.yml up -d --build`。
