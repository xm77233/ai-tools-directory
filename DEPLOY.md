# AI工具导航网站部署指南

本文档提供将网站部署到Cloudflare Pages的详细步骤。

## 先决条件

- Node.js 16+ 和 npm
- Git
- Cloudflare账户

## 本地构建

### Windows环境

在Windows环境中，运行以下命令构建项目：

```bash
# 安装依赖
npm install

# 构建项目(包含必要的重定向配置)
npm run deploy:windows
```

构建完成后，`out`目录将包含所有部署所需的文件。

### Linux/Mac环境

在Linux或Mac环境中，运行以下命令：

```bash
# 添加执行权限
chmod +x ./deploy.sh

# 执行部署脚本
./deploy.sh
```

## 部署到Cloudflare Pages

### 方法一：直接上传(推荐)

1. 登录Cloudflare账户并进入Pages服务
2. 点击"创建应用程序"(Create application)
3. 选择"直接上传"(Direct Upload)
4. 拖放或选择`out`目录中的所有文件
5. 设置应用名称(例如`ai-tools`)
6. 点击"部署站点"(Deploy site)

### 方法二：GitHub集成

1. 登录Cloudflare账户并进入Pages服务
2. 点击"创建应用程序"(Create application)
3. 选择"连接到Git"(Connect to Git)
4. 选择你的GitHub仓库
5. 配置构建设置：
   - 构建命令: `chmod +x ./cloudflare-build.sh && ./cloudflare-build.sh`
   - 构建输出目录: `out`
   - 节点版本: `16`
6. 点击"保存并部署"(Save and Deploy)

## 自定义域名设置

1. 在Cloudflare Pages的项目设置中，点击"自定义域"(Custom domains)
2. 添加你的域名(例如`toolsite.info`)
3. 按照Cloudflare的指示配置DNS记录

## 重要配置文件说明

本项目有几个关键的配置文件:

- `_redirects`: 定义URL重定向规则，确保SPA正常运行
- `next.config.production.js`: 包含为Cloudflare Pages优化的Next.js配置
- `cloudflare-build.sh`: Cloudflare Pages专用构建脚本

## 故障排除

如果网站显示默认页面或"Hello World"而不是实际内容:

1. 确认`out`目录中不包含静态的`index.html`文件(检查`public`目录)
2. 验证`_redirects`文件配置正确
3. 确保构建配置正确(使用`output: 'export'`)
4. 尝试清除Cloudflare缓存

## 更新网站

当需要更新网站内容时，重复以上构建和部署步骤。如果使用GitHub集成，只需推送更改到仓库即可触发自动部署。 