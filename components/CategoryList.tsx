import React from 'react';
import Link from 'next/link';
import { Category } from '@/types/tool';
import { FiEdit, FiImage, FiMusic, FiVideo, FiCode, FiZap, FiActivity, FiGrid } from 'react-icons/fi';

// 图标映射
const iconMap = {
  all: FiGrid,
  writing: FiEdit,
  image: FiImage,
  audio: FiMusic,
  video: FiVideo,
  dev: FiCode,
  productivity: FiZap,
  other: FiActivity,
};

interface CategoryListProps {
  categories: Category[];
  activeCategoryId?: string;
  onCategoryChange?: (categoryId: string) => void;
}

export default function CategoryList({ 
  categories, 
  activeCategoryId = 'all',
  onCategoryChange 
}: CategoryListProps) {
  // 判断是否使用按钮或链接
  const useButtons = !!onCategoryChange;
  
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        // 根据ID获取图标
        const IconComponent = iconMap[category.id as keyof typeof iconMap] || FiActivity;
        const className = `flex items-center rounded-full px-4 py-2 transition-colors ${
          activeCategoryId === category.id
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
        }`;
        
        return useButtons ? (
          <button
            key={category.id}
            className={className}
            onClick={() => onCategoryChange(category.id)}
          >
            <IconComponent className="mr-2 h-4 w-4" />
            <span>{category.name}</span>
            {category.count && <span className="ml-2 text-xs">({category.count})</span>}
          </button>
        ) : (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className={className}
          >
            <IconComponent className="mr-2 h-4 w-4" />
            <span>{category.name}</span>
            {category.count && <span className="ml-2 text-xs">({category.count})</span>}
          </Link>
        );
      })}
    </div>
  );
}
