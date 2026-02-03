import "@rainbow-me/rainbowkit/styles.css";
import "@scaffold-ui/components/styles.css";
import type { Metadata, Viewport } from "next";
import { ClientProviders } from "~~/components/ClientProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";
import { getMiniappMetadata } from "~~/utils/miniappConfig";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

const baseMetadata = getMetadata({
  title: "FlipTimer — Last Buyer Wins",
  description: "FlipTimer king-of-the-hill game with $FLIP on Base. Buy keys, reset the timer, win the pot!",
});

export const metadata: Metadata = getMiniappMetadata(baseMetadata);

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning className="" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Source Code Pro', ui-monospace, monospace" }}>
        <ThemeProvider enableSystem={false} defaultTheme="dark" forcedTheme="dark">
          <ClientProviders>{children}</ClientProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
