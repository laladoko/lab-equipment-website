'use client';


import { CheckCircle } from 'lucide-react';

interface BrandIntroductionProps {
  longDescription: string;
  accentColor: string;
}

export default function BrandIntroduction({ longDescription, accentColor }: BrandIntroductionProps) {
  return (
    <div className="brand-card rounded-3xl p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
        <CheckCircle className={`w-8 h-8 mr-3 text-${accentColor}-600`} />
        品牌介绍
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        {longDescription}
      </p>
    </div>
  );
} 