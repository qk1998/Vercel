# 快速开始指南

## 10 分钟快速部署

### 第 1 步：准备 TiDB Cloud（2 分钟）

1. 访问 https://tidbcloud.com/ 注册账号
2. 创建免费项目
3. 创建数据库 `demo_db`
4. 记录连接信息：
   - Host: `xxx.tidbcloud.com`
   - Port: `4000`
   - User: `root`
   - Password: `你的密码`
   - Database: `demo_db`

### 第 2 步：准备 Vercel（3 分钟）

1. 访问 https://vercel.com/ 注册账号（推荐用 GitHub 登录）
2. 创建新项目，选择 "Upload Git Repository"
3. 将当前文件夹上传到 GitHub

### 第 3 步：配置环境变量（2 分钟）

1. 在 Vercel 项目设置中添加环境变量：
   ```
   TIDB_HOST=你的 TiDB Host
   TIDB_PORT=4000
   TIDB_USER=root
   TIDB_PASSWORD=你的 TiDB 密码
   TIDB_DATABASE=demo_db
   BLOB_READ_WRITE_TOKEN=你的 Blob Token
   ```

2. 创建 Vercel Blob 存储桶：
   - Vercel Dashboard → Storage → Create Storage → Blob
   - 创建存储桶 `demo-blob`
   - 生成 Token 并复制

### 第 4 步：部署（3 分钟）

1. 在 Vercel Dashboard 中点击 "Redeploy"
2. 等待 1-2 分钟
3. 访问你的应用！

## 本地测试

如果还没有准备 TiDB Cloud，可以先本地测试：

```bash
# 1. 安装依赖
npm install

# 2. 本地运行（需要先配置 .env 文件）
vercel dev
```

然后在浏览器打开 http://localhost:3000

## 需要帮助？

查看完整的 README.md 获取详细说明。
