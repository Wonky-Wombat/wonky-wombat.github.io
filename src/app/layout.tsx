import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../styles/global.css";

const title = "Catspace – Cat Mood Diary";
const description = "A cozy mood diary for your cat. Log how they feel in seconds and watch the month fill up.";

export const metadata: Metadata = {
  metadataBase: new URL("https://wonky-wombat.github.io"),
  title,
  description,
  icons: { icon: "/favicon.png" },
  openGraph: { title, description, type: "website", images: ["/og-image.jpg"] },
  twitter: { card: "summary_large_image", images: ["/og-image.jpg"] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#BCDAF9" },
    { media: "(prefers-color-scheme: dark)", color: "#17324E" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
