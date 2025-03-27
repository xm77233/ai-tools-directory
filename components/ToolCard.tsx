import React from 'react';
import Image from 'next/image';
import { Tool } from '../types/tool';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className="card overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
        {tool.image && (
          <div className="relative h-full w-full">
            <Image
              src={tool.image}
              alt={`${tool.name} 预览图`}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="absolute left-0 top-0 rounded-br-lg bg-primary-600 px-3 py-1 text-xs text-white">
          {tool.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold">{tool.name}</h3>
        <p className="mb-4 text-gray-600 dark:text-gray-300">{tool.description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {tool.tags && tool.tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {tool.pricing === 'free'
              ? '免费'
              : tool.pricing === 'freemium'
              ? '免费增值'
              : '付费'}
          </span>
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
  );
};

export default ToolCard; 