"use client";

import { useState } from "react";
import Countdown from "@/src/components/countdown"
import Background from "@/src/components/background"
import ApplyApp from "@/src/components/apps/apply_app"
import ApplyModal from "@/src/components/apps/modals/apply_modal"

export default function Page() {
  const [isApplyOpen, setIsApplyOpen] = useState(true);

  return(
    <div>
      <Background />
      <Countdown />
      <ApplyApp isOpen={isApplyOpen} onOpen={() => setIsApplyOpen(true)} />
      <ApplyModal isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} />
    </div>
  );
}