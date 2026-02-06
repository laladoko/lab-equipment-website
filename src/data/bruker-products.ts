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
    image: '/brands/bruker/bravo.png',
    description: 'BRAVO是一款手持式拉曼光谱仪，专用于快速鉴定和验证原材料，并带来最佳的光谱质量和一系列无与伦比的功能。',
    features: ['通用且简便', 'SSE™——专利荧光消除技术', 'DuoLaser™——更宽光谱范围', '激光安全等级一级', 'IntelliTip™——自动识别检测探头'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/raman-spectroscopy/raman-spectrometers/bravo-handheld-raman-spectrometer.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/raman-spectroscopy/raman-spectrometers/bravo-handheld-raman-spectrometer.html',
    specifications: {
      '光谱范围': '300-3200 cm⁻¹',
      '应用': '文物修复、（半）透明包装检测、材料检测、药品检测、化学品检测'
    }
  },
  {
    id: 2,
    name: 'SENTERRA II 拉曼显微镜',
    category: '拉曼显微镜',
    image: '/brands/bruker/senterra-ii.png',
    description: '易操作、免维护的共聚焦拉曼显微镜。使用高度自动化的SENTERRA II，可以便捷地在失效分析、质量控制和科学研究中进行拉曼光谱分析和成像。',
    features: ['全自动化的硬件', '一键切换4个内置激光器', 'SureCalTM实时校准技术', '快速3D拉曼成像', '强大的光谱识别和分析功能'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/raman-spectroscopy/raman-microscopes/senterra-ii-raman-microscope.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/raman-spectroscopy/raman-microscopes/senterra-ii-raman-microscope.html',
    specifications: {
      '光谱范围': '50-4400 cm⁻¹',
      '光谱分辨率': '1.5 cm⁻¹/pixel',
      '空间分辨率': '横向1微米，纵向2微米',
      '最低波数': '50 cm⁻¹',
      '光谱重复性': '0.06 cm⁻¹',
      '应用': '药物、材料学、聚合物、环保、法证科学'
    }
  },
  {
    id: 3,
    name: 'MultiRAM 傅立叶红外拉曼光谱仪',
    category: '傅立叶拉曼光谱仪',
    image: '/brands/bruker/multiram.jpg',
    description: 'MultiRAM是一款独立式、高性能的傅立叶拉曼光谱仪。',
    features: ['独立式大型样品仓', '取样灵活', '极佳的灵敏度和稳定性', '分辨率高，测量范围广'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/raman-spectroscopy/raman-spectrometers/multiram-ft-raman-spectrometer.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/raman-spectroscopy/raman-spectrometers/multiram-ft-raman-spectrometer.html',
    specifications: {
      '光谱范围': '3600–50 cm⁻¹',
      '光谱分辨率': '优于0.5 cm⁻¹',
      '应用': '制药行业、化学与高分子、材料科学、学术研究'
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
    image: '/brands/bruker/invenio.png',
    description: 'INVENIO旨在实现从常规质量控制到先进研发等多个领域的创新。无论您需要专注于提高生产力或精度，还是必须遵守各种法规，INVENIO都将给您带来全方位的支持。',
    features: ['多达7个软件控制探测器', '能同时进行远红外/中红外检测', '纳秒级时间分辨光谱技术', '无限扩展的红外光学平台'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/infrared-and-raman/ft-ir-research-spectrometers/invenio-ft-ir-spectrometer.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/infrared-and-raman/ft-ir-research-spectrometers/invenio-ft-ir-spectrometer.html',
    specifications: {
      '波数范围': '8000-340 cm⁻¹',
      '分辨率': '0.4 cm⁻¹',
      '扫描速度': '25张/秒',
      '信噪比': '60000:1',
      '应用': '制药、聚合物、化学、材料和设备开发、半导体、学术研究'
    }
  },
  {
    id: 6,
    name: 'VERTEX 80/80V 傅立叶变换红外光谱仪',
    category: '红外光谱仪',
    image: '/brands/bruker/vertex-80.jpg',
    description: 'VERTEX 80和VERTEX 80v真空FTIR光谱仪采用主动准直的 UltraScan™ 干涉仪，能够为您带来极佳的光谱分辨率。',
    features: ['光谱分辨率优于0.06 cm⁻¹', '覆盖太赫兹至紫外波段的全光谱范围', 'UltraScan™真正准直、高分辨率的专利干涉仪', '内置空冷光源及外置高功率水冷光源', '双通道、24位高速模/数转换器', '全真空设计'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/infrared-and-raman/ft-ir-research-spectrometers/vertex-ft-ir-spectrometer.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/infrared-and-raman/ft-ir-research-spectrometers/vertex-ft-ir-spectrometer.html',
    specifications: {
      '波数范围': '50,000-5 cm⁻¹',
      '分辨率': '0.06 cm⁻¹',
      '扫描速度': '115张谱/秒',
      '信噪比': '55000:1',
      '应用': '制药、聚合物、化学、研发、半导体、材料科学'
    }
  },
  {
    id: 7,
    name: 'IFS 125HR 超高分辨率红外光谱仪',
    category: '红外光谱仪',
    image: '/brands/bruker/ifs125hr.jpg',
    description: 'IFS 125HR是高分辨率红外光谱分析领域的终极研究工具。',
    features: ['杰出的分辨率', '对称线形', '易于切换范围', '两个样品室', '带有混合扫描仪结构的滑动轴承干涉仪'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/infrared-and-raman/ft-ir-research-spectrometers/ifs-125hr.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/infrared-and-raman/ft-ir-research-spectrometers/ifs-125hr.html',
    specifications: {
      '分辨线宽': '< 0.009 cm⁻¹',
      '光谱范围': '5 cm⁻¹远红外到 >50,000 cm⁻¹紫外区'
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
    description: 'LUMOS II显微红外光谱仪，所见即所得一体式显微红外光路设计；70mm的高尺度操作台空间；全自动ATR设计；选配FPA(32×32)焦平面探测器可高达1.25μm空间分辨率，扫描速度超过900张光谱/秒。',
    features: ['出色的FPA成像性能', '高清光谱、可视化数据', '高灵敏度，无需液氮', '工作距离大', '大视野'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/infrared-and-raman/ft-ir-microscopes/lumos-ii-ft-ir-microscope.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/infrared-and-raman/ft-ir-microscopes/lumos-ii-ft-ir-microscope.html',
    specifications: {
      '光谱范围': '750-4000 cm⁻¹（成像模式）；600-4000 cm⁻¹（显微镜模式）',
      '数据采集方式': '透射、反射、ATR等多种红外成像',
      '空间分辨率': '≤5μm',
      '最大样品厚度': '40mm',
      '应用': '材料分析、药品分析、电子元器件、汽车工业、表面分析、生命科学、环境科学、颗粒分析'
    }
  },
  {
    id: 17,
    name: 'Dimension Nexus 原子力显微镜',
    category: '原子力显微镜',
    image: '/brands/bruker/dimension-nexus.png',
    description: 'Dimension Nexus™提供了一个理想的组合，将数据质量、实验灵活性和易于使用结合在一个紧凑的系统中。适合常规和定制实验。',
    features: ['重新定义价值', '同级最高性能', '原子级分辨率', '多模式成像', '纳米测量', '表面分析'],
    price: '询价',
    link: 'https://www.bruker.com/zh/products-and-solutions/microscopes/materials-afm/dimension-nexus-afm.html',
    officialLink: 'https://www.bruker.com/zh/products-and-solutions/microscopes/materials-afm/dimension-nexus-afm.html',
    specifications: {
      'X-Y扫描范围': '90 μm × 90 μm',
      '电动载物台范围': '150mm×150mm',
      'Z轴范围': '10 μm',
      '控制器': 'NanoScope 6',
      '可编程测量': '是'
    }
  },
  // ---------- 文档新增 ----------
  {
    id: 18,
    name: 'LUMOS II ILIM 激光红外成像显微镜',
    category: '红外显微镜',
    image: '/brands/bruker/lumos-ii-ilim.jpg',
    description: 'LUMOS II ILIM通过将激光红外成像（ILIM）技术融入LUMOS分析系统平台，实现了突破性创新。如今，我们可以从光谱分析转向图像化思维——这已不再是传统显微镜，而是一双"红外之眼"，以高速红外成像技术为您呈现测试样品高度精细的细节特征。',
    features: ['超高速、高对比度的化学成像', '采用1类激光安全标准', '相比传统FT-IR，面扫描速度提升达169倍', '配备组织/颗粒/片剂等场景专用工作流程', '支持快速部署至日常检测流程'],
    price: '询价',
    specifications: {
      '红外成像速度': '62400张光谱/秒',
      '空间分辨率': '4.25μm',
      '视野范围': '2.2×2.0mm',
      '应用': '生命科学|细胞成像、药物、发射率研究（例如LED）、失效和原因分析、刑侦、微塑料、工业研发、聚合物和塑料、表面表征、半导体'
    }
  },
  {
    id: 19,
    name: 'HYPERION II 量子级联激光器显微红外光谱仪',
    category: '红外显微镜',
    image: '/brands/bruker/vertex-neo-r.jpg',
    description: 'HYPERION II是用于科研和开发的多功能傅立叶变换红外显微镜，具有灵活的附件，可以将红外激光成像（QCL）和傅立叶红外结合在一个仪器中。',
    features: ['傅立叶变换红外(FT-IR)结合红外激光成像(QCL)双引擎', '高成像速度', '光谱范围扩展——从近红外线（NIR）到远红外线（FIR）'],
    price: '询价',
    specifications: {
      '测量模式': '透射、反射、ATR',
      '成像速度': '0.1毫米²每秒（FPA，全频谱）；6.4毫米²每秒（ILIM，单波数）',
      '应用': '生命科学|细胞成像、药物、发射率研究、失效和原因分析、刑侦、微塑料、工业研发、聚合物和塑料、表面表征、半导体'
    }
  },
  {
    id: 20,
    name: 'RAMANwalk 拉曼显微镜',
    category: '拉曼显微镜',
    image: '/brands/bruker/raman-walk.jpg',
    description: 'RAMANwalk是一款独具特色的共聚焦拉曼显微镜，它采用独创的拉曼成像方法，能够在很短的时间内，以高光谱质量，生成智能概览和预览图像。',
    features: ['高速拉曼成像', '高光谱和空间分辨率', '完全自动化的硬件', '强大的2D/3D拉曼图像分析', '自动校准和自动准直'],
    price: '询价',
    specifications: {
      '空间分辨率': '350 nm in X and Y; 1 µm in Z',
      '应用': '材料科学、化学与高分子、生命科学、地质学'
    }
  },
  {
    id: 21,
    name: 'RAMANtouch 拉曼显微镜',
    category: '拉曼显微镜',
    image: '/brands/bruker/raman-touch.jpg',
    description: 'RAMANtouch是一款先进的共聚焦拉曼显微镜，它采用激光扫描专利技术，能够以全球领先的速度提供高质量拉曼成像。',
    features: ['超高速拉曼成像', '较高的光谱和空间分辨率', '完全自动化的硬件', '强大的2D/3D拉曼图像分析', '自动校准和自动准直', '无需电子倍增CCD', '定位精度高达10纳米'],
    price: '询价',
    specifications: {
      '空间分辨率': '350 nm in X，500 nm in Y; 1 µm in Z',
      '电动载物台': '30×30×35mm',
      '光谱分辨率': '<0.9 cm⁻¹',
      '应用': '电池研究与制造、硅和半导体、生命科学、制药、矿物和无机物、纳米碳材料、聚合物、塑料、食品和饮料'
    }
  },
  {
    id: 22,
    name: 'RAMANdrive 拉曼显微镜',
    category: '拉曼显微镜',
    image: '/brands/bruker/raman-drive.png',
    description: 'RAMANdrive是一款专为晶圆分析设计的超快速、高分辨共聚焦拉曼显微镜，它配备了300mm专属载物台，确保在整个晶圆范围内实现卓越的稳定性与精确度。',
    features: ['在线光斑模式下，能同时获得400张光谱', '支持完整的12英寸晶圆的拉曼成像', '使用AreaFlash技术，进行快速平均成像', '可连接至缺陷检测系统', '适用于洁净室'],
    price: '询价',
    specifications: {
      '空间分辨率': '300 nm in X，300 nm in Y; 1 µm in Z',
      '载物台': '300×300×35mm加大载物台',
      '光谱分辨率': '<1.2 cm⁻¹',
      '应用': '电池研究与制造、硅和半导体、生命科学、制药、矿物和无机物、纳米碳材料、聚合物、塑料、食品和饮料'
    }
  },
  {
    id: 23,
    name: 'VERTEX NEO R 真空型研究级傅立叶变换红外光谱仪',
    category: '红外光谱仪',
    image: '/brands/bruker/vertex-neo-r.jpg',
    description: 'VERTEX NEO R是新一代真空型FT-IR光谱仪，旨在为先进研究应用树立全新标准。该仪器强调灵活性、精确性和创新性，为前沿科学研究提供卓越支持。',
    features: ['可自由访问的样品台', 'RockSolid™干涉仪', '支持多达5个检测器', '双通道24位ADC', '兼容所有VERTEX和INVENIO模块和附件', '全真空光学系统'],
    price: '询价',
    specifications: {
      '分辨率': '优于0.16 cm⁻¹',
      '精度': '优于0.005 cm⁻¹',
      '应用': '学术研究、聚合物和化学、绿色科技、固体物理研究、半导体研究、催化研究、生命科学、天文学与航天研究、通信技术'
    }
  },
  {
    id: 24,
    name: 'MPA III 双通道多功能灵活扩展近红外光谱仪',
    category: '红外光谱仪',
    image: '/brands/bruker/mpa-iii.jpg',
    description: 'MPA-D II配备软件控制的液体采样模块（LSM II），为常规质控分析液体和固体样品提供了新的标准。',
    features: ['支持固、液双通道检测', '多功能灵活选配', '即插即用', '可实现远程控制和诊断'],
    price: '询价',
    specifications: {
      '波长范围': '12500-3600 cm⁻¹',
      '扫描速度': '8次/秒（8 cm⁻¹下）',
      '数据采样间隔': '2 cm⁻¹',
      '测样方式': '漫反射/透射/漫透射/光纤',
      '化学计量学软件': 'OPUS',
      '应用': '牛乳和乳制品分析'
    }
  },
  {
    id: 25,
    name: 'TANGO II 小型化傅立叶变换近红外光谱仪',
    category: '红外光谱仪',
    image: '/brands/bruker/tango-ii.jpg',
    description: 'TANGO II旨在简化操作，使每个用户都能自信地进行测量。其直观的界面，通过可选的高性能触摸屏电脑或任何标准计算机提供支持，支持17种语言，使不同技能水平的用户都能轻松进行测量。',
    features: ['单通道', '透射内置20°-80°样品加热器', '可选一体式高性能触屏电脑'],
    price: '询价',
    specifications: {
      '谱区范围': '11,500-4,000 cm⁻¹',
      '波数精度': '优于0.04 cm⁻¹',
      '应用': '食品和饮品行业、饲料制造、制药和生物技术、化工和石化、高分子行业'
    }
  },
  {
    id: 26,
    name: 'ALPHA II 常规傅立叶变换红外光谱仪',
    category: '红外光谱仪',
    image: '/brands/bruker/alpha-ii.png',
    description: 'ALPHA II是一款紧凑型的傅里叶变换红外光谱仪，其占地面积如同一台笔记本电脑。它用于化学分析，并使您能够进行原材料、中间体和最终产品的质量控制、定量分析和验证。',
    features: ['设计紧凑智能', '操作简单', '功能强大', '多样化的采样模块'],
    price: '询价',
    specifications: {
      '波数范围': '350-8000 cm⁻¹',
      '分辨率': '0.06 cm⁻¹',
      '扫描速度': '115张谱/秒',
      '信噪比': '＞55000:1',
      '应用': '实验教学、科学研究、原料分析、文物珠宝检测、气体分析'
    }
  }
];