export interface OlympusProduct {
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





export const olympusProducts: OlympusProduct[] = [
  {
    id: 1,
    name: 'DSX2000 数码显微镜',
    category: '数码显微镜',
    image: '/brands/olympus/dsx2000-digital-microscope-3d-surface-analysis.png',
    description: '精准目标，轻松实现DSX2000全电动数码显微镜通过智能工具、一体化成像和可定制的界面，为研究人员和质控实验室专业人员简化了任务、提高了工作效率，优化了工作流程。配备了PRECiV软件的DSX2000显微镜可助力您的团队快速获得精准的结果，捕捉超过4K分辨率的出色图像。它提供直观且流畅的体验，让各种技能水平的用户都能轻松、自信地操作。',
    features: ['3D表面分析', '大角度相机头', '高精度测量', '彩色3D显示', '工业检测专用', '4K分辨率成像'],
    price: '询价',
    link: 'https://www.instrument.com.cn/netshow/SH103060/C595779.htm',
    officialLink: 'https://www.olympus-ims.com/zh/microscope/dsx2000/',
    specifications: {
      '放大倍数': '20.9X-7307X',
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
    description: '可按照个人需求进行测量的显微镜。无论样品大小、简单还是复杂，或执行测量的人员经验如何，奥林巴斯STM7系列可提供符合您需求的测量显微镜。',
    features: ['高精度测量', '电动载物台', '专业测量软件', '网格界面', '精密定位', '质量控制'],
    price: '询价',
    link: 'https://www.instrument.com.cn/netshow/SH103060/C250160.htm',
    officialLink: 'https://www.olympus-ims.com/zh/microscope/stm7/',
    specifications: {
      '放大倍数': '10X-1000X',
      'Z轴测量分辨率': '0.1μm',
      '载物台': '手动载物台',
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
    description: 'SZX7体视显微镜价格适中、操作简便、观察舒适，并配有7:1变焦率功能和内置防静电保护装置，采用了先进的伽利略光学系统，可生成优异的高画质图像。',
    features: ['立体成像', '大工作距离', '舒适观察', '多种照明', '稳定底座', '样品检查'],
    price: '询价',
    link: 'https://www.instrument.com.cn/netshow/SH103060/C210692.htm',
    officialLink: 'https://www.olympus-lifescience.com/zh/microscopes/szx7/',
    specifications: {
      '光学系统': '伽利略光学系统',
      '综合倍率': '4.0x-336x',
      '观察筒': '双目/三目/倾斜三目观察镜筒'
    }
  },
  {
    id: 6,
    name: 'GX53 倒置显微镜',
    category: '倒置显微镜',
    image: '/brands/olympus/gx53-inverted-microscope-cell-culture.jpg',
    description: '倒置显微镜具有多种用途和丰富的功能，有助于用户快速、高效地进行金相检验。',
    features: ['先进的分析工具', '专为材料科学而优化', '人性化的设计', '先进的成像技术', '模块化'],
    price: '询价',
    link: 'https://www.instrument.com.cn/netshow/SH103060/C278656.htm',
    officialLink: 'https://www.olympus-lifescience.com/zh/microscopes/gx53/',
    specifications: {
      '光学系统': 'UIS2光学系统（无限远校正）',
      '照明': 'LED照明',
      '观察模式': '明场、暗场、DIC、偏光、MIX',
      '软件': 'Stream图像分析软件'
    }
  },
  {
    id: 7,
    name: 'BX53M 正置金相显微镜',
    category: '金相显微镜',
    image: '/brands/olympus/bx53m-upright-metallurgical-microscope.png',
    description: 'BX3M系列以模块化为设计理念，为各种材料科学和工业应用提供了多功能性。通过改进与PRECiV软件的集成，BX53M为标准显微镜和数字成像用户提供了从观察到报告创建的无缝工作流程。',
    features: ['舒适且使用方便', '功能齐全', '顶尖的光学器件', '可根据观察和分析偏好进行调整', '适用于各种样品'],
    price: '询价',
    link: 'https://www.instrument.com.cn/netshow/SH103060/C250162.htm',
    officialLink: 'https://www.olympus-lifescience.com/zh/microscopes/bx53m/',
    specifications: {
      '光学系统': 'UIS2光学系统（无限远校正）',
      '光源': 'LED（寿命≥60000小时）',
      '观察方式': '明场、暗场、荧光、红外、偏光'
    }
  },
  {
    id: 8,
    name: 'SZX16 体视显微镜',
    category: '体视显微镜',
    image: '/brands/olympus/szx16.png',
    description: 'SZX16通用显微镜是根据检测应用的需求设计的，0.7x-11.5x，变倍比可达16.4倍，分辨率可达900 LP/mm。能够满足广泛的研究需求。',
    features: ['卓越光学性能带来的鲜明观察影像', '16.4倍超大变焦比', '基于人体工程学的舒适操作环境', '多样化的照明单元', '丰富的反射照明产品阵容', '智能数字影像'],
    price: '询价',
    link: 'https://www.instrument.com.cn/netshow/SH103060/C210691.htm',
    officialLink: 'https://www.olympus-lifescience.com/zh/microscopes/szx16/',
    specifications: {
      '光学系统': '伽利略光学系统',
      '综合放大倍率': '2.1x～690x',
      '变焦比': '16.4倍',
      '观察筒': '双目/三目/倾斜三目观察筒'
    }
  },
  {
    id: 9,
    name: 'BXFM 设备组装型系统工业显微镜',
    category: '工业显微镜',
    image: '/brands/olympus/bxfm-modular-industrial-microscope-system.png',
    description: 'BXFM是我们功能最丰富的调焦接口，适用于多种光学和照明组件。该接口可让您在诸多应用中利用高性能垂直照明器实现多种用途。由于采用紧凑型设计和便利的安装表面，您可轻松将调焦接口适配安装到光学平台、普通支架或集成到您的系统中。',
    features: ['模块化设计', '工业集成', '灵活配置', '紧凑结构', '高可靠性', '自动化集成'],
    price: '询价',
    link: 'https://www.instrument.com.cn/netshow/SH103060/C250163.htm',
    officialLink: 'https://www.olympus-lifescience.com/zh/microscopes/bxfm/',
    specifications: {
      '放大倍数': '12.5x-1500x',
      '模块化': '支持',
      '集成接口': '标准工业接口',
      '观察方式': 'DIC、荧光、明场、暗场',
      '应用': '工业检测、自动化'
    }
  },
  {
    id: 10,
    name: 'MX63/MX63L 半导体工业检测显微镜',
    category: '半导体检测显微镜',
    image: '/brands/olympus/mx63l.png',
    description: 'MX63和MX63L显微镜系统经过优化，适用于最大尺寸300mm的晶圆、平板显示器、电路板以及其他大尺寸样品的高质量检测。其采用的模块化设计使您能够选择需要的组件，获得根据应用定制的系统。',
    features: ['多功能', '人性化', '高级成像技术', '模块化'],
    price: '询价',
    link: 'https://www.instrument.com.cn/netshow/SH103060/C544485.htm',
    officialLink: 'https://www.olympus-ims.com/zh/microscope/mx63/',
    specifications: {
      '光学系统': 'UIS2光学系统（无限远校正系统）',
      '操作方式': '手动控制器',
      '照明': '多种外置光源',
      '观察方式': '暗场、荧光、透射、DIC、偏光、红外',
      '应用': '半导体检测、晶圆分析'
    }
  },
  {
    id: 11,
    name: 'SZX10 体视显微镜',
    category: '体视显微镜',
    image: '/brands/olympus/szx10.png',
    description: 'SZX10是可再现样品自然颜色和形貌的应用领域较为广泛的高级系统体视显微镜。宽范围的变倍比（10倍），工作距离81mm，开口数0.1（采用1倍物镜时）。可提供高光学性能和舒适的操作环境。',
    features: ['可以快速检查的操作部', '基于人体工程学的舒适操作环境', '自动化智能数字影像'],
    price: '询价',
    link: 'https://www.instrument.com.cn/netshow/SH103060/C210691.htm',
    officialLink: 'https://www.olympus-lifescience.com/zh/microscopes/szx10/',
    specifications: {
      '光学系统': '伽利略光学系统',
      '综合放大倍率': '3.15x～378x',
      '变焦比': '10倍',
      '观察筒': '双目/三目/倾斜三目观察筒'
    }
  },
  // ---------- 生物显微镜（文档新增） ----------
  {
    id: 12,
    name: 'MVX10 研究型宏观变倍显微镜',
    category: '生物显微镜',
    image: '/brands/olympus/mvx10.png',
    description: 'MVX10体视显微镜可实现高荧光效率，其能够让对细胞水平或整个组织、器官和生物体内基因表达作用和蛋白质功能感兴趣的研究人员获得灵活性。',
    features: ['单变焦明亮宏观荧光', '从4倍至125倍的无缝观察', '助力提高工作效率', '智能样品导航器'],
    price: '询价',
    specifications: {
      '变焦': '单变焦变倍系统',
      '变焦比': '10:1 (0.63X-6.3X)',
      '视场数(F.N.)': '22',
      '照明模式': '同轴反射光'
    }
  },
  {
    id: 13,
    name: 'BX43 研究级生物显微镜',
    category: '生物显微镜',
    image: '/brands/olympus/bx43.png',
    description: 'BX43显微镜采用模块化设计，可根据需求在经济高效型和高级型配置之间灵活选择。符合人体工程学的观察镜筒和载物台等各种模块化组件让您可以根据具体应用轻松定制显微镜。',
    features: ['支持多种观察方法', '增强了使用者的舒适度', '专为病理学和细胞学而设计的LED光源，保证样品的真实色彩', '采用品质卓越的UIS2光学元件'],
    price: '询价',
    specifications: {
      '光学系统': 'UIS2无限远光学系统',
      '照明器': '高色彩还原LED光源'
    }
  },
  {
    id: 14,
    name: 'BX51WI 载物台固定式显微镜',
    category: '生物显微镜',
    image: '/brands/olympus/bx51wi.png',
    description: 'BX51W是所有生理实验（比如膜片钳技术和活体显微镜检查）的理想工具。',
    features: ['无振动且噪音极小', '抗振光闸', '红外DIC', '优化光学元件', '倾斜式聚光镜'],
    price: '询价',
    specifications: {
      '光学系统': 'UIS2无限远光学系统',
      '照明器': '透射光内置科勒照明（FN:22），12V100W卤素灯',
      '载物台': '机械、桥式'
    }
  },
  {
    id: 15,
    name: 'BX53 荧光显微镜',
    category: '生物显微镜',
    image: '/brands/olympus/bx53.jpg',
    description: '多用途系统显微镜，能够满足研究的需要。支持各种荧光成像应用，集各种高级性能于一体，使操作更便捷、处理更灵活。',
    features: ['高亮度真彩色LED照明', '可定制的控制布局', '优秀的光学性能', '高度可调节的双目镜筒', '出色的模块化', '荧光成像中先进的灵敏度'],
    price: '询价',
    specifications: {
      '光学系统': 'UIS2无限远光学系统',
      '照明器': '高亮度14W LED（强度大于12V100W卤素灯）',
      '荧光照明器': '反射荧光照明器',
      '调焦精度': '0.001mm'
    }
  },
  {
    id: 16,
    name: 'BX53-P 偏光显微镜',
    category: '生物显微镜',
    image: '/brands/olympus/bx53-p.png',
    description: 'BX53-P偏光显微镜在使用UIS2无限远校正光学系统和独特的光学设计方面提供了出色的偏光应用性能。由于兼容的补偿器系列广泛，显微镜能够处理几乎所有领域的观察和测量应用。',
    features: ['用于锥光观察和正交观察的伯特兰透镜', '种类繁多的补偿器和波片', '支持BX3系列配件及照相系统'],
    price: '询价',
    specifications: {
      '光学系统': 'UIS2无限远光学系统',
      '照明': '高强度高色彩还原LED，科勒照明',
      '观察方式': '明场、偏光、简易偏光',
      '聚焦机制': '载物台聚焦',
      '聚光镜': '手动偏光聚光镜'
    }
  },
  {
    id: 17,
    name: 'BX63 电动荧光显微镜',
    category: '生物显微镜',
    image: '/brands/olympus/bx63.png',
    description: '灵活方便的全电动BX63显微镜利用电动物镜转盘聚焦样品，从而可以采用固定式载物台获得更高稳定性。平滑安静的电动载物台通过超声波压电技术驱动实现精确操作。',
    features: ['快速高效的图像捕捉', '人性化的工作流程', '轻触即可更改观察方法'],
    price: '询价',
    specifications: {
      '光学系统': 'UIS2无限远光学系统',
      '照明器': '透射式柯勒照明器LED灯（100W卤素灯）',
      '观察方式': '明场、暗场、相衬、荧光、微分干涉、简易偏光',
      '聚焦机制': '电动物镜转盘聚焦'
    }
  },
  {
    id: 18,
    name: 'CX43/CX33 生物显微镜',
    category: '生物显微镜',
    image: '/brands/olympus/cx43-cx33.png',
    description: 'CX43和CX33生物显微镜可以让您在长时间的常规观察中始终保持舒适。一只手仅需低限度的动作即可快速放置样本，另一只手同时可以调整焦点和操作载物台。',
    features: ['具有色温稳定的LED照明方式', '固定式科勒照明', '符合人体工学', '舒适且高效'],
    price: '询价',
    specifications: {
      '光学系统': 'CX33-无限远光学系统；CX43-UIS2光学系统',
      '照明装置': '内置透射照明系统，柯勒照明（视场光阑固定）',
      '观察方式': '明场、暗场、相衬、荧光、简易偏光',
      '聚焦机制': '电动物镜转盘聚焦'
    }
  },
  {
    id: 19,
    name: 'CX23 生物显微镜',
    category: '生物显微镜',
    image: '/brands/olympus/cx23.png',
    description: '人性化的教学用显微镜，针对改进教学显微镜工作流程而设计的CX23正置显微镜仅需进行很少的配置操作。',
    features: ['占用空间少', '重量轻', '符合人体工学设计的防滑提手'],
    price: '询价',
    specifications: {
      '照明': '内置透射照明系统，LED',
      '观察方式': '明场、暗场',
      '聚焦机制': '载物台聚焦',
      '重量': '约5.9kg'
    }
  },
  {
    id: 20,
    name: 'CKX53 倒置显微镜',
    category: '生物显微镜',
    image: '/brands/olympus/ckx53.png',
    description: '具备更高图像质量和人体工学设计的奥林巴斯CKX53倒置显微镜可以为包括活细胞观察、细胞采样和处理、图像采集和荧光观察在内的各类细胞培养需求提供稳定的性能和舒适的工作流程。',
    features: ['清晰、大视野', '集成相衬（iPC）', '抗紫外线涂层', '兼容各种细胞培养容器'],
    price: '询价',
    specifications: {
      '光学系统': 'UIS2光学系统',
      '照明': '长寿命LED照明（4000K）',
      '观察方式': '荧光、相衬、明场',
      '光源': 'LED透射光源、100W汞灯荧光光源',
      '聚光镜': '手动超长工作距离聚光镜'
    }
  },
  {
    id: 21,
    name: 'CM30 细胞培养监控系统',
    category: '生物显微镜',
    image: '/brands/olympus/cm30.png',
    description: '使用细胞培养监控功能来控制您的流程。',
    features: ['非标记细胞监测', '多点细胞培养监控', '通过自动化节省时间', '无需进入洁净室进行监控', '准确地进行细胞传代定时'],
    price: '询价',
    specifications: {
      '安装环境（孵化器内）': '温度：37°C±0.3°C，湿度：0—99%',
      '视野（水平×垂直）': '2.84mm×2.13mm',
      '图像大小': '1280×960像素',
      '照明波长': 'λ=630nm (LED)',
      '照明方式': 'epi倾斜照明'
    }
  },
  {
    id: 22,
    name: 'FV4000 激光扫描共聚焦显微镜',
    category: '生物显微镜',
    image: '/brands/olympus/fv4000.png',
    description: '使用FV4000共聚焦显微镜，研究人员可以在更短的时间内、更轻松地获取更高质量的定量图像数据。',
    features: ['硅基SilVIR探测器', '多达六个通道的多色成像', '灵活的宏观到微观成像', '更温和的高速延时共聚焦成像', '图像数据具有可再现性'],
    price: '询价',
    specifications: {
      '扫描振镜': '镀银图层',
      '常规成像扫描分辨率': '64×64像素至4096×4096像素',
      '高速成像扫描分辨率': '512×32像素至1024×1024像素',
      '视场数(FN)': '20',
      '探测器最大通道数': '六通道'
    }
  },
  {
    id: 23,
    name: 'FV4000MPE 多光子激光扫描显微镜',
    category: '生物显微镜',
    image: '/brands/olympus/fv4000mpe.png',
    description: '先进的成像技术可揭示样品的细节和动态，同时提供可增强实验效果的定量图像数据。该系统具有高速捕获动态变化的功能，可满足苛刻的研究应用需求。',
    features: ['硅基SilVIR探测器', '高动态范围低噪声', '出色的多光子深层图像', '更温和的高速延时成像'],
    price: '询价',
    specifications: {
      '扫描振镜': '镀银图层',
      '常规成像扫描分辨率': '64×64像素至4096×4096像素',
      '高速成像扫描分辨率': '512×32像素至1024×1024像素',
      '视场数(FN)': '20',
      '探测器最大通道数': '六通道',
      '图像': '高动态范围光子计数（1G cps）'
    }
  },
  {
    id: 24,
    name: 'IX73 高级活细胞成像用倒置显微镜系统',
    category: '生物显微镜',
    image: '/brands/olympus/ix73.png',
    description: '半电动IX73针对满足各种研究需求而设计。双层光路设计以及与其他可选配模块满足显微镜功能性扩展，IX73非常适合不断变化的研究环境。',
    features: ['卓越的画质', '高效的荧光信号检测', '智能控制', '操作友好'],
    price: '询价',
    specifications: {
      '光学系统': 'UIS2光学系统',
      '物镜转盘': '电动/编码六孔物镜转盘（可安装DIC模块），防水结构',
      '聚焦行程': '10mm'
    }
  },
  {
    id: 25,
    name: 'IX83 完全电动化和自动化的倒置显微镜系统',
    category: '生物显微镜',
    image: '/brands/olympus/ix83.png',
    description: '全电动IX83专为满足各种研究需求而设计。与其具有扩展能力的选配模块配套使用时，两款显微镜系统均可开展多种成像技术，无论是长时程的时间序列成像，图像获取，还是其他技术应用需求都可以胜任。',
    features: ['卓越的画质', '高效的荧光信号检测', '智能控制', '操作友好'],
    price: '询价',
    specifications: {
      '光学系统': 'UIS2光学系统',
      '物镜转盘': '电动六孔物镜转盘（可安装DIC模块），防水结构',
      '聚焦行程': '10.5mm'
    }
  },
  {
    id: 26,
    name: 'IX85 全电动倒置荧光显微镜',
    category: '生物显微镜',
    image: '/brands/olympus/ix85.png',
    description: 'IXplore IX85提供了更出色的视场数和一系列先进的端到端成像功能，使您能够比以往看到和捕捉到更多内容，同时显著缩短采集时间。体验IXplore IX85显微镜系统的卓越速度、清晰度和可靠性。',
    features: ['大视场（FOV）高清成像', '高效的操作流程', '先进的图像处理与分析', '卓越的物镜性能', '一个平台，多种可能'],
    price: '询价',
    specifications: {
      '光学系统': 'UIS2光学系统',
      '物镜转盘': '电动六孔物镜转盘（可连接DIC模块），简易防水结构',
      '光源': '高功率LED光源'
    }
  },
  {
    id: 27,
    name: 'scanR 生命科学高内涵筛选工作站',
    category: '生物显微镜',
    image: '/brands/olympus/scanr.png',
    description: '生命科学的模块化高内涵筛选工作站，基于显微镜的scanR模块化成像平台通过深度学习技术，可对生物样品进行全自动图像采集和数据分析。',
    features: ['数据可视化', '自动化工作流程', '强大的分析模块', '高性能和耐久性'],
    price: '询价',
    specifications: {
      '显微镜机架': 'IX85/IX83倒置显微镜，单层或双层观察',
      'LED照明选项': '多种选择',
      '软件': 'ScanR采集软件和ScanR分析软件'
    }
  },
  {
    id: 28,
    name: 'VS200 研究级全玻片扫描系统',
    category: '生物显微镜',
    image: '/brands/olympus/vs200.jpg',
    description: 'SLIDEVIEW VS200研究级全玻片扫描系统可使您捕捉到高分辨率的载玻片图像，完成定量分析，从而可充分利用载玻片提供的信息。该光学系统对载玻片扫描进行了优化，可将脑科学、癌症、干细胞和药物研发的载玻片图像数字化。',
    features: ['应用广泛，数据可靠', '高效扫描、事半功倍', '工作流程简捷强大'],
    price: '询价',
    specifications: {
      '可观察样品': '带盖玻片的载玻片',
      '观察方法': '明场、反射明场（可选）、暗场、相衬（可选）、简易偏光（可选）、荧光（可选）',
      '照明器': '内置科勒照明，使用透射光、高强度和高显色性LED灯（使用寿命长达50,000小时）'
    }
  },
  {
    id: 29,
    name: 'VS-SILA 光学层切设备',
    category: '生物显微镜',
    image: '/brands/olympus/vs200-sila.png',
    description: 'VS-SILA（散斑照明采集）光学切片设备可轻松集成到VS200系统和软件中。散斑照明可通过去除失焦光线，获得高对比度、清晰的图像，特别是对于较厚的样品。图像在扫描过程中进行计算，无需后期处理，因此该设备对采集速度的影响很小。',
    features: ['易于使用', '结构紧凑，易于安装', '灵活变通、用途广泛'],
    price: '询价',
    specifications: {
      '可观察样品': '带盖玻片的载玻片',
      '样品厚度': '可达0.3mm',
      '观察方法': '荧光——光学切片，带散斑照明',
      '扫描时间': '约14分钟'
    }
  },
  {
    id: 30,
    name: 'APX100 桌面荧光显微镜',
    category: '生物显微镜',
    image: '/brands/olympus/apx100.png',
    description: 'APEXVIEW APX100桌面荧光显微镜可快速、简单地采集专家级质量的显微镜图像。APX100系统采用著名的奥林巴斯光学系统、直观的用户界面、强大的AI和一整套智能功能打造，将多功能显微镜的易用性与高质量图像数据相结合来满足您的研究需求。',
    features: ['快速、高效', '出版级质量的图像', '快速自动对焦', '智能样品导航器'],
    price: '询价',
    specifications: {
      '观察方式': '明场（彩色/单色模式）、相衬、Gradient contrast、荧光',
      '载物台': '自动控制的电动XY载物台',
      '对焦机构': '自动控制的电动Z轴',
      '宏观光学系统': '内置，0.07x宏观物镜',
      '减震机构': '内置'
    }
  },
  {
    id: 31,
    name: 'VS-M1R 全玻片成像系统',
    category: '生物显微镜',
    image: '/brands/olympus/vs-m1r.png',
    description: '快速高效的数字病理学。',
    features: ['快速捕获高质量图像', '支持高效观察', '为繁忙的实验室而打造', '易于集成和管理'],
    price: '询价',
    specifications: {
      '可观察样品': '带盖玻片的载玻片',
      '盖玻片厚度': '0.13-0.19mm',
      '玻片容量': '最多150张玻片',
      '物镜': 'X Line系列复消色差',
      '照明器': '高亮度和高显色性LED（长达50000小时）'
    }
  },
  // ---------- 相机（文档新增） ----------
  {
    id: 32,
    name: 'DP23 显微数码相机',
    category: '相机',
    image: '/brands/olympus/dp23.png',
    description: '适用于常规生命科学和临床研究显微成像的DP23数码显微相机兼具智能功能和良好的色彩再现性，能够轻松方便地提供高质量的图像。',
    features: ['每秒45帧', '640万像素高分辨率图像', '60fps全高清实时图像', '准确可靠的色彩还原', '高达FN25的超宽视场（FOV）'],
    price: '询价',
    specifications: {
      '图像传感器': '1/1.8英寸彩色CMOS',
      '分辨率(最大)': '3088(W)×2076(H) pixels',
      '像素大小': '2.4×2.4μm',
      'A/D': '10 bits'
    }
  },
  {
    id: 33,
    name: 'DP28 显微数码相机',
    category: '相机',
    image: '/brands/olympus/dp28.png',
    description: '兼具强悍功能、精准的色彩精确度以及宽视场4K分辨率的DP28数码显微相机能够为会议、教学和临床研究提供出色的图像。具备智能功能的相机在提供高质量图像的同时还可简化和加快您的显微镜检查任务。',
    features: ['每秒32帧4K分辨率图像', '890万像素CMOS传感器', '64fps全高清实时图像', '出色的色彩还原', '高达FN25的超宽视场（FOV）'],
    price: '询价',
    specifications: {
      '图像传感器': '1 in. color CMOS',
      '分辨率(最大)': '4104(W)×2174(H) pixels',
      '像素大小': '3.45×3.45µm',
      'A/D': '10 bits'
    }
  },
  {
    id: 34,
    name: 'DP75 显微镜用数码相机',
    category: '相机',
    image: '/brands/olympus/dp75.png',
    description: 'DP75数码显微镜相机是一款高性能、多用途的成像工具，只需一台相机即可轻松捕获高分辨率明场或荧光图像。这款相机让显微镜成像变得轻松简单，让您能够更专注于您的工作。',
    features: ['支持多种染色组合', '定性分析功能', '智能观察检测'],
    price: '询价',
    specifications: {
      '图像传感器': '1.1 inch 12.37 megapixel color CMOS image sensor, global shutter',
      '分辨率(最大)': '8192(W)×6000(H) pixels',
      '像素大小': '3.45×3.45µm',
      'A/D': '12位'
    }
  }
];