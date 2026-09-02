"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  PiShieldCheckFill,
  PiLockKeyFill,
  PiFileTextFill,
  PiUserCheckFill,
  PiEyeSlashFill,
  PiEnvelopeSimpleFill,
  PiPhoneFill,
  PiCheckCircleFill,
  PiArrowRight,
} from "react-icons/pi";

const SECTIONS = [
  { id: "overview", title: "1. Overview & Commitment" },
  { id: "information-collected", title: "2. Information We Collect" },
  { id: "how-we-use", title: "3. How We Use Your Data" },
  { id: "confidentiality", title: "4. Medical Confidentiality" },
  { id: "sharing", title: "5. Information Sharing & Third Parties" },
  { id: "security", title: "6. Data Security & Encryption" },
  { id: "rights", title: "7. Your Privacy Rights" },
  { id: "retention", title: "8. Data Retention" },
  { id: "cookies", title: "9. Cookies & Analytics" },
  { id: "contact", title: "10. Contact Privacy Officer" },
];

export default function PrivacyClient() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1A0A0A]">
      <Header splashDone={true} />

      <main className="flex-1 pt-28 md:pt-36 pb-20">
        {/* Hero Header */}
        <section className="border-b border-[#FFE8EA] bg-[#FFF8F7] py-14 md:py-20 px-5 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE8EA] text-[#F07070] text-xs font-bold uppercase tracking-wider mb-5">
              <PiShieldCheckFill size={16} />
              Legal & Data Protection
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-[#1A0A0A] mb-4">
              Privacy Policy
            </h1>
            <p className="text-[#6E6E6E] text-base md:text-lg max-w-[700px] leading-relaxed">
              Your health information is confidential and protected. Learn how we safeguard your personal details, medical consultations, and order records.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-[#9A7878]">
              <span>Last updated: September 2025</span>
              <span>•</span>
              <span>Effective Date: January 1, 2025</span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[#2E7D32] font-semibold">
                <PiCheckCircleFill size={14} /> Health Privacy Compliant
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
                    Have questions about your medical records?
                  </p>
                  <a
                    href="mailto:tearsize@gmail.com"
                    className="inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#F07070] hover:bg-[#E05050] py-2.5 px-4 rounded-xl transition-colors shadow-sm"
                  >
                    <PiEnvelopeSimpleFill size={14} /> Contact Privacy Team
                  </a>
                </div>
              </div>
            </aside>

            {/* Legal Body Text */}
            <div className="lg:col-span-8 flex flex-col gap-12 text-[#2B2B2B] text-base leading-relaxed">
              {/* Section 1 */}
              <section id="overview" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">1</span>
                  Overview & Commitment
                </h2>
                <p className="mb-4">
                  At <strong>by tearsize</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), we believe that modern digital healthcare requires uncompromising transparency and patient data protection. We provide a platform enabling patients to connect with licensed healthcare professionals, undergo medical intakes, and receive physician-directed treatments and pharmacy fulfillment.
                </p>
                <p>
                  This Privacy Policy describes how we collect, use, process, and protect your personal and medical information when you access our website, complete online consultations, or purchase products.
                </p>
              </section>

              {/* Section 2 */}
              <section id="information-collected" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">2</span>
                  Information We Collect
                </h2>
                <p className="mb-4">To deliver safe, customized medical programs, we collect the following categories of information:</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  <div className="p-4 rounded-xl border border-[#FFE8EA] bg-[#FFF8F7]">
                    <h4 className="font-bold text-[#1A0A0A] text-sm mb-2 flex items-center gap-2">
                      <PiUserCheckFill className="text-[#F07070]" size={18} />
                      Identity & Contact Data
                    </h4>
                    <p className="text-xs text-[#6E6E6E] leading-relaxed">
                      Full legal name, date of birth, biological sex, contact phone number, email address, government ID verification (when required for prescription validity), and shipping address.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-[#FFE8EA] bg-[#FFF8F7]">
                    <h4 className="font-bold text-[#1A0A0A] text-sm mb-2 flex items-center gap-2">
                      <PiFileTextFill className="text-[#F07070]" size={18} />
                      Health & Medical History
                    </h4>
                    <p className="text-xs text-[#6E6E6E] leading-relaxed">
                      Height, current weight, target weight, medical conditions, allergies, current medications, contraindications, past surgical history, and clinician consultation notes.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-[#FFE8EA] bg-[#FFF8F7]">
                    <h4 className="font-bold text-[#1A0A0A] text-sm mb-2 flex items-center gap-2">
                      <PiLockKeyFill className="text-[#F07070]" size={18} />
                      Order & Payment Records
                    </h4>
                    <p className="text-xs text-[#6E6E6E] leading-relaxed">
                      Payment transaction references, selected treatment protocols, dosage schedules, delivery preferences (Lalamove / J&T Express), and delivery receipts.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-[#FFE8EA] bg-[#FFF8F7]">
                    <h4 className="font-bold text-[#1A0A0A] text-sm mb-2 flex items-center gap-2">
                      <PiEyeSlashFill className="text-[#F07070]" size={18} />
                      Technical & Device Data
                    </h4>
                    <p className="text-xs text-[#6E6E6E] leading-relaxed">
                      IP address, browser type, operating system, device identifiers, and anonymized interaction analytics used strictly to optimize website security and performance.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="how-we-use" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">3</span>
                  How We Use Your Data
                </h2>
                <p className="mb-3">We process your information exclusively for legitimate medical, pharmacy, and fulfillment purposes:</p>
                <ul className="space-y-2.5 list-disc pl-5 text-sm text-[#4A3333]">
                  <li>Facilitating physician review and clinical evaluation of your medical intake questionnaire.</li>
                  <li>Issuing electronic prescriptions and routing orders to licensed partner dispensing pharmacies.</li>
                  <li>Coordinating temperature-sensitive express courier delivery and real-time tracking updates.</li>
                  <li>Providing continuous patient support, dosage guidance, and clinical follow-ups.</li>
                  <li>Detecting, preventing, and mitigating fraudulent transactions or unauthorized platform usage.</li>
                  <li>Complying with applicable healthcare regulations, pharmacy laws, and mandatory regulatory reporting.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="confidentiality" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">4</span>
                  Medical Confidentiality
                </h2>
                <div className="p-5 rounded-2xl bg-[#FFF0F0] border border-[#FF8FA3]/30 mb-4">
                  <p className="text-sm text-[#2E1010] font-medium leading-relaxed">
                    <strong>Doctor-Patient Privilege:</strong> All medical disclosures, clinical consults, and prescription history are held in strict medical confidence. Only the prescribing healthcare provider and licensed pharmacist assigned to your case have access to your sensitive health file.
                  </p>
                </div>
                <p className="text-sm text-[#4A3333]">
                  Administrative and technical staff only have access to anonymized logistical data necessary to confirm payment and ship your parcel.
                </p>
              </section>

              {/* Section 5 */}
              <section id="sharing" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">5</span>
                  Information Sharing & Third Parties
                </h2>
                <p className="mb-4">
                  <strong>We do NOT sell, rent, or trade your personal or health data to advertisers, data brokers, or third parties under any circumstances.</strong>
                </p>
                <p className="mb-3 text-sm text-[#4A3333]">Data is shared only with verified operational partners essential for treatment:</p>
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#FFF8F7] border border-[#FFE8EA] text-sm">
                    <strong>Independent Medical Providers:</strong> Licensed physicians evaluating your suitability for GLP-1 or peptide therapies.
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FFF8F7] border border-[#FFE8EA] text-sm">
                    <strong>Licensed Partner Pharmacies:</strong> Regulated compounding and dispensing pharmacies packaging your medication.
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FFF8F7] border border-[#FFE8EA] text-sm">
                    <strong>Logistics Partners (Lalamove / J&T Express):</strong> Name, delivery address, and contact number only to execute parcel delivery.
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section id="security" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">6</span>
                  Data Security & Encryption
                </h2>
                <p className="mb-4 text-sm text-[#4A3333]">
                  We utilize enterprise-grade security protocols to protect your health records against unauthorized access, loss, or alteration:
                </p>
                <ul className="space-y-2 list-disc pl-5 text-sm text-[#4A3333]">
                  <li>256-bit SSL/TLS encryption for all data in transit across our web properties.</li>
                  <li>Encrypted storage for all medical intake submissions and prescription archives.</li>
                  <li>Role-based access controls and multi-factor authentication for medical team portals.</li>
                  <li>Regular vulnerability assessments and strict security audits.</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section id="rights" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">7</span>
                  Your Privacy Rights
                </h2>
                <p className="mb-4 text-sm text-[#4A3333]">
                  Under applicable data privacy laws, you possess fundamental rights regarding your personal information:
                </p>
                <ul className="space-y-2 list-disc pl-5 text-sm text-[#4A3333]">
                  <li><strong>Right to Access:</strong> Request a copy of the personal and medical data we hold on file.</li>
                  <li><strong>Right to Rectification:</strong> Request corrections to inaccurate or incomplete records.</li>
                  <li><strong>Right to Erasure / Account Deletion:</strong> Request deletion of non-clinical records (subject to mandatory medical record retention laws).</li>
                  <li><strong>Right to Object:</strong> Opt out of non-essential communications or newsletters at any time.</li>
                </ul>
              </section>

              {/* Section 8 */}
              <section id="retention" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">8</span>
                  Data Retention
                </h2>
                <p className="text-sm text-[#4A3333]">
                  We retain medical records and consultation history for the minimum period mandated by telehealth and medical regulatory standards (typically 5 to 7 years) to maintain continuity of care and legal accountability. Non-medical account information is deleted upon request.
                </p>
              </section>

              {/* Section 9 */}
              <section id="cookies" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">9</span>
                  Cookies & Analytics
                </h2>
                <p className="text-sm text-[#4A3333]">
                  Our website uses functional cookies to maintain your session, keep items in your intake form, and ensure optimal performance. We do not use intrusive third-party cross-site tracking cookies.
                </p>
              </section>

              {/* Section 10 */}
              <section id="contact" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">10</span>
                  Contact Our Privacy Officer
                </h2>
                <p className="mb-4 text-sm text-[#4A3333]">
                  If you have inquiries, privacy requests, or wish to exercise your data rights, please contact our dedicated Data Protection Officer:
                </p>
                <div className="p-6 rounded-2xl bg-[#FFF8F7] border border-[#FFE8EA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9A7878]">Data Protection Officer</span>
                    <span className="text-lg font-bold text-[#1A0A0A]">by tearsize Healthcare</span>
                    <a href="mailto:tearsize@gmail.com" className="text-sm text-[#F07070] hover:underline">
                      tearsize@gmail.com
                    </a>
                  </div>
                  <a
                    href="mailto:tearsize@gmail.com?subject=Privacy%20Inquiry"
                    className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#F07070] hover:bg-[#E05050] py-2.5 px-5 rounded-xl transition-colors shadow-sm"
                  >
                    Email DPO <PiArrowRight size={16} />
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
