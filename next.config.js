/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // 确保生成的URL以斜杠结尾，有助于处理路由
  images: {
    unoptimized: true, // 在Cloudflare Pages上需要禁用图像优化
  },
  // 注意：output: 'export' 不能与 ISR (revalidate) 同时使用
  // 如果需要静态导出，必须移除所有 getStaticProps 中的 revalidate 配置
  output: 'export', // 静态导出以兼容Cloudflare Pages
  
  // 解决SVG水合问题
  webpack(config) {
    // 为SVG文件添加特殊处理
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    
    return config;
  },
}

module.exports = nextConfig 