import type { Metadata } from "next";
import AccessibilityClient from "./AccessibilityClient";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Our commitment to digital accessibility, inclusive design, and WCAG standards for all patients and visitors.",
};

export default function AccessibilityPage() {
  return <AccessibilityClient />;
}
