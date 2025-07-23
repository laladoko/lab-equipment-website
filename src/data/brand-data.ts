// 品牌数据类型定义
export interface BrandData {
  name: string;
  description: string;
  longDescription: string;
  features: string[];
  products: string[];
  applications: string[];
  color: string;
  accentColor: string;
  category: string;
  official: boolean;
  yearEstablished: number;
}

// 品牌数据
export const brandData: Record<string, BrandData> = {
  'olympus': {
    name: 'EVIDENT / OLYMPUS',
    description: '全球领先的光学仪器制造商，专业提供显微镜、内窥镜等精密光学设备',
    longDescription: 'EVIDENT/OLYMPUS是全球知名的光学仪器制造商，在显微镜、内窥镜、工业检测设备等领域享有盛誉。我们作为官方授权代理商，为客户提供最优质的产品和服务。',
    features: ['数码显微镜', '激光扫描显微镜', '测量显微镜', '工业检测设备', '表面分析仪器', '半导体检测设备'],
    products: [
      'DSX2000 数码显微镜',
      'OLS5100 3D激光扫描显微镜',
      'STM7 测量显微镜',
      'SZX7 体视显微镜',
      'DSX1000 数码显微镜',
      'GX53 倒置显微镜',
      'BX53M 正置金相显微镜',
      'SZX16 体视显微镜',
      'BXFM 设备组装型系统工业显微镜',
      'MX63/MX63L 半导体工业检测显微镜',
      'SZX10 体视显微镜'
    ],
    applications: ['工业检测', '材料分析', '质量控制', '表面分析', '精密测量', '电子元件检测', '半导体检测'],
    color: 'from-blue-600 to-blue-700',
    accentColor: 'blue',
    category: '光学仪器',
    official: true,
    yearEstablished: 1919
  },
  'bruker': {
    name: 'BRUKER',
    description: '世界知名的分析仪器制造商，专注于核磁共振、质谱、X射线分析等高端分析设备',
    longDescription: 'BRUKER是全球领先的分析仪器制造商，在核磁共振、质谱、X射线分析等领域拥有世界级的技术和产品。我们提供从样品制备到数据分析的完整解决方案。',
    features: ['核磁共振仪', '质谱仪', 'X射线衍射仪', '分子光谱仪'],
    products: [
      'AVANCE III HD 核磁共振仪',
      'MALDI-TOF 质谱仪',
      'D8 ADVANCE X射线衍射仪',
      'VERTEX 70 红外光谱仪',
      'SENTERRA 拉曼光谱仪',
      'TENSOR 27 红外光谱仪'
    ],
    applications: ['药物研发', '材料科学', '食品安全', '环境监测', '法医分析'],
    color: 'from-blue-500 to-blue-600',
    accentColor: 'blue',
    category: '分析仪器',
    official: true,
    yearEstablished: 1960
  },
  'wiggens': {
    name: 'WIGGENS',
    description: '德国知名实验室设备制造商，提供高品质的实验室通用设备和耗材',
    longDescription: 'WIGGENS是德国知名的实验室设备制造商，专注于提供高品质的实验室通用设备、精密天平和实验室耗材。我们的产品以德国工艺的严谨和可靠性著称。',
    features: ['实验室通用设备', '精密天平', '离心机', '实验室耗材'],
    products: [
      'BL-220H 精密天平',
      'VORTEX-2 涡旋混合器',
      'WH-861 恒温振荡器',
      'WH-861A 恒温振荡器',
      'WH-861B 恒温振荡器',
      'WH-861C 恒温振荡器'
    ],
    applications: ['实验室常规分析', '样品制备', '质量控制', '教学实验', '科研工作'],
    color: 'from-blue-400 to-blue-500',
    accentColor: 'blue',
    category: '实验室设备',
    official: true,
    yearEstablished: 1950
  },
  'fritsch': {
    name: 'FRITSCH',
    description: '德国专业研磨设备制造商，在样品制备和颗粒分析领域享有盛誉',
    longDescription: 'FRITSCH是德国专业的研磨设备制造商，在样品制备和颗粒分析领域拥有超过90年的经验。我们的产品广泛应用于材料科学、地质学、化学等领域。',
    features: ['研磨设备', '筛分设备', '激光粒度仪', '样品制备设备'],
    products: [
      'PULVERISETTE 7 行星式球磨机',
      'PULVERISETTE 6 单罐球磨机',
      'ANALYSETTE 22 激光粒度仪',
      'ANALYSETTE 3 振动筛分仪',
      'PULVERISETTE 1 实验室切割磨',
      'PULVERISETTE 2 实验室切割磨'
    ],
    applications: ['材料科学研究', '地质样品制备', '纳米材料制备', '颗粒分析', '质量控制'],
    color: 'from-indigo-500 to-indigo-600',
    accentColor: 'indigo',
    category: '样品制备',
    official: true,
    yearEstablished: 1920
  }
};

// 获取品牌数据
export const getBrandData = (brandName: string): BrandData | undefined => {
  return brandData[brandName];
};

// 获取所有品牌名称
export const getAllBrandNames = (): string[] => {
  return Object.keys(brandData);
};

// 检查品牌是否存在
export const isBrandExists = (brandName: string): boolean => {
  return brandName in brandData;
}; 