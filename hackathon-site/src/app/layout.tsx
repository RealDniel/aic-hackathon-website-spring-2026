import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CRT from "../components/crt";
import PixelCursor from "../components/pixel_cursor";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Club Hackathon",
  description: "Website for the AIC's inaugural hackathon during Spring 2026!",
  icons: {
    icon: "/assets/icons/AIC%20pixel%20logo%20no%20bg.png",
    shortcut: "/assets/icons/AIC%20pixel%20logo%20no%20bg.png",
    apple: "/assets/icons/AIC%20pixel%20logo%20no%20bg.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="isolate flex min-h-full flex-col overflow-x-hidden bg-[var(--background)] text-[var(--foreground)] [font-family:var(--font-win95)] text-[14px] leading-[1.2]">
        {children}
        <PixelCursor />
        <CRT />
        <Analytics />
      </body>
    </html>
  );
}
