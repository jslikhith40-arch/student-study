import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  showTagline = false,
  className = ''
}) => {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', spark: 'w-2.5 h-2.5', padding: 'p-1.5' },
    md: { icon: 'w-10 h-10', text: 'text-xl', spark: 'w-3.5 h-3.5', padding: 'p-2' },
    lg: { icon: 'w-14 h-14', text: 'text-2xl', spark: 'w-4 h-4', padding: 'p-3' },
    xl: { icon: 'w-20 h-20', text: 'text-4xl', spark: 'w-5 h-5', padding: 'p-4' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`} id="studymate-logo-container">
      {/* Visual Emblem: Graduation Cap + Open Book + AI Spark */}
      <div 
        id="studymate-logo-icon-wrap"
        className={`relative ${currentSize.icon} bg-gradient-to-tr from-indigo-600 via-indigo-700 to-blue-500 rounded-2xl flex items-center justify-center shadow-md shadow-indigo-500/20 text-white`}
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-3/5 h-3/5"
        >
          {/* Graduation Cap Top */}
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          {/* Open Book / Diploma Arc */}
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>

        {/* AI Spark Overlay badge */}
        <div 
          id="studymate-logo-spark"
          className={`absolute -top-1 -right-1 ${currentSize.spark} bg-amber-400 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900 shadow-sm animate-pulse`}
          title="AI Powered"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-2/3 h-2/3 text-slate-900">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-bold tracking-tight text-slate-900 dark:text-white ${currentSize.text}`}>
              StudyMate
            </span>
            <span className={`font-black tracking-tight text-indigo-600 dark:text-indigo-400 ${currentSize.text}`}>
              AI
            </span>
          </div>
          {showTagline && (
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-wide">
              Learn Smarter. Attend Better. Grow Faster.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
