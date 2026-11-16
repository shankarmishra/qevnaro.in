import { forwardRef, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Line, MeshTransmissionMaterial, RoundedBox, useTexture } from '@react-three/drei';
import type { LineSegments2 } from 'three-stdlib';
import { QEVNARO_CHEVRON_PATH, QEVNARO_NAVY_PATH } from '../common/QevnaroLogo';

/** Shared scroll state. `v` is the smoothed 0..1 progress, written by the camera rig every frame. */
export interface SceneState {
  v: number;
}

const BLUE = new THREE.Color('#3175FE');
const NAVY = '#0C1D48';

const ss = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/* ───────────────────────────── The glass mark ───────────────────────────── */

/** World units per SVG unit of the logo artwork (viewBox 117 × 107). */
export const MARK_SCALE = 0.034;
const CX = 58.4;
const CY = 53.45;

/** The logo paths are plain M/L/Z polygons, so a number list is all that is needed. */
function shapeFromPath(d: string) {
  const n = (d.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
  const s = new THREE.Shape();
  for (let i = 0; i < n.length; i += 2) {
    if (i === 0) s.moveTo(n[i], -n[i + 1]);
    else s.lineTo(n[i], -n[i + 1]);
  }
  s.closePath();
  return s;
}

function extrude(d: string, depth: number, bevel: number) {
  const g = new THREE.ExtrudeGeometry(shapeFromPath(d), {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel * 0.75,
    bevelSegments: 8,
    curveSegments: 1,
  });
  g.translate(-CX, CY, -depth / 2);
  g.computeVertexNormals();
  return g;
}

function Mark({ state, hq }: { state: SceneState; hq: boolean }) {
  const q = useMemo(() => extrude(QEVNARO_NAVY_PATH, 16, 3.2), []);
  const chev = useMemo(() => extrude(QEVNARO_CHEVRON_PATH, 10, 2.2), []);
  const root = useRef<THREE.Group>(null);
  const chevron = useRef<THREE.Group>(null);
  const pointer = useThree((s) => s.pointer);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const p = state.v;
    // Free to turn while idle; squares up to the camera for the fly-through.
    const free = 1 - ss(0.12, 0.24, p) * (1 - ss(0.84, 0.97, p));
    const g = root.current;
    if (g) {
      g.rotation.y = (Math.sin(t * 0.35) * 0.32 + pointer.x * 0.22) * free;
      g.rotation.x = (Math.sin(t * 0.27) * 0.07 - pointer.y * 0.1) * free;
      g.position.y = Math.sin(t * 0.6) * 0.04 * free;
    }
    // The chevron swings down and back, opening the Q for the camera to pass through.
    const open = ss(0.15, 0.26, p) * (1 - ss(0.8, 0.94, p));
    const c = chevron.current;
    if (c) {
      c.position.set(0, -26 * open, -24 * open);
      c.rotation.x = 0.6 * open;
    }
  });

  return (
    <group ref={root}>
      <group scale={MARK_SCALE}>
        <mesh geometry={q}>
          {hq ? (
            <MeshTransmissionMaterial
              samples={6}
              resolution={768}
              thickness={0.6}
              roughness={0.04}
              transmission={1}
              ior={1.45}
              chromaticAberration={0.05}
              anisotropy={0.15}
              distortion={0.12}
              distortionScale={0.35}
              temporalDistortion={0.06}
              color="#d4def4"
              attenuationColor="#4f72c8"
              attenuationDistance={1.5}
              clearcoat={1}
              clearcoatRoughness={0.05}
            />
          ) : (
            <meshPhysicalMaterial
              color="#c6d3f0"
              roughness={0.08}
              metalness={0}
              transmission={1}
              thickness={0.6}
              ior={1.45}
              clearcoat={1}
              attenuationColor="#4d6fc4"
              attenuationDistance={1.4}
            />
          )}
        </mesh>
        <group ref={chevron}>
          <mesh geometry={chev}>
            <meshPhysicalMaterial
              color="#3175FE"
              emissive="#3175FE"
              emissiveIntensity={0.35}
              roughness={0.22}
              metalness={0.15}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ───────────────────────────── The work screens ───────────────────────────── */

type Kind = 'desk' | 'phone' | 'tall';

const SCREENS: { url: string; kind: Kind }[] = [
  { url: '/assets/work/pulsencare-desktop.webp', kind: 'desk' },
  { url: '/assets/work/menusqr-desktop.webp', kind: 'desk' },
  { url: '/assets/work/pulsencare-mobile.webp', kind: 'phone' },
  { url: '/assets/work/menusqr-mobile.webp', kind: 'phone' },
  { url: '/assets/work/pulsencare-tall.webp', kind: 'tall' },
  { url: '/assets/work/menusqr-tall.webp', kind: 'tall' },
  { url: '/assets/work/pulsencare-desktop-2.webp', kind: 'desk' },
  { url: '/assets/work/menusqr-desktop-2.webp', kind: 'desk' },
];
export const HERO_TEXTURES = SCREENS.map((s) => s.url);

const SIZE: Record<Kind, [number, number]> = { desk: [2.4, 1.5], phone: [0.72, 1.56], tall: [1.5, 1.9] };
/** Tall captures are 1024 × 2458; the screen shows a window of this height ratio and scrolls through it. */
const TALL_WINDOW = (1024 * (1.9 / 1.5)) / 2458;

interface Pose {
  p: THREE.Vector3;
  r: [number, number, number];
  s: number;
}
const pose = (p: [number, number, number], r: [number, number, number], s = 1): Pose => ({ p: new THREE.Vector3(...p), r, s });
const deg = THREE.MathUtils.degToRad;

/** Intro: scattered behind the mark, out of focus. */
const S0: Pose[] = [
  pose([-4.2, 1.4, -8.5], [0, 0.35, 0.02]),
  pose([3.9, -0.9, -9.5], [0, -0.3, -0.03]),
  pose([-1.7, -1.7, -7], [0, 0.2, 0]),
  pose([2.5, 1.8, -7.5], [0, -0.25, 0.02]),
  pose([-5.8, -1.1, -11], [0, 0.4, 0]),
  pose([5.6, 1.2, -11.5], [0, -0.4, 0]),
  pose([0.7, 2.7, -12], [0, 0, 0]),
  pose([-2.9, 2.5, -10.5], [0, 0.2, 0]),
];

/** 01 Build: a curved gallery around the point the camera reaches after passing through the mark. */
const GALLERY_C = new THREE.Vector3(0, 0.35, -3);
const S1: Pose[] = [-42, -30, -18, -6, 6, 18, 30, 42].map((a, i) => {
  const r = 5.6;
  const y = i % 2 ? -0.95 : 0.95;
  return pose([GALLERY_C.x + Math.sin(deg(a)) * r, GALLERY_C.y + y, GALLERY_C.z - Math.cos(deg(a)) * r], [0, -deg(a), 0]);
});

/** 02 Grow: a staircase rising left to right. */
const S2: Pose[] = SCREENS.map((_, i) => pose([-3.6 + i * 1.05, -1.7 + i * 0.62, -8.4 - i * 0.35], [0, 0.42, 0], 0.82));

/** 03 Automate: a ring around the mark, linked to it. */
const S3: Pose[] = SCREENS.map((_, i) => {
  const th = deg(i * 45 + 22.5);
  return pose([Math.cos(th) * 4.3, Math.sin(th) * 2.15 + 0.2, -2.6 - (i % 2) * 1.1], [0, -Math.cos(th) * 0.3, 0], 0.62);
});

/** Which formation slot each screen takes. Phones show 4 screens, so they get the central slots. */
const SLOTS: Record<number, [number[], number[], number[], number[]]> = {
  8: [[0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7]],
  4: [[2, 3, 6, 7], [3, 4, 2, 5], [2, 3, 4, 5], [0, 2, 4, 6]],
};

const Screen = forwardRef<THREE.Group, { url: string; kind: Kind; seed: number }>(({ url, kind, seed }, ref) => {
  const tex = useTexture(url, (t) => {
    const tx = t as THREE.Texture;
    tx.colorSpace = THREE.SRGBColorSpace;
    tx.anisotropy = 8;
    if (kind === 'tall') {
      tx.repeat.set(1, TALL_WINDOW);
      tx.offset.set(0, 1 - TALL_WINDOW);
    }
  });
  const [w, h] = SIZE[kind];

  // Tall captures browse themselves: the visible window drifts down the page and back up.
  useFrame(({ clock }) => {
    if (kind !== 'tall') return;
    const k = 0.5 + 0.5 * Math.cos(clock.elapsedTime * 0.22 + seed);
    tex.offset.y = (1 - TALL_WINDOW) * k;
  });

  const bezel = kind === 'phone' ? 0.05 : 0.035;
  return (
    <group ref={ref}>
      <RoundedBox args={[w + bezel * 2, h + bezel * 2, 0.05]} radius={kind === 'phone' ? 0.09 : 0.035} smoothness={3}>
        <meshStandardMaterial
          color={kind === 'phone' ? '#14161d' : '#f1f0eb'}
          metalness={kind === 'phone' ? 0.5 : 0.1}
          roughness={kind === 'phone' ? 0.3 : 0.4}
        />
      </RoundedBox>
      <mesh position={[0, 0, 0.026]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
    </group>
  );
});
Screen.displayName = 'Screen';

/* ───────────────────────────── Effects for each beat ───────────────────────────── */

const PARTICLES = 420;

/** Soft round sprite for the dust, so particles are discs rather than squares. */
function dotTexture() {
  if (typeof document === 'undefined') return null;
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.45, 'rgba(255,255,255,0.85)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function MarkScene({ state, hq, count }: { state: SceneState; hq: boolean; count: number }) {
  const screens = useMemo(() => SCREENS.slice(0, count), [count]);
  const groups = useRef<(THREE.Group | null)[]>([]);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const origin = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  const mats = useMemo(
    () => ({
      pulse: new THREE.MeshBasicMaterial({ color: new THREE.Color(0.55, 0.78, 1).multiplyScalar(3), toneMapped: false, transparent: true }),
      node: new THREE.MeshBasicMaterial({ color: new THREE.Color(0.35, 0.6, 1).multiplyScalar(2.2), toneMapped: false }),
      tube: new THREE.MeshBasicMaterial({ color: new THREE.Color(0.19, 0.46, 1).multiplyScalar(1.6), toneMapped: false }),
      dust: new THREE.PointsMaterial({ color: BLUE, size: 0.06, map: dotTexture(), alphaTest: 0.01, transparent: true, opacity: 0, depthWrite: false }),
    }),
    [],
  );

  // A glowing tube drawn along the tops of the staircase, rebuilt only while it is drawing.
  const stair = useRef<THREE.Mesh>(null);
  const stairPts = useMemo(() => Array.from({ length: count }, () => new THREE.Vector3()), [count]);
  const lastDraw = useRef(-1);

  // Spokes from the mark to each screen plus a ring between neighbours.
  const links = useRef<LineSegments2>(null);
  const linkPts = useMemo(() => new Float32Array(count * 4 * 3), [count]);
  const linkInit = useMemo(() => Array.from({ length: count * 4 }, (_, i) => [i, 0, 0] as [number, number, number]), [count]);
  const pulses = useRef<(THREE.Mesh | null)[]>([]);
  const nodes = useRef<(THREE.Mesh | null)[]>([]);

  // Rising dust for the growth beat.
  const dust = useMemo(() => {
    const pos = new Float32Array(PARTICLES * 3);
    for (let i = 0; i < PARTICLES; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 13;
      pos[i * 3 + 1] = Math.random() * 6 - 2.5;
      pos[i * 3 + 2] = -4 - Math.random() * 8;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return new THREE.Points(g, mats.dust);
  }, [mats]);

  const sweep = useRef<THREE.PointLight>(null);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const p = state.v;

    // Screens: blend intro → gallery → staircase → ring, each screen slightly staggered.
    screens.forEach((_, i) => {
      const g = groups.current[i];
      if (!g) return;
      const lag = i * 0.012;
      const a = ss(0.16 + lag, 0.36 + lag, p);
      const b = ss(0.46 + lag, 0.62 + lag, p);
      const c = ss(0.74 + lag, 0.9 + lag, p);
      const sl = SLOTS[count] ?? SLOTS[8];
      const A = S0[sl[0][i]], B = S1[sl[1][i]], C = S2[sl[2][i]], D = S3[sl[3][i]];
      tmp.copy(A.p).lerp(B.p, a).lerp(C.p, b).lerp(D.p, c);
      tmp.y += Math.sin(t * 0.7 + i * 1.7) * 0.05;
      g.position.copy(tmp);
      for (let k = 0; k < 3; k++) {
        const v = THREE.MathUtils.lerp(THREE.MathUtils.lerp(THREE.MathUtils.lerp(A.r[k], B.r[k], a), C.r[k], b), D.r[k], c);
        g.rotation.set(k === 0 ? v : g.rotation.x, k === 1 ? v : g.rotation.y, k === 2 ? v : g.rotation.z);
      }
      g.scale.setScalar(THREE.MathUtils.lerp(THREE.MathUtils.lerp(THREE.MathUtils.lerp(A.s, B.s, a), C.s, b), D.s, c));
    });

    // 02 Grow: the line draws along the staircase tops, and dust rises.
    const draw = ss(0.52, 0.68, p) * (1 - ss(0.76, 0.84, p));
    const st = stair.current;
    if (st) {
      screens.forEach((s, i) => {
        const g = groups.current[i];
        if (!g) return;
        stairPts[i].set(g.position.x, g.position.y + (SIZE[s.kind][1] / 2 + 0.16) * g.scale.x, g.position.z);
      });
      const reach = draw * (screens.length - 1);
      screens.forEach((_, i) => {
        const m = nodes.current[i];
        if (!m) return;
        m.position.copy(stairPts[i]);
        m.visible = draw > 0.01 && reach >= i - 0.01;
      });
      st.visible = draw > 0.01;
      // Screens float, so rebuild while visible; skip when nothing changed and nothing shows.
      if (st.visible && (Math.abs(draw - lastDraw.current) > 0.0005 || draw < 1)) {
        const whole = Math.floor(reach);
        const pts = stairPts.slice(0, whole + 1).map((v) => v.clone());
        if (whole < screens.length - 1) pts.push(stairPts[whole].clone().lerp(stairPts[whole + 1], reach - whole));
        if (pts.length >= 2) {
          st.geometry.dispose();
          st.geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, false, 'centripetal'), 24 * pts.length, 0.022, 6, false);
        }
        lastDraw.current = draw;
      }
    }

    const dustOn = ss(0.46, 0.56, p) * (1 - ss(0.76, 0.86, p));
    mats.dust.opacity = 0.55 * dustOn;
    dust.visible = dustOn > 0.01;
    if (dust.visible) {
      const dp = dust.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < PARTICLES; i++) {
        let y = dp.getY(i) + dt * (0.18 + (i % 7) * 0.03);
        if (y > 3.6) y = -2.5;
        dp.setY(i, y);
      }
      dp.needsUpdate = true;
    }

    // 03 Automate: spokes and a ring light up, with pulses travelling out from the mark.
    const net = ss(0.8, 0.94, p);
    const ln = links.current;
    if (ln) {
      ln.visible = net > 0.01;
      (ln.material as THREE.Material & { opacity: number }).opacity = 0.6 * net;
    }
    screens.forEach((_, i) => {
      const g = groups.current[i];
      const n = groups.current[(i + 1) % screens.length];
      if (!g || !n) return;
      linkPts.set([0, 0, 0, g.position.x, g.position.y, g.position.z, g.position.x, g.position.y, g.position.z, n.position.x, n.position.y, n.position.z], i * 12);
      const m = pulses.current[i];
      if (m) {
        m.visible = net > 0.5;
        m.position.lerpVectors(origin, g.position, (t * 0.35 + i / screens.length) % 1);
      }
    });
    if (ln) ln.geometry.setPositions(linkPts);
    mats.pulse.opacity = net;

    // A light sweeps across the glass while the mark is on show.
    if (sweep.current) {
      const intro = 1 - ss(0.14, 0.22, p) + ss(0.86, 0.98, p);
      sweep.current.position.set(-3.5 + ((t * 0.18) % 1) * 7, 1.6, 2.2);
      sweep.current.intensity = 14 * Math.min(1, intro);
    }
  });

  return (
    <group>
      <pointLight ref={sweep} color="#ffffff" distance={7} decay={1.6} />
      <Mark state={state} hq={hq} />

      {screens.map((s, i) => (
        <Screen key={s.url} url={s.url} kind={s.kind} seed={i * 1.3} ref={(g) => { groups.current[i] = g; }} />
      ))}

      <mesh ref={stair} material={mats.tube} visible={false} />
      {screens.map((s, i) => (
        <mesh key={`node-${s.url}`} ref={(m) => { nodes.current[i] = m; }} material={mats.node} visible={false}>
          <sphereGeometry args={[0.07, 16, 16]} />
        </mesh>
      ))}
      <primitive object={dust} />
      <Line ref={links} points={linkInit} segments color="#3175FE" lineWidth={1.6} transparent opacity={0} visible={false} />
      {screens.map((s, i) => (
        <mesh key={`pulse-${s.url}`} ref={(m) => { pulses.current[i] = m; }} material={mats.pulse} visible={false}>
          <sphereGeometry args={[0.045, 12, 12]} />
        </mesh>
      ))}

      {/* Soft navy shadow pool under the mark */}
      <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.4, 48]} />
        <meshBasicMaterial color={NAVY} transparent opacity={0.035} depthWrite={false} />
      </mesh>
    </group>
  );
}

export default MarkScene;
