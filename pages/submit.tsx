import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { categories } from '@/data/categories';
import { FiSend, FiCheckCircle } from 'react-icons/fi';

// 纯文本加载组件（用于服务器端渲染）
const TextLoading = () => (
  <div className="flex items-center">
    <span className="mr-2">●</span>
    <span>提交中...</span>
  </div>
);

// 客户端专用加载组件
const ClientOnlyLoadingSpinner = dynamic(
  () => import('@/components/LoadingSpinner'),
  { 
    ssr: false,
    loading: () => <TextLoading />
  }
);

// 客户端专用成功图标组件
const ClientOnlySuccessIcon = dynamic(
  () => Promise.resolve(() => <FiCheckCircle className="text-green-500" size={64} />),
  { 
    ssr: false,
    loading: () => <div className="h-16 w-16 rounded-full bg-green-500/20"></div>
  }
);

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    category: '',
    pricing: 'free',
    tags: '',
    email: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // 标记组件已挂载（仅客户端）
    setIsMounted(true);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) newErrors.name = '请输入工具名称';
    if (!formData.description) newErrors.description = '请输入工具描述';
    if (!formData.url) {
      newErrors.url = '请输入工具URL';
    } else if (!/^https?:\/\/.+\..+/.test(formData.url)) {
      newErrors.url = '请输入有效的URL地址';
    }
    if (!formData.category) newErrors.category = '请选择工具类别';
    if (!formData.email) {
      newErrors.email = '请输入邮箱地址';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // 在实际应用中，这里应该调用API提交表单
    // const response = await fetch('/api/submit-tool', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
    
    // 模拟API调用延迟
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // 重置表单
      setFormData({
        name: '',
        description: '',
        url: '',
        category: '',
        pricing: 'free',
        tags: '',
        email: '',
      });
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <>
        <Head>
          <title>提交成功 - AI工具导航</title>
          <meta name="description" content="感谢您提交AI工具" />
        </Head>
        
        <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="mb-6 flex justify-center">
            <ClientOnlySuccessIcon />
          </div>
          <h1 className="mb-4 text-3xl font-bold">提交成功！</h1>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
            感谢您的提交，我们会尽快审核您提交的工具。审核通过后，您的工具将出现在我们的目录中。
          </p>
          <a
            href="/"
            className="inline-block rounded-md bg-primary-600 px-6 py-3 text-white hover:bg-primary-700"
          >
            返回首页
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>提交工具 - AI工具导航</title>
        <meta name="description" content="提交您使用过的AI工具，分享给更多的人" />
      </Head>
      
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold">提交AI工具</h1>
        
        <div className="mb-8 rounded-lg bg-primary-50 p-4 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
          <p>
            感谢您愿意分享AI工具。提交的工具将经过我们的审核，通过后会出现在相应的分类中。
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="mb-1 block font-medium">
              工具名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-md border ${
                errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white px-4 py-2 dark:bg-gray-800`}
              placeholder="如：ChatGPT"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="description" className="mb-1 block font-medium">
              工具描述 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full rounded-md border ${
                errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white px-4 py-2 dark:bg-gray-800`}
              placeholder="简要描述该工具的功能和特点..."
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>
          
          <div>
            <label htmlFor="url" className="mb-1 block font-medium">
              工具URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className={`w-full rounded-md border ${
                errors.url ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white px-4 py-2 dark:bg-gray-800`}
              placeholder="https://"
            />
            {errors.url && <p className="mt-1 text-sm text-red-500">{errors.url}</p>}
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="category" className="mb-1 block font-medium">
                工具类别 <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full rounded-md border ${
                  errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white px-4 py-2 dark:bg-gray-800`}
              >
                <option value="">选择类别</option>
                {categories
                  .filter(category => category.id !== 'all')
                  .map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
            </div>
            
            <div>
              <label htmlFor="pricing" className="mb-1 block font-medium">
                定价模式 <span className="text-red-500">*</span>
              </label>
              <select
                id="pricing"
                name="pricing"
                value={formData.pricing}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 dark:border-gray-600 dark:bg-gray-800"
              >
                <option value="free">免费</option>
                <option value="freemium">免费增值</option>
                <option value="paid">付费</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="tags" className="mb-1 block font-medium">
              标签（以逗号分隔）
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 dark:border-gray-600 dark:bg-gray-800"
              placeholder="如：写作, AI助手, 聊天机器人"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="mb-1 block font-medium">
              联系邮箱 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-md border ${
                errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } bg-white px-4 py-2 dark:bg-gray-800`}
              placeholder="您的邮箱地址"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              我们不会公开您的邮箱地址，仅用于审核通知。
            </p>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex w-full items-center justify-center rounded-md bg-primary-600 px-6 py-3 font-medium text-white hover:bg-primary-700 disabled:opacity-70 ${
                isSubmitting ? 'cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <ClientOnlyLoadingSpinner />
              ) : (
                <div className="flex items-center">
                  <FiSend className="mr-2" />
                  <span>提交工具</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
} 