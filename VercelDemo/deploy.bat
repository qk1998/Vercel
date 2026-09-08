@echo off
echo 🚀 开始部署 Vercel Demo 项目...

REM 检查是否安装了 Vercel CLI
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo 📦 安装 Vercel CLI...
    npm install -g vercel
)

REM 安装项目依赖
echo 📦 安装项目依赖...
call npm install

REM 部署到 Vercel
echo 🚀 部署到 Vercel...
call vercel

echo ✅ 部署完成！
echo 📱 访问你的应用: https://你的项目名.vercel.app
pause
