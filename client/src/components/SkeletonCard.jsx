import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="relative w-full h-[540px] rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg animate-pulse">
      {/* 1. TOP SECTION (Image Placeholder) */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gray-300 dark:bg-gray-700"></div>

      {/* 2. BOTTOM PANEL */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 p-6 flex flex-col justify-between">
        
        {/* --- MAIN INFO --- */}
        <div>
          <div className="mb-4">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
          
          <div className="space-y-2 mb-5">
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mb-2"></div>
          
          <div className="flex items-center gap-2">
             <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
             <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
