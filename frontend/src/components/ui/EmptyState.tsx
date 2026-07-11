import React from 'react';
import { LucideIcon, Plus } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  primaryActionText?: string;
  onPrimaryAction?: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  primaryActionText,
  onPrimaryAction,
  secondaryActionText,
  onSecondaryAction
}: EmptyStateProps) {
  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-white border border-gray-200 border-dashed rounded-xl p-8 font-sans">
      <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-6">
        <Icon size={32} />
      </div>
      <h3 className="text-xl font-heading font-bold text-foreground mb-2">{title}</h3>
      <p className="text-secondary text-sm max-w-md text-center mb-8">
        {description}
      </p>
      
      <div className="flex items-center gap-4">
        {primaryActionText && onPrimaryAction && (
          <button 
            onClick={onPrimaryAction}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            <Plus size={16} />
            {primaryActionText}
          </button>
        )}
        
        {secondaryActionText && onSecondaryAction && (
          <button 
            onClick={onSecondaryAction}
            className="flex items-center gap-2 bg-white text-secondary border border-gray-200 px-5 py-2.5 rounded font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            {secondaryActionText}
          </button>
        )}
      </div>
    </div>
  );
}
