import type { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions governing access to by tearsize telehealth consultations, physician evaluations, and pharmacy fulfillment.",
};

export default function TermsPage() {
  return <TermsClient />;
}
