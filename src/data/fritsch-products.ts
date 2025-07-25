// FRITSCH产品数据 - 基于官方网站真实产品信息
export interface FritschProduct {
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

export const fritschProducts: FritschProduct[] = [
  {
    id: 2,
    name: 'PULVERISETTE 6 单罐式行星研磨机（经典型）',
    category: '行星式球磨机',
    image: '/brands/fritsch/pulverisette6-single-jar-planetary-mill.png',
    description: 'FRITSCH PULVERISETTE 6 单罐式行星研磨机，高效率且需极小空间，快速研磨，最终精度<1μm，特别适用于坚韧、潮湿样品的处理。',
    features: ['高效率且需极小空间', '快速研磨，最终精度<1μm', '特别适用坚韧、潮湿样品', '研磨碗安全锁紧，带自锁功能', '易于操作、人体工学设计，且易于清洗', '研磨碗和研磨球采用8种不同的材质可供选择', '可实现无污染的研磨'],
    price: '询价',
    link: 'https://www.fritsch.de/cn/sample-preparation/milling/planetary-mills/pulverisette-6/',
    officialLink: 'https://www.fritsch.de/cn/sample-preparation/milling/planetary-mills/pulverisette-6/',
    specifications: {
      '工作站数量': '1个',
      '特点': '高效率且需极小空间',
      '适用样品': '坚硬、中等硬度、柔软、脆性、坚韧、潮湿',
      '研磨碗容量': '80-500ml',
      '最大进样尺寸': '10mm',
      '最小进样量': '10ml',
      '最大进样量': '225ml',
      '研磨球直径': '0.1-30mm',
      '主盘转速': '100-650rpm',
      '传动比': '1:-1.82',
      '最终细度': '< 1μm',
      '惰性气体中研磨': '可以',
      '气体压力与温度测量': '可以',
      '噪音等级': '< 75dB'
    }
  },
  {
    id: 3,
    name: 'PULVERISETTE 14 可变高速旋转粉碎机（加强版）',
    category: '旋转粉碎机',
    image: '/brands/fritsch/pulverisette14-variable-speed-rotor-mill.jpg',
    description: 'FRITSCH PULVERISETTE 14 可变高速旋转粉碎机加强型，采用陶瓷轴承高速马达，集撞击力、剪切力于一身，有着更佳的性能及冷却效果，操作明显安静。快速预处理和精细研磨于一身。',
    features: ['操作柔和安静', '冷却效果极佳', '采用陶瓷轴承的高速马达', '高达22,000rpm转速，粉碎更强劲', '极高的转子线速度(111m/s)', '最大进样尺寸<15mm', '样品处理量高达15L/h及以上', '集撞击力、剪切力于一身', '研磨腔室自锁功能，工作特别安全', '最终细度d50 <40μm', '筛网0.08-6mm，可双向使用', '极佳的冷却效果'],
    price: '询价',
    link: 'https://www.fritsch.de/cn/sample-preparation/milling/rotor-mills/pulverisette-14/',
    officialLink: 'https://www.fritsch.de/cn/sample-preparation/milling/rotor-mills/pulverisette-14/',
    specifications: {
      '转子转速': '最高22,000rpm',
      '转子线速度': '111m/s (399.6km/h)',
      '最大进样尺寸': '<15mm',
      '样品处理量': '最高15L/h及以上',
      '最终细度': 'd50 <40μm',
      '筛网规格': '0.08-6mm，可双向使用',
      '驱动功率': '2200W',
      '马达类型': '陶瓷轴承高速马达',
      '冷却系统': '强制风冷，极佳冷却效果',
      '安全功能': '研磨腔室自锁功能',
      '操作标准': '符合DIN EN标准',
      '适用材料': '软性、中硬度、脆性、纤维材料'
    }
  },
  {
    id: 4,
    name: 'PULVERISETTE 11 刀式研磨仪',
    category: '刀式研磨机',
    image: '/brands/fritsch/pulverisette11-cutting-mill.jpg',
    description: 'FRITSCH PULVERISETTE 11 刀式研磨仪，极快的粉碎、匀质和混合；强劲的电机，功率高达1250W；多达4个刀刃的转刀刀片，每分钟对样品进行多达56,000次有效切割。',
    features: ['极快的粉碎、匀质和混合', '强劲的电机，功率高达1250W', '多达4个刀刃的转刀刀片', '每分钟56,000次有效切割', '研磨容器可用容量高达1400毫升', '可变容量的可调节压力顶盖系统', '可预存20个SOP', 'USB接口管理', '连续、反向和间隔模式'],
    price: '询价',
    link: 'https://www.fritsch.de/cn/sample-preparation/milling/cutting-mills/pulverisette-11/',
    officialLink: 'https://www.fritsch.de/cn/sample-preparation/milling/cutting-mills/pulverisette-11/',
    specifications: {
      '研磨容器容量': '50-1400ml',
      '转刀转速': '300-10000rpm',
      '刀片数量': '4个刀刃',
      '切割频率': '最高56000次/分钟',
      '最大样品量': '700ml',
      '驱动功率': '1250W',
      '预设程序': '20个SOP',
      '控制方式': '触摸屏+USB'
    }
  },
  {
    id: 5,
    name: '高能双罐行星式球磨机（加强型）',
    category: '双罐行星式球磨机',
    image: '/brands/fritsch/pulverisette5-enhanced-planetary-ball-mill.jpg',
    description: '带有2个工作站的FRITSCH新款行星式球磨机，PULVERISETTE 5加强型作为PULVERISETTE 7加强型的姊妹条市开发出来，它的处理更大，是快速湿法/干法研磨、机械合金化、大量样品的混合和均质化的理想研磨机，其研磨结果可达纳米级绝对安全的研磨碗自动锁紧功能。',
    features: ['操作安全性最大化', '超级强劲的马达带来优越的驱动力', '直观的用户导航', '安全引导研磨碗嵌入', '电动研磨碗锁紧', '过压后亦可安全打开', '通过RFID芯片检测研磨碗', '可调节的触摸屏', '简单的数据记录', '嵌入研磨简单易行'],
    price: '询价',
    link: 'https://www.fritsch.de/cn/sample-preparation/milling/planetary-mills/pulverisette-5/',
    officialLink: 'https://www.fritsch.de/cn/sample-preparation/milling/planetary-mills/pulverisette-5/',
    specifications: {
      '最适用样品类型': '硬质、中等硬度、柔性、桑软、坚韧、湿性',
      '研磨碗数量': '2',
      '研磨碗容积': '125, 150, 250, 420, 500ml',
      '研磨球直径': '0.1-40mm',
      '最大进样尺寸（与样品材质有关）': '10mm',
      '最小样品处理量': '15ml',
      '最大样品处理量': '450ml',
      '最终精度（与样品材质有关）': '<0.1μm',
      '充入惰性气体研磨': '可以',
      '气体压力与温度测量': '可以',
      '主盘转速': '100-800rpm',
      '行星盘/研磨碗的传动比': 'i_relative = 1:-2',
      '主盘有效直径': '190mm',
      '离心加速度（g=9.81米/平方秒）': '64g'
    }
  },
  {
    id: 6,
    name: 'PULVERISETTE 7 微型行星式研磨机（经典型）',
    category: '微型球磨机',
    image: '/brands/fritsch/pulverisette7-micro-planetary-mill.png',
    description: 'FRITSCH PULVERISETTE 7 微型行星式研磨机（经典型），适用于少量样品，提供卓越的研磨性能和高度的操作便利性。',
    features: ['适用于少量样品', '卓越研磨性能', '高度操作便利性', '多种研磨碗材质选择', '精确的温度控制', '程序化运行'],
    price: '询价',
    link: 'https://www.fritsch.de/cn/sample-preparation/milling/planetary-mills/pulverisette-7/',
    officialLink: 'https://www.fritsch.de/cn/sample-preparation/milling/planetary-mills/pulverisette-7/',
    specifications: {
      '适用样品': '坚硬、中等硬度、脆性',
      '工作站数量': '2个',
      '研磨碗规格': '12, 45ml',
      '研磨球尺寸': '0.1-20mm',
      '最大进样尺寸': '5mm',
      '最小进样量': '1ml',
      '最大进样量': '60ml',
      '最终细度': '< 0.1μm',
      '惰性气体中研磨': '可以',
      '气体压力与温度测量': '可以',
      '主盘转速': '150-1100rpm',
      '传动比': '1:-2',
      '主盘有效尺寸': '140mm',
      '离心加速度': '95g'
    }
  },
  {
    id: 7,
    name: '微型行星式高能球磨机（加强型）',
    category: '微型行星式球磨机',
    image: '/brands/fritsch/pulverisette7-micro-planetary-ball-mill.jpg',
    description: '几十年以来，FRITSCH实验室样品制备仪器以其舒适性、可靠性和精确度赢得了客户的认可。我们在研磨、筛分或分样领域为您提供优质产品和服务。',
    features: ['超高转速1100rpm以及95倍重力加速度得益于嵌入式研磨器', '可在更短的时间内获得更好的研磨效果', '超短研磨时间达到纳米级研磨细度', '符合人体工学的触摸屏', '合理的菜单结构以及10种语言选择保证了简单直观的用户导航', 'IT结构的完美安全，配备了USB连接方式', '除了简单直观的日志记录'],
    price: '询价',
    link: 'https://www.fritsch.de/cn/sample-preparation/milling/planetary-mills/pulverisette-7/',
    officialLink: 'https://www.fritsch.de/cn/sample-preparation/milling/planetary-mills/pulverisette-7/',
    specifications: {
      '适用样品': '坚硬、中等硬度、脆性',
      '工作站数量': '2',
      '研磨碗规格': '20, 45, 80ml',
      '研磨球尺寸': '0.1-20mm',
      '最大进样尺寸（取决于样品）': '5mm',
      '最小进样量': '1ml',
      '最大进样量': '60ml',
      '最终细度（取决于样品）': '<0.1μm',
      '惰性气体中研磨': '可以',
      '气体压力与温度测量': '可以',
      '主盘转速': '150-1100rpm',
      '行星盘/研磨碗的传动比': 'i_relative = 1:-2',
      '主盘有效尺寸': '140mm',
      '离心加速度（g=9.81米/平方秒）': '95g'
    }
  },
  {
    id: 8,
    name: 'PULVERISETTE 5 行星式研磨机（经典型）',
    category: '行星式球磨机',
    image: '/brands/fritsch/pulverisette5-classic-planetary-mill.png',
    description: 'FRITSCH PULVERISETTE 5 行星式研磨机（经典型），提供四罐和双罐两种配置，快速与精细研磨的完美结合，适用于各种硬度的样品材料，是实验室常规研磨的理想选择。',
    features: ['快速与精细研磨', '四罐/双罐配置可选', '适用多种硬度样品', '惰性气体中研磨', '气体压力与温度监测', '最终细度可达<1μm', '宽泛的样品适用性', '稳定的传动系统'],
    price: '询价',
    link: 'https://www.fritsch.de/cn/sample-preparation/milling/planetary-mills/pulverisette-5/',
    officialLink: 'https://www.fritsch.de/cn/sample-preparation/milling/planetary-mills/pulverisette-5/',
    specifications: {
      '产品型号': '行星式研磨机PULVERISETTE 5经典型',
      '配置选项': '四罐/双罐',
      '特点': '快速与精细',
      '适用样品': '坚硬、中等硬度、柔软、脆性、坚韧、潮湿',
      '工作站数量': '四罐:4个 / 双罐:2个',
      '研磨碗规格': '80, 250, 500ml',
      '最大进样尺寸': '10mm',
      '最小进样量': '10ml',
      '最大进样量': '四罐:900ml / 双罐:450ml',
      '最终细度': '<1μm',
      '惰性气体中研磨': '可以',
      '气体压力与温度测量': '可以',
      '主盘转速': '50-400rpm',
      '相对传动比': '1:-2.19'
    }
  }];

// 产品分类
export const fritschProductCategories = [
  '行星式球磨机',
  '微型球磨机',
  '旋转粉碎机',
  '刀式研磨机'
];

// 应用领域
export const fritschApplicationAreas = [
  '材料科学研究',
  '地质样品制备',
  '纳米材料制备',
  '颗粒分析',
  '质量控制',
  '粉体工程',
  '陶瓷工业',
  '冶金工业',
  '化工制药'
];

// 数据查询函数
export const getFritschProductsByCategory = (category: string) => {
  return fritschProducts.filter(product => product.category === category);
};

export const getAllFritschProducts = () => {
  return fritschProducts;
};

export const getFritschProductById = (id: number) => {
  return fritschProducts.find(product => product.id === id);
}; 