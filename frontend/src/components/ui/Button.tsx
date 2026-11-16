import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * primary = solid navy (default call to action)
 * accent  = brand blue (one per view at most)
 * outline = hairline border on the canvas ("ghost" is kept as an alias)
 * light   = white, for use on navy panels
 */
type Variant = 'primary' | 'accent' | 'outline' | 'ghost' | 'light';
type Size = 'sm' | 'md' | 'lg';

const base =
  'btn-sheen group relative inline-flex overflow-hidden items-center justify-center gap-2 rounded-full font-medium ' +
  'transition-[background-color,border-color,color,transform,box-shadow] duration-300 touch-manipulation select-none active:scale-[0.98] ' +
  'disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-[13px] min-h-[38px]',
  md: 'px-6 py-3 text-sm min-h-[46px]',
  lg: 'px-7 py-3.5 text-[15px] min-h-[52px]',
};

const outline =
  'border border-line-strong bg-transparent text-fg hover:border-fg hover:bg-fg hover:text-canvas';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-navy text-white border border-brand-navy ' +
    'shadow-[0_1px_2px_rgba(12,29,72,0.2),0_10px_24px_-14px_rgba(12,29,72,0.55)] ' +
    'hover:bg-[#13296a] hover:-translate-y-px',
  accent:
    'bg-brand-blue text-white border border-brand-blue ' +
    'shadow-[0_1px_2px_rgba(49,117,254,0.25),0_10px_24px_-14px_rgba(49,117,254,0.7)] ' +
    'hover:bg-brand-blue-hover hover:-translate-y-px',
  outline,
  ghost: outline,
  light:
    'bg-white text-brand-navy border border-white hover:bg-canvas hover:-translate-y-px',
};

interface Props {
  to?: string;
  href?: string;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<Props> = ({
  to,
  href,
  variant = 'primary',
  size = 'md',
  arrow = true,
  className = '',
  children,
  type = 'button',
  disabled,
  onClick,
}) => {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowRight className="relative z-10 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  if (href) return <a href={href} className={cls} target="_blank" rel="noreferrer">{inner}</a>;
  return <button type={type} className={cls} disabled={disabled} onClick={onClick}>{inner}</button>;
};

export default Button;
