import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children, variant = 'primary', size = 'md', className = '',
  disabled = false, loading = false, icon: Icon, type = 'button', onClick, ...props
}) {
  const base = 'inline-flex items-center justify-center font-medium select-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none';

  const sizes = {
    sm:   'text-xs px-2.5 py-1.5 gap-1.5 rounded-lg',
    md:   'text-xs px-3.5 py-2 gap-2 rounded-xl font-medium',
    lg:   'text-sm px-5 py-2.5 gap-2.5 rounded-[14px] font-semibold',
    pill: 'text-xs px-4 py-2.5 gap-2 rounded-full font-semibold',
  };

  const variants = {
    primary:   'btn-primary-glow bg-[#84E071] text-[#090A0C] font-semibold shadow-sm',
    secondary: 'btn-secondary-hover bg-[#1B1D21] text-[#EDEDED] border border-[#272A2F]',
    outline:   'btn-secondary-hover bg-transparent text-[#9CA3AF] hover:text-[#EDEDED] border border-[#272A2F] hover:bg-[#1B1D21] transition-colors duration-150',
    ghost:     'bg-transparent text-[#9CA3AF] hover:text-[#84E071] hover:bg-[#1B1D21] transition-all duration-150',
    danger:    'bg-rose-900/60 hover:bg-rose-800/80 text-rose-200 border border-rose-700/60 transition-all duration-150 hover:-translate-y-0.5',
    success:   'btn-primary-glow bg-[#84E071] text-[#090A0C] font-semibold',
    obsidian:  'relative bg-gradient-to-b from-[#1C1F26] via-[#111317] to-[#0A0B0E] text-white font-semibold tracking-wide border border-[#84E071]/40 hover:border-[#84E071]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_2px_8px_rgba(0,0,0,0.6),0_0_16px_rgba(132,224,113,0.16)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_4px_16px_rgba(0,0,0,0.7),0_0_26px_rgba(132,224,113,0.32)] hover:-translate-y-px active:translate-y-px active:scale-[0.99] transition-all duration-150',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${base} ${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {loading
        ? <Loader2 className="w-4 h-4 animate-spin text-current" />
        : Icon ? <Icon className="w-4 h-4 text-current" /> : null}
      <span>{children}</span>
    </button>
  );
}
