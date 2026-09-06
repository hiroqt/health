import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: {
    default: "by tearsize — Doctor-prescribed weight loss, entirely online.",
    template: "%s | by tearsize",
  },
  description:
    "Personalized GLP-1 programs, metabolic health plans, and prescription skincare. Consult licensed doctors, get custom treatments, and receive free discreet delivery.",
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
