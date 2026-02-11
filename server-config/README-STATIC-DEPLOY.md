# 低配服务器静态部署（2核2G 最小负载）

## 思路

- 本地执行 **静态导出**，生成纯 HTML/JS/CSS（`out/`），**不运行 Node**。
- 服务器只跑 **Nginx** 托管 `out/`，零 Node 进程，内存占用极小。

## 一、本机打包并上传

```bash
# 在项目根目录执行（会先静态构建再打包上传）
./scripts/deploy-to-server.sh root@103.44.245.79
```

或分步：

```bash
./scripts/build-static.sh          # 生成 out/
tar -czf out.tar.gz -C out .       # 打包
scp -P 22 out.tar.gz root@103.44.245.79:/var/www/lab-equipment/
```

## 二、服务器端（Ubuntu 20.04）

### 1. 安装 Nginx（若未安装）

```bash
apt update && apt install -y nginx
```

### 2. 解压站点

```bash
mkdir -p /var/www/lab-equipment
cd /var/www/lab-equipment
tar -xzf out.tar.gz
chown -R www-data:www-data /var/www/lab-equipment
```

### 3. 使用静态站点配置（域名 www.qple.net）

**方式 A：在本机执行（推荐）**

```bash
# 在项目根目录执行，会 scp 配置到服务器并启用
./scripts/setup-nginx-on-server.sh root@103.44.245.79
```

**方式 B：已在服务器 SSH 里时**

先删掉错误创建的符号链接，再在本机执行方式 A；或在服务器上创建配置：

```bash
# 删除错误指向的符号链接
rm -f /etc/nginx/sites-enabled/lab-equipment

# 然后在本机运行：./scripts/setup-nginx-on-server.sh root@103.44.245.79
# 或在服务器上用 nano 创建 /etc/nginx/sites-available/lab-equipment（内容见 server-config/nginx-static.conf）
```

`nginx-static.conf` 中 `server_name` 为 `www.qple.net qple.net`，`root` 为 `/var/www/lab-equipment`。

### 4. 若需 HTTPS（可选）

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d www.qple.net -d qple.net
```

## 三、资源占用说明

| 方式           | 内存占用   | 说明                     |
|----------------|------------|--------------------------|
| 静态 + Nginx   | 约 50MB 内 | 仅 Nginx，无 Node        |
| Node standalone| 约 150–300MB | 需运行 `node server.js` |

当前方案为 **静态 + Nginx**，适合 2核2G、1Mbps 带宽。

## 四、注意

- 静态部署下 **无后台管理接口**（`/admin`、`/api/admin/*` 未部署）。若需要后台，可在本机或其它机器跑 Node 版，或后续用独立后端。
- 每次更新内容后，在本机重新执行 `./scripts/deploy-to-server.sh root@103.44.245.79` 并上传覆盖 `out/` 再解压即可。
