# Cloudflare Pages 配置指南

## 解决 "Failed: root directory not found" 错误

如果你在Cloudflare Pages部署时遇到 "Failed: root directory not found" 错误，请按照以下步骤操作：

### 1. 检查仓库结构

你的代码在GitHub上的结构为：
- 仓库根目录
  - ai-tools-directory (包含所有代码)

### 2. 正确的Cloudflare Pages配置

在Cloudflare Pages项目设置中：

1. **Production branch**：设置为 `main`
2. **Build settings**：
   - **Root directory**：`/ai-tools-directory` (注意前导斜杠)
   - **Build command**：`chmod +x ./cloudflare-build.sh && ./cloudflare-build.sh`
   - **Build output directory**：`out`
   - **Node.js version**：`16`

### 3. 环境变量配置

如果需要，添加以下环境变量：
- `NODE_VERSION`: `16`
- `NPM_VERSION`: `8`

### 4. 重新连接仓库

如果上述配置仍有问题：
1. 进入Cloudflare Pages项目设置
2. 找到 "Disconnect" 选项，断开当前仓库连接
3. 重新连接你的GitHub仓库
4. 重新配置上述设置

### 5. 权限验证

确保Cloudflare应用程序拥有足够的GitHub权限：
1. 访问 GitHub 的设置页面
2. 点击 "Applications" 或 "Installed Apps"
3. 确认 Cloudflare Pages 应用有适当的权限
4. 如果需要，点击 "Configure" 并更新权限

## 替代方案：直接上传部署

如果通过GitHub集成部署持续失败，可以使用直接上传方式：

1. 本地执行以下命令：
   ```bash
   # Windows环境
   npm run deploy:windows
   
   # Linux/Mac环境
   chmod +x ./deploy.sh && ./deploy.sh
   ```
   
2. 在Cloudflare Pages中：
   - 选择 "Direct Upload" 选项
   - 上传 `out` 目录的内容
   - 这将跳过GitHub集成，直接部署你的网站 