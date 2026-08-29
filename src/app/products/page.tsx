import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Treatments & Products",
  description:
    "Explore our doctor-prescribed weight loss treatments, peptide therapies, and longevity wellness solutions.",
};

export default function ProductsPage() {
  return <ProductsClient />;
}
