import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CRT from "../components/crt";

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
      <body className="flex min-h-full flex-col overflow-x-hidden bg-[var(--background)] text-[var(--foreground)] [font-family:var(--font-win95)] text-[14px] leading-[1.2]">
        {children}
        <CRT />
        <div className="crt-glow-line" aria-hidden="true" />
        <div className="crt-bezel" aria-hidden="true" />
      </body>
    </html>
  );
}
