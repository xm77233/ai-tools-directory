import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content="发现、探索和使用最新的AI工具，提高你的工作效率" />
        <title>AI工具导航</title>
        {/* 确保Google Analytics在每个页面都可用 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window.dataLayer === 'undefined') {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XHWYK8HRC9');
              }
            `,
          }}
        />
      </Head>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 