# Vercel + TiDB Cloud + Vercel Blob Demo

这是一个完整的全栈应用示例，展示了如何使用 Vercel 部署，TiDB Cloud 作为数据库，Vercel Blob 作为文件存储。

## 项目功能

- **用户系统**: 注册、登录、退出
- **帖子发布**: 发布文字和图片帖子
- **用户列表**: 查看所有注册用户
- **帖子列表**: 查看所有帖子，包含用户信息和图片

## 部署步骤

### 第一步：安装 Node.js


确保你的电脑上安装了 Node.js（建议 v16 或更高版本）。

检查版本：
```bash
node -v
npm -v
```

如果没有安装，请从 [Node.js 官网](https://nodejs.org/) 下载安装。

### 第二步：安装 Vercel CLI

在项目文件夹中运行：

```bash
npm install -g vercel
```

### 第三步：创建 TiDB Cloud 账号

1. 访问 [TiDB Cloud 官网](https://tidbcloud.com/)
2. 点击 "免费开始" 或 "免费试用"
3. 注册并登录
4. 创建一个新项目（选择免费套餐）
5. 创建后，进入项目设置

### 第四步：获取 TiDB Cloud 连接信息

1. 在 TiDB Cloud 项目中，点击 "连接"
2. 选择 "TiDB Serverless" 模式
3. 点击 "创建数据库"
4. 创建一个数据库，例如命名为 `demo_db`
5. 记录以下信息：
   - **Host**: 类似 `ap-northeast-1.tidb-cloud.com` 或 `xxx.tidbcloud.com`
   - **Port**: 默认是 `4000`
   - **User**: 默认是 `root`
   - **Password**: 数据库密码
   - **Database**: 你创建的数据库名称

### 第五步：创建 Vercel 账号

1. 访问 [Vercel 官网](https://vercel.com/)
2. 使用 GitHub 账号登录（推荐）
3. 或者使用邮箱注册

### 第六步：创建 Vercel 项目

1. 在 Vercel Dashboard 中点击 "Add New Project"
2. 选择 "Upload Git Repository"
3. 如果还没有仓库，先在 GitHub 创建一个新仓库
4. 将项目文件夹中的文件上传到仓库
5. 在 Vercel 中选择刚上传的仓库
6. 点击 "Deploy"

### 第七步：配置环境变量

在 Vercel 项目设置中添加环境变量：

1. 进入项目的 "Settings" → "Environment Variables"
2. 添加以下变量（注意：这些变量在 Vercel 中配置，不要添加到本地 .env 文件）：

```
TIDB_HOST=你的 TiDB Host
TIDB_PORT=4000
TIDB_USER=root
TIDB_PASSWORD=你的 TiDB 密码
TIDB_DATABASE=你的数据库名
BLOB_READ_WRITE_TOKEN=你的 Blob Token
```

**重要说明**:
- `BLOB_READ_WRITE_TOKEN` 需要在 Vercel 中创建，见第八步
- 这些环境变量会被 Vercel 自动读取，不需要本地配置

### 第八步：创建 Vercel Blob 存储桶

1. 在 Vercel Dashboard 中，进入你的项目
2. 点击 "Storage" → "Create Storage" → "Blob"
3. 创建一个名为 `demo-blob` 的存储桶
4. 点击存储桶，进入设置
5. 点击 "Generate Token" 生成一个读写令牌
6. 复制这个令牌，粘贴到第七步的环境变量中

### 第九步：重新部署

环境变量配置完成后：

1. 在 Vercel Dashboard 中，点击 "Redeploy" 按钮
2. 等待部署完成（通常需要 1-2 分钟）
3. 部署完成后，点击 "Visit" 查看你的应用

### 第十步：测试应用

1. 打开你的应用 URL
2. 填写邮箱和姓名，点击"登录/注册"
3. 在发布帖子区域输入内容，上传图片，点击"发布帖子"
4. 查看用户列表和帖子列表

## 项目结构

```
vercel-demo/
├── api/                    # Vercel Serverless API
│   ├── blob/
│   │   └── upload.js       # 文件上传 API
│   ├── posts/
│   │   └── index.js        # 帖子 CRUD API
│   └── users/
│       └── index.js        # 用户 CRUD API
├── lib/
│   └── db.js               # 数据库连接和初始化
├── public/                 # 静态资源（可选）
├── index.html              # 前端页面
├── vercel.json             # Vercel 配置
├── package.json            # 项目依赖
├── .env.example            # 环境变量示例
└── README.md               # 部署说明
```

## 本地开发

如果你想先在本地测试：

```bash
# 安装依赖
npm install

# 安装 Vercel CLI
npm install -g vercel

# 启动本地开发服务器
vercel dev
```

然后在浏览器中访问 `http://localhost:3000`

## 常见问题

### Q: TiDB Cloud 连接失败？

A: 检查以下几点：
- 确认环境变量中的 Host、Port、User、Password、Database 是否正确
- 确认 TiDB Cloud 项目处于运行状态
- 确认防火墙没有阻止连接

### Q: 文件上传失败？

A: 检查：
- BLOB_READ_WRITE_TOKEN 是否正确
- Vercel 存储桶是否已创建
- 是否有足够的存储空间

### Q: 部署后页面空白？

A: 检查：
- 环境变量是否正确配置
- 是否重新部署了项目
- 浏览器控制台是否有错误信息

## 技术栈

- **前端**: HTML + JavaScript (原生)
- **后端**: Node.js + Serverless Functions
- **数据库**: TiDB Cloud (MySQL 兼容)
- **文件存储**: Vercel Blob
- **部署平台**: Vercel

## 学习资源

- [Vercel 文档](https://vercel.com/docs)
- [TiDB Cloud 文档](https://docs.pingcap.com/tidbcloud)
- [Vercel Blob 文档](https://vercel.com/docs/storage/vercel-blob)
