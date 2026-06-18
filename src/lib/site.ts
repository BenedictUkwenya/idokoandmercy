export const siteConfig = {
  name: "Mercy & Idoko",
  title: "Mercy & Idoko — Wedding RSVP",
  description:
    "You are warmly invited. Please RSVP for our wedding celebration on Saturday, 12 December 2026. We cannot wait to celebrate with you.",
  weddingDate: "Saturday, 12 December 2026",
  ogImage: "/og-wedding.jpg",
  ogImageAlt: "Mercy & Idoko wedding invitation — RSVP",
} as const;

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
