import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon, FiSearch } from 'react-icons/fi';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">AI工具导航</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <Link href="/tools" className="text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
                工具库
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
                分类
              </Link>
              <Link href="/articles" className="text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
                文章
              </Link>
              <Link href="/submit" className="text-gray-700 hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
                提交工具
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button
              aria-label="搜索"
              className="rounded-full p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <FiSearch size={20} />
            </button>
            <button
              aria-label="切换主题"
              onClick={toggleTheme}
              className="rounded-full p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 