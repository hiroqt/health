"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PiInstagramLogo, PiFacebookLogo, PiXLogo,
  PiTiktokLogo, PiYoutubeLogo,
  PiArrowRight, PiArrowUpRight,
  PiMapPin, PiPhone, PiEnvelopeSimple,
  PiSyringe, PiSyringeFill
} from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";

// ─── DATA ────────────────────────────────────────────────────────────────────

const COLUMNS = [
  {
    heading: "Programs",
    links: [
      { label: "Weight Management", href: "/products" },
      { label: "Recovery & Healing", href: "/products" },
      { label: "Cellular Health", href: "/products" },
      { label: "View all programs", href: "/products", accent: true },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "How it Works",     href: "/learn-more" },
      { label: "Pricing & Plans",  href: "#" },
      { label: "Help Center",      href: "#" },
      { label: "Track Your Order", href: "#" },
      { label: "Contact Us",       href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About by tearsize",  href: "#" },
      { label: "Medical Team",    href: "#" },
      { label: "Our Pharmacies",  href: "#" },
      { label: "Careers",         href: "#" },
      { label: "Press",           href: "#" },
    ],
  },
];

const SOCIALS = [
  { icon: <PiInstagramLogo size={20} />, label: "Instagram", href: "#" },
  { icon: <PiFacebookLogo size={20} />,  label: "Facebook",  href: "https://www.facebook.com/bytearsizeph" },
  { icon: <PiXLogo size={20} />,         label: "X",         href: "#" },
  { icon: <PiTiktokLogo size={20} />,    label: "TikTok",    href: "#" },
  { icon: <PiYoutubeLogo size={20} />,   label: "YouTube",   href: "#" },
];

// ─── NEWSLETTER ──────────────────────────────────────────────────────────────

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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="pb-14 pt-10 px-5 md:px-10 lg:px-16"
      style={{ borderBottom: "1px solid #F5DADA", background: "#FFF5F5" }}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div className="max-w-md">
          <h3 className="font-display text-[2rem] text-[#1A0A0A] leading-tight mb-2">
            Stay in the loop.
          </h3>
          <p className="text-[14px] text-[#4A3333]">
            Join our newsletter for health tips, early access to new programs, and exclusive member offers. Unsubscribe anytime.
          </p>
        </div>
        <div className="w-full md:w-[400px]">
          <AnimatePresence mode="wait">
          {sent ? (
            <motion.p 
              key="success"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(2px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="font-medium text-[15px] py-3" style={{ color: "#F07070" }}
            >
              ✓ You&apos;re on the list. Check your inbox!
            </motion.p>
          ) : (
            <motion.form 
              key="form"
              exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
              transition={{ duration: 0.2 }}
              onSubmit={submit} noValidate
            >
              <div
                className="flex items-center pb-2 focus-within:border-[#F07070] transition-colors"
                style={{ borderBottom: "1px solid #E8BFBF" }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent px-2 py-3 text-[15px] text-[#1A0A0A] placeholder:text-[#9A7878] outline-none border-none min-w-0"
                  aria-label="Email address"
                  maxLength={255}
                  required
                  aria-invalid={!!error}
                />
                <button
                  type="submit"
                  className="shrink-0 font-bold text-[13px] uppercase tracking-wider px-2 flex items-center justify-center gap-1.5 transition-colors min-h-[44px]"
                  style={{ color: "#F07070" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#D94040")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#F07070")}
                >
                  Subscribe <PiArrowRight size={16} />
                </button>
              </div>
              <div className="min-h-[24px] mt-1 px-2">
                {error && <p className="text-[13px]" style={{ color: "#F07070" }}>{error}</p>}
              </div>
            </motion.form>
          )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ─── FOOTER MAIN ─────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="w-full" aria-label="Site footer">
      {/* Transition strip from dark CTA section */}
      <div style={{ backgroundColor: "#1A0A0A", height: "48px" }} />

      <Newsletter />

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full pt-16 pb-8" style={{ background: "#FFF5F5" }}
      >
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
            {/* Brand col */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <Link href="/" className="inline-flex items-center gap-1.5 w-fit">
                <span
                  className="font-display font-medium leading-none select-none"
                  style={{ color: "#9A7878", fontSize: "1.1rem" }}
                >
                  by
                </span>
                <div className="flex items-center">
                  <span
                    className="font-display font-black italic text-[1.9rem] leading-none select-none"
                    style={{ color: "#F07070" }}
                  >
                    tears
                  </span>
                  <PiSyringeFill
                    size={30}
                    style={{ color: "#F07070", transform: "rotate(-25deg)", margin: "0 -2px" }}
                    aria-hidden="true"
                  />
                  <span
                    className="font-display font-black italic text-[1.9rem] leading-none select-none"
                    style={{ color: "#F07070" }}
                  >
                    ze
                  </span>
                </div>
              </Link>
              <p className="text-[#4A3333] text-[14.5px] leading-relaxed max-w-[320px]">
                Redefining modern healthcare. Expert medical care, prescription treatments, and ongoing support — entirely online.
              </p>
              <div className="flex flex-col gap-3 mt-2">
                {[
                  { icon: <PiPhone size={16} />,          text: "1-800-TEARSIZE"       },
                  { icon: <PiEnvelopeSimple size={16} />, text: "care@bytearsize.com"    },
                  { icon: <PiMapPin size={16} />,         text: "Available in all 50 states" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-[13.5px] text-[#4A3333]">
                    <span style={{ color: "#F07070" }}>{icon}</span>
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Link cols */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              {COLUMNS.map(({ heading, links }) => (
                <div key={heading} className="flex flex-col gap-5">
                  <h5 className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#9A7878]">
                    {heading}
                  </h5>
                  <ul className="flex flex-col gap-3.5">
                    {links.map(({ label, href, accent }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className="transition-colors"
                          style={accent
                            ? { fontSize: "14px", fontWeight: 600, color: "#F07070", display: "inline-flex", alignItems: "center", gap: "4px" }
                            : { fontSize: "14px", color: "#4A3333" }
                          }
                          onMouseEnter={(e) => (e.currentTarget.style.color = accent ? "#D94040" : "#1A0A0A")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = accent ? "#F07070" : "#4A3333")}
                        >
                          {label} {accent && <PiArrowUpRight size={14} />}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Large decorative wordmark */}
          <div className="w-full flex justify-center mb-10 overflow-hidden pointer-events-none select-none">
            <span
              className="font-display italic leading-none"
              style={{
                fontSize: "clamp(4rem, 15vw, 11rem)",
                letterSpacing: "-0.04em",
                color: "#F5DADA",
              }}
            >
              by tearsize
            </span>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6" style={{ borderTop: "1px solid #F5DADA" }}>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-[13px] text-[#9A7878]">
              <span>© {new Date().getFullYear()} by tearsize Inc.</span>
              <div className="flex items-center gap-4">
                {["Privacy", "Terms", "Accessibility"].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="hover:text-[#1A0A0A] transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#4A3333]">
              {SOCIALS.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-black/5"
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F07070")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#4A3333")}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 text-[11px] text-[#9A7878] leading-relaxed max-w-[900px] text-center lg:text-left">
            Prescription products require an online consultation with a licensed healthcare provider who will determine if a prescription is appropriate. by tearsize does not provide medical advice, diagnosis, or treatment. Medications are dispensed by partner pharmacies. Individual results may vary.
          </div>

        </div>
      </motion.div>
    </footer>
  );
}
