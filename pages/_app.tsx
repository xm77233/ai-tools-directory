import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

// 导入Google Analytics脚本
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content="发现、探索和使用最新的AI工具，提高你的工作效率" />
        <title>AI工具导航</title>
      </Head>
      
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XHWYK8HRC9"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XHWYK8HRC9');
        `}
      </Script>
      
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp; 