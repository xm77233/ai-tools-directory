import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { FiSearch, FiTool, FiGrid, FiStar, FiEdit, FiImage, FiMusic, FiVideo, FiCode, FiZap } from 'react-icons/fi';

// 热门类别使用直接引入的图标组件
import { getPopularCategories } from '@/data/categories';

// 图标映射
const iconMap = {
  writing: FiEdit,
  image: FiImage,
  audio: FiMusic,
  video: FiVideo,
  dev: FiCode,
  productivity: FiZap,
  other: FiStar,
};

// 假数据：推荐工具
const featuredTools = [
  {
    id: 1,
    name: 'ChatGPT',
    description: '强大的对话AI模型，可以回答问题、写作、编程等各种任务',
    category: 'writing',
    image: '/images/tools/chatgpt.png',
    url: 'https://chat.openai.com',
  },
  {
    id: 2,
    name: 'DALL·E',
    description: '根据文本描述生成高质量图像的AI模型',
    category: 'image',
    image: '/images/tools/dalle.png',
    url: 'https://labs.openai.com',
  },
  {
    id: 3,
    name: 'Midjourney',
    description: '生成艺术风格图像的AI工具，可以创造出惊人的视觉效果',
    category: 'image',
    image: '/images/tools/midjourney.png',
    url: 'https://www.midjourney.com',
  },
  {
    id: 4,
    name: 'Notion AI',
    description: '为Notion集成的AI助手，帮助你写作、总结和组织内容',
    category: 'productivity',
    image: '/images/tools/notion-ai.png',
    url: 'https://www.notion.so',
  },
  {
    id: 5,
    name: 'GitHub Copilot',
    description: '帮助开发者在编码过程中提供智能代码建议的AI工具',
    category: 'dev',
    image: '/images/tools/github-copilot.png',
    url: 'https://github.com/features/copilot',
  },
  {
    id: 6,
    name: 'Synthesia',
    description: '从文本生成逼真的AI视频，支持多种语言和虚拟角色',
    category: 'video',
    image: '/images/tools/synthesia.png',
    url: 'https://www.synthesia.io',
  },
];

export default function Home() {
  // 获取热门类别
  const popularCategories = getPopularCategories();
  
  return (
    <>
      <Head>
        <title>AI工具导航 - 发现最佳AI工具和资源</title>
        <meta name="description" content="发现、探索和使用最新的AI工具，提高你的工作效率" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 英雄区 */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">发现最佳AI工具和资源</h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl">
            浏览我们精心策划的AI工具集合，在工作、创作和日常任务中提高效率
          </p>
          
          {/* 搜索框 */}
          <div className="mx-auto mb-8 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索AI工具..."
                className="w-full rounded-full border-none bg-white px-6 py-4 pr-12 text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-primary-600">
                <FiSearch size={24} />
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/tools" 
              className="rounded-full bg-white px-6 py-3 font-medium text-primary-600 shadow-md hover:bg-gray-100"
            >
              浏览全部工具
            </Link>
            <Link 
              href="/categories" 
              className="rounded-full bg-white/10 px-6 py-3 font-medium text-white shadow-md backdrop-blur-sm hover:bg-white/20"
            >
              查看分类
            </Link>
          </div>
        </div>
      </section>

      {/* 热门类别 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">热门类别</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {popularCategories.map((category) => {
              const Icon = iconMap[category.id as keyof typeof iconMap] || FiStar;
              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800"
                >
                  <div className="mb-4 rounded-full bg-primary-100 p-4 text-primary-600 dark:bg-gray-700 dark:text-primary-400">
                    <Icon size={24} />
                  </div>
                  <h3 className="mb-2 font-semibold">{category.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{category.count} 个工具</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 精选工具 */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">精选AI工具</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((tool) => (
              <div key={tool.id} className="card overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                  <div className="absolute left-0 top-0 rounded-br-lg bg-primary-600 px-3 py-1 text-xs text-white">
                    {tool.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 font-bold">{tool.name}</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">{tool.description}</p>
                  <div className="flex justify-end">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      访问网站
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/tools"
              className="btn btn-outline"
            >
              查看更多工具
            </Link>
          </div>
        </div>
      </section>

      {/* 特性介绍 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">为什么选择我们的AI工具导航</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-gray-800 dark:text-primary-400">
                <FiStar size={32} />
              </div>
              <h3 className="mb-3 text-xl font-bold">精心策划</h3>
              <p className="text-gray-600 dark:text-gray-300">
                我们的团队精心挑选每个工具，确保只推荐最有用、最高质量的AI资源。
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-gray-800 dark:text-primary-400">
                <FiGrid size={32} />
              </div>
              <h3 className="mb-3 text-xl font-bold">分类明确</h3>
              <p className="text-gray-600 dark:text-gray-300">
                通过清晰的分类系统，轻松找到满足特定需求的AI工具。
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-gray-800 dark:text-primary-400">
                <FiTool size={32} />
              </div>
              <h3 className="mb-3 text-xl font-bold">持续更新</h3>
              <p className="text-gray-600 dark:text-gray-300">
                我们持续跟踪AI领域的最新发展，定期添加新工具和更新现有内容。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 号召性用语 */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">准备好提升您的AI技能了吗？</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl">
            立即开始探索我们的AI工具集合，发现能够改变您工作和创造方式的解决方案。
          </p>
          <Link 
            href="/tools" 
            className="rounded-full bg-white px-8 py-4 font-bold text-primary-600 shadow-md hover:bg-gray-100"
          >
            立即开始
          </Link>
        </div>
      </section>
    </>
  );
}
