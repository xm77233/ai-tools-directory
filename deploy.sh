#!/bin/bash
# 部署脚本 - 从头构建并准备部署

# 设置错误立即退出
set -e

echo "===== 开始AI工具导航网站部署过程 ====="

# 步骤1: 清理以前的构建文件
echo "清理之前的构建..."
rm -rf .next out

# 步骤2: 安装依赖
echo "安装依赖..."
npm ci

# 步骤3: 构建生产版本
echo "构建生产版本..."
cp next.config.production.js next.config.js
NODE_ENV=production npm run build

# 步骤4: 确保_redirects文件存在
echo "检查并确保_redirects文件正确..."
if [ ! -f ./out/_redirects ]; then
  echo "/* /index.html 200" > ./out/_redirects
  echo "/categories/* /index.html 200" >> ./out/_redirects
  echo "/tools/* /index.html 200" >> ./out/_redirects
fi

# 步骤5: 检查构建输出
echo "查看构建输出文件..."
ls -la ./out/

# 步骤6: 提示部署
echo ""
echo "=== 构建完成 ==="
echo "现在您可以上传out目录中的内容到Cloudflare Pages"
echo "或运行wrangler部署命令(如果已配置)"
echo ""
echo "部署指南:"
echo "1. 进入Cloudflare Pages面板"
echo "2. 选择手动上传(Direct Upload)"
echo "3. 上传out目录中的所有文件"

# 显示当前时间
echo "构建于: $(date)"
echo "=============================" 