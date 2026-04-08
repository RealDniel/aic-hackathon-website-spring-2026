"use client";

import { useState } from "react";
import Countdown from "@/src/components/countdown"
import Background from "@/src/components/background"
import ApplyApp from "@/src/components/apps/apply_app"
import ApplyModal from "@/src/components/apps/modals/apply_modal"

export default function Page() {
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <Background />
      <main className="relative min-h-[calc(100vh-var(--taskbar-height))] p-4 max-[760px]:p-3">
        <ApplyApp isOpen={isApplyOpen} onOpen={() => setIsApplyOpen(true)} />
      </main>

      <footer
        className="fixed inset-x-0 bottom-0 z-[32] flex h-[var(--taskbar-height)] items-center gap-[0.3rem] bg-[var(--win95-face)] px-[0.25rem] py-[0.2rem] border-t-2 border-t-[var(--win95-light)] max-[760px]:gap-[0.2rem]"
        aria-label="Desktop taskbar"
      >
        <button
          type="button"
          className="h-full min-w-[4.6rem] select-none border border-solid bg-[var(--win95-face)] px-[0.5rem] text-left text-[0.86rem] font-bold text-black [border-color:var(--win95-light)_var(--win95-dark)_var(--win95-dark)_var(--win95-light)] active:pt-px active:[border-color:var(--win95-dark)_var(--win95-light)_var(--win95-light)_var(--win95-dark)] max-[760px]:min-w-[4rem] max-[760px]:text-[0.78rem]"
          aria-label="Start button"
        >
          Start
        </button>
        <div
          className="h-full min-w-0 flex-1 border border-solid bg-[#b8b8b8] [border-color:var(--win95-shadow)_var(--win95-light)_var(--win95-light)_var(--win95-shadow)] max-[760px]:hidden"
          aria-hidden="true"
        />
        <Countdown />
      </footer>

      <ApplyModal isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} />
    </div>
  );
}