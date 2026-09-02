"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  PiFileTextFill,
  PiWarningCircleFill,
  PiShieldCheckFill,
  PiUserCheckFill,
  PiScalesFill,
  PiCreditCardFill,
  PiHandPeaceFill,
  PiEnvelopeSimpleFill,
  PiCheckCircleFill,
  PiArrowRight,
} from "react-icons/pi";

const SECTIONS = [
  { id: "acceptance", title: "1. Acceptance & Eligibility" },
  { id: "telehealth-nature", title: "2. Telehealth & Medical Services" },
  { id: "intake-accuracy", title: "3. Patient Medical Disclosures" },
  { id: "prescriptions", title: "4. Prescription & Pharmacy Fulfillment" },
  { id: "pricing-delivery", title: "5. Pricing, Payment & Delivery" },
  { id: "medication-use", title: "6. Safe Use & Resale Prohibition" },
  { id: "cancellations-refunds", title: "7. Cancellations & Refund Policy" },
  { id: "emergency-disclaimer", title: "8. Emergency Medical Disclaimer" },
  { id: "liability", title: "9. Limitation of Liability" },
  { id: "governing-law", title: "10. Governing Law & Contact" },
];

export default function TermsClient() {
  const [activeSection, setActiveSection] = useState("acceptance");

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1A0A0A]">
      <Header splashDone={true} />

      <main className="flex-1 pt-28 md:pt-36 pb-20">
        {/* Hero Header */}
        <section className="border-b border-[#FFE8EA] bg-[#FFF8F7] py-14 md:py-20 px-5 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE8EA] text-[#F07070] text-xs font-bold uppercase tracking-wider mb-5">
              <PiScalesFill size={16} />
              Legal Agreement
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-[#1A0A0A] mb-4">
              Terms of Service
            </h1>
            <p className="text-[#6E6E6E] text-base md:text-lg max-w-[700px] leading-relaxed">
              Please review these Terms of Service carefully before utilizing our telehealth platform, medical consultations, and partner pharmacy services.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-[#9A7878]">
              <span>Last updated: September 2025</span>
              <span>•</span>
              <span>Effective Date: January 1, 2025</span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[#2E7D32] font-semibold">
                <PiCheckCircleFill size={14} /> Telehealth Service Agreement
              </span>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-[1100px] mx-auto px-5 md:px-10 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar quick nav (Desktop) */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-28 p-6 rounded-2xl bg-[#FFF8F7] border border-[#FFE8EA] flex flex-col gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#9A7878] mb-2 px-2">
                  Table of Contents
                </h3>
                {SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setActiveSection(sec.id)}
                    className={`text-sm py-2 px-3 rounded-lg transition-all text-left ${
                      activeSection === sec.id
                        ? "bg-[#FFE8EA] text-[#F07070] font-bold"
                        : "text-[#4A3333] hover:bg-black/5"
                    }`}
                  >
                    {sec.title}
                  </a>
                ))}

                <div className="mt-6 pt-6 border-t border-[#FFE8EA] flex flex-col gap-3">
                  <p className="text-xs text-[#6E6E6E] leading-relaxed">
                    Questions regarding terms or order policies?
                  </p>
                  <a
                    href="mailto:tearsize@gmail.com"
                    className="inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#F07070] hover:bg-[#E05050] py-2.5 px-4 rounded-xl transition-colors shadow-sm"
                  >
                    <PiEnvelopeSimpleFill size={14} /> Contact Support
                  </a>
                </div>
              </div>
            </aside>

            {/* Legal Body Text */}
            <div className="lg:col-span-8 flex flex-col gap-12 text-[#2B2B2B] text-base leading-relaxed">
              {/* Section 1 */}
              <section id="acceptance" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">1</span>
                  Acceptance & Eligibility
                </h2>
                <p className="mb-4">
                  Welcome to <strong>by tearsize</strong>. By accessing our platform, submitting an online medical questionnaire, or purchasing medical products, you confirm that you have read, understood, and agreed to be legally bound by these Terms of Service.
                </p>
                <div className="p-4 rounded-xl bg-[#FFF8F7] border border-[#FFE8EA] text-sm text-[#4A3333] mb-3">
                  <strong>Age Requirement:</strong> You must be at least 18 years of age and possess legal capacity under Philippine law to create an account, submit an intake form, or receive medical consultations.
                </div>
              </section>

              {/* Section 2 */}
              <section id="telehealth-nature" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">2</span>
                  Telehealth & Medical Services
                </h2>
                <p className="mb-4">
                  <strong>by tearsize operates as a modern digital health coordination platform.</strong> We connect patients seeking specialized weight management, peptide therapies, and longevity wellness with independent licensed physicians and licensed partner compounding/dispensing pharmacies.
                </p>
                <p className="text-sm text-[#4A3333] mb-3">
                  Clinical judgment and prescription decisions remain solely within the professional discretion of the licensed healthcare provider reviewing your case. Using our platform does not guarantee that a prescription will be issued.
                </p>
              </section>

              {/* Section 3 */}
              <section id="intake-accuracy" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">3</span>
                  Patient Medical Disclosures
                </h2>
                <p className="mb-3">
                  Safe medical treatment depends directly on complete truthfulness. You agree and represent that:
                </p>
                <ul className="space-y-2 list-disc pl-5 text-sm text-[#4A3333]">
                  <li>All health information, medical history, concurrent prescriptions, and body metrics provided in your intake questionnaire are 100% accurate, complete, and up to date.</li>
                  <li>You will not misrepresent your identity or complete an intake on behalf of another individual without verified legal guardianship.</li>
                  <li>You will promptly notify your provider of any unexpected symptoms, adverse reactions, or newly diagnosed medical conditions.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="prescriptions" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">4</span>
                  Prescription & Pharmacy Fulfillment
                </h2>
                <p className="mb-4 text-sm text-[#4A3333]">
                  Prescription products are prepared and dispensed strictly by licensed, regulated partner pharmacies in full compliance with Department of Health (DOH) and Food and Drug Administration (FDA) pharmacy guidelines.
                </p>
                <p className="text-sm text-[#4A3333]">
                  If an evaluating clinician determines that a requested medication is medically inappropriate, contraindicated, or unsafe for you, you will be notified, and your payment will be refunded promptly.
                </p>
              </section>

              {/* Section 5 */}
              <section id="pricing-delivery" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">5</span>
                  Pricing, Payment & Delivery
                </h2>
                <ul className="space-y-2.5 list-disc pl-5 text-sm text-[#4A3333] mb-4">
                  <li><strong>Transparent Pricing:</strong> All program prices are clearly quoted in Philippine Pesos (PHP).</li>
                  <li><strong>Accepted Payment Methods:</strong> We accept verified electronic payments via Maya, GCash, BPI, BDO, and PayPal.</li>
                  <li><strong>Nationwide Dispatch:</strong> Standard orders are dispatched via J&T Express (3–7 days nationwide, free of charge) or express same-day courier via Lalamove (where delivery fee is handled upon drop-off).</li>
                  <li><strong>Cold-Chain & Discreet Packaging:</strong> Temperature-sensitive peptides are shipped with thermal protection and unmarked packaging to ensure privacy and product integrity.</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section id="medication-use" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">6</span>
                  Safe Use & Resale Prohibition
                </h2>
                <div className="p-4 rounded-xl bg-[#FFF0F0] border border-[#FF8FA3]/40 text-sm text-[#2E1010] mb-4">
                  <strong>Strict Prohibition on Resale:</strong> Prescription medications and specialized compounds are dispensed solely for your personal use under medical guidance. Reselling, transferring, distributing, or sharing prescribed medications is illegal and strictly prohibited.
                </div>
                <p className="text-sm text-[#4A3333]">
                  Always adhere strictly to the titration schedules, storage requirements, and dosing instructions provided by your clinical care team.
                </p>
              </section>

              {/* Section 7 */}
              <section id="cancellations-refunds" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">7</span>
                  Cancellations & Refund Policy
                </h2>
                <ul className="space-y-2.5 list-disc pl-5 text-sm text-[#4A3333]">
                  <li><strong>Before Clinical Review:</strong> You may cancel your intake submission and receive a 100% refund before clinical evaluation commences.</li>
                  <li><strong>Doctor Declines Treatment:</strong> If a physician determines a treatment is unsuitable, your order is refunded in full.</li>
                  <li><strong>Dispensed Medications (No Returns):</strong> Under pharmaceutical regulations, prescription medications cannot be returned or refunded once dispensed and dispatched by the pharmacy.</li>
                  <li><strong>Damaged / Defective Shipments:</strong> If your package arrives damaged, unsealed, or compromised in transit, contact us within 24 hours with photos for immediate replacement.</li>
                </ul>
              </section>

              {/* Section 8 */}
              <section id="emergency-disclaimer" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">8</span>
                  Emergency Medical Disclaimer
                </h2>
                <div className="p-5 rounded-2xl bg-[#FFE8EA] border border-[#FF5A5F]/30 flex items-start gap-3">
                  <PiWarningCircleFill size={24} className="text-[#FF5A5F] shrink-0 mt-0.5" />
                  <div className="text-sm text-[#2E1010] leading-relaxed">
                    <strong>TELEHEALTH IS NOT FOR MEDICAL EMERGENCIES:</strong> If you are experiencing severe chest pain, shortness of breath, sudden weakness, severe allergic reaction (anaphylaxis), or any life-threatening emergency, call local emergency services (911) or proceed immediately to the nearest hospital emergency room.
                  </div>
                </div>
              </section>

              {/* Section 9 */}
              <section id="liability" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">9</span>
                  Limitation of Liability
                </h2>
                <p className="text-sm text-[#4A3333] leading-relaxed">
                  Individual health outcomes vary based on physiological factors, adherence to protocols, diet, and lifestyle. To the maximum extent permitted by applicable law, by tearsize and its officers, employees, and affiliates shall not be liable for indirect, incidental, or consequential damages arising from website access, temporary downtime, or non-compliance with physician instructions.
                </p>
              </section>

              {/* Section 10 */}
              <section id="governing-law" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">10</span>
                  Governing Law & Contact
                </h2>
                <p className="mb-4 text-sm text-[#4A3333]">
                  These Terms of Service are governed by and construed in accordance with the laws of the Republic of the Philippines. For legal notices, inquiries, or support:
                </p>
                <div className="p-6 rounded-2xl bg-[#FFF8F7] border border-[#FFE8EA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9A7878]">Legal Inquiries</span>
                    <span className="text-lg font-bold text-[#1A0A0A]">by tearsize Support & Compliance</span>
                    <a href="mailto:tearsize@gmail.com" className="text-sm text-[#F07070] hover:underline">
                      tearsize@gmail.com
                    </a>
                  </div>
                  <a
                    href="mailto:tearsize@gmail.com?subject=Terms%20Inquiry"
                    className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#F07070] hover:bg-[#E05050] py-2.5 px-5 rounded-xl transition-colors shadow-sm"
                  >
                    Contact Legal Team <PiArrowRight size={16} />
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
