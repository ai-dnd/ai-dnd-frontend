# 部署配置说明

## 🌍 环境管理

### 环境文件
- `.env.development` - 开发环境配置
- `.env.test` - 测试环境配置  
- `.env.production` - 生产环境配置

### 快速命令
```bash
# 开发环境
npm run dev              # 启动开发服务器（development模式）
npm run dev:test         # 启动开发服务器（test模式）

# 构建
npm run build            # 生产环境构建
npm run build:test       # 测试环境构建
npm run build:prod       # 生产环境构建（显式）

# 预览
npm run preview          # 预览生产构建
npm run preview:test     # 预览测试构建

# 部署
npm run deploy:test      # 部署到测试环境
npm run deploy:prod      # 部署到生产环境
```

## 🚀 自动化部署流程

### GitHub Actions
- 推送到 `develop` 分支 → 自动部署到测试环境
- 推送到 `main` 分支 → 自动部署到生产环境

### 手动部署
```bash
# Linux/Mac
chmod +x scripts/deploy.sh
./scripts/deploy.sh test    # 部署到测试环境
./scripts/deploy.sh prod    # 部署到生产环境

# Windows
scripts\deploy.bat test     # 部署到测试环境
scripts\deploy.bat prod     # 部署到生产环境
```

## 📋 服务器配置要求

### 开发/测试服务器
- Node.js 18+
- PM2 进程管理器
- Nginx (可选，用于静态文件服务)

### 生产服务器
- Docker + Docker Compose (推荐)
- 或者 Node.js 18+ + PM2 + Nginx

## 🔧 首次部署设置

### 1. 服务器准备
```bash
# 安装Node.js和PM2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g pm2

# 创建应用目录
sudo mkdir -p /var/www/ai-dnd-frontend
sudo chown $USER:$USER /var/www/ai-dnd-frontend
```

### 2. GitHub Secrets配置
在GitHub仓库设置中添加以下Secrets：
- `DEV_HOST` - 开发服务器IP
- `DEV_USERNAME` - 开发服务器用户名
- `DEV_SSH_KEY` - SSH私钥
- `DEV_PORT` - SSH端口（默认22）
- `PROD_HOST` - 生产服务器IP
- `PROD_USERNAME` - 生产服务器用户名  
- `PROD_SSH_KEY` - SSH私钥
- `PROD_PORT` - SSH端口

### 3. 服务器首次部署
```bash
# 克隆代码到服务器
cd /var/www
git clone https://github.com/your-username/ai-dnd-frontend.git
cd ai-dnd-frontend

# 安装依赖
npm ci

# 启动PM2进程
pm2 start ecosystem.config.js --env development
pm2 save
pm2 startup
```

## 🌐 Nginx配置（可选）

如果使用Nginx作为Web服务器：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/ai-dnd-frontend/dist;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://localhost:3000/api/;
        proxy_set_header Host $host;
    }
}
```

## 🐛 故障排除

### 常见问题
1. **构建失败** - 检查环境变量配置
2. **部署失败** - 检查SSH连接和权限
3. **服务启动失败** - 检查PM2日志：`pm2 logs`

### 日志查看
```bash
# PM2日志
pm2 logs frontend-dev
pm2 logs frontend-prod

# GitHub Actions
在GitHub仓库的Actions标签页查看部署日志
```

## 📈 监控和维护

### PM2监控
```bash
pm2 monit                # 实时监控
pm2 list                 # 进程列表
pm2 restart all          # 重启所有进程
pm2 reload all           # 平滑重启
```

### 自动更新
GitHub Actions会自动处理代码更新和部署，无需手动干预。
