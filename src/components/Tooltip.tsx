import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
  title?: string;
  children?: React.ReactNode;
  align?: 'auto' | 'left' | 'right' | 'center';
}

export const Tooltip: React.FC<TooltipProps> = ({ content, title, children, align = 'auto' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [positionClass, setPositionClass] = useState('left-1/2 -translate-x-1/2');
  const [arrowPositionClass, setArrowPositionClass] = useState('left-1/2 -translate-x-1/2');
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      if (align === 'right') {
        setPositionClass('right-0');
        setArrowPositionClass('right-3');
        return;
      }
      if (align === 'left') {
        setPositionClass('left-0');
        setArrowPositionClass('left-3');
        return;
      }

      // Automatyczne wykrywanie krawędzi ekranu
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      // Jeśli wyjeżdża za prawą krawędź ekranu
      if (triggerRect.left + (tooltipRect.width / 2) > viewportWidth - 16) {
        setPositionClass('right-0 sm:right-0 sm:translate-x-0');
        setArrowPositionClass('right-3');
      } 
      // Jeśli wyjeżdża za lewą krawędź ekranu
      else if (triggerRect.left - (tooltipRect.width / 2) < 16) {
        setPositionClass('left-0 sm:left-0 sm:translate-x-0');
        setArrowPositionClass('left-3');
      } 
      // Bezpiecznie na środku
      else {
        setPositionClass('left-1/2 -translate-x-1/2');
        setArrowPositionClass('left-1/2 -translate-x-1/2');
      }
    }
  }, [isVisible, align]);

  return (
    <div 
      ref={triggerRef}
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
    >
      {children ? (
        children
      ) : (
        <button 
          type="button" 
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5"
          aria-label="Więcej informacji"
        >
          <HelpCircle className="w-4 h-4 inline" />
        </button>
      )}

      {isVisible && (
        <div 
          ref={tooltipRef}
          className={`absolute bottom-full mb-2.5 z-50 w-64 max-w-[calc(100vw-2rem)] p-3 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs rounded-xl shadow-2xl pointer-events-none transition-all duration-150 animate-in fade-in zoom-in-95 ${positionClass}`}
        >
          {title && <div className="font-bold mb-1 text-slate-200 dark:text-slate-800">{title}</div>}
          <div className="leading-relaxed opacity-95">{content}</div>
          <div className={`absolute top-full border-4 border-transparent border-t-slate-900 dark:border-t-slate-100 ${arrowPositionClass}`} />
        </div>
      )}
    </div>
  );
};
