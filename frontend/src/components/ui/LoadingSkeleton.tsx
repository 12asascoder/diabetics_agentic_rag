import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'table' | 'list' | 'detail';
  count?: number;
}

export function LoadingSkeleton({ type = 'card', count = 1 }: LoadingSkeletonProps) {
  const renderItem = (index: number) => {
    switch (type) {
      case 'table':
        return (
          <div key={index} className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0 w-full animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        );
      case 'list':
        return (
          <div key={index} className="flex items-center gap-4 py-3 animate-pulse">
            <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-3 bg-gray-100 rounded w-1/2"></div>
            </div>
          </div>
        );
      case 'detail':
        return (
          <div key={index} className="space-y-6 animate-pulse p-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6"></div>
              <div className="h-4 bg-gray-100 rounded w-4/6"></div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="h-32 bg-gray-50 rounded-lg border border-gray-100"></div>
              <div className="h-32 bg-gray-50 rounded-lg border border-gray-100"></div>
            </div>
          </div>
        );
      case 'card':
      default:
        return (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 h-48 flex flex-col justify-between animate-pulse">
            <div className="space-y-3">
              <div className="h-5 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-100 rounded w-3/4"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-8 w-24 bg-gray-100 rounded"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`w-full ${type === 'card' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : ''}`}>
      {Array.from({ length: count }).map((_, i) => renderItem(i))}
    </div>
  );
}
