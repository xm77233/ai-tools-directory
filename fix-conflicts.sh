#!/bin/bash

# 文件列表
FILES=(
  "package.json"
  "tsconfig.json"
  "tailwind.config.js"
  "types/tool.ts"
  "styles/globals.css"
  "postcss.config.js"
  "pages/_app.tsx"
  "pages/index.tsx"
  "pages/categories/[id].tsx"
  "pages/tools/index.tsx"
  "next.config.js"
  "data/tools.ts"
  "data/categories.ts"
  "components/CategoryList.tsx"
  "components/Header.tsx"
  "components/Layout.tsx"
  "components/SearchBar.tsx"
  "components/Footer.tsx"
  "components/ToolCard.tsx"
)

# 遍历所有文件
for file in "${FILES[@]}"; do
  echo "修复文件: $file"
  
  # 检查文件是否存在
  if [ -f "$file" ]; then
    # 删除冲突标记，只保留HEAD版本的内容
    sed -i -e '/^<<<<<<< HEAD$/,/^=======$/!d;/^=======$/d;/^<<<<<<< HEAD$/d' -e '/^>>>>>>> /d' "$file"
    echo "已修复: $file"
  else
    echo "文件不存在: $file"
  fi
done

echo "所有合并冲突已修复" 