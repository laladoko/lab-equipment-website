// Wiggens产品数据 - 基于官方网站真实产品信息
export interface WiggensProduct {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  features?: string[];           // 设为可选
  price: string;
  link?: string;                // 设为可选
  specifications?: Record<string, string>;  // 设为可选
  officialLink?: string;        // 设为可选
}

export const wiggensProducts: WiggensProduct[] = [
  {
    id: 1,
    name: 'WH420 多位加热磁力搅拌器',
    category: '加热磁力搅拌器',
    image: '/brands/wiggens/wh420-multi-position-heating-magnetic-stirrer.jpg',
    description: 'WIGGENS WH420多位加热磁力搅拌器，适用于多样品同时加热搅拌，提高实验效率。具有精确的温度控制和均匀的加热效果。',
    features: ['多位同时搅拌', '精确温度控制', '均匀加热', '数字显示', '过热保护', '实验效率高'],
    price: '询价',
    link: 'http://cn.wiggens.com/list-111-1.html',
    officialLink: 'http://cn.wiggens.com/list-111-1.html',
    specifications: {
      '加热温度': '≤300°C',
      '样品设置温度': '≤300°C',
      '控温精度': '±1°C',
      '搅拌速度': '60-1500rpm',
      '搅拌位数': '4位',
      '显示方式': '数字显示'
    }
  },
  {
    id: 2,
    name: 'WH620 多位加热磁力搅拌器',
    category: '加热磁力搅拌器',
    image: '/brands/wiggens/wh620-multi-position-heating-magnetic-stirrer.jpg',
    description: 'WIGGENS WH620多位加热磁力搅拌器，6位设计，适用于批量样品处理，提供稳定可靠的加热搅拌性能。',
    features: ['6位同时搅拌', '批量处理', '稳定性能', '温度监控', '安全保护', '操作简便'],
    price: '询价',
    link: 'http://cn.wiggens.com/list-111-1.html',
    officialLink: 'http://cn.wiggens.com/list-111-1.html',
    specifications: {
      '加热温度': '≤300°C',
      '样品设置温度': '≤300°C',
      '控温精度': '±1°C',
      '搅拌速度': '60-1500rpm',
      '搅拌位数': '6位',
      '显示方式': '数字显示'
    }
  },
  {
    id: 3,
    name: 'WH260-H 新型红外加热磁力搅拌器',
    category: '红外加热磁力搅拌器',
    image: '/brands/wiggens/wh260h-infrared-heating-magnetic-stirrer.jpg',
    description: 'WIGGENS WH260-H新型红外加热磁力搅拌器，采用红外加热技术，加热更均匀，响应更快速，适用于精密实验。',
    features: ['红外加热技术', '快速响应', '均匀加热', '数字显示', '温度精确控制', '节能高效'],
    price: '询价',
    link: 'http://cn.wiggens.com/list-111-1.html',
    officialLink: 'http://cn.wiggens.com/list-111-1.html',
    specifications: {
      '加热温度': '≤450°C',
      '样品温度(配Pt100)': '≤300°C',
      '控温稳定性': '±1°C',
      '搅拌速度': '60-1500rpm',
      '加热方式': '红外加热',
      '显示': 'LCD数字显示'
    }
  },
  {
    id: 4,
    name: 'WH260-R 新型红外加热磁力搅拌器',
    category: '红外加热磁力搅拌器',
    image: '/brands/wiggens/wh260r-infrared-heating-magnetic-stirrer.jpg',
    description: 'WIGGENS WH260-R新型红外加热磁力搅拌器，集成高效红外加热系统，提供精确的温度控制和稳定的搅拌性能。',
    features: ['红外加热系统', '精确温控', '稳定搅拌', '智能控制', '安全保护', '实验室专用'],
    price: '询价',
    link: 'http://cn.wiggens.com/list-111-1.html',
    officialLink: 'http://cn.wiggens.com/list-111-1.html',
    specifications: {
      '加热温度': '≤450°C',
      '样品温度(配Pt100)': '≤300°C',
      '控温稳定性': '±1°C',
      '搅拌速度': '60-1500rpm',
      '加热方式': '红外加热',
      '显示': 'LCD数字显示'
    }
  },
  {
    id: 5,
    name: 'WH390 Mega系列大功率红外加热磁力搅拌器',
    category: '红外加热磁力搅拌器',
    image: '/brands/wiggens/wh390-mega-high-power-infrared-heating-stirrer.jpg',
    description: 'WIGGENS WH390 Mega系列大功率红外加热磁力搅拌器，专为大容量样品设计，提供强劲的搅拌力和高效的加热性能。',
    features: ['大功率设计', '大容量适用', '高效加热', '强劲搅拌', 'Mega系列', '工业级性能'],
    price: '询价',
    link: 'http://cn.wiggens.com/list-111-1.html',
    officialLink: 'http://cn.wiggens.com/list-111-1.html',
    specifications: {
      '加热温度': '≤550°C',
      '样品加热温度(配Pt100)': '≤300°C',
      '控温稳定性': '±1°C',
      '搅拌速度': '60-1500rpm',
      '最大搅拌量': '20L',
      '加热功率': '2000W'
    }
  },
  {
    id: 6,
    name: 'WCI-120 CO2培养箱',
    category: 'CO2培养箱',
    image: '/brands/wiggens/wci-120-co2-incubator.png',
    description: 'WIGGENS WCI-120 CO2培养箱，120L容量，提供稳定的CO2浓度和温度控制，适用于细胞培养和微生物学研究。',
    features: ['120L大容量', 'CO2浓度控制', '温度稳定', '无菌环境', '细胞培养', '微生物研究'],
    price: '询价',
    link: 'http://cn.wiggens.com/list-260-1.html',
    officialLink: 'http://cn.wiggens.com/list-260-1.html',
    specifications: {
      '箱体体积': '120L',
      '温度范围': 'RT+5~60°C',
      'CO2范围': '0%~20%',
      '温度均匀性': '±0.2°C',
      '温度精度': '±0.1°C',
      '内室尺寸': '500×400×600mm'
    }
  },
  {
    id: 7,
    name: 'WCI-180 CO2培养箱',
    category: 'CO2培养箱',
    image: '/brands/wiggens/wci-180-co2-incubator.jpg',
    description: 'WIGGENS WCI-180 CO2培养箱，180L大容量设计，提供优异的温度均匀性和CO2浓度稳定性，满足高要求的细胞培养需求。',
    features: ['180L超大容量', '优异均匀性', 'CO2稳定控制', '高精度传感器', '专业细胞培养', '研究级应用'],
    price: '询价',
    link: 'http://cn.wiggens.com/list-260-1.html',
    officialLink: 'http://cn.wiggens.com/list-260-1.html',
    specifications: {
      '箱体体积': '180L',
      '温度范围': 'RT+5~60°C',
      'CO2范围': '0%~20%',
      '温度均匀性': '±0.2°C',
      '温度精度': '±0.1°C',
      '内室尺寸': '600×500×600mm'
    }
  },
  {
    id: 8,
    name: 'Celshak SRC CO2培养箱用振荡器',
    category: '振荡器',
    image: '/brands/wiggens/celshak-src-co2-incubator-shaker.jpg',
    description: 'WIGGENS Celshak SRC CO2培养箱用振荡器，专为CO2培养箱内使用设计，提供稳定的振荡环境，促进细胞生长。',
    features: ['CO2培养箱专用', '稳定振荡', '细胞培养优化', '无污染设计', '静音运行', '精确控制'],
    price: '询价',
    link: 'http://cn.wiggens.com/show-187-713-1.html',
    officialLink: 'http://cn.wiggens.com/show-187-713-1.html',
    specifications: {
      '转速': '30~300rpm',
      '振幅': '25/50mm',
      '载重': '5kg',
      '平台尺寸': '350×350mm',
      '控制精度': '±1rpm',
      '适用环境': 'CO2培养箱内'
    }
  },
  {
    id: 9,
    name: 'WHMIX drive 1 电磁感应式磁驱搅拌器',
    category: '磁驱搅拌器',
    image: '/brands/wiggens/whmix-drive1-electromagnetic-magnetic-stirrer.jpg',
    description: 'WIGGENS WHMIX drive 1电磁感应式磁驱搅拌器(浸水式)，采用先进的电磁感应技术，适用于水下或密封环境的搅拌应用。',
    features: ['电磁感应技术', '浸水式设计', '密封防护', '无机械接触', '精确控制', '维护简便'],
    price: '询价',
    link: 'http://cn.wiggens.com/show-145-361-1.html',
    officialLink: 'http://cn.wiggens.com/show-145-361-1.html',
    specifications: {
      '单位搅拌量': '1~1000ml',
      '搅拌位数': '1',
      '搅拌功率': '20W',
      '转速范围': '100~1500rpm',
      '防护等级': 'IP65',
      '驱动方式': '电磁感应'
    }
  },
  {
    id: 10,
    name: 'WB2000-C 顶置式搅拌器',
    category: '顶置式搅拌器',
    image: '/brands/wiggens/wb2000c-overhead-stirrer.jpg',
    description: 'WIGGENS WB2000-C顶置式搅拌器，提供强劲的搅拌力矩，适用于高粘度样品的搅拌，数字显示转速控制精确。',
    features: ['强劲扭矩', '高粘度适用', '数字显示', '精确控制', '稳定可靠', '实验室专用'],
    price: '询价',
    link: 'http://cn.wiggens.com/list-26-1.html',
    officialLink: 'http://cn.wiggens.com/list-26-1.html',
    specifications: {
      '转速范围': '20~2000rpm',
      '控制精度': '±1rpm',
      '最大扭矩': '5Ncm',
      '数字显示': 'LED显示',
      '搅拌容量': '0.1~5L',
      '功率': '40W'
    }
  },
  {
    id: 11,
    name: 'WB2000-M 紫顶置搅拌器',
    category: '顶置式搅拌器',
    image: '/brands/wiggens/wb2000m-purple-overhead-stirrer.jpg',
    description: 'WIGGENS WB2000-M紫顶置搅拌器，紫色外观设计，提供稳定的搅拌性能和精确的转速控制，适用于各种实验应用。',
    features: ['紫色设计', '稳定性能', '精确转速', '多功能应用', '人性化操作', '高品质制造'],
    price: '询价',
    link: 'http://cn.wiggens.com/list-26-1.html',
    officialLink: 'http://cn.wiggens.com/list-26-1.html',
    specifications: {
      '转速范围': '40~2000rpm',
      '控制精度': '±1rpm',
      '最大扭矩': '8Ncm',
      '数字显示': 'LED显示',
      '搅拌容量': '0.1~10L',
      '功率': '60W'
    }
  },
  {
    id: 12,
    name: 'ChemVak A410 防腐蚀隔膜真空泵',
    category: '真空泵',
    image: '/brands/wiggens/chemvak-a410-corrosion-resistant-vacuum-pump.jpg',
    description: 'ChemVak A410防腐蚀隔膜真空泵，采用防腐蚀材料制造，适用于腐蚀性气体的抽取，提供稳定的真空度。',
    features: ['防腐蚀设计', '隔膜技术', '腐蚀性气体适用', '稳定真空', '低维护', '安全可靠'],
    price: '询价',
    link: 'http://cn.wiggens.com/list-16-1.html',
    officialLink: 'http://cn.wiggens.com/list-16-1.html',
    specifications: {
      '真空度': '13mbar',
      '抽气速度': '25L/min',
      '额定功率': '95W',
      '电压': '220-240V',
      '频率': '50Hz',
      '防腐等级': '高防腐'
    }
  },
  {
    id: 13,
    name: 'ChemVak C300 防腐蚀隔膜真空泵',
    category: '真空泵',
    image: '/brands/wiggens/chemvak-c300-corrosion-resistant-vacuum-pump.jpg',
    description: 'ChemVak C300防腐蚀隔膜真空泵，紧凑型设计，提供优异的防腐蚀性能和稳定的真空度，适用于实验室应用。',
    features: ['紧凑设计', '优异防腐', '实验室专用', '稳定真空', '静音运行', '操作简便'],
    price: '询价',
    link: 'http://cn.wiggens.com/list-16-1.html',
    officialLink: 'http://cn.wiggens.com/list-16-1.html',
    specifications: {
      '真空度': '100mbar',
      '抽气速度': '22L/min',
      '电压': '220-240V/50Hz',
      '额定功率': '120W',
      '噪音': '<45dB',
      '重量': '8kg'
    }
  }
];

// 产品分类
export const wiggensProductCategories = [
  '加热磁力搅拌器',
  '红外加热磁力搅拌器',
  'CO2培养箱',
  '振荡器',
  '磁驱搅拌器',
  '顶置式搅拌器',
  '真空泵'
];

// 应用领域
export const wiggensApplicationAreas = [
  '细胞培养',
  '微生物学',
  '样品制备',
  '化学合成',
  '生物技术',
  '质量控制',
  '教学实验',
  '科研工作'
];

// 数据查询函数
export const getWiggensProductsByCategory = (category: string) => {
  return wiggensProducts.filter(product => product.category === category);
};

export const getAllWiggensProducts = () => {
  return wiggensProducts;
};

export const getWiggensProductById = (id: number) => {
  return wiggensProducts.find(product => product.id === id);
}; 