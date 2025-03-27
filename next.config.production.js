/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,  // 在URL末尾添加斜杠，有助于静态部署
  
  // 使用静态导出，兼容Cloudflare Pages
  // 注意：使用此设置时，不应该在getStaticProps中使用revalidate属性
  output: 'export',
  
  // 禁用图像优化功能，因为它需要服务器端支持
  images: {
    unoptimized: true,
  },

  // 为客户端代码添加环境变量
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://ai-tools-directory.cn',
    NEXT_PUBLIC_SITE_NAME: 'AI工具导航',
    NEXT_PUBLIC_IS_PRODUCTION: 'true',
  },

  // 优化导出设置
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/404': { page: '/404' },
    };
  },
};

module.exports = nextConfig; 