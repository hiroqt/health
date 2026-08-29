import type { Metadata } from "next";
import EmailPreviewClient from "./EmailPreviewClient";

export const metadata: Metadata = {
  title: "Email Template Preview",
  description: "Preview transactional order confirmation and dispatch emails.",
};

export default function EmailPreviewPage() {
  return <EmailPreviewClient />;
}
