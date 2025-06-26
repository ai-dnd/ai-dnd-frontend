#!/bin/bash

# 部署到开发环境脚本
set -e

echo "🚀 开始部署到开发环境..."

# 检查参数
ENVIRONMENT=${1:-test}
echo "📋 部署环境: $ENVIRONMENT"

# 构建项目
echo "🔨 构建项目..."
if [ "$ENVIRONMENT" = "prod" ]; then
    npm run build:prod
else
    npm run build:test
fi

# 上传到服务器
echo "📤 上传文件到服务器..."
if [ "$ENVIRONMENT" = "prod" ]; then
    rsync -avz --delete dist/ user@prod-server:/var/www/ai-dnd-frontend/
    ssh user@prod-server "cd /var/www/ai-dnd-frontend && pm2 reload frontend-prod"
else
    rsync -avz --delete dist/ user@dev-server:/var/www/ai-dnd-frontend-dev/
    ssh user@dev-server "cd /var/www/ai-dnd-frontend-dev && pm2 reload frontend-dev"
fi

echo "✅ 部署完成！"

# 健康检查
echo "🏥 进行健康检查..."
if [ "$ENVIRONMENT" = "prod" ]; then
    curl -f http://prod-server/ || echo "⚠️  生产环境健康检查失败"
else
    curl -f http://dev-server/ || echo "⚠️  开发环境健康检查失败"
fi

echo "🎉 部署流程完成！"
