import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bytearsize.com"),
  title: {
    default: "by tearsize — Doctor-prescribed weight loss, entirely online.",
    template: "%s | by tearsize",
  },
  description:
    "Personalized GLP-1 programs, metabolic health plans, and prescription skincare. Consult licensed doctors, get custom treatments, and receive free discreet delivery.",
  openGraph: {
    title: "by tearsize — Doctor-prescribed weight loss, entirely online.",
    description:
      "Personalized GLP-1 programs, metabolic health plans, and prescription skincare. Consult licensed doctors, get custom treatments, and receive free discreet delivery.",
    url: "https://bytearsize.com",
    siteName: "tear size",
    images: [
      {
        url: "/image.png",
        width: 1400,
        height: 615,
        alt: "by tearsize — Doctor-prescribed weight loss, entirely online.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "by tearsize — Doctor-prescribed weight loss, entirely online.",
    description:
      "Personalized GLP-1 programs, metabolic health plans, and prescription skincare. Consult licensed doctors, get custom treatments, and receive free discreet delivery.",
    images: ["/image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/Profile.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: ["/Profile.png"],
    apple: [
      { url: "/Profile.png" },
      { url: "/Profile.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`h-full ${outfit.variable}`}>
      <body className="min-h-full flex flex-col antialiased bg-white text-[#0F0F0F]">
        <SmoothScrollProvider headerOffset={72} />
        {children}
      </body>
    </html>
  );
}
