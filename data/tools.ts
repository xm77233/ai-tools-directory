import { Tool, PricingType } from '@/types/tool';

// 工具数据
export const tools: Tool[] = [
  {
    id: 1,
    name: 'ChatGPT',
    description: '强大的对话AI模型，可以回答问题、写作、编程等各种任务',
    category: 'writing',
    image: '/images/tools/chatgpt.png',
    url: 'https://chat.openai.com',
    pricing: 'freemium',
    tags: ['chatbot', 'writing', 'coding'],
    featured: true
  },
  {
    id: 2,
    name: 'DALL·E',
    description: '根据文本描述生成高质量图像的AI模型',
    category: 'image',
    image: '/images/tools/dalle.png',
    url: 'https://labs.openai.com',
    pricing: 'paid',
    tags: ['image', 'art', 'design'],
    featured: true
  },
  {
    id: 3,
    name: 'Midjourney',
    description: '生成艺术风格图像的AI工具，可以创造出惊人的视觉效果',
    category: 'image',
    image: '/images/tools/midjourney.png',
    url: 'https://www.midjourney.com',
    pricing: 'paid',
    tags: ['image', 'art', 'design'],
    featured: true
  },
  {
    id: 4,
    name: 'Notion AI',
    description: '为Notion集成的AI助手，帮助你写作、总结和组织内容',
    category: 'productivity',
    image: '/images/tools/notion-ai.png',
    url: 'https://www.notion.so',
    pricing: 'freemium',
    tags: ['writing', 'productivity', 'organization'],
    featured: true
  },
  {
    id: 5,
    name: 'GitHub Copilot',
    description: '帮助开发者在编码过程中提供智能代码建议的AI工具',
    category: 'dev',
    image: '/images/tools/github-copilot.png',
    url: 'https://github.com/features/copilot',
    pricing: 'paid',
    tags: ['coding', 'development', 'productivity'],
    featured: true
  },
  {
    id: 6,
    name: 'Synthesia',
    description: '从文本生成逼真的AI视频，支持多种语言和虚拟角色',
    category: 'video',
    image: '/images/tools/synthesia.png',
    url: 'https://www.synthesia.io',
    pricing: 'paid',
    tags: ['video', 'presentation', 'content'],
    featured: true
  },
  {
    id: 7,
    name: 'Copy.ai',
    description: '利用AI生成市场营销文案、广告语和社交媒体内容',
    category: 'writing',
    image: '/images/tools/copy-ai.png',
    url: 'https://www.copy.ai',
    pricing: 'freemium',
    tags: ['writing', 'marketing', 'content']
  },
  {
    id: 8,
    name: 'Jasper',
    description: '全能AI内容创作平台，支持博客、社交媒体和营销内容创作',
    category: 'writing',
    image: '/images/tools/jasper.png',
    url: 'https://www.jasper.ai',
    pricing: 'paid',
    tags: ['writing', 'content', 'marketing']
  },
  {
    id: 9,
    name: 'Lumen5',
    description: '将文本内容转换为精美视频的AI工具',
    category: 'video',
    image: '/images/tools/lumen5.png',
    url: 'https://lumen5.com',
    pricing: 'freemium',
    tags: ['video', 'content', 'marketing']
  },
  {
    id: 10,
    name: 'Krisp',
    description: '实时消除背景噪音的AI工具，让会议更专业',
    category: 'audio',
    image: '/images/tools/krisp.png',
    url: 'https://krisp.ai',
    pricing: 'freemium',
    tags: ['audio', 'meetings', 'productivity']
  },
  {
    id: 11,
    name: 'Otter.ai',
    description: '实时语音转文字和会议记录工具',
    category: 'audio',
    image: '/images/tools/otter.png',
    url: 'https://otter.ai',
    pricing: 'freemium',
    tags: ['audio', 'transcription', 'meetings']
  },
  {
    id: 12,
    name: 'Runway',
    description: '创意视频编辑和特效工具，使用AI简化视频制作',
    category: 'video',
    image: '/images/tools/runway.png',
    url: 'https://runwayml.com',
    pricing: 'freemium',
    tags: ['video', 'editing', 'creative']
  },
  {
    id: 13,
    name: 'Claude',
    description: 'Anthropic开发的对话式AI助手，注重安全和有益的回应',
    category: 'writing',
    image: '/images/tools/claude.png',
    url: 'https://claude.ai',
    pricing: 'freemium',
    tags: ['chatbot', 'writing', 'research']
  },
  {
    id: 14,
    name: 'Stable Diffusion',
    description: '开源的文本到图像生成模型，可本地运行',
    category: 'image',
    image: '/images/tools/stable-diffusion.png',
    url: 'https://stability.ai',
    pricing: 'free',
    tags: ['image', 'art', 'open-source']
  },
  {
    id: 15,
    name: 'Hugging Face',
    description: 'AI模型共享平台，提供数千个开源AI模型和数据集',
    category: 'dev',
    image: '/images/tools/hugging-face.png',
    url: 'https://huggingface.co',
    pricing: 'freemium',
    tags: ['development', 'models', 'community']
  }
];

// 获取精选工具
export const getFeaturedTools = (): Tool[] => {
  return tools.filter(tool => tool.featured);
};

// 按类别获取工具
export const getToolsByCategory = (category: string): Tool[] => {
  if (category === 'all') return tools;
  return tools.filter(tool => tool.category === category);
};

// 搜索工具
export const searchTools = (query: string): Tool[] => {
  const searchTerm = query.toLowerCase();
  return tools.filter(
    tool =>
      tool.name.toLowerCase().includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}; 