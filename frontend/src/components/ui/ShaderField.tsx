import React, { useEffect, useRef } from 'react';

const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';

/** Slow domain-warped gradient: cream with soft blue on light sections, navy with blue on dark. */
const FRAG = `precision mediump float;
uniform vec2 r;uniform float t;uniform float dark;uniform vec2 m;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
 return mix(mix(h(i),h(i+vec2(1.,0.)),u.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}
void main(){
 vec2 uv=gl_FragCoord.xy/r;
 vec2 p=uv*vec2(r.x/r.y,1.)*1.5;
 float tt=t*.045;
 vec2 q=vec2(fbm(p+vec2(0.,tt)),fbm(p+vec2(5.2,1.3)-tt));
 float f=fbm(p+2.2*q+m*.25);
 vec3 a,b,c;
 if(dark>.5){a=vec3(.047,.114,.282);b=vec3(.16,.36,.92);c=vec3(.02,.05,.14);}
 else{a=vec3(.98,.98,.968);b=vec3(.78,.85,.99);c=vec3(.94,.92,.88);}
 vec3 col=mix(a,b,smoothstep(.42,.9,f));
 col=mix(col,c,smoothstep(.5,1.,q.y)*.55);
 col+=(h(gl_FragCoord.xy+t)-.5)*(2./255.);
 gl_FragColor=vec4(col,1.);
}`;

/**
 * A flowing gradient field drawn with a tiny WebGL shader (no three.js). Renders at reduced
 * resolution, pauses off screen, and shows a static gradient when WebGL or motion is unavailable.
 */
export const ShaderField: React.FC<{ tone?: 'light' | 'dark'; className?: string }> = ({ tone = 'light', className = '' }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = sh(gl.VERTEX_SHADER, VERT);
    const fs = sh(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(prog, 'r');
    const uT = gl.getUniformLocation(prog, 't');
    const uD = gl.getUniformLocation(prog, 'dark');
    const uM = gl.getUniformLocation(prog, 'm');
    gl.uniform1f(uD, tone === 'dark' ? 1 : 0);

    const scale = Math.min(window.devicePixelRatio, 1.5) * 0.5;
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * scale));
      const h = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uR, w, h);
    };
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5;
      mouse.ty = 0.5 - e.clientY / window.innerHeight;
    };

    let raf = 0;
    let visible = false;
    const start = performance.now();
    const draw = (now: number) => {
      resize();
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform1f(uT, reduce ? 12 : (now - start) / 1000);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    window.addEventListener('pointermove', onMove, { passive: true });
    draw(performance.now());

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [tone]);

  return (
    <div
      className={`absolute inset-0 ${tone === 'dark' ? 'bg-[radial-gradient(ellipse_at_70%_30%,#1d3fae_0%,#0C1D48_60%)]' : 'bg-[radial-gradient(ellipse_at_70%_20%,#dbe4fb_0%,#FAFAF7_60%)]'} ${className}`}
      aria-hidden="true"
    >
      <canvas ref={ref} className="h-full w-full" />
    </div>
  );
};

export default ShaderField;
