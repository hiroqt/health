import type { Metadata } from "next";
import LearnMoreClient from "./LearnMoreClient";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn about our simple 4-step medical consultation process, physician evaluations, and pharmacy fulfillment.",
};

export default function LearnMorePage() {
  return <LearnMoreClient />;
}
