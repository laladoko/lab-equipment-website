import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "杭州全谱实验室设备有限公司",
  description: "杭州全谱实验室设备有限公司是一家致力于为客户提供先进的仪器设备和专业解决方案的公司。经过十几年的努力深耕，专业服务新材料、5G、半导体、电子、新能源领域和生物发酵、生物制药等行业的科研和企事业单位。",
  keywords: "实验室设备,实验室器材,采购服务,杭州全谱,EVIDENT,OLYMPUS,BRUKER,WIGGENS,FRITSCH,显微镜,分析仪器",
  authors: [{ name: "杭州全谱实验室设备有限公司" }],
  openGraph: {
    title: "杭州全谱实验室设备有限公司",
    description: "杭州全谱实验室设备有限公司是一家致力于为客户提供先进的仪器设备和专业解决方案的公司。专业服务新材料、5G、半导体、电子、新能源领域和生物发酵、生物制药等行业的科研和企事业单位。",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            /* 紧急修复：强制显示内容 */
            body { display: block !important; opacity: 1 !important; visibility: visible !important; }
            main { display: block !important; opacity: 1 !important; visibility: visible !important; }
            * { opacity: 1 !important; visibility: visible !important; }
            .min-h-screen { min-height: 100vh; }
            .relative { position: relative; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-center { justify-content: center; }
            .text-center { text-align: center; }
            .text-4xl { font-size: 2.25rem; }
            .font-bold { font-weight: bold; }
            .text-gray-900 { color: #111827; }
            .text-blue-600 { color: #2563eb; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mb-8 { margin-bottom: 2rem; }
            .mb-12 { margin-bottom: 3rem; }
            .px-8 { padding-left: 2rem; padding-right: 2rem; }
            .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
            .bg-blue-600 { background-color: #2563eb; }
            .text-white { color: white; }
            .rounded-lg { border-radius: 0.5rem; }
          `
        }} />
      </head>
      <body className={inter.className}>
        <noscript>
          <div style={{
            padding: '20px',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif'
          }}>
            <h1>杭州全谱实验室设备有限公司</h1>
            <p>请启用JavaScript以获得完整体验，或使用支持现代Web标准的浏览器。</p>
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
