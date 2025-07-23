import ImageDebug from '../components/ImageDebug';

export default function DebugPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">图片加载调试页面</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ImageDebug 
          src="/brands/olympus/47326659.jpg" 
          alt="MX63/MX63L 半导体工业检测显微镜" 
        />
        
        <ImageDebug 
          src="/brands/olympus/55212497.png" 
          alt="DSX2000 数码显微镜" 
        />
        
        <ImageDebug 
          src="/brands/olympus/47640819.png" 
          alt="OLS5100 3D激光扫描显微镜" 
        />
        
        <ImageDebug 
          src="/brands/olympus/47576962.jpg" 
          alt="DSX1000 数码显微镜" 
        />
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-bold mb-2">调试说明</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>每个图片都有Next.js Image组件和普通img标签两种显示方式</li>
          <li>如果Next.js Image组件失败，普通img标签应该能正常显示</li>
          <li>请检查浏览器控制台是否有错误信息</li>
          <li>图片路径都是相对于public目录的绝对路径</li>
        </ul>
      </div>
    </div>
  );
} 