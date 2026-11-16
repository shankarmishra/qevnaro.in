import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const Word: React.FC<{ children: string; range: [number, number]; progress: MotionValue<number>; accent: boolean }> = ({
  children,
  range,
  progress,
  accent,
}) => {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? 'serif-accent text-brand-blue' : undefined}>
      {children}{' '}
    </motion.span>
  );
};

/**
 * A paragraph whose words darken one by one as it scrolls through the viewport.
 * Wrap words in *asterisks* to set them in the serif italic accent.
 */
export const TextReveal: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      {words.map((raw, i) => {
        const accent = raw.startsWith('*');
        const word = raw.replace(/\*/g, '');
        const start = i / words.length;
        const end = Math.min(1, start + 1.6 / words.length);
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress} accent={accent}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

export default TextReveal;
