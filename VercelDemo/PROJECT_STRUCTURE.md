# 项目文件说明

## 核心文件

### 前端
- **index.html** - 主页面，包含用户登录、注册、发布帖子的所有 UI 和交互逻辑

### 后端 API
- **api/users/index.js** - 用户管理 API（GET: 获取所有用户，POST: 注册/登录）
- **api/posts/index.js** - 帖子管理 API（GET: 获取所有帖子，POST: 创建帖子）
- **api/blob/upload.js** - 文件上传 API（上传图片到 Vercel Blob）

### 数据库
- **lib/db.js** - 数据库连接池和表初始化函数

### 配置
- **vercel.json** - Vercel 服务器配置
- **package.json** - 项目依赖和脚本
- **.env.example** - 环境变量模板

## 工具脚本

- **init-db.js** - 本地数据库初始化脚本
- **deploy.sh** - Linux/Mac 部署脚本
- **deploy.bat** - Windows 部署脚本

## 文档

- **README.md** - 完整的部署指南
- **QUICKSTART.md** - 10 分钟快速开始
- **PROJECT_STRUCTURE.md** - 项目结构说明（本文件）

## 部署流程

1. 在 Vercel 上创建项目
2. 配置 TiDB Cloud 环境变量
3. 创建 Vercel Blob 存储桶
4. 重新部署
5. 访问应用

## 技术栈

- **框架**: Vercel Serverless Functions
- **数据库**: TiDB Cloud (MySQL 兼容)
- **文件存储**: Vercel Blob
- **前端**: 原生 HTML/CSS/JavaScript
- **部署**: Vercel Platform
