import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how by tearsize protects your personal information, medical intake data, and confidentiality under healthcare privacy standards.",
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
