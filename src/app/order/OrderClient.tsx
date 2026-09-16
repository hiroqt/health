"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OrderIntakeForm } from "@/components/forms/OrderIntakeForm";
import { PiShieldCheckFill, PiWarningCircleFill, PiSpinnerGapBold } from "react-icons/pi";
import Link from "next/link";

export function OrderClient() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [quizData, setQuizData] = useState<{
    name?: string;
    email?: string;
  }>({});

  useEffect(() => {
    try {
      const isCompleted = sessionStorage.getItem("tearsize_quiz_completed") === "true";
      const isReorder =
        typeof window !== "undefined" &&
        (window.location.search.includes("reorder=true") ||
          window.location.search.includes("direct=true"));
      const savedDataRaw = sessionStorage.getItem("tearsize_quiz_data");

      if (isCompleted || isReorder) {
        if (isReorder) {
          sessionStorage.setItem("tearsize_quiz_completed", "true");
        }
        if (savedDataRaw) {
          const parsed = JSON.parse(savedDataRaw);
          setQuizData({
            name: (parsed?.answers?.name as string) || "",
            email: (parsed?.answers?.email as string) || "",
          });
        }
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        const timer = setTimeout(() => {
          router.replace("/quiz?required=true");
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsAuthorized(false);
      router.replace("/quiz?required=true");
    }
  }, [router]);

  if (isAuthorized === null || isAuthorized === false) {
    return (
      <div className="w-full max-w-[520px] mx-auto my-12 p-8 sm:p-10 bg-white rounded-[28px] border border-[#F5DADA] shadow-xl text-center flex flex-col items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-[#FFF0F0] text-[#FF5A5F] flex items-center justify-center animate-pulse">
          <PiWarningCircleFill size={34} />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-display font-bold text-[1.35rem] text-[#0F0F0F]">
            Doctor Consultation Required
          </h2>
          <p className="text-[14px] text-[#7A5555] leading-relaxed">
            Prescription medications require a brief doctor-reviewed health assessment before checkout. 
            Redirecting you to the 1-minute quiz...
          </p>
        </div>
        <div className="flex items-center gap-2 text-[13px] font-semibold text-[#FF5A5F]">
          <PiSpinnerGapBold size={18} className="animate-spin" />
          <span>Opening Clinical Quiz</span>
        </div>
        <Link
          href="/quiz?required=true"
          className="mt-2 text-[13px] font-bold text-[#FF5A5F] underline hover:text-[#D94040]"
        >
          Click here if you are not redirected automatically →
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Quiz Validation Badge */}
      <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EBF9F1] border border-[#BDEBD0] text-[#1E7E4B] text-[12.5px] font-semibold shadow-xs">
        <PiShieldCheckFill size={17} className="shrink-0" />
        <span>Clinical Quiz Verified — Prescription Checkout Unlocked</span>
      </div>

      <OrderIntakeForm
        initialName={quizData.name || ""}
        initialEmail={quizData.email || ""}
      />
    </div>
  );
}
