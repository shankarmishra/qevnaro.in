import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr, Environment, Lightformer, MeshReflectorMaterial, PerformanceMonitor } from '@react-three/drei';
import { Bloom, DepthOfField, EffectComposer, Vignette } from '@react-three/postprocessing';
import type { DepthOfFieldEffect } from 'postprocessing';
import type { MotionValue } from 'framer-motion';
import { MarkScene, type SceneState } from './MarkScene';
import { useVisible } from '../../lib/useVisible';

type V3 = [number, number, number];

/**
 * Camera keyframes over scroll progress: intro beside the copy, a push through the opening of
 * the Q, the gallery behind it, a swing across the staircase, then a pull-back to the whole system.
 */
const KEYS: { t: number; p: V3; l: V3 }[] = [
  { t: 0.0, p: [0, 0.15, 10.5], l: [0, 0, 0] },
  { t: 0.14, p: [0, 0.12, 9.2], l: [0, 0, 0] },
  { t: 0.26, p: [-0.12, 0.16, 1.7], l: [-0.12, 0.16, -6] },
  { t: 0.34, p: [-0.12, 0.18, -1.4], l: [0, 0.25, -8] },
  { t: 0.45, p: [0, 0.4, -3], l: [0, 0.3, -8.5] },
  { t: 0.6, p: [-2.6, 0.1, -2.2], l: [0.6, 0.7, -9.6] },
  { t: 0.74, p: [-1.8, 0.5, -1.6], l: [1, 1.1, -9.8] },
  { t: 0.86, p: [-5.5, 2.2, 5], l: [0, 0.4, -2] },
  { t: 1.0, p: [0.4, 0.8, 12], l: [0, 0.2, -1.6] },
];
const POS = new THREE.CatmullRomCurve3(KEYS.map((k) => new THREE.Vector3(...k.p)), false, 'centripetal');
const LOOK = new THREE.CatmullRomCurve3(KEYS.map((k) => new THREE.Vector3(...k.l)), false, 'centripetal');

/** Map scroll progress onto the curve so each keyframe is reached at its own time. */
function curveT(p: number) {
  for (let i = 0; i < KEYS.length - 1; i++) {
    const a = KEYS[i].t;
    const b = KEYS[i + 1].t;
    if (p <= b) return (i + (p - a) / (b - a)) / (KEYS.length - 1);
  }
  return 1;
}

/** Where the lens focuses in each beat. */
const FOCUS: { t: number; f: V3 }[] = [
  { t: 0, f: [0, 0, 0] },
  { t: 0.2, f: [0, 0, 0] },
  { t: 0.32, f: [0, 0.35, -8.6] },
  { t: 0.46, f: [0, 0.35, -8.6] },
  { t: 0.56, f: [0.2, 0.6, -9.6] },
  { t: 0.74, f: [0.2, 0.6, -9.6] },
  { t: 0.9, f: [0, 0, 0] },
  { t: 1, f: [0, 0, 0] },
];

const ss = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function Rig({
  progress,
  still,
  state,
  dof,
}: {
  progress: MotionValue<number>;
  still: boolean;
  state: SceneState;
  dof: React.RefObject<DepthOfFieldEffect | null>;
}) {
  const { camera, pointer, size } = useThree();
  const look = useRef(new THREE.Vector3());
  const tmpP = useMemo(() => new THREE.Vector3(), []);
  const tmpL = useMemo(() => new THREE.Vector3(), []);
  const fa = useMemo(() => new THREE.Vector3(), []);
  const fb = useMemo(() => new THREE.Vector3(), []);
  const focus = useMemo(() => new THREE.Vector3(), []);
  const first = useRef(true);

  useFrame((_, dt) => {
    const target = still ? 0.02 : THREE.MathUtils.clamp(progress.get(), 0, 1);
    state.v = still || first.current ? target : THREE.MathUtils.damp(state.v, target, 4, dt);
    const p = state.v;
    const narrow = size.width < 768;

    const u = curveT(p);
    POS.getPoint(u, tmpP);
    LOOK.getPoint(u, tmpL);

    if (narrow) {
      // Phones: stand further back for the intro and the later beats, never during the fly-through.
      tmpP.z += 5 * (1 - ss(0.1, 0.22, p));
    }
    // Gentle parallax, faded out while the camera threads the opening.
    const threading = ss(0.18, 0.24, p) * (1 - ss(0.36, 0.42, p));
    if (!still) {
      tmpP.x += pointer.x * 0.3 * (1 - threading);
      tmpP.y += pointer.y * 0.16 * (1 - threading);
    }
    const k = first.current ? 1 : 1 - Math.exp(-6 * dt);
    camera.position.lerp(tmpP, k);
    if (first.current) look.current.copy(tmpL);
    else look.current.lerp(tmpL, k);
    camera.lookAt(look.current);

    // Keep the picture clear of the copy: right of it on desktop, below it on phones.
    const intro = still ? 1 : 1 - ss(0.08, 0.22, p);
    const cam = camera as THREE.PerspectiveCamera;
    // Portrait screens get a wider lens instead of a camera that backs into the mark.
    const fov = narrow ? 54 : 34;
    if (cam.fov !== fov) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }
    const ox = narrow ? 0 : -size.width * (0.1 + 0.12 * intro);
    // On phones the closing shot rises so the chapter caption sits below the mark.
    const oy = narrow ? -size.height * (0.03 + 0.31 * intro) + size.height * 0.17 * ss(0.84, 0.98, p) : 0;
    cam.setViewOffset(size.width, size.height, ox, oy, size.width, size.height);

    // Rack focus between the mark and the work.
    const d = dof.current;
    if (d) {
      let i = 0;
      while (i < FOCUS.length - 2 && p > FOCUS[i + 1].t) i++;
      fa.set(...FOCUS[i].f);
      fb.set(...FOCUS[i + 1].f);
      focus.copy(fa).lerp(fb, ss(FOCUS[i].t, FOCUS[i + 1].t, p));
      if (d.target) d.target.copy(focus);
      else d.target = focus.clone();
    }
    first.current = false;
  });
  return null;
}

/** Tells the page the scene has drawn; keeps a demand-driven canvas drawing while textures settle. */
function Ready({ onReady, still }: { onReady?: () => void; still: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    onReady?.();
    if (!still) return;
    let n = 0;
    const id = setInterval(() => {
      invalidate();
      if (++n > 16) clearInterval(id);
    }, 120);
    return () => clearInterval(id);
  }, [invalidate, onReady, still]);
  return null;
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]}>
      <planeGeometry args={[140, 140]} />
      <MeshReflectorMaterial
        resolution={512}
        blur={[420, 120]}
        mixBlur={1}
        mixStrength={0.55}
        mirror={0}
        depthScale={0.4}
        minDepthThreshold={0.6}
        maxDepthThreshold={1.3}
        color="#f1f0ea"
        metalness={0}
        roughness={1}
      />
    </mesh>
  );
}

export default function HeroCanvas({
  progress,
  still = false,
  onReady,
}: {
  progress: MotionValue<number>;
  still?: boolean;
  onReady?: () => void;
}) {
  const state = useMemo<SceneState>(() => ({ v: 0 }), []);
  const dof = useRef<DepthOfFieldEffect | null>(null);
  const [ref, visible] = useVisible<HTMLDivElement>('0px');
  const [hq, setHq] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= 900 && !window.matchMedia('(pointer: coarse)').matches,
  );
  const narrow = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div ref={ref} className="absolute inset-0">
      <Canvas
        flat
        frameloop={!visible ? 'never' : still ? 'demand' : 'always'}
        dpr={hq ? [1, 1.75] : [1, 1.5]}
        camera={{ position: KEYS[0].p, fov: 34, near: 0.05, far: 90 }}
        gl={{ antialias: !hq, powerPreference: 'high-performance', stencil: false }}
      >
        <color attach="background" args={['#FAFAF7']} />
        <fog attach="fog" args={['#FAFAF7', 16, 44]} />
        <PerformanceMonitor onDecline={() => setHq(false)} />
        <AdaptiveDpr pixelated={false} />

        <hemisphereLight args={['#ffffff', '#ebe8de', 1.1]} />
        <directionalLight position={[-5, 8, 6]} intensity={1.6} color="#fff8ee" />
        <directionalLight position={[6, 2, -4]} intensity={0.8} color="#dfe8ff" />

        <Suspense fallback={null}>
          <Environment resolution={256} frames={1}>
            <Lightformer form="rect" intensity={3.2} position={[-5, 4, 5]} scale={[8, 5, 1]} color="#ffffff" />
            <Lightformer form="rect" intensity={1.8} position={[0, 7, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[12, 12, 1]} color="#fdfbf5" />
            <Lightformer form="ring" intensity={2.4} position={[6, 1.5, 3]} scale={3} color="#cfdcff" />
            <Lightformer form="rect" intensity={1.2} position={[0, -3, 6]} scale={[10, 2, 1]} color="#3175FE" />
          </Environment>
          <MarkScene state={state} hq={hq} count={narrow ? 4 : 8} />
          {hq && <Floor />}
          <Ready onReady={onReady} still={still} />
        </Suspense>

        <Rig progress={progress} still={still} state={state} dof={dof} />

        {hq && (
          <EffectComposer multisampling={4}>
            <DepthOfField ref={dof} target={[0, 0, 0]} worldFocusRange={2.8} bokehScale={2.6} />
            <Bloom mipmapBlur luminanceThreshold={1} luminanceSmoothing={0.15} intensity={0.8} />
            <Vignette offset={0.32} darkness={0.22} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
