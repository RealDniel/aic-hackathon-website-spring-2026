"use client";

import { useEffect, useRef } from "react";

const RENDER_SCALE = 0.4;
const MOBILE_RENDER_SCALE = 0.3;
const TARGET_FPS = 24;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

const VERT_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAG_SRC = `
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

#define WAVE_AMP 0.06
#define ANIM_SPEED 2.0
#define COLOUR_1 vec4(0.133, 1.0, 0.0, 1.0)
#define COLOUR_2 vec4(0.855, 0.0, 0.498, 1.0)
#define COLOUR_3 vec4(0.06, 0.08, 0.06, 1.0)
#define CONTRAST 3.5
#define LIGTHING 0.4
#define PIXEL_FILTER 600.0

vec4 effect(vec2 screenSize, vec2 screen_coords) {
  float pixel_size = length(screenSize) / PIXEL_FILTER;
  vec2 uv = (floor(screen_coords * (1.0 / pixel_size)) * pixel_size - 0.5 * screenSize) / length(screenSize);

  uv += vec2(
    sin(u_time * 0.11) * 0.4 + sin(u_time * 0.067) * 0.25,
    cos(u_time * 0.089) * 0.3 + sin(u_time * 0.053) * 0.2
  );
  uv.y += sin(uv.x * 3.0 + u_time * 0.4) * WAVE_AMP;
  uv.x += cos(uv.y * 2.5 - u_time * 0.3) * WAVE_AMP * 0.6;

  uv *= 30.0;
  float speed = u_time * ANIM_SPEED;
  vec2 uv2 = vec2(uv.x + uv.y);

  for (int i = 0; i < 5; i++) {
    uv2 += sin(max(uv.x, uv.y)) + uv;
    uv += 0.5 * vec2(cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121), sin(uv2.x - 0.113 * speed));
    uv -= cos(uv.x + uv.y) - sin(uv.x * 0.711 - uv.y);
  }

  float contrast_mod = 2.075;
  float raw_dist = length(uv) * 0.035 * contrast_mod;
  float paint_res = abs(mod(raw_dist, 2.0) - 1.0);
  float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));
  float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));
  float c3p = 1.0 - min(1.0, c1p + c2p);
  float light = (LIGTHING - 0.2) * max(c1p * 5.0 - 4.0, 0.0) + LIGTHING * max(c2p * 5.0 - 4.0, 0.0);

  return (0.3 / CONTRAST) * COLOUR_1
       + (1.0 - 0.3 / CONTRAST) * (COLOUR_1 * c1p + COLOUR_2 * c2p + vec4(c3p * COLOUR_3.rgb, c3p * COLOUR_1.a))
       + light;
}

void main() {
  gl_FragColor = effect(u_resolution, gl_FragCoord.xy);
}`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  src: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return program;
}

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const mobile =
      typeof navigator !== "undefined" && navigator.maxTouchPoints > 1;
    const scale = mobile ? MOBILE_RENDER_SCALE : RENDER_SCALE;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const program = createProgram(gl);
    if (!program) return;
    gl.useProgram(program);

    const posAttr = gl.getAttribLocation(program, "a_position");
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");

    const resize = () => {
      const w = Math.max(1, Math.floor(window.innerWidth * scale));
      const h = Math.max(1, Math.floor(window.innerHeight * scale));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uResolution, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    let frameId = 0;
    let lastFrame = 0;
    const startTime = performance.now();

    const render = (now: number) => {
      frameId = requestAnimationFrame(render);
      const delta = now - lastFrame;
      if (delta < FRAME_INTERVAL) return;
      lastFrame = now - (delta % FRAME_INTERVAL);

      gl.uniform1f(uTime, (now - startTime) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    if (reducedMotion) {
      gl.uniform1f(uTime, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      const resizeStatic = () => {
        resize();
        gl.uniform1f(uTime, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };
      window.removeEventListener("resize", resize);
      window.addEventListener("resize", resizeStatic);

      const handleContextLost = (e: Event) => e.preventDefault();
      canvas.addEventListener("webglcontextlost", handleContextLost);

      return () => {
        window.removeEventListener("resize", resizeStatic);
        canvas.removeEventListener("webglcontextlost", handleContextLost);
        gl.deleteBuffer(buf);
        gl.deleteProgram(program);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    }

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(frameId);
    };
    canvas.addEventListener("webglcontextlost", handleContextLost);

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-[100] h-screen w-screen"
      aria-hidden="true"
    />
  );
}
