import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "by tearsize — Doctor-prescribed weight loss, entirely online.",
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
};

export default function HomePage() {
  return <HomeClient />;
}
