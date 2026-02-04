"use client";

import dynamic from "next/dynamic";
import { MiniAppReady } from "~~/components/MiniAppReady";

const ScaffoldEthAppWithProviders = dynamic(
  () => import("~~/components/ScaffoldEthAppWithProviders").then(mod => ({ default: mod.ScaffoldEthAppWithProviders })),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col min-h-screen items-center justify-center" style={{ background: "#141414" }}>
        <div className="text-4xl" style={{ filter: "hue-rotate(-10deg) saturate(2)" }}>
          🦞
        </div>
        <div className="text-sm mt-4 font-mono tracking-[0.3em] uppercase" style={{ color: "#38bdf8" }}>
          INITIALIZING...
        </div>
        <div className="mt-2 text-xs font-mono" style={{ color: "rgba(255, 68, 68, 0.45)" }}>
          ◆ FlipTimer ◆
        </div>
      </div>
    ),
  },
);

export const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MiniAppReady />
      <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
    </>
  );
};
