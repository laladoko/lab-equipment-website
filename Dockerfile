# 多阶段构建 - 生产环境优化版本

# 阶段1: 安装依赖
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 复制package文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production && npm cache clean --force

# 阶段2: 构建应用
FROM node:18-alpine AS builder
WORKDIR /app

# 复制源代码和依赖
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# 构建应用
RUN npm run build

# 阶段3: 运行时环境
FROM node:18-alpine AS runner
WORKDIR /app

# 设置生产环境
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# 创建非root用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# 复制必要文件
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

# 切换到非root用户
USER nextjs

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# 启动应用
CMD ["npm", "start"] 