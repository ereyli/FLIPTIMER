import type { Metadata } from "next";

const defaultPort = process.env.PORT || 3000;
const baseUrl =
  process.env.NEXT_PUBLIC_MINIAPP_URL ||
  process.env.NEXT_PUBLIC_PRODUCTION_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ||
  `http://localhost:${defaultPort}`;

const miniappName = process.env.NEXT_PUBLIC_MINIAPP_NAME || "FlipTimer";
const miniappHomeUrl = process.env.NEXT_PUBLIC_MINIAPP_HOME_URL || baseUrl;
const miniappEmbedImageUrl = process.env.NEXT_PUBLIC_MINIAPP_EMBED_IMAGE_URL || `${baseUrl}/flip.png`;
const miniappSplashImageUrl = process.env.NEXT_PUBLIC_MINIAPP_SPLASH_IMAGE_URL || undefined;
const miniappSplashBackground = process.env.NEXT_PUBLIC_MINIAPP_SPLASH_BG || "#0f0d1a";

export const getMiniappEmbed = () => {
  return {
    version: "1",
    imageUrl: miniappEmbedImageUrl,
    button: {
      title: process.env.NEXT_PUBLIC_MINIAPP_BUTTON_TITLE || "Launch",
      action: {
        type: "launch_frame",
        name: miniappName,
        url: miniappHomeUrl,
        ...(miniappSplashImageUrl ? { splashImageUrl: miniappSplashImageUrl } : {}),
        ...(miniappSplashBackground ? { splashBackgroundColor: miniappSplashBackground } : {}),
      },
    },
  };
};

export const getMiniappMetadata = (base: Metadata): Metadata => {
  const embed = getMiniappEmbed();
  const baseOther = base.other ?? {};
  const filteredOther: Record<string, string> = {};
  // Filter out undefined values from base.other
  for (const [key, value] of Object.entries(baseOther)) {
    if (typeof value === "string") {
      filteredOther[key] = value;
    }
  }

  // Base app_id from environment variable (required for Base integration)
  const baseAppId = process.env.NEXT_PUBLIC_BASE_APP_ID;

  return {
    ...base,
    other: {
      ...filteredOther,
      "fc:miniapp": JSON.stringify(embed),
      "fc:frame": JSON.stringify(embed),
      "base:app_id": baseAppId || "69832ee3bd202a51855da5a6",
    },
  };
};

export const getMiniappManifest = () => {
  const associationRaw = process.env.FARCASTER_ACCOUNT_ASSOCIATION;
  const iconUrl = process.env.NEXT_PUBLIC_MINIAPP_ICON_URL || `${baseUrl}/flip.png`;
  const heroImageUrl = process.env.NEXT_PUBLIC_MINIAPP_HERO_IMAGE_URL || `${baseUrl}/flip.png`;
  const ogImageUrl = process.env.NEXT_PUBLIC_MINIAPP_OG_IMAGE_URL || `${baseUrl}/flip.png`;
  const screenshotUrls = process.env.NEXT_PUBLIC_MINIAPP_SCREENSHOT_URLS
    ? process.env.NEXT_PUBLIC_MINIAPP_SCREENSHOT_URLS.split(",").map(url => url.trim())
    : [`${baseUrl}/flip.png`];

  if (!associationRaw) {
    return {
      error: "Missing FARCASTER_ACCOUNT_ASSOCIATION",
      required: ["FARCASTER_ACCOUNT_ASSOCIATION"],
      note: "Generate account association at https://www.base.dev/preview?tab=account",
    };
  }

  let accountAssociation: { header: string; payload: string; signature: string };
  try {
    accountAssociation = JSON.parse(associationRaw);
  } catch {
    return {
      error: "FARCASTER_ACCOUNT_ASSOCIATION must be valid JSON",
      required: ["FARCASTER_ACCOUNT_ASSOCIATION"],
    };
  }

  return {
    accountAssociation,
    miniapp: {
      version: "1",
      name: miniappName,
      homeUrl: miniappHomeUrl,
      iconUrl,
      splashImageUrl: miniappSplashImageUrl || iconUrl,
      splashBackgroundColor: miniappSplashBackground,
      subtitle: process.env.NEXT_PUBLIC_MINIAPP_SUBTITLE || "Last Buyer Wins",
      description:
        process.env.NEXT_PUBLIC_MINIAPP_DESCRIPTION ||
        "King-of-the-hill game on Base. Buy keys, reset the timer, win the pot!",
      tagline: process.env.NEXT_PUBLIC_MINIAPP_TAGLINE || "Last Buyer Wins The Pot",
      heroImageUrl,
      screenshotUrls: screenshotUrls.slice(0, 3), // Max 3 screenshots
      primaryCategory: "games",
      tags: ["fomo3d", "base", "game", "flip", "timer"],
      requiredChains: ["eip155:8453"],
      ogTitle: process.env.NEXT_PUBLIC_MINIAPP_OG_TITLE || miniappName,
      ogDescription: process.env.NEXT_PUBLIC_MINIAPP_OG_DESCRIPTION || "FlipTimer - Last buyer wins the pot on Base",
      ogImageUrl,
      ...(process.env.NEXT_PUBLIC_MINIAPP_WEBHOOK_URL
        ? { webhookUrl: process.env.NEXT_PUBLIC_MINIAPP_WEBHOOK_URL }
        : {}),
      ...(process.env.NEXT_PUBLIC_MINIAPP_NOINDEX === "true" ? { noindex: true } : {}),
    },
  };
};
