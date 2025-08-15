export interface BrukerProduct {
  id: number;
  name: string;
  category: string;
  image?: string;
  description: string;
  features?: string[];           // 设为可选
  price: string;
  link?: string;                // 设为可选
  specifications?: Record<string, string>;  // 设为可选
  officialLink?: string;        // 设为可选
}

export const brukerProductCategories = [
  '手持式拉曼光谱仪',
  '傅立叶拉曼光谱仪',
  'FT-拉曼模块',
  '拉曼显微镜',
  '红外光谱仪',
  '红外显微镜',
  '材料测试',
  '轮廓仪',
  '三维光学轮廓仪',
  '原子力显微镜'
];

// 应用领域








export const brukerApplicationAreas = [
  '材料科学',
  '药物研发',
  '食品安全',
  '环境监测',
  '法医分析',
  '质量控制',
  '学术研究',
  '表面分析',
  '纳米科学',
  '机械测试'
];

// 数据查询函数








export const brukerProducts: BrukerProduct[] = [
  {
    id: 1,
    name: 'BRAVO 手持式拉曼光谱仪',
    category: '手持式拉曼光谱仪',
    image: '/brands/bruker/bravo-handheld-raman-spectrometer.png',
    description: 'BRAVO手持式拉曼光谱仪是您手中的移动实验室，专用于工业原材料控制和未知物质的识别。这款便携式设备提供快速、准确的材料验证，适用于现场检测和质量控制应用。',
    features: ['便携式设计', '快速识别', '工业原材料控制', '未知物质识别', '现场检测', '质量控制'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/raman-spectroscopy/raman-spectrometers/bravo-handheld-raman-spectrometer.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/raman-spectroscopy/raman-spectrometers/bravo-handheld-raman-spectrometer.html',
    specifications: {
      '光谱范围': '176-3200 cm⁻¹',
      '激光波长': '1064 nm',
      '分辨率': '< 8 cm⁻¹',
      '检测器': 'TE冷却InGaAs',
      '重量': '< 1.5 kg',
      '电池续航': '8小时'
    }
  },
  {
    id: 2,
    name: 'SENTERRA II 拉曼显微镜',
    category: '拉曼显微镜',
    image: '/brands/bruker/senterra-ii-raman-microscope.png',
    description: 'SENTERRA II是易操作、免维护的共聚焦拉曼显微镜。使用高度自动化的SENTERRA II，可以便捷地在失效分析、质量控制和科学研究中进行拉曼光谱分析和成像。',
    features: ['全自动化硬件', 'SureCalTM实时校准技术', '快速3D拉曼成像', '一键切换4个内置激光器', '自定义工作流程', '强大的光谱识别功能'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/raman-spectroscopy/raman-microscopes/senterra-ii-raman-microscope.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/raman-spectroscopy/raman-microscopes/senterra-ii-raman-microscope.html',
    specifications: {
      '激光器': '4个内置激光器',
      '空间分辨率': '衍射极限级',
      '校准技术': 'SureCalTM实时校准',
      '成像功能': '快速3D拉曼成像',
      '安全等级': 'Class 1激光安全',
      '合规性': '100% GMP和21 CFR p11合规'
    }
  },
  {
    id: 3,
    name: 'MultiRAM 傅立叶拉曼光谱仪',
    category: '傅立叶拉曼光谱仪',
    image: '/brands/bruker/multiram-ft-raman-spectrometer.png',
    description: 'MultiRAM是专用的研究级傅立叶拉曼平台，用于在虚拟无荧光的情况下执行常规分析任务。这款台式设备提供高精度、高分辨率的拉曼光谱分析，适用于科研和工业应用。',
    features: ['研究级平台', '傅立叶变换技术', '无荧光干扰', '高精度分析', '常规分析任务', '科研应用'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/raman-spectroscopy/raman-spectrometers/multiram-ft-raman-spectrometer.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/raman-spectroscopy/raman-spectrometers/multiram-ft-raman-spectrometer.html',
    specifications: {
      '光谱范围': '50-3600 cm⁻¹',
      '分辨率': '0.5-4 cm⁻¹',
      '激光波长': '1064 nm',
      '检测器': '液氮冷却Ge',
      '扫描速度': '最高20 kHz',
      '信噪比': '> 10000:1'
    }
  },
  {
    id: 4,
    name: 'RAM II FT-拉曼模块',
    category: 'FT-拉曼模块',
    image: '/brands/bruker/ram-ii-ft-raman-module.png',
    description: 'RAM II是INVENO FT-IR系列的FT-拉曼扩展模块，提供最全面的振动光谱解决方案。该模块可与现有的FT-IR系统集成，实现红外和拉曼光谱的联合分析。',
    features: ['FT-IR集成', '振动光谱', '模块化设计', '联合分析', '系统扩展', '全面解决方案'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/raman-spectroscopy/raman-spectrometers/ram-ii-ft-raman-module.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/raman-spectroscopy/raman-spectrometers/ram-ii-ft-raman-module.html',
    specifications: {
      '光谱范围': '50-3600 cm⁻¹',
      '分辨率': '0.5-4 cm⁻¹',
      '激光功率': '最高500 mW',
      '检测器': '液氮冷却Ge',
      '兼容性': 'INVENO FT-IR系列',
      '集成方式': '模块化扩展'
    }
  },
  {
    id: 5,
    name: 'INVENIO 傅立叶变换红外光谱平台',
    category: '红外光谱仪',
    image: '/brands/bruker/invenio-ft-ir-platform.png',
    description: '随时可进行升级的傅立叶变换红外光谱平台，适用于高要求质量控制、分析服务和多光谱研究应用。',
    features: ['可升级平台', '质量控制', '分析服务', '多光谱研究', '高精度分析', '模块化设计'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/infrared-and-raman/ft-ir-research-spectrometers/invenio-ft-ir-spectrometer.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/infrared-and-raman/ft-ir-research-spectrometers/invenio-ft-ir-spectrometer.html',
    specifications: {
      '光谱范围': '350-15000 cm⁻¹',
      '分辨率': '0.25 cm⁻¹',
      '信噪比': '> 60000:1',
      '扫描速度': '最高20 kHz',
      '检测器': 'DTGS/MCT',
      '光束分离器': 'KBr/CaF₂'
    }
  },
  {
    id: 6,
    name: 'VERTEX 系列傅立叶变换红外光谱仪',
    category: '红外光谱仪',
    image: '/brands/bruker/vertex-ft-ir-spectrometer.png',
    description: '高端真空或吹扫光谱仪为您提供最佳性能和灵活性，适用于各种求严苛的研究领域的特殊需求。',
    features: ['真空环境', '高端性能', '灵活配置', '研究级精度', '特殊应用', '最佳稳定性'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/infrared-and-raman/ft-ir-research-spectrometers/vertex-ft-ir-spectrometer.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/infrared-and-raman/ft-ir-research-spectrometers/vertex-ft-ir-spectrometer.html',
    specifications: {
      '光谱范围': '350-15000 cm⁻¹',
      '分辨率': '0.06 cm⁻¹',
      '信噪比': '> 100000:1',
      '扫描速度': '最高20 kHz',
      '环境': '真空/吹扫',
      '检测器': '多种可选'
    }
  },
  {
    id: 7,
    name: 'IFS 125HR 超高分辨率红外光谱仪',
    category: '红外光谱仪',
    image: '/brands/bruker/ifs125hr-ultra-high-resolution-ft-ir.png',
    description: '终极研究仪器，提供全球商品化仪器当中最高的光谱分辨率，比如用于大气监测。',
    features: ['超高分辨率', '大气监测', '终极精度', '研究级应用', '全球领先', '环境分析'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/infrared-and-raman/ft-ir-research-spectrometers/ifs-125hr.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/infrared-and-raman/ft-ir-research-spectrometers/ifs-125hr.html',
    specifications: {
      '光谱范围': '50-15000 cm⁻¹',
      '分辨率': '0.0009 cm⁻¹',
      '信噪比': '> 100000:1',
      '光程差': '9 m',
      '应用': '大气监测/高分辨率光谱',
      '检测器': '多种高端检测器'
    }
  },
  {
    id: 8,
    name: 'UMT TriboLab',
    category: '材料测试',
    image: '/brands/bruker/umt-tribolab-mechanical-friction-tester.png',
    description: '机械和摩擦磨损性能的综合测试平台。',
    features: ['机械性能测试', '摩擦磨损分析', '综合测试平台', '材料表征', '力学测试', '耐久性评估'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/test-and-measurement/tribometers-and-mechanical-testers.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/test-and-measurement/tribometers-and-mechanical-testers.html',
    specifications: {
      '测试类型': '摩擦磨损/机械性能',
      '载荷范围': '0.01-1000 N',
      '速度范围': '0.001-5000 mm/s',
      '温度范围': '-150°C to 800°C',
      '环境': '可控气氛',
      '测量精度': '±0.1%'
    }
  },
  {
    id: 9,
    name: 'TriboLab CMP',
    category: '材料测试',
    image: '/brands/bruker/tribolab-cmp-chemical-mechanical-polishing.png',
    description: '化学机械抛光研发规模的工艺研究和材料表征系统。',
    features: ['化学机械抛光', '工艺研究', '材料表征', '研发规模', 'CMP测试', '表面处理'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/test-and-measurement/tribometers-and-mechanical-testers.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/test-and-measurement/tribometers-and-mechanical-testers.html',
    specifications: {
      '应用': 'CMP工艺研究',
      '压力范围': '0.1-10 psi',
      '转速': '10-300 rpm',
      '抛光盘': '标准CMP规格',
      '温度控制': '室温-80°C',
      '实时监测': '摩擦力/扭矩'
    }
  },
  {
    id: 10,
    name: 'TriboLab HD',
    category: '材料测试',
    image: '/brands/bruker/tribolab-hd-high-torque-friction-tester.png',
    description: '高扭距磨擦材料测试仪，可以用于刹车片材料的摩擦性能及磨损颗粒程度的实验室研究。',
    features: ['高扭距测试', '刹车片材料', '摩擦性能', '磨损分析', '颗粒测量', '实验室研究'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/test-and-measurement/tribometers-and-mechanical-testers.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/test-and-measurement/tribometers-and-mechanical-testers.html',
    specifications: {
      '扭矩范围': '最高500 Nm',
      '转速': '10-3000 rpm',
      '压力': '最高50 kN',
      '温度': '最高600°C',
      '应用': '刹车材料测试',
      '数据采集': '实时摩擦系数'
    }
  },
  {
    id: 11,
    name: 'Dektak Pro',
    category: '轮廓仪',
    image: '/brands/bruker/dektak-pro-stylus-profiler.png',
    description: 'The world\'s most advanced stylus profiler with unmatched ease-of-use and accuracy',
    features: ['世界先进', '触针式轮廓', '易用性佳', '高精度', '表面分析', '粗糙度测量'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/test-and-measurement/stylus-profilometers.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/test-and-measurement/stylus-profilometers.html',
    specifications: {
      '垂直分辨率': '0.1 nm',
      '扫描长度': '最大55 mm',
      '载荷范围': '0.03-15 mg',
      '重复性': '< 2%',
      '样品尺寸': '最大200 mm',
      '测量类型': '台阶高度/粗糙度'
    }
  },
  {
    id: 12,
    name: 'Dektak XTL 探针式轮廓仪',
    category: '轮廓仪',
    image: '/brands/bruker/dektak-xtl-stylus-profiler-300mm.png',
    description: '针对300mm尺度进行优化，用于QC（质量控制）/QA（质量分析）的轮廓仪',
    features: ['300mm优化', '质量控制', '质量分析', '大尺寸样品', '生产级应用', '高通量测试'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/test-and-measurement/stylus-profilometers.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/test-and-measurement/stylus-profilometers.html',
    specifications: {
      '样品尺寸': '最大300 mm',
      '垂直分辨率': '0.1 nm',
      '水平分辨率': '0.033 μm',
      '扫描速度': '最高50 mm/s',
      '应用': 'QC/QA检测',
      '自动化': '全自动测量'
    }
  },
  {
    id: 13,
    name: 'ContourX-100 三维光学轮廓仪',
    category: '三维光学轮廓仪',
    image: '/brands/bruker/contourx-100-3d-optical-profilometer-bruker.png',
    description: '精简且经济实惠的台式，用于粗糙度计量',
    features: ['经济实惠', '台式设计', '粗糙度测量', '三维成像', '光学测量', '非接触式'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/test-and-measurement/3d-optical-profilers.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/test-and-measurement/3d-optical-profilers.html',
    specifications: {
      '垂直分辨率': '< 0.1 nm',
      '测量面积': '0.7 × 0.5 mm',
      '物镜倍数': '5× to 150×',
      'Z轴范围': '0.16 mm',
      '测量时间': '< 10秒',
      '应用': '粗糙度/表面形貌'
    }
  },
  {
    id: 14,
    name: 'ContourX-200 三维光学轮廓仪',
    category: '三维光学轮廓仪',
    image: '/brands/bruker/contourx-200-3d-optical-profilometer-bruker.png',
    description: '表面纹理计量的灵活台面',
    features: ['灵活台面', '表面纹理', '计量级精度', '多样化测量', '研究应用', '高分辨率'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/test-and-measurement/3d-optical-profilers.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/test-and-measurement/3d-optical-profilers.html',
    specifications: {
      '垂直分辨率': '< 0.1 nm',
      '测量面积': '最大18 × 12 mm',
      '物镜倍数': '1.4× to 150×',
      'Z轴范围': '10 mm',
      '样品尺寸': '最大200 mm',
      '应用': '表面纹理/形貌'
    }
  },
  {
    id: 15,
    name: 'ContourX-500 三维光学轮廓仪',
    category: '三维光学轮廓仪',
    image: '/brands/bruker/contourx-500-3d-optical-profilometer-bruker.png',
    description: '用于3D计量的全自动台式',
    features: ['全自动', '3D计量', '台式设计', '高精度', '批量测试', '生产应用'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/test-and-measurement/3d-optical-profilers.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/test-and-measurement/3d-optical-profilers.html',
    specifications: {
      '垂直分辨率': '< 0.1 nm',
      '测量面积': '最大25 × 25 mm',
      '物镜倍数': '1.4× to 150×',
      'Z轴范围': '20 mm',
      '自动化': '全自动测量',
      '应用': '3D计量/批量检测'
    }
  },
  {
    id: 16,
    name: 'LUMOS II 傅立叶变换红外显微镜',
    category: '红外显微镜',
    image: '/brands/bruker/lumos-ii-ft-ir-microscope.png',
    description: '致力于快速、简单的微观分析和超快成像，专用于失效分析、颗粒分析和质量控制。',
    features: ['快速成像', '微观分析', '失效分析', '颗粒分析', '质量控制', '超快成像'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/infrared-and-raman/ft-ir-microscopes/lumos-ii-ft-ir-microscope.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/infrared-and-raman/ft-ir-microscopes/lumos-ii-ft-ir-microscope.html',
    specifications: {
      '光谱范围': '750-4000 cm⁻¹',
      '空间分辨率': '3.1 μm',
      '检测器': '128×128 FPA',
      '成像时间': '< 1分钟',
      '物镜倍数': '4× to 74×',
      '应用': '显微FT-IR成像'
    }
  },
  {
    id: 17,
    name: 'Dimension Nexus 原子力显微镜',
    category: '原子力显微镜',
    image: '/brands/bruker/dimension-nexus-atomic-force-microscope.png',
    description: 'Redefining the quintessential value AFM with highest performance in its class',
    features: ['重新定义价值', '同级最高性能', '原子级分辨率', '多模式成像', '纳米测量', '表面分析'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/microscopes/materials-afm/dimension-nexus-afm.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/microscopes/materials-afm/dimension-nexus-afm.html',
    specifications: {
      'XY扫描范围': '90 × 90 μm',
      'Z扫描范围': '5.5 μm',
      '分辨率': '< 1 nm',
      '成像模式': '接触/轻敲/峰值力',
      '样品尺寸': '最大200 mm',
      '应用': '纳米级表面分析'
    }
  }
];