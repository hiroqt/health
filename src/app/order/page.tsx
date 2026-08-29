"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrderIntakeForm } from "@/components/forms/OrderIntakeForm";

export default function OrderPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5F5]/30">
      <Header splashDone={true} />
      <main className="flex-1 pt-24 md:pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center">
          <OrderIntakeForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
