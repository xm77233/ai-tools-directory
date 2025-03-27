/**
 * Windows环境下完整的构建脚本
 * 解决静态导出问题并准备部署文件
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 确保这是一个干净的构建
console.log('=== 开始Next.js应用程序构建过程 ===');

// 清理构建目录
try {
  if (fs.existsSync('./.next')) {
    console.log('清理.next目录...');
    fs.rmSync('./.next', { recursive: true, force: true });
  }
  
  if (fs.existsSync('./out')) {
    console.log('清理out目录...');
    fs.rmSync('./out', { recursive: true, force: true });
  }
} catch (err) {
  console.error('清理目录失败:', err);
}

// 执行构建
try {
  console.log('执行Next.js构建...');
  execSync('cross-env NODE_ENV=production next build', { stdio: 'inherit' });
} catch (err) {
  console.error('构建失败:', err);
  process.exit(1);
}

// 检查构建结果
try {
  if (!fs.existsSync('./out')) {
    console.error('错误: out目录不存在，构建可能失败');
    console.error('请检查next.config.js中的output: "export"配置是否启用');
    process.exit(1);
  }
  
  const files = fs.readdirSync('./out');
  if (!files.includes('index.html')) {
    console.error('警告: out目录中没有找到index.html文件');
  }
  
  console.log('out目录内容:');
  files.forEach(file => console.log(`  - ${file}`));
} catch (err) {
  console.error('检查构建结果失败:', err);
}

// 创建必要的配置文件
try {
  console.log('创建Cloudflare Pages所需的配置文件...');
  
  // 创建_redirects文件
  const redirectsContent = `/* /index.html 200
/categories/* /index.html 200
/tools/* /index.html 200`;
  fs.writeFileSync('./out/_redirects', redirectsContent);
  
  // 创建_routes.json文件
  const routesContent = `{
  "version": 1,
  "include": ["/*"],
  "exclude": []
}`;
  fs.writeFileSync('./out/_routes.json', routesContent);
  
  // 确保有404页面
  if (fs.existsSync('./out/index.html') && !fs.existsSync('./out/404.html')) {
    console.log('创建404页面...');
    fs.copyFileSync('./out/index.html', './out/404.html');
  }
} catch (err) {
  console.error('创建配置文件失败:', err);
}

console.log('=== 构建完成 ===');
console.log('现在可以将out目录中的内容部署到Cloudflare Pages'); 