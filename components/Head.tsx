import React from 'react';
import NextHead from 'next/head';

interface HeadProps {
  title?: string;
  description?: string;
}

const Head: React.FC<HeadProps> = ({ 
  title = 'AI工具导航', 
  description = '发现、探索和使用最新的AI工具，提高你的工作效率'
}) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-XHWYK8HRC9"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XHWYK8HRC9');
          `
        }}
      />
    </NextHead>
  );
};

export default Head; 