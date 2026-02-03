"use client";

import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export const MiniAppReady = () => {
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        const inMiniApp = await sdk.isInMiniApp();
        if (!isMounted) return;

        if (inMiniApp) {
          document.documentElement.dataset.miniapp = "true";
          await sdk.actions.ready();
        }
      } catch {
        // No-op: keep the app usable outside miniapp environments
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  return null;
};
