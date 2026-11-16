import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer, PerspectiveCamera, RoundedBox, View } from '@react-three/drei';

export type ObjectKind = 'build' | 'grow' | 'brand' | 'automate';

const BLUE = '#3175FE';
const NAVY = '#0C1D48';

const glass = { color: '#e6ecfa', roughness: 0.06, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.05, transparent: true, opacity: 0.62 } as const;

/** Follows the pointer gently, so every object feels alive under the cursor. */
function useTilt(strength = 0.35) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ pointer }, dt) => {
    const g = ref.current;
    if (!g) return;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.x * strength, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.y * strength * 0.5, 3, dt);
  });
  return ref;
}

/** 01 Build: translucent interface layers that separate and re-stack. */
function Build() {
  const tilt = useTilt();
  const layers = useRef<(THREE.Group | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const open = 0.5 + 0.5 * Math.sin(t * 0.8);
    layers.current.forEach((l, i) => {
      if (!l) return;
      l.position.y = (i - 1.5) * (0.22 + 0.32 * open);
      l.rotation.z = Math.sin(t * 0.5 + i) * 0.03;
    });
  });
  return (
    <group ref={tilt} rotation={[0.55, -0.6, 0]}>
      <group rotation={[-0.5, 0.65, 0]}>
        {[0, 1, 2, 3].map((i) => (
          <group key={i} ref={(g) => { layers.current[i] = g; }}>
            <RoundedBox args={[2.2, 0.06, 1.5]} radius={0.03} smoothness={3}>
              <meshPhysicalMaterial {...glass} color={i === 3 ? '#ffffff' : '#e6ecfa'} opacity={i === 3 ? 0.95 : 0.55} />
            </RoundedBox>
            {/* interface blocks on each layer */}
            <mesh position={[-0.55, 0.04, -0.45]}>
              <boxGeometry args={[0.9, 0.02, 0.18]} />
              <meshStandardMaterial color={i === 3 ? BLUE : '#c5d2f0'} />
            </mesh>
            <mesh position={[0.45, 0.04, 0.2]}>
              <boxGeometry args={[0.8, 0.02, 0.6]} />
              <meshStandardMaterial color={i === 3 ? NAVY : '#d8dff0'} />
            </mesh>
            <mesh position={[-0.55, 0.04, 0.25]}>
              <boxGeometry args={[0.7, 0.02, 0.5]} />
              <meshStandardMaterial color="#dfe5f3" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

/** 02 Grow: a ribbon climbing like a chart line, with markers at each step. */
function Grow() {
  const tilt = useTilt();
  const pts = useMemo(
    () => [[-1.4, -0.9, 0], [-0.8, -0.55, 0.2], [-0.3, -0.65, 0], [0.2, -0.05, -0.2], [0.65, 0.2, 0], [1.1, 0.75, 0.15], [1.45, 1.05, 0]].map((p) => new THREE.Vector3(...p)),
    [],
  );
  const curve = useMemo(() => new THREE.CatmullRomCurve3(pts, false, 'centripetal'), [pts]);
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 160, 0.06, 12, false), [curve]);
  const mat = useRef<THREE.MeshPhysicalMaterial>(null);
  const marker = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (marker.current) marker.current.position.copy(curve.getPoint((t * 0.18) % 1));
    if (mat.current) mat.current.emissiveIntensity = 0.25 + 0.15 * Math.sin(t * 2);
  });
  return (
    <group ref={tilt} rotation={[0.15, -0.35, 0]}>
      {/* bars under the line */}
      {pts.map((p, i) => (
        <mesh key={i} position={[p.x, (p.y - 1.25) / 2, -0.25]}>
          <boxGeometry args={[0.22, p.y + 1.25, 0.22]} />
          <meshPhysicalMaterial {...glass} opacity={0.4} />
        </mesh>
      ))}
      <mesh geometry={tube}>
        <meshPhysicalMaterial ref={mat} color={BLUE} emissive={BLUE} emissiveIntensity={0.3} roughness={0.25} metalness={0.2} clearcoat={1} />
      </mesh>
      <mesh ref={marker}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.1} clearcoat={1} />
      </mesh>
    </group>
  );
}

/** 03 Brand: a glass hexagon (the logo's shape) turning around a solid core. */
function Brand() {
  const tilt = useTilt();
  const hex = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (hex.current) hex.current.rotation.y = t * 0.35;
    if (core.current) core.current.scale.setScalar(0.92 + 0.08 * Math.sin(t * 1.4));
  });
  return (
    <group ref={tilt}>
      <mesh ref={hex} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.35, 1.35, 0.42, 6, 1]} />
        <meshPhysicalMaterial {...glass} opacity={0.5} />
      </mesh>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.55, 4]} />
        <meshPhysicalMaterial color={BLUE} roughness={0.15} metalness={0.2} clearcoat={1} emissive={BLUE} emissiveIntensity={0.15} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.75, 0.012, 8, 120]} />
        <meshBasicMaterial color={NAVY} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/** 04 Automate: nodes orbiting a core, with pulses running along the orbits. */
function Automate() {
  const tilt = useTilt();
  const orbits = useRef<(THREE.Group | null)[]>([]);
  const rings = [
    { r: 1.1, tilt: [0.9, 0, 0.2], speed: 0.6, n: 3 },
    { r: 1.55, tilt: [1.3, 0.4, -0.3], speed: -0.4, n: 4 },
    { r: 1.95, tilt: [0.5, -0.5, 0.6], speed: 0.28, n: 2 },
  ] as const;
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    orbits.current.forEach((o, i) => {
      if (o) o.rotation.z = t * rings[i].speed;
    });
  });
  return (
    <group ref={tilt}>
      <mesh>
        <sphereGeometry args={[0.42, 48, 48]} />
        <meshPhysicalMaterial color={NAVY} roughness={0.2} metalness={0.4} clearcoat={1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.6, 48, 48]} />
        <meshPhysicalMaterial {...glass} opacity={0.35} />
      </mesh>
      {rings.map((ring, i) => (
        <group key={i} rotation={ring.tilt as unknown as [number, number, number]}>
          <mesh>
            <torusGeometry args={[ring.r, 0.008, 8, 160]} />
            <meshBasicMaterial color={NAVY} transparent opacity={0.3} />
          </mesh>
          <group ref={(g) => { orbits.current[i] = g; }}>
            {Array.from({ length: ring.n }).map((_, k) => {
              const a = (k / ring.n) * Math.PI * 2;
              return (
                <mesh key={k} position={[Math.cos(a) * ring.r, Math.sin(a) * ring.r, 0]}>
                  <sphereGeometry args={[k === 0 ? 0.13 : 0.09, 24, 24]} />
                  <meshPhysicalMaterial color={k === 0 ? BLUE : '#ffffff'} roughness={0.15} clearcoat={1} emissive={k === 0 ? BLUE : '#000000'} emissiveIntensity={0.3} />
                </mesh>
              );
            })}
          </group>
        </group>
      ))}
    </group>
  );
}

const OBJECTS: Record<ObjectKind, React.FC> = { build: Build, grow: Grow, brand: Brand, automate: Automate };

/** A 3D object drawn into the shared canvas, inside this element's rectangle. */
export default function ObjectView({ kind, className = '' }: { kind: ObjectKind; className?: string }) {
  const Obj = OBJECTS[kind];
  return (
    <View className={className}>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={32} />
      <hemisphereLight args={['#ffffff', '#e8e5db', 1.2]} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} />
      <directionalLight position={[-4, -2, 2]} intensity={0.5} color="#cfdcff" />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={3} position={[-4, 3, 4]} scale={[6, 4, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[8, 8, 1]} />
        <Lightformer form="ring" intensity={2} position={[4, 0, 3]} scale={2} color="#cfdcff" />
      </Environment>
      <Obj />
    </View>
  );
}
