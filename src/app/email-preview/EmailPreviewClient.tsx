"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buildOrderEmailHtml } from "@/lib/emailTemplate";
import { PiEnvelopeFill, PiCopySimple, PiCheckFat } from "react-icons/pi";

export default function EmailPreviewClient() {
  const [copied, setCopied] = useState(false);

  const sampleOrder = {
    orderRef: "TSZ-839201",
    fullName: "Maria Santos Dela Cruz",
    email: "maria.santos@example.com",
    contactNumber: "+63 912 345 6789",
    completeAddress: "Unit 1204, Sakura Tower, Emerald Ave, Ortigas Center, Pasig City, Metro Manila 1605",
    selectedItems: [
      { name: "Tirzepatide", dosage: "15mg", quantity: 1, price: 2500 },
      { name: "BPC-157", dosage: "10mg", quantity: 2, price: 4000 },
      { name: "NAD+", dosage: "500mg", quantity: 1, price: 3000 },
    ],
    deliveryMode: "J&T Express Nationwide (3–7 Days)",
    paymentMethod: "GCash (0961 323 6199)",
    totalAmount: 13500,
  };

  const htmlContent = buildOrderEmailHtml(sampleOrder);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5F5]/40">
      <Header splashDone={true} />

      <main className="flex-1 pt-28 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Header Bar */}
          <div className="w-full bg-white rounded-[24px] border border-[#FFE8EA] p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#FFF0F0] text-[#FF5A5F] flex items-center justify-center">
                <PiEnvelopeFill size={24} />
              </div>
              <div>
                <h1 className="font-display font-bold text-[1.4rem] text-[#0F0F0F]">
                  Order Confirmation Email Template
                </h1>
                <p className="text-[13px] text-[#6E6E6E]">
                  Live interactive preview of customer confirmation emails.
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-[13px] bg-[#0F0F0F] text-white hover:bg-[#FF5A5F] transition-all shadow-sm cursor-pointer shrink-0"
            >
              {copied ? <PiCheckFat className="text-[#81C784]" /> : <PiCopySimple />}
              {copied ? "HTML Copied!" : "Copy Raw HTML"}
            </button>
          </div>

          {/* Email Canvas Preview */}
          <div className="w-full bg-white rounded-[32px] border border-[#FFE8EA] p-4 md:p-8 shadow-xl overflow-hidden">
            <iframe
              srcDoc={htmlContent}
              title="Email Preview"
              className="w-full min-h-[900px] rounded-[20px] border border-[#FFE8EA]"
            />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
