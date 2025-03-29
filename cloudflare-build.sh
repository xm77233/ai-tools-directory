#!/bin/bash
set -e # 出错时立即停止

echo "开始构建过程..."
echo "时间: $(date)"

# 安装依赖
echo "正在安装依赖..."
npm install

# 构建时使用生产配置
echo "使用生产配置构建应用..."
cp next.config.production.js next.config.js
npm run build

# 确保输出目录存在
echo "确保输出目录存在..."
mkdir -p out

# 复制静态文件到输出目录
echo "将静态文件复制到输出目录..."
cp -r .next/static out/_next/
cp -r public/* out/

# Google Analytics 代码片段
GA_CODE='<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XHWYK8HRC9"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag("js", new Date());
  gtag("config", "G-XHWYK8HRC9");
</script>'

# 检查生成的HTML文件是否包含Google Analytics代码
echo "验证Google Analytics代码..."
for htmlfile in $(find out -name "*.html"); do
  if ! grep -q "G-XHWYK8HRC9" "$htmlfile"; then
    echo "向 $htmlfile 添加Google Analytics代码..."
    # 在</head>前插入Google Analytics代码
    sed -i "s|<head>|<head>${GA_CODE}|g" "$htmlfile"
  fi
done

# 创建专门的静态HTML文件
echo "创建备用和静态HTML文件..."
cp out/index.html out/index.html.static
cp out/index.html out/static.html
cp out/404.html out/fallback.html

# 再次检查新创建的文件中是否包含分析代码
for htmlfile in out/index.html.static out/static.html out/fallback.html; do
  if ! grep -q "G-XHWYK8HRC9" "$htmlfile"; then
    echo "向 $htmlfile 添加Google Analytics代码..."
    sed -i "s|<head>|<head>${GA_CODE}|g" "$htmlfile"
  fi
done

# 确保_redirects文件存在
echo "确保_redirects文件存在..."
if [ ! -f "out/_redirects" ]; then
  cp public/_redirects out/
fi

# 确保_routes.json文件存在，用于Cloudflare Pages
echo "确保_routes.json文件存在..."
if [ ! -f "out/_routes.json" ]; then
  echo '{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/_next/*"]
}' > out/_routes.json
fi

# 复制rootindex.html为主索引文件
if [ -f "public/rootindex.html" ]; then
  echo "使用自定义根索引文件..."
  cp public/rootindex.html out/index.html
  # 确保主索引文件也有分析代码
  if ! grep -q "G-XHWYK8HRC9" "out/index.html"; then
    echo "向 out/index.html 添加Google Analytics代码..."
    sed -i "s|<head>|<head>${GA_CODE}|g" "out/index.html"
  fi
fi

# 展示文件
echo "out/_redirects内容:"
cat out/_redirects

echo "out/_routes.json内容:"
cat out/_routes.json

echo "构建完成!"
echo "时间: $(date)"
echo "=== Build process completed ===" 