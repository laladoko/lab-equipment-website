// Olympus产品数据 - 基于官方网站真实产品信息
export interface OlympusProduct {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  features: string[];
  price: string;
  link: string;
  specifications: Record<string, string>;
  officialLink: string; // 官方产品链接
}

export const olympusProducts: OlympusProduct[] = [
  {
    id: 1,
    name: 'DSX2000 数码显微镜',
    category: '数码显微镜',
    image: '/brands/olympus/dsx2000-digital-microscope-3d-surface-analysis.png',
    description: '精准目标，轻松实现DSX2000全电动数码显微镜通过智能工具、一体化成像和可定制的界面，为研究人员和质控实验室专业人员简化了任务、提高了工作效率，优化了工作流程。配备了PRECiV软件的DSX2000显微镜可助力您的团队快速获得精准的结果，捕捉超过4K分辨率的出色图像。它提供直观、无缝的体验，让各种技能水平的用户都能轻松、自信地操作。',
    features: ['3D表面分析', '大角度相机头', '高精度测量', '彩色3D显示', '工业检测专用', '4K分辨率成像'],
    price: '询价',
    link: 'https://www.instrument.com.cn/netshow/SH103060/C595779.htm',
    officialLink: 'https://www.olympus-ims.com/zh/microscope/dsx2000/',
    specifications: {
      '放大倍数': '20x-7000x',
      '分辨率': '4K超高清',
      '3D分析': '支持',
      '相机': '高分辨率数码相机',
      '照明': 'LED环形照明',
      '软件': 'PRECiV软件套件'
    }
  },
  {
    id: 2,
    name: 'OLS5100 3D激光扫描显微镜',
    category: '激光扫描显微镜',
    image: '/brands/olympus/ols5100-3d-laser-scanning-microscope.jpg',
    description: 'OLS5100是一款先进的3D激光扫描显微镜，提供高精度表面形貌分析和测量功能，适用于工业检测和材料分析',
    features: ['3D激光扫描', '表面形貌分析', '高精度测量', '非接触式检测', '工业应用', '激光扫描技术'],
    price: '询价',
    link: 'https://www.instrument.com.cn/netshow/SH103060/C278623.htm',
    officialLink: 'https://www.olympus-ims.com/zh/microscope/ols5100/',
    specifications: {
      '放大倍数': '54x-17280x',
      '激光波长': '405nm',
      '扫描精度': '0.01μm',
      '测量范围': '0.1nm-10mm',
      '3D重建': '实时',
      '软件': 'OLS软件套件'
    }
  },
  {
    id: 3,
    name: 'STM7 测量显微镜',
    category: '测量显微镜',
    image: '/brands/olympus/stm7-measuring-microscope-precision.jpg',
    description: 'STM7是一款专业测量显微镜系统，配备高精度载物台和测量软件，适用于精密测量应用',
    features: ['高精度测量', '电动载物台', '专业测量软件', '网格界面', '精密定位', '质量控制'],
    price: '询价',
    link: 'https://www.instrument.com.cn/netshow/SH103060/C250160.htm',
    officialLink: 'https://www.olympus-ims.com/zh/microscope/stm7/',
    specifications: {
      '放大倍数': '12.5x-1500x',
      '测量精度': '±1μm',
      '载物台': '电动载物台',
      '软件': 'STM测量软件',
      '照明': 'LED照明',
      '应用': '精密测量、质量控制'
    }
  },
  {
    id: 4,
    name: 'SZX7 体视显微镜',
    category: '体视显微镜',
    image: '/brands/olympus/szx7-stereo-microscope.png',
    description: 'SZX7是一款高性能体视显微镜，提供立体成像和大工作距离，适用于样品观察和检查',
    features: ['立体成像', '大工作距离', '舒适观察', '多种照明', '稳定底座', '样品检查'],
    price: '询价',
    link: 'https://www.instrument.com.cn/netshow/SH103060/C210692.htm',
    officialLink: 'https://www.olympus-lifescience.com/zh/microscopes/szx7/',
    specifications: {
      '放大倍数': '4x-336x',
      '工作距离': '115mm',
      '变倍比': '12.9:1',
      '照明': 'LED照明',
      '观察方式': '立体观察',
      '载物台': '玻璃载物台'
    }
  },
  {
    id: 6,
    name: 'GX53 倒置显微镜',
    category: '倒置显微镜',
    image: '/brands/olympus/gx53-inverted-microscope-cell-culture.jpg',
    description: 'GX53倒置显微镜适用于细胞培养观察和活细胞成像，提供长工作距离和高对比度成像',
    features: ['倒置设计', '长工作距离', '细胞培养观察', '高对比度成像', 'DIC观察', '活细胞成像'],
    price: '询价',
    link: 'https://www.instrument.com.cn/netshow/SH103060/C278656.htm',
    officialLink: 'https://www.olympus-lifescience.com/zh/microscopes/gx53/',
    specifications: {
      '放大倍数': '12.5x-1500x',
      '工作距离': '0.13-0.21mm',
      '照明': 'LED照明',
      '观察模式': '明场、相差、DIC',
      '载物台': '机械载物台',
      '对焦精度': '2.5μm'
    }
  },
  {
    id: 7,
    name: 'BX53M 正置金相显微镜',
    category: '金相显微镜',
    image: '/brands/olympus/bx53m-upright-metallurgical-microscope.png',
    description: 'BX53M是一款专业金相显微镜，专为金属材料分析设计，提供高对比度成像和多种观察模式',
    features: ['金相分析专用', '高对比度成像', '多种观察模式', '旋转物镜转换器', '集成照明', '金属材料分析'],
    price: '询价',
    link: 'https://www.instrument.com.cn/netshow/SH103060/C250162.htm',
    officialLink: 'https://www.olympus-lifescience.com/zh/microscopes/bx53m/',
    specifications: {
      '放大倍数': '12.5x-1500x',
      '分辨率': '0.25μm',
      '照明系统': 'LED照明',
      '观察模式': '明场、暗场、偏光',
      '载物台': '机械载物台',
      '物镜': '4x, 10x, 20x, 50x, 100x'
    }
  },
  {
    id: 8,
    name: 'SZX16 体视显微镜',
    category: '体视显微镜',
    image: '/brands/olympus/szx16-high-resolution-stereo-microscope.jpg',
    description: 'SZX16体视显微镜提供高分辨率立体成像，适用于样品制备和宏观观察',
    features: ['高分辨率成像', '立体观察', '大工作距离', '稳定底座', '多种照明', '样品制备'],
    price: '询价',
    link: 'https://www.instrument.com.cn/netshow/SH103060/C210691.htm',
    officialLink: 'https://www.olympus-lifescience.com/zh/microscopes/szx16/',
    specifications: {
      '放大倍数': '2.1x-690x',
      '工作距离': '115mm',
      '变倍比': '12.2:1',
      '照明': 'LED照明',
      '观察方式': '立体观察',
      '载物台': '玻璃载物台'
    }
  },
  {
    id: 9,
    name: 'BXFM 设备组装型系统工业显微镜',
    category: '工业显微镜',
    image: '/brands/olympus/bxfm-modular-industrial-microscope-system.png',
    description: 'BXFM是一款模块化工业显微镜系统，可集成到各种工业设备中，提供灵活的配置方案',
    features: ['模块化设计', '工业集成', '灵活配置', '紧凑结构', '高可靠性', '自动化集成'],
    price: '询价',
    link: 'https://www.instrument.com.cn/netshow/SH103060/C250163.htm',
    officialLink: 'https://www.olympus-lifescience.com/zh/microscopes/bxfm/',
    specifications: {
      '放大倍数': '12.5x-1500x',
      '模块化': '支持',
      '集成接口': '标准工业接口',
      '照明': 'LED照明',
      '观察模式': '明场、暗场',
      '应用': '工业检测、自动化'
    }
  },
  {
    id: 10,
    name: 'MX63/MX63L 半导体工业检测显微镜',
    category: '半导体检测显微镜',
    image: '/brands/olympus/mx63-semiconductor-inspection-microscope.jpg',
    description: 'MX63/MX63L是专为半导体工业检测设计的高精度显微镜，配备大型载物台和遥控操作功能',
    features: ['半导体检测专用', '大型载物台', '遥控操作', '高精度定位', '工业级设计', '晶圆分析'],
    price: '询价',
    link: 'https://www.instrument.com.cn/netshow/SH103060/C544485.htm',
    officialLink: 'https://www.olympus-ims.com/zh/microscope/mx63/',
    specifications: {
      '放大倍数': '12.5x-1500x',
      '载物台': '大型旋转载物台',
      '操作方式': '遥控操作',
      '照明': 'LED照明系统',
      '观察模式': '明场、暗场、DIC',
      '应用': '半导体检测、晶圆分析'
    }
  },
  {
    id: 11,
    name: 'SZX10 体视显微镜',
    category: '体视显微镜',
    image: '/brands/olympus/szx10-compact-stereo-microscope.jpg',
    description: 'SZX10是一款紧凑型体视显微镜，提供清晰的立体成像和舒适的观察体验',
    features: ['紧凑设计', '立体成像', '舒适观察', '倾斜目镜', '稳定底座', '教学适用'],
    price: '询价',
    link: 'https://www.instrument.com.cn/netshow/SH103060/C210691.htm',
    officialLink: 'https://www.olympus-lifescience.com/zh/microscopes/szx10/',
    specifications: {
      '放大倍数': '3.15x-378x',
      '工作距离': '115mm',
      '变倍比': '10:1',
      '照明': 'LED照明',
      '观察方式': '立体观察',
      '载物台': '玻璃载物台'
    }
  }
];

// 产品分类
export const productCategories = [
  '数码显微镜',
  '激光扫描显微镜',
  '测量显微镜',
  '体视显微镜',
  '倒置显微镜',
  '金相显微镜',
  '工业显微镜',
  '半导体检测显微镜'
];

// 应用领域
export const applicationAreas = [
  '工业检测',
  '材料分析',
  '质量控制',
  '表面分析',
  '精密测量',
  '电子元件检测',
  '半导体检测'
];

// 数据查询函数
export const getProductsByCategory = (category: string) => {
  return olympusProducts.filter(product => product.category === category);
};

export const getAllProducts = () => {
  return olympusProducts;
};

export const getProductById = (id: number) => {
  return olympusProducts.find(product => product.id === id);
}; 