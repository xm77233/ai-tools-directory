import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  // 使用更安全的方式处理客户端水合
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
} 