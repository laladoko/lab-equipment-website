'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface ApplicationAreasProps {
  applications: string[];
  color: string;
  accentColor: string;
}

export default function ApplicationAreas({ applications, color, accentColor }: ApplicationAreasProps) {
  return (
    <div className="brand-card rounded-3xl p-8">
      <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <CheckCircle className={`w-8 h-8 mr-3 text-${accentColor}-600`} />
        应用领域
      </h3>
      <div className="flex flex-wrap gap-4">
        {applications.map((app, index) => (
          <motion.span
            key={app}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`px-6 py-3 bg-gradient-to-r ${color} text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
          >
            {app}
          </motion.span>
        ))}
      </div>
    </div>
  );
} 