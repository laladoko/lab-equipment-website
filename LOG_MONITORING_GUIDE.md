# 实验室设备网站 - 日志监控指南

## 📋 概览

本指南提供了完整的网站后台日志监控解决方案，包括实时监控、日志分析和自动化报告。

## 🛠️ 可用工具

### 1. 日志监控脚本 (`monitor-logs.sh`)

**基础监控工具**，提供实时日志查看和系统状态检查。

#### 使用方法：
```bash
# 查看系统状态总览
./monitor-logs.sh status

# 实时监控应用日志
./monitor-logs.sh app

# 实时监控Nginx日志
./monitor-logs.sh nginx

# 查看最近的错误日志
./monitor-logs.sh errors

# 查看最近的访问日志
./monitor-logs.sh access

# 实时监控所有日志
./monitor-logs.sh live

# 保存当前日志快照
./monitor-logs.sh save
```

### 2. 日志分析脚本 (`log-analyzer.sh`)

**深度分析工具**，提供详细的性能分析和趋势报告。

#### 使用方法：
```bash
# 生成详细的日志分析报告
./log-analyzer.sh report

# 实时性能监控
./log-analyzer.sh performance

# 设置定时监控任务
./log-analyzer.sh setup-cron
```

## 📊 监控内容

### 1. 系统状态监控
- **PM2应用状态**: 进程运行状态、重启次数、内存使用
- **系统资源**: CPU、内存、磁盘使用情况
- **网站可用性**: HTTP状态码检查

### 2. 访问日志分析
- **访问统计**: 每日/每小时访问量
- **用户行为**: 热门页面、访问路径
- **地理分布**: 访客IP分析
- **设备信息**: 浏览器、操作系统统计

### 3. 错误监控
- **应用错误**: Next.js应用错误日志
- **HTTP错误**: 4xx/5xx状态码统计
- **Nginx错误**: 连接超时、上游错误
- **安全威胁**: 异常访问模式检测

### 4. 性能监控
- **响应时间**: 平均响应时间分析
- **吞吐量**: 每秒请求数统计
- **资源使用**: 静态资源访问模式
- **缓存效率**: 缓存命中率分析

## 🚨 告警机制

### 1. 实时告警
- **应用崩溃**: PM2进程异常退出
- **高错误率**: 5分钟内错误超过阈值
- **资源不足**: 内存/磁盘使用超过80%
- **异常访问**: 单IP大量请求

### 2. 定时报告
- **每日报告**: 访问统计、错误汇总
- **每周趋势**: 性能变化、用户增长
- **每月总结**: 整体运营数据

## 🔧 日常维护建议

### 1. 每日检查
```bash
# 查看系统状态
./monitor-logs.sh status

# 检查是否有错误
./monitor-logs.sh errors
```

### 2. 每周分析
```bash
# 生成详细报告
./log-analyzer.sh report

# 分析性能趋势
./log-analyzer.sh performance
```

### 3. 每月优化
- 清理旧日志文件
- 分析访问模式，优化内容
- 检查安全威胁，更新防护措施

## 📁 日志文件位置

### 服务器端日志：
- **PM2应用日志**: `/root/.pm2/logs/lab-equipment-website-*.log`
- **Nginx访问日志**: `/var/log/nginx/access.log`
- **Nginx错误日志**: `/var/log/nginx/error.log`
- **系统日志**: `/var/log/syslog`

### 本地日志：
- **监控快照**: `logs_snapshot_[时间戳]/`
- **分析报告**: `log_analysis_[时间戳].txt`
- **性能报告**: `performance_[时间戳].txt`

## 🛡️ 安全监控

### 1. 攻击检测
- SQL注入尝试
- XSS攻击尝试
- 目录遍历尝试
- 爬虫识别

### 2. 异常模式
- 大量404错误
- 频繁的管理页面访问
- 异常的User-Agent
- 可疑的请求参数

## 📈 性能优化建议

### 1. 基于日志的优化
- **慢查询识别**: 响应时间超过2秒的请求
- **热点资源**: 访问频率最高的静态资源
- **缓存策略**: 重复请求的缓存优化
- **压缩配置**: 大文件的压缩设置

### 2. 用户体验优化
- **加载速度**: 首屏加载时间分析
- **错误页面**: 404/500页面优化
- **移动适配**: 移动设备访问体验
- **SEO优化**: 搜索引擎友好度

## 🔄 自动化流程

### 1. 日志轮转
```bash
# 每日自动轮转日志，避免文件过大
logrotate /etc/logrotate.d/nginx
```

### 2. 监控告警
```bash
# 设置cron任务，每5分钟检查一次
*/5 * * * * /path/to/monitor-logs.sh status > /dev/null
```

### 3. 报告生成
```bash
# 每日凌晨6点生成报告
0 6 * * * /path/to/log-analyzer.sh report
```

## 📞 紧急情况处理

### 1. 网站无法访问
```bash
# 快速诊断
./monitor-logs.sh status
./monitor-logs.sh errors
```

### 2. 性能问题
```bash
# 实时监控
./log-analyzer.sh performance
```

### 3. 安全威胁
```bash
# 检查访问日志
./monitor-logs.sh access
# 生成安全报告
./log-analyzer.sh report
```

## 📝 维护记录

建议在 `MAINTENANCE_LOG.md` 中记录：
- 监控配置变更
- 性能优化措施
- 安全事件处理
- 系统更新记录

---

💡 **提示**: 定期运行监控脚本，及时发现和解决问题，确保网站稳定运行。