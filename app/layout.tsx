import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/global.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WITH GREAT POWER | A Cinematic WebGL Origin Story",
  description: "An experimental, scroll-driven WebGL portfolio that blends cinematic storytelling, interactive 3D, and personal narrative into a single continuous experience.",
  keywords: ["WebGL", "portfolio", "frontend", "React Three Fiber", "creative development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
