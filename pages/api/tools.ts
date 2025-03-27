import { NextApiRequest, NextApiResponse } from 'next';
import { tools, getToolsByCategory, searchTools } from '@/data/tools';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  if (method !== 'GET') {
    return res.status(405).json({ message: '仅支持GET请求' });
  }

  try {
    // 获取特定工具信息
    if (query.id) {
      const tool = tools.find(t => t.id === Number(query.id));
      if (!tool) {
        return res.status(404).json({ message: '未找到工具' });
      }
      return res.status(200).json(tool);
    }
    
    // 按类别筛选
    if (query.category) {
      const filteredTools = getToolsByCategory(query.category as string);
      return res.status(200).json(filteredTools);
    }
    
    // 搜索
    if (query.search) {
      const searchResults = searchTools(query.search as string);
      return res.status(200).json(searchResults);
    }
    
    // 默认返回所有工具
    return res.status(200).json(tools);
  } catch (error) {
    return res.status(500).json({ message: '服务器错误' });
  }
} 