#!/bin/bash

echo "🚀 开始部署 Vercel Demo 项目..."

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 安装 Vercel CLI..."
    npm install -g vercel
fi

# 安装项目依赖
echo "📦 安装项目依赖..."
npm install

# 部署到 Vercel
echo "🚀 部署到 Vercel..."
vercel

echo "✅ 部署完成！"
echo "📱 访问你的应用: https://你的项目名.vercel.app"
