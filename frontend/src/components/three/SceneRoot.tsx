import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';

/**
 * One fixed, transparent WebGL canvas for the whole site. Every small 3D object on a page is a
 * drei <View> that draws into this canvas inside its own DOM rectangle, so a page with many
 * objects still uses a single WebGL context. Sits under the header and ignores the pointer.
 */
export default function SceneRoot() {
  return (
    <Canvas
      flat
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance', stencil: false }}
      eventSource={document.getElementById('root') ?? undefined}
      eventPrefix="client"
      style={{ position: 'fixed', inset: 0, zIndex: 30, pointerEvents: 'none' }}
      camera={{ position: [0, 0, 6], fov: 32 }}
      aria-hidden="true"
    >
      <View.Port />
    </Canvas>
  );
}
