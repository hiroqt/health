import type { Metadata } from "next";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Clinical Assessment",
  description:
    "Take our 2-minute clinical assessment to find the doctor-prescribed treatment tailored to your health goals.",
};

export default function QuizPage() {
  return <QuizClient />;
}
