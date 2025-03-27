/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // 确保生成的URL以斜杠结尾，有助于处理路由
  images: {
    unoptimized: true, // 在Cloudflare Pages上需要禁用图像优化
  },
  output: 'export', // 静态导出以兼容Cloudflare Pages
}

module.exports = nextConfig 