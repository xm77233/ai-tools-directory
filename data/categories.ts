import { Category } from '../types/tool';
import { FiEdit, FiImage, FiMusic, FiVideo, FiCode, FiZap, FiActivity } from 'react-icons/fi';

export const categories: Category[] = [
  { id: 'all', name: '全部' },
  { id: 'writing', name: '文本生成', icon: FiEdit, count: 45 },
  { id: 'image', name: '图像生成', icon: FiImage, count: 38 },
  { id: 'audio', name: '音频处理', icon: FiMusic, count: 27 },
  { id: 'video', name: '视频生成', icon: FiVideo, count: 21 },
  { id: 'dev', name: '开发工具', icon: FiCode, count: 32 },
  { id: 'productivity', name: '生产力', icon: FiZap, count: 29 },
  { id: 'other', name: '其他', icon: FiActivity, count: 15 },
];

// 获取热门类别（跳过"全部"和"其他"）
export const getPopularCategories = (): Category[] => {
  return categories.filter(category => category.id !== 'all' && category.id !== 'other');
};

// 按ID获取类别
export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
}; 