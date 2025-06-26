@echo off
REM Windows部署脚本

echo 🚀 开始部署到开发环境...

set ENVIRONMENT=%1
if "%ENVIRONMENT%"=="" set ENVIRONMENT=test

echo 📋 部署环境: %ENVIRONMENT%

REM 构建项目
echo 🔨 构建项目...
if "%ENVIRONMENT%"=="prod" (
    call npm run build:prod
) else (
    call npm run build:test
)

if %ERRORLEVEL% neq 0 (
    echo ❌ 构建失败！
    exit /b 1
)

REM 这里可以添加文件上传逻辑
echo 📤 上传文件到服务器...
REM 例如使用scp或者其他工具
REM scp -r dist/* user@server:/path/to/deployment/

echo ✅ 部署完成！
echo 🎉 部署流程完成！

pause
