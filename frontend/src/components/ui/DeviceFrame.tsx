import React from 'react';

/** Browser window frame around a screenshot. */
export const BrowserFrame: React.FC<{
  src: string;
  alt: string;
  url?: string;
  className?: string;
  eager?: boolean;
}> = ({ src, alt, url, className = '', eager }) => (
  <figure
    className={`overflow-hidden rounded-[14px] border border-line-strong bg-surface shadow-[0_1px_2px_rgba(12,29,72,0.05),0_40px_80px_-40px_rgba(12,29,72,0.35)] ${className}`}
  >
    <div className="flex items-center gap-3 border-b border-line bg-elevated px-4 py-2.5">
      <span className="flex gap-1.5" aria-hidden="true">
        <i className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <i className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <i className="h-2.5 w-2.5 rounded-full bg-line-strong" />
      </span>
      {url && (
        <span className="mx-auto truncate rounded-full bg-surface px-4 py-1 font-mono text-[11px] text-fg-muted">
          {url}
        </span>
      )}
      <span className="w-10" aria-hidden="true" />
    </div>
    <img
      src={src}
      alt={alt}
      width={1440}
      height={900}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className="block aspect-[16/10] w-full object-cover object-top"
    />
  </figure>
);

/** Phone frame around a mobile screenshot. */
export const PhoneFrame: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = '' }) => (
  <figure
    className={`overflow-hidden rounded-[2.25rem] border-[7px] border-[#11131a] bg-[#11131a] shadow-[0_40px_70px_-30px_rgba(12,29,72,0.5)] ${className}`}
  >
    <img
      src={src}
      alt={alt}
      width={600}
      height={1300}
      loading="lazy"
      decoding="async"
      className="block aspect-[6/13] w-full rounded-[1.75rem] object-cover object-top"
    />
  </figure>
);
