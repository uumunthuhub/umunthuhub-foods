'use client';

import React from 'react';

export interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  tenantId?: string;
  tenantName?: string;
  badge?: string;
  isPopular?: boolean;
  isVeg?: boolean;
  isGlutenFree?: boolean;
  isCustomizable?: boolean;
  onAdd: () => void;
  onClick?: () => void;
  className?: string;
  layout?: 'vertical' | 'horizontal';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  image,
  price,
  originalPrice,
  tenantName,
  badge,
  isPopular,
  isVeg,
  isGlutenFree,
  isCustomizable,
  onAdd,
  onClick,
  className = '',
  layout = 'vertical',
}) => {
  const isHorizontal = layout === 'horizontal';

  return (
    <div
      onClick={onClick}
      className={`glass-panel rounded-3xl overflow-hidden border border-[#e1bfb5]/50 hover:shadow-lg transition-all cursor-pointer group ${
        isHorizontal ? 'p-4 flex gap-4' : 'flex flex-col justify-between'
      } ${className}`}
    >
      {isHorizontal ? (
        // Horizontal Layout
        <>
          <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                {isPopular && (
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold bg-[#ff6b35] text-white">
                    POPULAR
                  </span>
                )}
                {isVeg && (
                  <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-[#00ae81]/15 text-[#006c4f] border border-[#00ae81]/30">
                    VEG
                  </span>
                )}
                {isGlutenFree && (
                  <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-[#24619d]/15 text-[#24619d] border border-[#24619d]/30">
                    GF
                  </span>
                )}
              </div>

              <h3 className="font-heading font-bold text-sm text-[#1a1c1c] group-hover:text-[#ab3500] transition-colors">
                {name}
              </h3>
              <p className="text-xs text-[#594139] line-clamp-2 leading-relaxed mt-1">
                {description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="px-3 py-1.5 rounded-lg border-2 border-[#ab3500] bg-white shadow-sm">
                <span className="font-heading font-extrabold text-sm text-[#ab3500]">
                  ${price.toFixed(2)}
                </span>
                {originalPrice && (
                  <span className="text-[11px] text-[#8d7168] line-through ml-1.5">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd();
                }}
                className="px-3.5 py-1.5 rounded-xl glass-button-primary text-xs font-bold flex items-center gap-1 shadow-md shadow-[#ab3500]/20 active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Add</span>
              </button>
            </div>
          </div>

          <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-2xl overflow-hidden border border-[#e1bfb5]/40 shadow-inner">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {isCustomizable && (
              <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[9px] font-bold text-white">
                Customizable
              </div>
            )}
          </div>
        </>
      ) : (
        // Vertical Layout
        <>
          <div>
            <div className="relative h-40 w-full overflow-hidden">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              {badge && (
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#ff6b35] text-white text-[10px] font-bold">
                  {badge}
                </div>
              )}
              {tenantName && (
                <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                  {tenantName}
                </div>
              )}
            </div>

            <div className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-heading font-bold text-xs text-[#1a1c1c] line-clamp-1">
                  {name}
                </h4>
              </div>
              <p className="text-[11px] text-[#594139] line-clamp-2 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          <div className="p-4 pt-2 border-t border-[#e1bfb5]/30 flex items-center justify-between">
            <div className="px-3 py-1.5 rounded-lg border-2 border-[#ab3500] bg-white shadow-sm">
              <span className="font-heading font-extrabold text-base text-[#ab3500]">
                ${price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-[11px] text-[#8d7168] line-through ml-1.5">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
              className="px-3.5 py-1.5 rounded-xl glass-button-primary text-xs font-bold flex items-center gap-1 shadow-md shadow-[#ab3500]/20 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Add</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
