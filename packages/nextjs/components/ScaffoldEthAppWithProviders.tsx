"use client";

import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen scanlines" style={{ background: "#0b0f1a" }}>
        {/* Terminal grid background */}
        <div className="terminal-grid" />
        <Header />
        <main className="relative flex flex-col flex-1 z-[1]">{children}</main>
        <Footer />
      </div>
      <Toaster
        toastOptions={{
          style: {
            background: "#0f172a",
            color: "#3b82f6",
            border: "1px solid rgba(249, 115, 22, 0.35)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.85rem",
          },
        }}
      />
    </>
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const orangeDarkTheme = darkTheme({
    accentColor: "#3b82f6",
    accentColorForeground: "#0b0f1a",
    borderRadius: "small",
    fontStack: "system",
  });

  // Override RainbowKit modal backgrounds to match site theme
  orangeDarkTheme.colors.modalBackground = "#0f172a";
  orangeDarkTheme.colors.profileForeground = "#0f172a";
  orangeDarkTheme.colors.connectButtonBackground = "#0b1220";

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider avatar={BlockieAvatar} theme={orangeDarkTheme}>
          <ProgressBar height="2px" color="#3b82f6" />
          <ScaffoldEthApp>{children}</ScaffoldEthApp>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
