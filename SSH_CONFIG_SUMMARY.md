# SSH配置总结 - 实验室设备网站服务器

## 📋 配置概述

**服务器信息**：
- IP地址：103.44.245.79
- 用户：root
- SSH端口：22
- 操作系统：Ubuntu 20.04.2 LTS

**配置完成时间**：2025年7月30日

## ✅ 已完成的配置

### 1. SSH密钥认证配置

#### 客户端配置：
- ✅ 使用现有SSH密钥对（`~/.ssh/id_rsa` 和 `~/.ssh/id_rsa.pub`）
- ✅ 公钥已复制到服务器（`ssh-copy-id`）
- ✅ SSH客户端配置文件已更新（`~/.ssh/config`）

#### SSH客户端配置详情：
```bash
# 实验室设备网站服务器
Host lab-server
    HostName 103.44.245.79
    User root
    Port 22
    IdentityFile ~/.ssh/id_rsa
    ConnectTimeout 10
    ServerAliveInterval 60
    ServerAliveCountMax 3

# IP直接连接配置
Host 103.44.245.79
    HostName 103.44.245.79
    User root
    Port 22
    IdentityFile ~/.ssh/id_rsa
    ConnectTimeout 10
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

### 2. 服务器SSH安全配置

#### 安全参数设置：
- ✅ **PubkeyAuthentication**: `yes` - 启用密钥认证
- ✅ **MaxAuthTries**: `3` - 限制登录尝试次数
- ✅ **ClientAliveInterval**: `300` - 保持连接活跃（5分钟）
- ✅ **ClientAliveCountMax**: `2` - 最大保活检查次数
- ✅ **X11Forwarding**: `no` - 禁用X11转发（安全）
- ✅ **PasswordAuthentication**: `yes` - 保持密码认证（备用）
- ✅ **PermitRootLogin**: `yes` - 允许root登录

#### 配置文件备份：
- 原始配置：`/etc/ssh/sshd_config.original`
- 日期备份：`/etc/ssh/sshd_config.backup.YYYYMMDD_HHMMSS`

### 3. 部署脚本优化

#### 更新内容：
- ✅ 移除密码登录提示
- ✅ 使用SSH密钥自动连接
- ✅ 保持所有原有功能

#### 部署脚本路径：
- 脚本文件：`./deploy.sh`
- 使用方法：`./deploy.sh`（现在免密运行）

## 🔗 连接方式

### 标准连接：
```bash
# 使用配置别名
ssh lab-server

# 使用IP地址
ssh root@103.44.245.79

# 测试连接
ssh -o BatchMode=yes root@103.44.245.79 "echo '连接成功'"
```

### 部署连接：
```bash
# 自动化部署（免密）
./deploy.sh
```

## 🛡️ 安全特性

### 当前安全级别：**中等**
- ✅ SSH密钥认证已启用
- ✅ 登录尝试次数限制
- ✅ 连接超时配置
- ✅ X11转发已禁用
- ⚠️ 密码认证仍然开启（备用安全措施）

### 可选的安全强化措施：

#### 1. 禁用密码认证（推荐）
```bash
ssh root@103.44.245.79 "sed -i 's/^PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config && systemctl reload sshd"
```

#### 2. 更换SSH端口（可选）
```bash
# 修改为自定义端口（如2222）
ssh root@103.44.245.79 "sed -i 's/^Port 22/Port 2222/' /etc/ssh/sshd_config && systemctl reload sshd"

# 同时需要更新防火墙规则和客户端配置
```

#### 3. 配置防火墙
```bash
ssh root@103.44.245.79 "ufw allow ssh && ufw enable"
```

#### 4. 设置登录通知
```bash
# 配置登录邮件通知
ssh root@103.44.245.79 "echo 'echo \"SSH登录: \$(date) from \$(echo \$SSH_CLIENT | cut -d\" \" -f1)\" | mail -s \"服务器登录通知\" admin@yourdomain.com' >> ~/.bashrc"
```

## 🔧 维护命令

### SSH服务管理：
```bash
# 重启SSH服务
ssh root@103.44.245.79 "systemctl restart sshd"

# 重新加载配置
ssh root@103.44.245.79 "systemctl reload sshd"

# 查看SSH服务状态
ssh root@103.44.245.79 "systemctl status sshd"

# 测试SSH配置语法
ssh root@103.44.245.79 "sshd -t"
```

### 查看连接信息：
```bash
# 查看当前SSH连接
ssh root@103.44.245.79 "who"

# 查看SSH日志
ssh root@103.44.245.79 "tail -f /var/log/auth.log"

# 查看失败的登录尝试
ssh root@103.44.245.79 "grep 'Failed password' /var/log/auth.log"
```

## 📊 性能优化

### 连接优化设置：
- **ConnectTimeout**: 10秒
- **ServerAliveInterval**: 60秒（客户端）/ 300秒（服务器）
- **ServerAliveCountMax**: 3次（客户端）/ 2次（服务器）

### 建议监控指标：
- SSH连接数量
- 失败登录尝试
- 网络延迟
- 服务器资源使用

## 🚨 故障排除

### 常见问题解决：

#### 1. 权限问题
```bash
# 修复SSH密钥权限
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
chmod 644 ~/.ssh/authorized_keys
```

#### 2. 连接超时
```bash
# 增加连接超时时间
ssh -o ConnectTimeout=30 root@103.44.245.79
```

#### 3. 密钥不工作
```bash
# 调试SSH连接
ssh -v root@103.44.245.79

# 重新复制密钥
ssh-copy-id -i ~/.ssh/id_rsa.pub root@103.44.245.79
```

#### 4. 恢复SSH配置
```bash
# 如果配置有问题，恢复备份
ssh root@103.44.245.79 "cp /etc/ssh/sshd_config.original /etc/ssh/sshd_config && systemctl reload sshd"
```

## 📝 配置文件

### 客户端配置文件位置：
- SSH配置：`~/.ssh/config`
- 私钥：`~/.ssh/id_rsa`
- 公钥：`~/.ssh/id_rsa.pub`

### 服务器配置文件位置：
- SSH配置：`/etc/ssh/sshd_config`
- 授权密钥：`/root/.ssh/authorized_keys`
- SSH日志：`/var/log/auth.log`

## 📞 技术支持

如有SSH配置问题，请检查：
1. 网络连接是否正常
2. SSH服务是否运行
3. 防火墙设置是否正确
4. 密钥权限是否正确

---

**配置完成人**：laladoko (徐洪森)  
**最后更新**：2025年7月30日  
**配置状态**：✅ 已完成并测试通过 