'use client';

import React, { useRef, useState, useEffect } from 'react';

interface ScrollableContainerProps {
  children: React.ReactNode;
  className?: string;
  scrollAmount?: number;
  showFadeGradients?: boolean;
  arrowSize?: 'sm' | 'md' | 'lg';
  id?: string;
}

export const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
  children,
  className = '',
  scrollAmount = 240,
  showFadeGradients = true,
  arrowSize = 'md',
  id,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  useEffect(() => {
    checkScrollability();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScrollability, { passive: true });
    window.addEventListener('resize', checkScrollability);

    const resizeObserver = new ResizeObserver(() => {
      checkScrollability();
    });
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
      resizeObserver.disconnect();
    };
  }, [children]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const delta = direction === 'left' ? -scrollAmount : scrollAmount;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const arrowButtonSizes = {
    sm: 'w-6 h-6 text-[14px]',
    md: 'w-7 h-7 sm:w-8 sm:h-8 text-[16px] sm:text-[18px]',
    lg: 'w-9 h-9 text-[20px]',
  };

  return (
    <div id={id} className="relative group/scroll-container w-full flex items-center">
      {/* Left Scroll Arrow */}
      {canScrollLeft && (
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => handleScroll('left')}
          className={`absolute left-0 z-20 ${arrowButtonSizes[arrowSize]} rounded-full bg-white/95 text-[#1a1c1c] hover:text-[#ab3500] hover:bg-white border border-[#e1bfb5] shadow-lg flex items-center justify-center -translate-x-1 sm:-translate-x-2 transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md`}
        >
          <span className="material-symbols-outlined select-none text-[inherit]">
            chevron_left
          </span>
        </button>
      )}

      {/* Left Fade Gradient Mask */}
      {showFadeGradients && canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#fcf9f8] via-[#fcf9f8]/80 to-transparent pointer-events-none z-10" />
      )}

      {/* Main Scroll Content */}
      <div
        ref={scrollRef}
        className={`flex items-center gap-2 overflow-x-auto scrollbar-none scroll-smooth w-full py-1 ${className}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>

      {/* Right Fade Gradient Mask */}
      {showFadeGradients && canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#fcf9f8] via-[#fcf9f8]/80 to-transparent pointer-events-none z-10" />
      )}

      {/* Right Scroll Arrow */}
      {canScrollRight && (
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => handleScroll('right')}
          className={`absolute right-0 z-20 ${arrowButtonSizes[arrowSize]} rounded-full bg-white/95 text-[#1a1c1c] hover:text-[#ab3500] hover:bg-white border border-[#e1bfb5] shadow-lg flex items-center justify-center translate-x-1 sm:translate-x-2 transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md`}
        >
          <span className="material-symbols-outlined select-none text-[inherit]">
            chevron_right
          </span>
        </button>
      )}
    </div>
  );
};
