import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL
  ? process.env.NEXT_PUBLIC_PRODUCTION_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : `http://localhost:${process.env.PORT || 3000}`;
const titleTemplate = "%s | FlipTimer";

export const getMetadata = ({
  title,
  description,
  imageRelativePath = "/flip.png",
}: {
  title: string;
  description: string;
  imageRelativePath?: string;
}): Metadata => {
  const imageUrl = `${baseUrl}${imageRelativePath}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: titleTemplate,
    },
    description: description,
    openGraph: {
      title: "FlipTimer — Last Buyer Wins",
      description: "A FlipTimer game on Base. Buy keys with $FLIP. Last buyer when the timer hits zero wins the pot.",
      images: [{ url: imageUrl, width: 1200, height: 630 }],
      url: baseUrl,
      type: "website",
      siteName: "FlipTimer",
    },
    twitter: {
      card: "summary_large_image",
      title: "FlipTimer — Last Buyer Wins",
      description: "A FlipTimer game on Base. Buy keys with $FLIP. Last buyer when the timer hits zero wins the pot.",
      images: [imageUrl],
    },
    icons: {
      icon: [
        {
          url: "/favicon.png",
          sizes: "32x32",
          type: "image/png",
        },
      ],
    },
  };
};
