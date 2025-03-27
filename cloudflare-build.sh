#!/bin/bash
set -e # 出错时立即停止

echo "=== Starting build process ==="

# 安装依赖
echo "Installing dependencies..."
npm ci

# 使用生产配置文件进行构建
echo "Building project with production config..."
cp next.config.production.js next.config.js
NODE_ENV=production npm run build

# 确保输出目录存在
mkdir -p ./out

# 将静态文件复制到输出目录
echo "Copying static files..."
cp -r ./public/* ./out/
echo "Contents of public directory:"
ls -la ./public/
echo "Contents of out directory after copy:"
ls -la ./out/

# 创建404页面（将指向主页）
echo "Creating 404 page..."
cp ./out/index.html ./out/404.html

# 确保_redirects文件存在
if [ ! -f ./out/_redirects ]; then
  echo "Creating _redirects file..."
  echo "/* /index.html 200" > ./out/_redirects
fi

# 确保_routes.json文件存在
if [ ! -f ./out/_routes.json ]; then
  echo "Creating _routes.json file..."
  echo '{ "version": 1, "include": ["/*"], "exclude": [] }' > ./out/_routes.json
fi

# 输出重要文件内容
echo "Contents of _redirects:"
cat ./out/_redirects
echo "Contents of _routes.json:"
cat ./out/_routes.json

# 输出构建时间戳
echo "Build completed at $(date)"
echo "=== Build process completed ===" 