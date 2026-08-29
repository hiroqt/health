import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "by tearsize — Doctor-prescribed weight loss, entirely online.",
  description:
    "Personalized GLP-1 programs, metabolic health plans, and prescription skincare. Consult licensed doctors, get custom treatments, and receive free discreet delivery.",
};

export default function HomePage() {
  return <HomeClient />;
}
