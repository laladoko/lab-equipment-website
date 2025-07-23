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
    env_development: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    error_file: '/var/log/pm2/lab-equipment-website-error.log',
    out_file: '/var/log/pm2/lab-equipment-website-out.log',
    log_file: '/var/log/pm2/lab-equipment-website.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024',
    watch: false,
    ignore_watch: [
      'node_modules',
      '.next',
      'logs'
    ],
    // 自动重启配置
    min_uptime: '60s',
    max_restarts: 10,
    // 优雅关闭
    kill_timeout: 5000,
    wait_ready: true,
    listen_timeout: 10000
  }]
} 