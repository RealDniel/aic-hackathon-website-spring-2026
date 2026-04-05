"use client";

import { useEffect, useRef } from "react";
import { CRTFilter } from "@pixi/filter-crt";
import { Application, BLEND_MODES, Sprite, Texture } from "pixi.js";

export default function CRT() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const view = canvasRef.current;
    if (!view) {
      return;
    }

    const app = new Application({
      view,
      resizeTo: window,
      backgroundAlpha: 0,
      antialias: false,
      autoDensity: true,
      resolution: Math.min(window.devicePixelRatio || 1, 1.5),
    });

    // Run our own RAF loop so filter animation is independent from React updates.
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
      curvature: 1.2,
      lineWidth: 2,
      lineContrast: 0.35,
      verticalLine: false,
      noise: 0.0,
      noiseSize: 1.4,
      seed: 0.23,
      vignetting: 0.28,
      vignettingAlpha: 0.9,
      vignettingBlur: 0.45,
      time: 0,
    });

    app.stage.filters = [crtFilter];

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

    const animate = () => {
      crtFilter.time += 0.045;
      crtFilter.seed = (crtFilter.seed + 0.0018) % 1;
      app.renderer.render(app.stage);
      frameId = window.requestAnimationFrame(animate);
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
