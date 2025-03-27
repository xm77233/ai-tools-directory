#!/bin/bash
# 根目录适配脚本 - 解决Cloudflare Pages "root directory not found" 错误

set -e # 出错时立即停止

echo "=== 启动根目录适配脚本 ==="
echo "当前工作目录: $(pwd)"
echo "目录内容:"
ls -la

# 检查ai-tools-directory目录是否存在
if [ -d "ai-tools-directory" ]; then
  echo "找到ai-tools-directory目录，进入该目录执行构建..."
  cd ai-tools-directory
  
  # 检查是否有构建脚本
  if [ -f "cloudflare-direct-build.sh" ]; then
    echo "找到构建脚本，添加执行权限并运行..."
    chmod +x ./cloudflare-direct-build.sh
    ./cloudflare-direct-build.sh
  else
    echo "未找到构建脚本，使用默认构建流程..."
    # 安装依赖
    npm ci
    
    # 配置生产环境
    cp next.config.production.js next.config.js
    
    # 执行构建
    NODE_ENV=production npm run build
    
    # 创建必要的配置文件
    mkdir -p ./out
    echo "/* /index.html 200" > ./out/_redirects
    echo "/categories/* /index.html 200" >> ./out/_redirects
    echo "/tools/* /index.html 200" >> ./out/_redirects
    
    echo "{ \"version\": 1, \"include\": [\"/*\"], \"exclude\": [] }" > ./out/_routes.json
    
    # 如果有index.html，创建404页面
    if [ -f "./out/index.html" ]; then
      cp ./out/index.html ./out/404.html
    fi
  fi
else
  echo "未找到ai-tools-directory目录，当前目录可能已经是项目根目录"
  echo "直接在当前目录执行构建..."
  
  # 安装依赖
  npm ci
  
  # 配置生产环境
  cp next.config.production.js next.config.js
  
  # 执行构建
  NODE_ENV=production npm run build
  
  # 创建必要的配置文件
  mkdir -p ./out
  echo "/* /index.html 200" > ./out/_redirects
  echo "/categories/* /index.html 200" >> ./out/_redirects
  echo "/tools/* /index.html 200" >> ./out/_redirects
  
  echo "{ \"version\": 1, \"include\": [\"/*\"], \"exclude\": [] }" > ./out/_routes.json
  
  # 如果有index.html，创建404页面
  if [ -f "./out/index.html" ]; then
    cp ./out/index.html ./out/404.html
  fi
fi

echo "构建完成时间: $(date)"
echo "=== 根目录适配脚本完成 ==="
