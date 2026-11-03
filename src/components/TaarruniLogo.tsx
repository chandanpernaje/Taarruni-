import React from 'react';

interface TaarruniLogoProps {
  className?: string;
  variant?: 'light-badge' | 'transparent';
  size?: 'sm' | 'md' | 'lg';
}

export const TaarruniLogo: React.FC<TaarruniLogoProps> = ({
  className = '',
  variant = 'light-badge',
  size = 'md',
}) => {
  const heightClass =
    size === 'sm' ? 'h-7' : size === 'lg' ? 'h-10 sm:h-12' : 'h-8 sm:h-9';

  if (variant === 'light-badge') {
    return (
      <div
        className={`inline-flex items-center justify-center bg-white hover:bg-slate-50 px-3 py-1.5 rounded-xl shadow-md shadow-black/20 border border-white/20 transition-all duration-200 group-hover:scale-[1.02] ${className}`}
      >
        <img
          src="/images/logo.png"
          alt="Taarruni Design Solutions"
          className={`${heightClass} w-auto object-contain select-none`}
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src="/images/logo.png"
        alt="Taarruni Design Solutions"
        className={`${heightClass} w-auto object-contain select-none`}
        loading="eager"
      />
    </div>
  );
};
