import React from 'react';

interface AdSlotProps {
  slotId?: string;
  format?: 'banner' | 'rectangle';
}

export const AdSlot: React.FC<AdSlotProps> = ({ format = 'banner' }) => {
  return (
    <div className={`w-full rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex flex-col items-center justify-center text-center p-4 transition-colors ${
      format === 'banner' ? 'min-h-[90px]' : 'min-h-[250px]'
    }`}>
      <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 tracking-wider">
        Miejsce na reklamę (Google AdSense)
      </span>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
        Slot reklamowy zoptymalizowany pod kątem szybkości ładowania
      </p>
    </div>
  );
};
