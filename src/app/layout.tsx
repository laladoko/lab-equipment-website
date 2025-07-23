import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "杭州全谱实验室设备有限公司 - 专业实验室器材采购服务",
  description: "杭州全谱实验室设备有限公司是专业的实验室器材采购服务商，代理EVIDENT/OLYMPUS、BRUKER、WIGGENS、FRITSCH等国际知名品牌，为科研院所、高校、企业提供高品质的实验室设备解决方案。",
  keywords: "实验室设备,实验室器材,采购服务,杭州全谱,EVIDENT,OLYMPUS,BRUKER,WIGGENS,FRITSCH,显微镜,分析仪器",
  authors: [{ name: "杭州全谱实验室设备有限公司" }],
  openGraph: {
    title: "杭州全谱实验室设备有限公司 - 专业实验室器材采购服务",
    description: "专业代理国际知名品牌实验室设备，为科研院所、高校、企业提供高品质的实验室器材采购服务。",
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
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
