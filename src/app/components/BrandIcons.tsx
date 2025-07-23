'use client';

interface BrandIconProps {
  brand: 'evident-olympus' | 'bruker' | 'wiggens' | 'fritsch';
  className?: string;
  size?: number;
}

export default function BrandIcon({ brand, className = "", size = 48 }: BrandIconProps) {
  const icons = {
    'evident-olympus': (
      <svg width={size} height={size} viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Background */}
        <rect width="300" height="150" fill="white" rx="12"/>
        
        {/* EVIDENT */}
        <text x="50" y="50" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#333333">
          EVIDENT
        </text>
        
        {/* Stylized V with blue lines */}
        <path d="M 80 25 L 90 45 L 100 25" stroke="#3B82F6" strokeWidth="2" fill="none"/>
        <path d="M 85 30 L 95 45 L 105 30" stroke="#3B82F6" strokeWidth="2" fill="none"/>
        <path d="M 90 35 L 100 45 L 110 35" stroke="#3B82F6" strokeWidth="2" fill="none"/>
        
        {/* Vertical line separator */}
        <line x1="150" y1="20" x2="150" y2="50" stroke="#CCCCCC" strokeWidth="1.5"/>
        
        {/* OLYMPUS */}
        <text x="170" y="50" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#3B82F6">
          OLYMPUS
        </text>
        
        {/* Yellow line under OLYMPUS */}
        <line x1="170" y1="60" x2="250" y2="60" stroke="#F59E0B" strokeWidth="2"/>
      </svg>
    ),
    
    'bruker': (
      <svg width={size} height={size} viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Background */}
        <rect width="300" height="150" fill="white" rx="12"/>
        
        {/* Blue orbital ellipses */}
        <ellipse cx="150" cy="75" rx="80" ry="20" stroke="#3B82F6" strokeWidth="3" fill="none"/>
        <ellipse cx="150" cy="75" rx="20" ry="45" stroke="#3B82F6" strokeWidth="3" fill="none"/>
        
        {/* Blue dots */}
        <circle cx="70" cy="55" r="3" fill="#3B82F6"/>
        <circle cx="230" cy="95" r="3" fill="#3B82F6"/>
        
        {/* BRUKER text */}
        <text x="150" y="85" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#333333" textAnchor="middle">
          BRUKER
        </text>
      </svg>
    ),
    
    'wiggens': (
      <svg width={size} height={size} viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Background */}
        <rect width="300" height="150" fill="white" rx="12"/>
        
        {/* WIGGENS text with metallic blue effect */}
        <text x="150" y="70" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#1E40AF" textAnchor="middle">
          WIGGENS
        </text>
        
        {/* Light blue outline effect */}
        <text x="150" y="70" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#60A5FA" textAnchor="middle" opacity="0.3">
          WIGGENS
        </text>
      </svg>
    ),
    
    'fritsch': (
      <svg width={size} height={size} viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Background */}
        <rect width="300" height="150" fill="white" rx="12"/>
        
        {/* FRITSCH text */}
        <text x="150" y="70" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fontStyle="italic" fill="#DC2626" textAnchor="middle">
          FRITSCH
        </text>
        
        {/* Dark red shadow effect */}
        <text x="153" y="73" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fontStyle="italic" fill="#991B1B" textAnchor="middle" opacity="0.5">
          FRITSCH
        </text>
        
        {/* Grey bar */}
        <rect x="90" y="85" width="120" height="4" fill="#9CA3AF"/>
        
        {/* Two small grey rectangles */}
        <rect x="75" y="75" width="3" height="15" fill="#9CA3AF"/>
        <rect x="81" y="75" width="3" height="15" fill="#9CA3AF"/>
        
        {/* Red triangle */}
        <polygon points="87,85 93,95 87,95" fill="#DC2626"/>
      </svg>
    )
  };

  return icons[brand] || null;
} 