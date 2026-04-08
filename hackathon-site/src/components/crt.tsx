"use client";

import { useEffect, useRef } from "react";
import { CRTFilter } from "@pixi/filter-crt";
import { Application, BLEND_MODES, Filter, Sprite, Texture } from "pixi.js";

const RGB_SHIFT_FRAG = `
  precision mediump float;
  varying vec2 vTextureCoord;
  uniform sampler2D uSampler;
  uniform float uShift;

  void main() {
    vec2 uv = vTextureCoord;
    float r = texture2D(uSampler, uv + vec2(uShift, 0.0)).r;
    vec4 center = texture2D(uSampler, uv);
    float b = texture2D(uSampler, uv - vec2(uShift, 0.0)).b;
    gl_FragColor = vec4(r, center.g, b, center.a);
  }
`;

const FLICKER_INTENSITY = 0.035;
const BASE_OPACITY = 0.7;
const CRT_FPS = 30;
const CRT_FRAME_INTERVAL = 1000 / CRT_FPS;

export default function CRT() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const view = canvasRef.current;
    if (!view) return;

    const app = new Application({
      view,
      resizeTo: window,
      backgroundAlpha: 0,
      antialias: false,
      autoDensity: true,
      resolution: 1,
    });

    app.stop();

    const cyanLayer = new Sprite(Texture.WHITE);
    cyanLayer.tint = 0x80e8ff;
    cyanLayer.alpha = 0.16;

    const magentaLayer = new Sprite(Texture.WHITE);
    magentaLayer.tint = 0xff7fe6;
    magentaLayer.alpha = 0.08;
    magentaLayer.blendMode = BLEND_MODES.ADD;

    app.stage.addChild(cyanLayer);
    app.stage.addChild(magentaLayer);

    const crtFilter = new CRTFilter({
      curvature: 2,
      lineWidth: 2.5,
      lineContrast: 0.35,
      verticalLine: false,
      noise: 0.12,
      noiseSize: 1.4,
      seed: 0.23,
      vignetting: 0.28,
      vignettingAlpha: 0.9,
      vignettingBlur: 0.45,
      time: 0,
    });

    const rgbShiftFilter = new Filter(undefined, RGB_SHIFT_FRAG, {
      uShift: 0.0012,
    });

    app.stage.filters = [rgbShiftFilter, crtFilter];

    const resizeLayers = () => {
      const width = app.renderer.width;
      const height = app.renderer.height;
      cyanLayer.width = width;
      cyanLayer.height = height;
      magentaLayer.width = width;
      magentaLayer.height = height;
    };

    resizeLayers();
    app.renderer.on("resize", resizeLayers);

    let frameId = 0;
    let lastFrame = 0;

    const animate = (now: number) => {
      frameId = window.requestAnimationFrame(animate);
      const delta = now - lastFrame;
      if (delta < CRT_FRAME_INTERVAL) return;
      lastFrame = now - (delta % CRT_FRAME_INTERVAL);

      crtFilter.time += 0.045;
      crtFilter.seed = (crtFilter.seed + 0.0018) % 1;

      const flicker =
        BASE_OPACITY + (Math.random() - 0.5) * 2 * FLICKER_INTENSITY;
      view.style.opacity = String(flicker);

      rgbShiftFilter.uniforms.uShift =
        0.0012 + Math.sin(crtFilter.time * 0.5) * 0.0003;

      app.renderer.render(app.stage);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      app.renderer.off("resize", resizeLayers);
      app.destroy(true);
    };
  }, []);

  return <canvas ref={canvasRef} className="crt-overlay" aria-hidden="true" />;
}
