import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | by tearsize",
  description:
    "Get in touch with the by tearsize medical and support team. Reach us via email, phone hotline, Google Mail, WhatsApp, Facebook Messenger, or Instagram.",
};

export default function ContactPage() {
  return <ContactClient />;
}
