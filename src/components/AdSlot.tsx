import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

interface AdSlotProps {
  slotId?: string;
  format?: 'banner' | 'rectangle';
}

export const AdSlot: React.FC<AdSlotProps> = ({ slotId, format = 'banner' }) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      // Ignorujemy błędy ad-blockerów
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden flex flex-col items-center justify-center text-center transition-all ${
      format === 'banner' ? 'min-h-[90px] my-2' : 'min-h-[250px] my-4'
    }`}>
      {/* Prawdziwy slot Google AdSense */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center', width: '100%' }}
        data-ad-client="ca-pub-7604952711837468"
        data-ad-slot={slotId || ''}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
