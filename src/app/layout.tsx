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
        <meta name="baidu-site-verification" content="codeva-mq5YH0jw6w" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
