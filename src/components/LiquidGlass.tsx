"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const VERT = "attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;v.y=1.-v.y;gl_Position=vec4(p,0.,1.);}";

// Slow layered currents drift through the glass, a soft sheen rolls across it
// and the pointer pushes the liquid aside.
const FRAG = `precision mediump float;
uniform sampler2D tex;uniform float t,seed,mi;uniform vec2 m;varying vec2 v;
void main(){
  vec2 uv=v;float s=t*.32+seed;
  vec2 f=vec2(sin(uv.y*5.+s*1.3)+.5*sin(uv.y*11.-s*.8+uv.x*3.),cos(uv.x*4.-s*1.1)+.5*cos(uv.x*9.+s*.7+uv.y*4.));
  uv+=f*.01;
  uv+=.007*vec2(sin((uv.x+uv.y)*7.+s*2.),cos((uv.x-uv.y)*6.-s*1.6));
  vec2 d=uv-m;uv-=d*exp(-dot(d,d)*40.)*mi*.4;
  vec3 c=texture2D(tex,clamp(uv,.002,.998)).rgb;
  float sh=pow(max(0.,sin((v.x*.7+v.y)*3.2-s*1.4)),24.)*.12;
  gl_FragColor=vec4(min(c+sh,1.),1.);
}`;

type Props = { src: string; width: number; height: number; sizes: string; seed?: number; priority?: boolean };

// The still image is the server-rendered fallback; the canvas takes over once
// WebGL and the texture are ready (and only when motion is allowed).
export function LiquidGlass({ src, width, height, sizes, seed = 0, priority }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const shader = (type: number, code: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, code);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uT = u("t"), uM = u("m"), uMi = u("mi");
    gl.uniform1f(u("seed"), seed);

    let raf = 0, visible = true, ready = false, alive = true;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, i: 0, ti: 0 };
    const t0 = performance.now();

    const size = () => {
      const r = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const frame = () => {
      raf = 0;
      if (!alive || !visible || !ready) return;
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      pointer.i += (pointer.ti - pointer.i) * 0.05;
      gl.uniform1f(uT, (performance.now() - t0) / 1000);
      gl.uniform2f(uM, pointer.x, pointer.y);
      gl.uniform1f(uMi, pointer.i);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(frame);
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(frame); };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      const inside = x > -0.1 && x < 1.1 && y > -0.1 && y < 1.1;
      pointer.ti = inside ? 1 : 0;
      if (inside) { pointer.tx = x; pointer.ty = y; }
    };
    addEventListener("pointermove", onMove, { passive: true });

    const ro = new ResizeObserver(size);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
    io.observe(canvas);

    const img = new window.Image();
    img.src = src;
    img.decode().then(() => {
      if (!alive) return;
      gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      size();
      ready = true;
      frame();
      canvas.parentElement?.classList.add("live");
    }).catch(() => {});

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      removeEventListener("pointermove", onMove);
      canvas.parentElement?.classList.remove("live");
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [src, seed]);

  return (
    <>
      <Image src={src} alt="" width={width} height={height} sizes={sizes} priority={priority} />
      <canvas ref={ref} />
    </>
  );
}
