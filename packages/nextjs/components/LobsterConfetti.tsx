"use client";

import { useCallback } from "react";

// Confetti disabled - component simplified to minimal stub

export function useLobsterConfetti() {
  const trigger = useCallback(() => {
    // Confetti disabled - do nothing
    return;
  }, []);

  return { trigger };
}
