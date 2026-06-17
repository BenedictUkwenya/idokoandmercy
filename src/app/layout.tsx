import type { Metadata } from "next";
import { Bodoni_Moda, Quattrocento_Sans } from "next/font/google";
import "./globals.css";

const quattrocentoSans = Quattrocento_Sans({
  variable: "--font-quattrocento-sans",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Idoko & Mercy Wedding Experience",
  description:
    "A premium digital wedding invitation experience with RSVP, program, venue, and guest guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${quattrocentoSans.variable} ${bodoniModa.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
