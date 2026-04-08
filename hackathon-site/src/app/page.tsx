"use client";

import { useState } from "react";
import Countdown from "@/src/components/countdown"
import Background from "@/src/components/background"
import ApplyApp from "@/src/components/apps/apply_app"
import ApplyModal from "@/src/components/apps/modals/apply_modal"
import TeamApp from "@/src/components/apps/team_app"

export default function Page() {
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <Background />
      <main className="relative min-h-[calc(100vh-var(--taskbar-height))] p-4 max-[760px]:p-3">
        <ApplyApp isOpen={isApplyOpen} onOpen={() => setIsApplyOpen(true)} />
        
      </main>

      <footer
        className="fixed inset-x-0 bottom-0 z-[32] flex h-[var(--taskbar-height)] items-center justify-between gap-[0.45rem] border-t-2 border-t-[var(--win95-light)] bg-[var(--win95-face)] px-[0.38rem] py-[0.28rem] max-[760px]:gap-[0.3rem]"
        aria-label="Desktop taskbar"
      >
        <span className="min-w-0 truncate whitespace-nowrap ml-20 pr-3 text-[1.12rem] font-black italic tracking-[0.01em] text-black max-[760px]:text-[0.9rem]">
          AI Club Hackathon
        </span>
        <Countdown />
      </footer>

      <ApplyModal isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} />
    </div>
  );
}