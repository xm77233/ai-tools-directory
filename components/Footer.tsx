import React from 'react';
import Link from 'next/link';
import { FiGithub } from 'react-icons/fi';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-8 dark:border-gray-700 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">关于我们</h3>
            <p className="text-gray-600 dark:text-gray-300">
              AI工具导航是一个聚合最新最全AI工具的导航网站，帮助用户发现和使用高效的AI工具。
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                  关于
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                  联系我们
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                  使用条款
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">分类</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/writing" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                  文本生成
                </Link>
              </li>
              <li>
                <Link href="/categories/image" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                  图像生成
                </Link>
              </li>
              <li>
                <Link href="/categories/audio" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                  音频处理
                </Link>
              </li>
              <li>
                <Link href="/categories/video" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                  视频生成
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">关注我们</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/your-github"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              >
                <FiGithub size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-300">
            &copy; {new Date().getFullYear()} AI工具导航. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 