import type { Metadata } from "next";
import BeforeAfterClient from "./BeforeAfterClient";

export const metadata: Metadata = {
  title: "Before & After Transformations | Real Patient Results | by tearsize",
  description:
    "See genuine before-and-after weight loss and body recomposition transformations from real patients on by tearsize doctor-guided GLP-1 and metabolic health programs.",
  openGraph: {
    title: "Before & After Transformations | by tearsize",
    description:
      "Real patient stories and verified transformations. Physician-guided GLP-1 programs, metabolic health protocols, and lasting results.",
    url: "https://bytearsize.com/before-and-after",
    siteName: "by tearsize",
    images: [
      {
        url: "/before-after/12.webp",
        width: 1080,
        height: 1350,
        alt: "by tearsize Patient Before & After Transformation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Before & After Transformations | by tearsize",
    description:
      "Explore real patient before and after photos and success stories from by tearsize doctor-prescribed weight loss programs.",
    images: ["/before-after/12.webp"],
  },
};

export default function BeforeAfterPage() {
  return <BeforeAfterClient />;
}
