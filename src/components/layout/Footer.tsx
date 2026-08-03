"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PiInstagramLogo, PiFacebookLogo, PiXLogo,
  PiTiktokLogo, PiYoutubeLogo,
  PiShieldCheck, PiTruck, PiArrowRight,
  PiMapPin, PiPhone, PiEnvelopeSimple, PiArrowUpRight
} from "react-icons/pi";

// ─── WAVE DIVIDER ───────────────────────────────────────────────────────────
function FooterWave({ fromColor, toColor }: { fromColor: string; toColor: string }) {
  return (
    <div style={{ backgroundColor: fromColor, lineHeight: 0, display: "block" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ display: "block", width: "100%", height: "72px" }}
      >
        <path
          d="M0,28 C320,72 800,0 1120,44 C1240,60 1360,36 1440,28 L1440,72 L0,72 Z"
          fill={toColor}
          opacity="0.45"
        />
        <path
          d="M0,52 C280,8 640,72 960,40 C1120,24 1280,56 1440,44 L1440,72 L0,72 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}

// ─── DATA ───────────────────────────────────────────────────────────────────

const COLUMNS = [
  {
    heading: "Treatments",
    links: [
      { label: "Weight Management", href: "#" },
      { label: "GLP-1 Medication",  href: "#" },
      { label: "Skin Renewal",      href: "#" },
      { label: "Men's Vitality",    href: "#" },
      { label: "View all care",     href: "#", accent: true },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "How it Works",      href: "#" },
      { label: "Pricing & Plans",   href: "#" },
      { label: "Help Center",       href: "#" },
      { label: "Track Your Order",  href: "#" },
      { label: "Contact Us",        href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About &health",   href: "#" },
      { label: "Medical Team",    href: "#" },
      { label: "Our Pharmacies",  href: "#" },
      { label: "Careers",         href: "#" },
      { label: "Press",           href: "#" },
    ],
  },
];

const SOCIALS = [
  { icon: <PiInstagramLogo size={20} />, label: "Instagram", href: "#" },
  { icon: <PiFacebookLogo size={20} />,  label: "Facebook",  href: "#" },
  { icon: <PiXLogo size={20} />,         label: "X",         href: "#" },
  { icon: <PiTiktokLogo size={20} />,    label: "TikTok",    href: "#" },
  { icon: <PiYoutubeLogo size={20} />,   label: "YouTube",   href: "#" },
];

const PAYMENTS = ["Visa", "Mastercard", "Amex", "Discover", "HSA/FSA"];

// ─── NEWSLETTER ─────────────────────────────────────────────────────────────

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent,  setSent]  = useState(false);
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) { setError("Please enter a valid email."); return; }
    setSent(true); setError("");
  }

  return (
    <div className="bg-[#F5EFE6] pb-14 pt-8 px-5 md:px-10 lg:px-16 border-b border-[#E6D8C3]">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div className="max-w-md">
          <h3 className="font-display text-[2rem] text-[#0F1210] leading-tight mb-2">
            Stay in the loop.
          </h3>
          <p className="text-[14px] text-[#4B4843]">
            Join our newsletter for health tips, early access to new treatments, and exclusive offers. Unsubscribe anytime.
          </p>
        </div>
        <div className="w-full md:w-[400px]">
          {sent ? (
            <p className="text-[#C2A68C] font-medium text-[15px] py-3">
              ✓ You&apos;re on the list. Check your inbox!
            </p>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="flex border-b border-[#C8BEB5] pb-2 focus-within:border-[#0F1210] transition-colors">
                <input
                  type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent px-2 text-[15px] text-[#0F1210] placeholder:text-[#8A8782] outline-none border-none min-w-0"
                  aria-label="Email address"
                />
                <button type="submit"
                  className="shrink-0 text-[#0F1210] font-bold text-[13px] uppercase tracking-wider px-2 flex items-center gap-1.5 hover:text-[#C2A68C] transition-colors">
                  Subscribe <PiArrowRight size={16} />
                </button>
              </div>
              {error && <p className="text-[#C2A68C] text-[13px] mt-2 px-2">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER MAIN ────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="w-full" aria-label="Site footer">
      {/* Wave transition from CTA Banner (#0F1210) to Footer (#F5EFE6) */}
      <FooterWave fromColor="#0F1210" toColor="#F5EFE6" />
      
      <Newsletter />

      <div className="w-full bg-[#F5EFE6] pt-16 pb-8">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
            {/* Brand Col */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <Link href="/" className="inline-flex items-center gap-1.5 w-fit">
                <span className="font-display italic text-[2rem] leading-none text-[#0F1210]">
                  &amp;health
                </span>
              </Link>
              <p className="text-[#4B4843] text-[14.5px] leading-relaxed max-w-[320px]">
                Redefining modern healthcare. Expert medical care, prescription treatments, and ongoing support — entirely online.
              </p>
              <div className="flex flex-col gap-3 mt-2">
                {[
                  { icon: <PiPhone size={16} />,        text: "1-800-AND-HLTH" },
                  { icon: <PiEnvelopeSimple size={16} />, text: "care@andhealth.com" },
                  { icon: <PiMapPin size={16} />,       text: "Available in all 50 states" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-[13.5px] text-[#4B4843]">
                    <span className="text-[#C2A68C]">{icon}</span>
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Links Cols */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              {COLUMNS.map(({ heading, links }) => (
                <div key={heading} className="flex flex-col gap-5">
                  <h5 className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#8A8782]">
                    {heading}
                  </h5>
                  <ul className="flex flex-col gap-3.5">
                    {links.map(({ label, href, accent }) => (
                      <li key={label}>
                        <Link href={href}
                          className={accent
                            ? "text-[14px] font-semibold text-[#C2A68C] hover:text-[#0F1210] flex items-center gap-1 transition-colors"
                            : "text-[14px] text-[#4B4843] hover:text-[#0F1210] transition-colors"
                          }>
                          {label} {accent && <PiArrowUpRight size={14} />}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Large decorative text */}
          <div className="w-full flex justify-center mb-10 overflow-hidden pointer-events-none select-none">
            <span 
              className="font-display italic leading-none text-[#E6D8C3]"
              style={{ fontSize: "clamp(4rem, 15vw, 12rem)", letterSpacing: "-0.04em" }}
            >
              &amp;health
            </span>
          </div>

          {/* Bottom Legal & Social */}
          <div className="border-t border-[#E6D8C3] pt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-[13px] text-[#8A8782]">
              <span>© {new Date().getFullYear()} &amp;health Co.</span>
              <div className="flex items-center gap-4">
                {["Privacy", "Terms", "Accessibility"].map(item => (
                  <Link key={item} href="#" className="hover:text-[#0F1210] transition-colors">
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-5 text-[#4B4843]">
              {SOCIALS.map(({ icon, label, href }) => (
                <a key={label} href={href} aria-label={label} className="hover:text-[#C2A68C] transition-colors">
                  {icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="mt-8 text-[11px] text-[#8A8782] leading-relaxed max-w-[900px] text-center lg:text-left">
            Prescription products require an online consultation with a licensed healthcare provider who will determine if a prescription is appropriate. &amp;health does not provide medical advice, diagnosis, or treatment. Medications are dispensed by partner pharmacies. Individual results may vary.
          </div>
          
        </div>
      </div>
    </footer>
  );
}
