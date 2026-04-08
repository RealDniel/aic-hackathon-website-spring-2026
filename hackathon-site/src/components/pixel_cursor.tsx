"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const DEFAULT_CURSOR_SRC = "/assets/cursor/arrow_l.png";
const POINTER_CURSOR_SRC = "/assets/cursor/pointer.png";

const DEFAULT_HOTSPOT = { x: 2, y: 2 };
const POINTER_HOTSPOT = { x: 8, y: 2 };

function isPointerTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;

  const interactive = target.closest(
    "a, button, summary, label, [role='button'], [data-cursor='pointer']",
  );
  if (interactive) return true;

  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLButtonElement ||
    target instanceof HTMLSelectElement ||
    target instanceof HTMLTextAreaElement
  ) {
    return true;
  }

  return window.getComputedStyle(target).cursor === "pointer";
}

export default function PixelCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef(0);
  const posRef = useRef({ x: -100, y: -100 });
  const visibleRef = useRef(false);
  const [variant, setVariant] = useState<"default" | "pointer">("default");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateEnabled = () => setEnabled(finePointer.matches);
    updateEnabled();

    finePointer.addEventListener("change", updateEnabled);
    return () => finePointer.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const render = () => {
      frameRef.current = 0;
      const node = cursorRef.current;
      if (!node) return;

      if (!visibleRef.current) {
        node.style.opacity = "0";
        return;
      }

      const hotspot = variant === "pointer" ? POINTER_HOTSPOT : DEFAULT_HOTSPOT;
      node.style.opacity = "1";
      node.style.transform = `translate3d(${posRef.current.x - hotspot.x}px, ${posRef.current.y - hotspot.y}px, 0)`;
    };

    const queueRender = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(render);
    };

    const handleMove = (event: PointerEvent) => {
      posRef.current = { x: event.clientX, y: event.clientY };
      visibleRef.current = true;
      setVariant(isPointerTarget(event.target) ? "pointer" : "default");
      queueRender();
    };

    const handleLeave = () => {
      visibleRef.current = false;
      queueRender();
    };

    const handleWindowBlur = () => {
      visibleRef.current = false;
      queueRender();
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleMove, { passive: true });
    window.addEventListener("pointerleave", handleLeave);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("blur", handleWindowBlur);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [enabled, variant]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[2147483646] opacity-0 will-change-transform"
      aria-hidden="true"
    >
      <Image
        src={variant === "pointer" ? POINTER_CURSOR_SRC : DEFAULT_CURSOR_SRC}
        alt=""
        width={48}
        height={48}
        className="block h-[48px] w-[48px] max-w-none select-none object-contain [image-rendering:pixelated]"
        draggable={false}
        priority
        unoptimized
      />
    </div>
  );
}
