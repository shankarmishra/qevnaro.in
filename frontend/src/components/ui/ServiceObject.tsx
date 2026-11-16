import React, { Suspense, lazy, useEffect, useState } from 'react';
import { LineArt, type LineArtKind } from './line-art/LineArt';
import type { ObjectKind } from '../three/objects';

const ObjectView = lazy(() => import('../three/objects'));

const FALLBACK: Record<ObjectKind, LineArtKind> = { build: 'code', grow: 'growth', brand: 'brand', automate: 'ai' };

/** Maps a service group's line-art kind to its 3D object. */
export const objectFor = (art: string): ObjectKind =>
  art === 'growth' || art === 'search' ? 'grow' : art === 'brand' || art === 'design' ? 'brand' : art === 'ai' || art === 'cloud' ? 'automate' : 'build';

/** True after the browser has had a quiet moment, so 3D never competes with first paint. */
export function useIdle(timeout = 1200) {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setIdle(true), { timeout });
      return () => (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
    }
    const id = setTimeout(() => setIdle(true), timeout);
    return () => clearTimeout(id);
  }, [timeout]);
  return idle;
}

function canUse3D() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  // Small 3D objects are a desktop flourish; phones keep the line drawing and save the download.
  if (!window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches) return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * A live 3D object for a service group. Server HTML and devices without WebGL get the
 * matching line drawing instead; the 3D version takes over once the page is idle.
 */
export const ServiceObject: React.FC<{ kind: ObjectKind; className?: string }> = ({ kind, className = '' }) => {
  const idle = useIdle();
  const [ok, setOk] = useState(false);
  useEffect(() => setOk(canUse3D()), []);
  const live = idle && ok;

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div className={`absolute inset-0 text-brand-navy transition-opacity duration-700 ${live ? 'opacity-0' : 'opacity-100'}`}>
        <LineArt kind={FALLBACK[kind]} className="h-full w-full" />
      </div>
      {live && (
        <Suspense fallback={null}>
          <ObjectView kind={kind} className="absolute inset-0" />
        </Suspense>
      )}
    </div>
  );
};

export default ServiceObject;
