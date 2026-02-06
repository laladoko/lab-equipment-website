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
      '搅拌速度': '100~1500rpm',
      '搅拌位数': '4位',
      '显示模式': 'LED'
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
      '搅拌速度': '100~1500rpm',
      '搅拌位数': '6位',
      '显示模式': 'LED'
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
      '搅拌速度': '100-1500rpm',
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
      '搅拌速度': '100-1500rpm',
      '加热方式': '红外加热',
      '显示': 'LCD数字显示'
    }
  },
  {
    id: 5,
    name: 'WH380 加热磁力搅拌器',
    category: '红外加热磁力搅拌器',
    image: '/brands/wiggens/wh390-mega-high-power-infrared-heating-stirrer.jpg',
    description: 'WH380加热磁力搅拌器，满足从轻柔到剧烈的搅拌实验，也可用于样品的加热。',
    features: ['防腐蚀搪玻璃盘面', '高效率红外线传热', '盘面抗热冲击温度超过700℃', '坚固外壳，密封壳体，抗腐蚀', '升温速度快，同时能够稳定在设定温度值', '可外接Pt100温度传感器控温', '高温提示灯，提示注意安全，防止烫伤'],
    price: '询价',
    link: 'http://cn.wiggens.com/list-111-1.html',
    officialLink: 'http://cn.wiggens.com/list-111-1.html',
    specifications: {
      '搅拌速度': '100~1500rpm',
      '搅拌量H₂O': '30L',
      '加热功率': '1800W',
      '电压': '48VDC'
    }
  },
  {
    id: 6,
    name: 'WCI-120 CO2培养箱',
    category: 'CO2培养箱',
    image: '/brands/wiggens/wci-120-co2-incubator.png',
    description: 'WIGGENS WCI-120 CO2培养箱，120L容量，提供稳定的CO2浓度和温度控制，适用于细胞培养和微生物学研究。',
    features: ['6个侧面的直接加热系统', '空气夹套', '双光束的CO2传感器', '水盘加湿', '报警系统', '良好空气和湿度对流', '易于清洗', '温度上限设置', '带孔的搁板', '无冷凝', '微电脑PID控制', 'HEPA气源过滤'],
    price: '询价',
    link: 'http://cn.wiggens.com/list-260-1.html',
    officialLink: 'http://cn.wiggens.com/list-260-1.html',
    specifications: {
      '箱体体积': '120L',
      '温度范围': 'RT+5~60°C',
      'CO2范围': '0%~20%',
      '温场均匀性': '±0.3°C (37℃/室温20℃)',
      '温度精度': '±0.1°C',
      'CO2精度': '±0.1%（5%/37℃）',
      '内室尺寸': '480×470×520mm'
    }
  },
  {
    id: 7,
    name: 'WCI-180 CO2培养箱',
    category: 'CO2培养箱',
    image: '/brands/wiggens/wci-180-co2-incubator.jpg',
    description: 'WIGGENS WCI-180 CO2培养箱，180L大容量设计，提供优异的温度均匀性和CO2浓度稳定性，满足高要求的细胞培养需求。',
    features: ['6个侧面的直接加热系统', '空气夹套', '双光束的CO2传感器', '水盘加湿', '报警系统', '良好空气和湿度对流', '易于清洗', '温度上限设置', '带孔的搁板', '无冷凝', '微电脑PID控制', 'HEPA气源过滤'],
    price: '询价',
    link: 'http://cn.wiggens.com/list-260-1.html',
    officialLink: 'http://cn.wiggens.com/list-260-1.html',
    specifications: {
      '箱体体积': '180L',
      '温度范围': 'RT+5~60°C',
      'CO2范围': '0%~20%',
      '温场均匀性': '±0.3°C (37℃/室温20℃)',
      '温度精度': '±0.1°C',
      'CO2精度': '±0.1%（5%/37℃）',
      '内室尺寸': '473×528×710mm'
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
      '控制精度': '±1rpm',
      '适用环境': 'CO2培养箱内',
      '控制方式': '微电脑控制，LED数显，远程控制器',
      '驱动方式': '电磁感应磁力驱动',
      '振荡模式': '圆周振荡（往复振荡可选）'
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
      '电压': '48VDC'
    }
  },
  {
    id: 10,
    name: 'WB2000-C 顶置式搅拌器',
    category: '顶置式搅拌器',
    image: '/brands/wiggens/wb2000c-overhead-stirrer.jpg',
    description: '满足高性能设计要求，运行安全、可靠；适合实验室常规搅拌应用，操作简单直观，提高实验室的工作效率；采用免维护无碳刷直流马达，适合实验室长时间高负荷工作；外壳采用防腐蚀表面处理，适合在实验室等环境长期使用。',
    features: ['免维护无碳刷直流马达', '恒速运转', '密封低静音', '自动过载保护'],
    price: '询价',
    link: 'http://cn.wiggens.com/list-26-1.html',
    officialLink: 'http://cn.wiggens.com/list-26-1.html',
    specifications: {
      '搅拌粘度(cps)': '≤20000',
      '扭力(Ncm)': '≤70',
      '搅拌量(L/H2O)': '≤50',
      '夹持直径(mm)': '≤10',
      '正反转功能': '有'
    }
  },
  {
    id: 11,
    name: 'WB2000-M 紧凑型顶置搅拌器',
    category: '顶置式搅拌器',
    image: '/brands/wiggens/wb2000m-purple-overhead-stirrer.jpg',
    description: '满足高性能设计要求，运行安全、可靠；适合实验室常规搅拌应用，操作简单直观，提高实验室的工作效率；采用免维护无碳刷直流马达，适合实验室长时间高负荷工作；外壳采用防腐蚀表面处理，适合在实验室等环境长期使用。',
    features: ['免维护无碳刷直流马达', '恒速运转', '密封低静音', '自动过载保护'],
    price: '询价',
    link: 'http://cn.wiggens.com/list-26-1.html',
    officialLink: 'http://cn.wiggens.com/list-26-1.html',
    specifications: {
      '搅拌粘度(cps)': '≤20000',
      '扭力(Ncm)': '≤70',
      '搅拌量(L/H2O)': '≤50',
      '夹持直径(mm)': '≤10',
      '正反转功能': '无'
    }
  },
  {
    id: 12,
    name: 'ChemVak A410 防腐蚀隔膜真空泵',
    category: '真空泵',
    image: '/brands/wiggens/chemvak-a410-corrosion-resistant-vacuum-pump.jpg',
    description: 'C系列隔膜泵提供紧凑、高性能和易操作的真空解决方案，适用单向过滤。隔膜确保无油隔膜泵长期使用。节省空间的技术，确保操作便利。PTFE涂层膜片和阀门提供化学抗腐蚀性。选配的手动真空调节器可调节真空泵的流量和极限真空度。',
    features: ['防腐蚀设计', '隔膜技术', '腐蚀性气体适用', '稳定真空', '低维护', '安全可靠'],
    price: '询价',
    link: 'http://cn.wiggens.com/list-16-1.html',
    officialLink: 'http://cn.wiggens.com/list-16-1.html',
    specifications: {
      '真空度(mbar)': '≤13',
      '抽气速度(L/min)': '≤25',
      '马达转速(rpm)': '1450',
      '类型': '双级泵',
      '接口规格(mm)': '10',
      '尺寸WxDxH(mm)': '230×155×173',
      '重量(kg)': '10',
      '噪音(dB)': '50',
      '电源规格': '220-240V/50Hz',
      '额定功率(W)': '95'
    }
  },
  {
    id: 13,
    name: 'ChemVak C300 防腐蚀隔膜真空泵',
    category: '真空泵',
    image: '/brands/wiggens/chemvak-c300-corrosion-resistant-vacuum-pump.jpg',
    description: 'C系列隔膜泵提供紧凑、高性能和易操作的真空解决方案，适用单向过滤。隔膜确保无油隔膜泵长期使用。节省空间的技术，确保操作便利。PTFE涂层膜片和阀门提供化学抗腐蚀性。选配的手动真空调节器可调节真空泵的流量和极限真空度。',
    features: ['紧凑设计', '优异防腐', '实验室专用', '稳定真空', '静音运行', '操作简便'],
    price: '询价',
    link: 'http://cn.wiggens.com/list-16-1.html',
    officialLink: 'http://cn.wiggens.com/list-16-1.html',
    specifications: {
      '真空度(mbar)': '≤100',
      '抽气速度(L/min)': '≤22',
      '马达转速(rpm)': '1450',
      '类型': '单级泵',
      '接口规格(mm)': '10',
      '尺寸WxDxH(mm)': '233×110×210',
      '重量(kg)': '6',
      '噪音(dB)': '50',
      '电源规格': '220-240V/50Hz',
      '额定功率(W)': '60'
    }
  }
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