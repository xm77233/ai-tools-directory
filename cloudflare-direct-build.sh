#!/bin/bash
# 这个脚本专为Cloudflare Pages直接从GitHub仓库构建而设计
# 可以解决"root directory not found"等问题

# 设置错误时立即停止
set -e

echo "=== 开始Cloudflare Pages专用构建流程 ==="

# 检查当前目录结构
echo "当前目录内容:"
ls -la
pwd

# 如果当前目录是仓库根目录，而不是ai-tools-directory，则需要进入子目录
if [ -d "ai-tools-directory" ]; then
  echo "检测到代码在ai-tools-directory子目录，进入该目录..."
  cd ai-tools-directory
  echo "现在在目录:"
  pwd
  echo "目录内容:"
  ls -la
fi

# 安装依赖
echo "安装依赖..."
npm ci

# 使用生产配置文件进行构建
echo "使用生产配置构建项目..."
cp next.config.production.js next.config.js
NODE_ENV=production npm run build

# 确保输出目录存在并清空
mkdir -p ./out

# 选择性地复制静态文件到输出目录，跳过index.html
echo "复制必要的静态文件..."
if [ -d "./public" ]; then
  for file in ./public/*; do
    filename=$(basename "$file")
    if [ "$filename" != "index.html" ]; then
      cp -r "$file" ./out/
    fi
  done
fi

# 确保所有必要的文件存在
echo "创建必要的配置文件..."

# 创建404页面
if [ -f "./out/index.html" ]; then
  echo "创建404页面..."
  cp ./out/index.html ./out/404.html
fi

# 创建_redirects文件
echo "创建/更新_redirects文件..."
cat > ./out/_redirects << EOL
/* /index.html 200
/categories/* /index.html 200
/tools/* /index.html 200
EOL

# 创建_routes.json文件
echo "创建/更新_routes.json文件..."
cat > ./out/_routes.json << EOL
{ 
  "version": 1, 
  "include": ["/*"], 
  "exclude": [] 
}
EOL

# 输出构建信息
echo "构建完成的文件列表:"
ls -la ./out/

echo "构建完成时间: $(date)"
echo "=== 构建流程完成 ===" 