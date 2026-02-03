import type { Metadata } from "next";

const defaultPort = process.env.PORT || 3000;
const baseUrl =
  process.env.NEXT_PUBLIC_MINIAPP_URL ||
  process.env.NEXT_PUBLIC_PRODUCTION_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ||
  `http://localhost:${defaultPort}`;

const miniappName = process.env.NEXT_PUBLIC_MINIAPP_NAME || "FlipTimer";
const miniappHomeUrl = process.env.NEXT_PUBLIC_MINIAPP_HOME_URL || baseUrl;
const miniappEmbedImageUrl = process.env.NEXT_PUBLIC_MINIAPP_EMBED_IMAGE_URL || `${baseUrl}/thumbnail.png`;
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
  return {
    ...base,
    other: {
      ...filteredOther,
      "fc:miniapp": JSON.stringify(embed),
      "fc:frame": JSON.stringify(embed),
    },
  };
};

export const getMiniappManifest = () => {
  const associationRaw = process.env.FARCASTER_ACCOUNT_ASSOCIATION;
  const iconUrl = process.env.NEXT_PUBLIC_MINIAPP_ICON_URL;

  if (!associationRaw || !iconUrl) {
    return {
      error: "Missing FARCASTER_ACCOUNT_ASSOCIATION or NEXT_PUBLIC_MINIAPP_ICON_URL",
      required: ["FARCASTER_ACCOUNT_ASSOCIATION", "NEXT_PUBLIC_MINIAPP_ICON_URL"],
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
      iconUrl,
      homeUrl: miniappHomeUrl,
      ...(miniappSplashImageUrl ? { splashImageUrl: miniappSplashImageUrl } : {}),
      ...(miniappSplashBackground ? { splashBackgroundColor: miniappSplashBackground } : {}),
      primaryCategory: "games",
      tags: ["fomo3d", "base", "game"],
      requiredChains: ["eip155:8453"],
    },
  };
};
