# 全新 Ubuntu 服务器部署指南（lab-equipment-website）

适用于**什么都没有**的 Ubuntu 服务器，从零到跑起来。

---

## 一、系统准备（root 或 sudo 用户执行）

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装常用工具
sudo apt install -y curl git build-essential
```

---

## 二、安装 Node.js（推荐 LTS 20.x）

### 方式 A：用 NodeSource 安装（推荐）

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
···安装nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
# 验证
node -v   # 应显示 v20.x.x
npm -v
```

### 方式 B：用 nvm 安装（便于多版本切换）

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc   # 或重新登录
nvm install 20
nvm use 20
node -v
npm -v
```

---

## 三、安装 PM2（全局）

```bash
sudo npm install -g pm2
pm2 -v
```

---

## 四、拉取项目并安装依赖

```bash
# 进入你想放项目的目录，例如 /root 或 /var/www
cd /root

# 克隆仓库（替换为你的仓库地址）
git clone https://github.com/laladoko/lab-equipment-website.git
cd lab-equipment-website

# 按 lock 文件安装依赖
npm ci
```

---

## 五、构建并启动（生产模式推荐）

```bash
# 构建
npm run build

# 用 PM2 启动（生产）
pm2 start npm --name lab-equipment-website -- run start -- -p 3000

# 开机自启
pm2 startup
# 上面会输出一条需要你执行的 sudo 命令，复制执行
pm2 save
```

访问：`http://服务器IP:3000`

---

## 六、若要用开发模式（npm run dev）

适合需要热更新、调试时使用：

```bash
cd /root/lab-equipment-website
pm2 start npm --name lab-equipment-dev -- run dev -- -p 3000
pm2 save
```

可选：文件变更自动重启

```bash
pm2 delete lab-equipment-dev
pm2 start npm --name lab-equipment-dev --watch --ignore-watch="node_modules .next .git" -- run dev -- -p 3000
pm2 save
```

---

## 七、常用 PM2 命令

```bash
pm2 status              # 查看进程
pm2 logs lab-equipment-website   # 看日志
pm2 restart lab-equipment-website
pm2 stop lab-equipment-website
pm2 delete lab-equipment-website
```

---

## 八、可选：用 Nginx 做反向代理（80/443）

若希望用域名或 80 端口访问，可装 Nginx 转发到 3000：

```bash
sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/lab-equipment
```

写入（把 `你的域名或IP` 换成实际值）：

```nginx
server {
    listen 80;
    server_name 你的域名或IP;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

启用并重载：

```bash
sudo ln -s /etc/nginx/sites-available/lab-equipment /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 九、可选：防火墙

```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3000
sudo ufw enable
```

---

## 十、以后更新代码

```bash
cd /root/lab-equipment-website
git fetch origin
git reset --hard origin/main
npm ci
npm run build
pm2 restart lab-equipment-website
```

若用 dev 模式，只需 `git pull` / `git reset` 后 `pm2 restart lab-equipment-dev`（若开了 `--watch` 可能已自动重启）。

---

## 故障排查

- **端口被占用**：`lsof -i :3000` 或 `ss -tlnp | grep 3000`，再用 `kill -9 <PID>` 结束。
- **PM2 进程停了**：`pm2 status` 看状态，`pm2 logs` 看报错。
- **构建失败**：确认 `node -v` 为 18+（推荐 20），再 `rm -rf node_modules .next && npm ci && npm run build`。
