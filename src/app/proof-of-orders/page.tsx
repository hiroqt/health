import type { Metadata } from "next";
import ProofOfOrdersClient from "./ProofOfOrdersClient";

export const metadata: Metadata = {
  title: "Proof of Orders & Dispatched Deliveries | by tearsize",
  description:
    "Explore hundreds of verified proof-of-order parcels and fulfilled deliveries dispatched nationwide by our licensed medical team and FDA-registered pharmacies.",
  openGraph: {
    title: "Proof of Orders & Dispatched Deliveries | by tearsize",
    description:
      "Browse our live photographic dispatch ledger of fulfilled patient orders, safely packed and delivered across the Philippines.",
    url: "https://bytearsize.com/proof-of-orders",
    siteName: "by tearsize",
    images: [
      {
        url: "/orders-optimized/1.webp",
        width: 1080,
        height: 1350,
        alt: "by tearsize Fulfilled Order Delivery Proof",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proof of Orders & Dispatched Deliveries | by tearsize",
    description:
      "Photographic proof of fulfilled patient orders dispatched with temperature control and discreet packaging across the Philippines.",
    images: ["/orders-optimized/1.webp"],
  },
};

export default function ProofOfOrdersPage() {
  return <ProofOfOrdersClient />;
}
