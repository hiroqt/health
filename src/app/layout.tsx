import type { Metadata } from "next";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "tearsize — Doctor-prescribed weight loss, entirely online.",
  description:
    "Personalized GLP-1 programs, metabolic health plans, and prescription skincare. Consult licensed doctors, get custom treatments, and receive free discreet delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Satoshi from Fontshare — all weights */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-white text-[#1A0A0A]">
        <SmoothScrollProvider headerOffset={72} />
        {children}
      </body>
    </html>
  );
}
