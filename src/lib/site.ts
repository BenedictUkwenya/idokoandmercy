const DEFAULT_PRODUCTION_URL = "https://idokoandmercy.vercel.app";

export const siteConfig = {
  name: "Mercy & Idoko",
  title: "Mercy & Idoko — Wedding RSVP",
  description:
    "You are warmly invited. Please RSVP for our wedding celebration on Saturday, 12 December 2026. We cannot wait to celebrate with you.",
  weddingDate: "Saturday, 12 December 2026",
  ogImagePath: "/og-wedding.jpg",
  ogImageAlt: "Mercy & Idoko wedding invitation — RSVP",
} as const;

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  // VERCEL_URL is per-deployment and preview URLs are often protected (401).
  // Use the stable production domain for social metadata instead.
  if (process.env.VERCEL_ENV === "production") {
    return DEFAULT_PRODUCTION_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export function getOgImageUrl() {
  return `${getSiteUrl()}${siteConfig.ogImagePath}`;
}
