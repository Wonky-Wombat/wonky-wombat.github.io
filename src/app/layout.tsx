import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../styles/global.css";

const description = "A cozy AI mood scanner and daily journal for cat lovers.";

export const metadata: Metadata = {
  title: "Catspace",
  description,
  icons: { icon: "/favicon.png" },
  openGraph: { title: "Catspace", description, type: "website" },
  twitter: { card: "summary" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
