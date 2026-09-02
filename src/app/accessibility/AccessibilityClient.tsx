"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  PiEyeFill,
  PiPersonArmsSpreadFill,
  PiKeyboardFill,
  PiDeviceMobileFill,
  PiTextAaFill,
  PiSparkleFill,
  PiEnvelopeSimpleFill,
  PiCheckCircleFill,
  PiArrowRight,
  PiPhoneFill,
} from "react-icons/pi";

const SECTIONS = [
  { id: "commitment", title: "1. Our Commitment" },
  { id: "standards", title: "2. Accessibility Standards (WCAG 2.1)" },
  { id: "features", title: "3. Accessibility Features" },
  { id: "assistive-tech", title: "4. Assistive Tech Compatibility" },
  { id: "ongoing-improvements", title: "5. Ongoing Testing & Audits" },
  { id: "feedback", title: "6. Feedback & Assistance" },
];

export default function AccessibilityClient() {
  const [activeSection, setActiveSection] = useState("commitment");

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1A0A0A]">
      <Header splashDone={true} />

      <main className="flex-1 pt-28 md:pt-36 pb-20">
        {/* Hero Header */}
        <section className="border-b border-[#FFE8EA] bg-[#FFF8F7] py-14 md:py-20 px-5 md:px-10">
          <div className="max-w-[1100px] mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE8EA] text-[#F07070] text-xs font-bold uppercase tracking-wider mb-5">
              <PiPersonArmsSpreadFill size={16} />
              Inclusion & Digital Access
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-[#1A0A0A] mb-4">
              Accessibility Statement
            </h1>
            <p className="text-[#6E6E6E] text-base md:text-lg max-w-[700px] leading-relaxed">
              Healthcare should be effortlessly accessible to everyone. Discover our dedication to barrier-free digital design and WCAG 2.1 AA compliance.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-[#9A7878]">
              <span>Last updated: September 2025</span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[#2E7D32] font-semibold">
                <PiCheckCircleFill size={14} /> WCAG 2.1 Level AA Standard
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
                    Need assistance accessing any page or intake form?
                  </p>
                  <a
                    href="mailto:tearsize@gmail.com"
                    className="inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#F07070] hover:bg-[#E05050] py-2.5 px-4 rounded-xl transition-colors shadow-sm"
                  >
                    <PiEnvelopeSimpleFill size={14} /> Accessibility Support
                  </a>
                </div>
              </div>
            </aside>

            {/* Legal Body Text */}
            <div className="lg:col-span-8 flex flex-col gap-12 text-[#2B2B2B] text-base leading-relaxed">
              {/* Section 1 */}
              <section id="commitment" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">1</span>
                  Our Commitment
                </h2>
                <p className="mb-4">
                  <strong>by tearsize</strong> is committed to ensuring digital accessibility for people of all abilities, including individuals with visual, hearing, motor, and cognitive impairments.
                </p>
                <p>
                  We continually improve the user experience for everyone and apply relevant accessibility standards to make sure that our health information, intake forms, and customer consultations remain open and welcoming to all patients.
                </p>
              </section>

              {/* Section 2 */}
              <section id="standards" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">2</span>
                  Accessibility Standards
                </h2>
                <p className="mb-4">
                  The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility for people with disabilities. Our platform targets conformance with <strong>WCAG 2.1 Level AA</strong> standards.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                  <div className="p-4 rounded-xl border border-[#FFE8EA] bg-[#FFF8F7]">
                    <span className="text-xs font-bold text-[#F07070] uppercase tracking-wider block mb-1">Principle 1</span>
                    <h4 className="font-bold text-[#1A0A0A] text-sm mb-1">Perceivable</h4>
                    <p className="text-xs text-[#6E6E6E]">Information and UI components are presented in ways users can clearly perceive with vision or assistive readers.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-[#FFE8EA] bg-[#FFF8F7]">
                    <span className="text-xs font-bold text-[#F07070] uppercase tracking-wider block mb-1">Principle 2</span>
                    <h4 className="font-bold text-[#1A0A0A] text-sm mb-1">Operable</h4>
                    <p className="text-xs text-[#6E6E6E]">User interface components and navigation are fully controllable via keyboard, touch, or assistive hardware.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-[#FFE8EA] bg-[#FFF8F7]">
                    <span className="text-xs font-bold text-[#F07070] uppercase tracking-wider block mb-1">Principle 3</span>
                    <h4 className="font-bold text-[#1A0A0A] text-sm mb-1">Understandable</h4>
                    <p className="text-xs text-[#6E6E6E]">Information and operation of the user interface are clear, intuitive, and readable with distinct feedback.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-[#FFE8EA] bg-[#FFF8F7]">
                    <span className="text-xs font-bold text-[#F07070] uppercase tracking-wider block mb-1">Principle 4</span>
                    <h4 className="font-bold text-[#1A0A0A] text-sm mb-1">Robust</h4>
                    <p className="text-xs text-[#6E6E6E]">Content is authored cleanly with modern semantic standards to work with current and future user agents.</p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="features" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">3</span>
                  Accessibility Features
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-xl border border-[#FFE8EA] bg-[#FFF8F7]">
                    <div className="w-10 h-10 rounded-xl bg-[#FFE8EA] text-[#F07070] flex items-center justify-center shrink-0">
                      <PiTextAaFill size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A0A0A] text-sm mb-1">Typography & Contrast</h4>
                      <p className="text-xs text-[#6E6E6E] leading-relaxed">
                        High contrast ratios across text elements, scalable fonts (Outfit), clear visual hierarchy, and readable line heights that facilitate easy scanning.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-xl border border-[#FFE8EA] bg-[#FFF8F7]">
                    <div className="w-10 h-10 rounded-xl bg-[#FFE8EA] text-[#F07070] flex items-center justify-center shrink-0">
                      <PiKeyboardFill size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A0A0A] text-sm mb-1">Full Keyboard Navigation</h4>
                      <p className="text-xs text-[#6E6E6E] leading-relaxed">
                        All interactive links, dropdowns, intake form fields, dosage selectors, and buttons are accessible with Tab, Enter, Space, and Arrow keys with prominent focus rings.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-xl border border-[#FFE8EA] bg-[#FFF8F7]">
                    <div className="w-10 h-10 rounded-xl bg-[#FFE8EA] text-[#F07070] flex items-center justify-center shrink-0">
                      <PiEyeFill size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A0A0A] text-sm mb-1">Screen Reader Compatibility</h4>
                      <p className="text-xs text-[#6E6E6E] leading-relaxed">
                        Semantic HTML5 landmarks (`header`, `main`, `footer`, `nav`, `section`), descriptive `alt` tags on medical diagrams and product images, and explicit `aria-label` attributes.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-xl border border-[#FFE8EA] bg-[#FFF8F7]">
                    <div className="w-10 h-10 rounded-xl bg-[#FFE8EA] text-[#F07070] flex items-center justify-center shrink-0">
                      <PiDeviceMobileFill size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A0A0A] text-sm mb-1">Adaptive & Scalable Layout</h4>
                      <p className="text-xs text-[#6E6E6E] leading-relaxed">
                        Responsive layout supporting zoom up to 200% without loss of content or functional breakage across mobile phones, tablets, and desktop displays.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section id="assistive-tech" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">4</span>
                  Assistive Tech Compatibility
                </h2>
                <p className="mb-3 text-sm text-[#4A3333]">
                  Our website is designed to be compatible with major assistive technologies, including:
                </p>
                <ul className="space-y-2 list-disc pl-5 text-sm text-[#4A3333]">
                  <li>Modern screen readers (Apple VoiceOver, NVDA, JAWS, Google TalkBack).</li>
                  <li>Built-in OS speech recognition and voice navigation software.</li>
                  <li>Browser zoom and custom high-contrast color stylesheets.</li>
                  <li>Standard hardware switch and keyboard access devices.</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section id="ongoing-improvements" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">5</span>
                  Ongoing Testing & Audits
                </h2>
                <p className="text-sm text-[#4A3333] leading-relaxed">
                  We conduct regular automated and manual accessibility audits to identify and remedy potential barriers. When updating intake flows, medical protocols, or product pages, accessibility criteria are integrated into our design and development cycle.
                </p>
              </section>

              {/* Section 6 */}
              <section id="feedback" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-bold text-[#1A0A0A] mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#FFE8EA] text-[#F07070] flex items-center justify-center text-sm font-bold">6</span>
                  Feedback & Assistance
                </h2>
                <p className="mb-4 text-sm text-[#4A3333]">
                  We welcome your feedback on the accessibility of by tearsize. If you encounter any accessibility barrier or require assistance completing an intake questionnaire, please reach out to us:
                </p>
                <div className="p-6 rounded-2xl bg-[#FFF8F7] border border-[#FFE8EA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9A7878]">Accessibility Coordinator</span>
                    <span className="text-lg font-bold text-[#1A0A0A]">by tearsize Accessibility Team</span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-[#4A3333] mt-1">
                      <a href="mailto:tearsize@gmail.com" className="text-[#F07070] font-semibold hover:underline">
                        tearsize@gmail.com
                      </a>
                      <span>•</span>
                      <span>+63 961 323 6199</span>
                    </div>
                  </div>
                  <a
                    href="mailto:tearsize@gmail.com?subject=Accessibility%20Support"
                    className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#F07070] hover:bg-[#E05050] py-2.5 px-5 rounded-xl transition-colors shadow-sm"
                  >
                    Get Help <PiArrowRight size={16} />
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
