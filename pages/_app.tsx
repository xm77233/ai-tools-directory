import React, { useEffect, useState } from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 在组件挂载后设置isClient为true
    // 这会触发重新渲染并使用客户端渲染的版本
    setIsClient(true);
  }, []);

  // 如果不是客户端渲染，返回一个简单版本
  // 这避免了水合不匹配问题
  if (!isClient) {
    // 这个简单版本在初始HTML中渲染
    // 不应包含可能导致水合问题的组件（如SVG）
    return (
      <div style={{ visibility: 'hidden' }}>
        <Component {...pageProps} />
      </div>
    );
  }

  // 客户端渲染的完整版本
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
} 