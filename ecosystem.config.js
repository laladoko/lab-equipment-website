module.exports = {
  apps: [{
    name: 'lab-equipment-website',
    script: 'npm',
    args: 'start',
    cwd: '/root/lab-equipment-website',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/lab-equipment-website-error.log',
    out_file: '/var/log/pm2/lab-equipment-website-out.log',
    log_file: '/var/log/pm2/lab-equipment-website.log',
    time: true,
    max_memory_restart: '1G'
  }]
} 