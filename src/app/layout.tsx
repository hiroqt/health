import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "&health — Convenient, quality care. 100% online.",
  description:
    "Personalized telehealth for weight loss, skin care, and hair regrowth. Consult with licensed doctors, receive custom prescriptions, and get free discreet delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased bg-[var(--color-bg)] text-[var(--color-ink)]">
        <SmoothScrollProvider headerOffset={72} />
        {children}
      </body>
    </html>
  );
}
