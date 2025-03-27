import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ToolCard from '@/components/ToolCard';
import { getToolsByCategory } from '@/data/tools';
import { categories, getCategoryById } from '@/data/categories';
import { Tool, Category } from '@/types/tool';
import CategoryList from '@/components/CategoryList';

interface CategoryPageProps {
  tools: Tool[];
  category: Category;
  allCategories: Category[];
}

export default function CategoryPage({ tools, category, allCategories }: CategoryPageProps) {
  const router = useRouter();

  // 如果页面正在生成，显示加载状态
  if (router.isFallback) {
    return <div className="container mx-auto px-4 py-8 text-center">加载中...</div>;
  }

  return (
    <>
      <Head>
        <title>{category.name} - AI工具导航</title>
        <meta name="description" content={`浏览${category.name}类别下的AI工具`} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold">{category.name}</h1>
        
        {/* 分类导航 */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">分类</h2>
          <CategoryList categories={allCategories} activeCategoryId={category.id} />
        </div>

        {/* 工具列表 */}
        {tools.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="my-16 text-center">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              该分类下暂时没有工具。请查看其他分类或稍后再来。
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // 只返回类别ID，不包含icon对象
  const paths = categories.map(category => ({
    params: { id: category.id },
  }));

  return {
    paths,
    fallback: false, // 不存在的路径会返回404
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryId = params?.id as string;
  const category = getCategoryById(categoryId) || categories[0]; // 默认返回第一个类别
  const tools = getToolsByCategory(categoryId);

  // 创建可序列化的分类数据（移除icon函数组件）
  const serializableCategory = { ...category };
  if (serializableCategory.icon) {
    delete serializableCategory.icon;
  }

  // 创建可序列化的分类列表
  const serializableCategories = categories.map(cat => {
    const { icon, ...rest } = cat;
    return {
      ...rest,
      hasIcon: !!icon // 保留是否有图标的信息
    };
  });

  return {
    props: {
      tools,
      category: serializableCategory,
      allCategories: serializableCategories,
    }
  };
};
