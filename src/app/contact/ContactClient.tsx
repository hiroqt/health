"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  PiPhoneCallFill,
  PiEnvelopeFill,
  PiInstagramLogoFill,
  PiFacebookLogoFill,
  PiWhatsappLogoFill,
  PiChatCircleDotsFill,
  PiClockFill,
  PiMapPinFill,
  PiCheckCircleFill,
  PiCopySimple,
  PiCheck,
  PiArrowSquareOut,
  PiSparkleFill,
  PiShieldCheckFill,
  PiPaperPlaneTiltFill,
  PiArrowRight,
  PiCaretDown,
  PiHeadset,
  PiSyringeFill,
} from "react-icons/pi";

// ─── ANIMATION CONSTANTS ──────────────────────────────────────────────────────
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const INQUIRY_TOPICS = [
  "General Inquiry",
  "Medical Consultation",
  "Peptide Therapy & Dosage",
  "Weight Management Plan",
  "Order Status & Shipping",
  "Physician Partnership",
];

const FAQS = [
  {
    q: "How fast will I receive a response?",
    a: "Our customer support and medical coordinators reply within 15 to 30 minutes during our standard operating hours (8:00 AM – 9:00 PM PHT, Monday to Sunday).",
  },
  {
    q: "Can I consult about peptide dosage and administration protocols?",
    a: "Yes! Our affiliated licensed healthcare professionals can evaluate your medical profile and advise on personalized clinical dosages, reconstitution, and administration guidelines.",
  },
  {
    q: "Where do you deliver prescription and wellness medications?",
    a: "We fulfill and ship cold-chain verified orders nationwide across the Philippines with express door-to-door courier services.",
  },
  {
    q: "What is the quickest way to reach the team?",
    a: "For immediate assistance, message us on Facebook Messenger or WhatsApp hotline (+63 961 323 6199). You can also submit the inquiry form below.",
  },
];

export default function ContactClient() {
  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [inquiryType, setInquiryType] = useState("General Inquiry");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Copy status indicators
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Accordion open state for FAQs
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCopy = (text: string, type: "phone" | "email") => {
    navigator.clipboard.writeText(text);
    if (type === "phone") {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Please fill in all required fields (Full Name, Email Address, and Message).");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setErrorMsg("Please provide a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          contactNumber,
          inquiryType,
          message,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || "Failed to submit your message. Please try messaging us directly via email or social channels.");
      }
    } catch (err) {
      setErrorMsg("Network error occurred. You can reach us directly via WhatsApp or Gmail.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setContactNumber("");
    setInquiryType("General Inquiry");
    setMessage("");
    setSubmitted(false);
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-[#0F0F0F] selection:bg-[#FFE8EA] selection:text-[#FF5A5F]">
      <Header splashDone={true} />

      {/* ─── HERO HEADER ──────────────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-10 md:pt-16 md:pb-14 overflow-hidden bg-gradient-to-b from-[#FFF8F7] to-white border-b border-[#FFE8EA]">
        {/* Subtle decorative background shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-[10%] left-[5%] w-[6px] h-[130%] bg-[#FF5A5F]/10 -rotate-16" />
          <div className="absolute -top-[10%] left-[8%] w-[6px] h-[130%] bg-[#FF5A5F]/5 -rotate-16" />
          <div className="absolute top-1/2 right-[5%] w-[320px] h-[320px] bg-[#FFE8EA]/50 rounded-full blur-3xl -translate-y-1/2" />
        </div>

        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16 relative z-10">
          <div className="max-w-3xl">
            {/* Pill tag */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE8EA] text-[#FF5A5F] text-[12px] font-bold tracking-wide uppercase mb-4"
            >
              <PiSparkleFill size={14} className="text-[#FF5A5F]" />
              Direct Support & Medical Inquiries
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-bold text-[2.5rem] sm:text-[3.2rem] md:text-[3.8rem] text-[#0F0F0F] tracking-tight leading-[1.1] mb-4"
            >
              We&apos;re here to guide your{" "}
              <span className="italic font-black text-[#FF5A5F]">health journey.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#6E6E6E] text-[16px] sm:text-[18px] leading-relaxed max-w-2xl"
            >
              Have questions about peptide therapy, GLP-1 weight management, prescription protocols, or order tracking? Reach out directly to our dedicated support and clinical coordination team.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT: DIRECT CHANNELS + CONTACT FORM ─────────────────────── */}
      <section className="py-12 md:py-16 bg-white flex-1">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: DIRECT CHANNELS (Phone, Google Email, Socials) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="lg:col-span-5 flex flex-col gap-6"
            >
              <div>
                <h2 className="text-[20px] font-bold text-[#0F0F0F] tracking-tight mb-2 flex items-center gap-2.5">
                  <PiHeadset className="text-[#FF5A5F]" size={24} />
                  Direct Channels & Socials
                </h2>
                <p className="text-[14px] text-[#6E6E6E] leading-relaxed">
                  Choose your preferred way to connect. We respond promptly during operating hours.
                </p>
              </div>

              {/* Card 1: Phone Hotline & Instant Messaging */}
              <motion.div
                variants={fadeUp}
                className="p-6 rounded-2xl bg-[#FFF8F7] border border-[#FFE8EA] hover:border-[#FF8FA3] transition-all shadow-[0_2px_12px_rgba(255,90,95,0.06)]"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFE8EA] flex items-center justify-center text-[#FF5A5F]">
                      <PiPhoneCallFill size={20} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-[#0F0F0F]">Phone & Direct Messaging</h3>
                      <p className="text-[12px] text-[#6E6E6E]">Voice call, SMS, WhatsApp</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy("+639613236199", "phone")}
                    className="p-2 rounded-lg bg-white border border-[#FFE8EA] hover:bg-[#FFE8EA] text-[#6E6E6E] hover:text-[#FF5A5F] transition-colors text-[12px] font-medium flex items-center gap-1 cursor-pointer"
                    title="Copy phone number"
                    aria-label="Copy phone number"
                  >
                    {copiedPhone ? <PiCheck className="text-green-600" size={14} /> : <PiCopySimple size={14} />}
                    <span>{copiedPhone ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                <div className="mt-3 py-2 px-3.5 rounded-xl bg-white border border-[#FFE8EA] flex items-center justify-between">
                  <span className="font-mono font-semibold text-[16px] text-[#0F0F0F]">
                    +63 961 323 6199
                  </span>
                  <a
                    href="tel:+639613236199"
                    className="text-[13px] font-bold text-[#FF5A5F] hover:text-[#E04A4F] flex items-center gap-1"
                  >
                    Call Now <PiArrowRight size={14} />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#FFE8EA]/60">
                  <a
                    href="tel:+639613236199"
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white border border-[#FFE8EA] hover:border-[#FF5A5F] transition-colors text-center group"
                  >
                    <span className="text-[12px] font-semibold text-[#0F0F0F] group-hover:text-[#FF5A5F]">Voice Call</span>
                    <span className="text-[10px] text-[#6E6E6E]">Direct Line</span>
                  </a>
                  <a
                    href="whatsapp://send?phone=639613236199"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white border border-[#FFE8EA] hover:border-[#25D366] transition-colors text-center group"
                  >
                    <div className="flex items-center gap-1">
                      <PiWhatsappLogoFill className="text-[#25D366]" size={14} />
                      <span className="text-[12px] font-semibold text-[#0F0F0F] group-hover:text-[#25D366]">WhatsApp</span>
                    </div>
                    <span className="text-[10px] text-[#6E6E6E]">Instant Chat</span>
                  </a>
                </div>
              </motion.div>

              {/* Card 2: Google Mail & Direct Email */}
              <motion.div
                variants={fadeUp}
                className="p-6 rounded-2xl bg-[#FFF8F7] border border-[#FFE8EA] hover:border-[#FF8FA3] transition-all shadow-[0_2px_12px_rgba(255,90,95,0.06)]"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFE8EA] flex items-center justify-center text-[#FF5A5F]">
                      <PiEnvelopeFill size={20} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-[#0F0F0F]">Google / Email Support</h3>
                      <p className="text-[12px] text-[#6E6E6E]">Inquiries & Consultation Requests</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy("tearsize@gmail.com", "email")}
                    className="p-2 rounded-lg bg-white border border-[#FFE8EA] hover:bg-[#FFE8EA] text-[#6E6E6E] hover:text-[#FF5A5F] transition-colors text-[12px] font-medium flex items-center gap-1 cursor-pointer"
                    title="Copy email address"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? <PiCheck className="text-green-600" size={14} /> : <PiCopySimple size={14} />}
                    <span>{copiedEmail ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                <div className="mt-3 py-2 px-3.5 rounded-xl bg-white border border-[#FFE8EA] flex items-center justify-between">
                  <span className="font-medium text-[14px] text-[#0F0F0F] truncate mr-2">
                    tearsize@gmail.com
                  </span>
                  <a
                    href="mailto:tearsize@gmail.com"
                    className="text-[13px] font-bold text-[#FF5A5F] hover:text-[#E04A4F] shrink-0 flex items-center gap-1"
                  >
                    Send Email <PiArrowRight size={14} />
                  </a>
                </div>

                <div className="flex gap-2 mt-3 pt-3 border-t border-[#FFE8EA]/60">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=tearsize@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white border border-[#FFE8EA] hover:border-[#EA4335] text-[#0F0F0F] hover:text-[#EA4335] transition-colors text-[13px] font-semibold"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.264H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                    </svg>
                    Open in Gmail
                    <PiArrowSquareOut size={13} />
                  </a>
                  <a
                    href="mailto:tearsize@gmail.com"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-[#FFE8EA] hover:border-[#FF5A5F] text-[#0F0F0F] hover:text-[#FF5A5F] transition-colors text-[13px] font-semibold"
                  >
                    Default Mail App
                  </a>
                </div>
              </motion.div>

              {/* Card 3: Social Channels */}
              <motion.div
                variants={fadeUp}
                className="p-6 rounded-2xl bg-[#FFF8F7] border border-[#FFE8EA] hover:border-[#FF8FA3] transition-all shadow-[0_2px_12px_rgba(255,90,95,0.06)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#FFE8EA] flex items-center justify-center text-[#FF5A5F]">
                    <PiChatCircleDotsFill size={20} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0F0F0F]">Official Social Media</h3>
                    <p className="text-[12px] text-[#6E6E6E]">Follow updates & chat with community managers</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <a
                    href="https://www.facebook.com/tearsizev3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#FFE8EA] hover:border-[#1877F2] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2]">
                        <PiFacebookLogoFill size={18} />
                      </div>
                      <div>
                        <span className="text-[13px] font-bold text-[#0F0F0F] group-hover:text-[#1877F2] block">
                          Facebook Page & Messenger
                        </span>
                        <span className="text-[11px] text-[#6E6E6E]">@tearsizev3</span>
                      </div>
                    </div>
                    <span className="text-[12px] font-semibold text-[#1877F2] flex items-center gap-1">
                      Message <PiArrowSquareOut size={13} />
                    </span>
                  </a>

                  <a
                    href="https://www.instagram.com/bytearsizeph/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#FFE8EA] hover:border-[#E1306C] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#E1306C]/10 flex items-center justify-center text-[#E1306C]">
                        <PiInstagramLogoFill size={18} />
                      </div>
                      <div>
                        <span className="text-[13px] font-bold text-[#0F0F0F] group-hover:text-[#E1306C] block">
                          Instagram
                        </span>
                        <span className="text-[11px] text-[#6E6E6E]">@bytearsizeph</span>
                      </div>
                    </div>
                    <span className="text-[12px] font-semibold text-[#E1306C] flex items-center gap-1">
                      Follow & DM <PiArrowSquareOut size={13} />
                    </span>
                  </a>
                </div>
              </motion.div>

              {/* Card 4: Operating Hours & Availability */}
              <motion.div
                variants={fadeUp}
                className="p-5 rounded-2xl bg-white border border-[#FFE8EA] flex items-start gap-3.5"
              >
                <div className="w-9 h-9 rounded-full bg-[#FFE8EA] flex items-center justify-center text-[#FF5A5F] shrink-0 mt-0.5">
                  <PiClockFill size={18} />
                </div>
                <div className="flex-1">
                  <h4 className="text-[14px] font-bold text-[#0F0F0F]">Consultation & Support Hours</h4>
                  <p className="text-[13px] text-[#4A3333] mt-0.5">
                    Monday to Sunday: <strong>8:00 AM – 9:00 PM PHT</strong>
                  </p>
                  <p className="text-[12px] text-[#6E6E6E] mt-1 flex items-center gap-1.5">
                    <PiMapPinFill className="text-[#FF5A5F]" size={14} />
                    100% Online Consultations Nationwide • Philippines
                  </p>
                </div>
              </motion.div>

            </motion.div>

            {/* RIGHT COLUMN: INTERACTIVE CONTACT FORM */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="lg:col-span-7"
            >
              <div className="bg-white rounded-3xl border border-[#FFE8EA] p-6 sm:p-8 md:p-10 shadow-[0_8px_32px_rgba(255,90,95,0.08)] relative overflow-hidden">
                
                {/* Decorative header glow */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF5A5F] via-[#FF8FA3] to-[#FF5A5F]" />

                <div className="mb-6">
                  <div className="flex items-center gap-2 text-[#FF5A5F] text-[13px] font-bold tracking-wider uppercase mb-1">
                    <PiSyringeFill size={16} />
                    Send a Message
                  </div>
                  <h2 className="font-display text-[24px] sm:text-[28px] font-bold text-[#0F0F0F] tracking-tight">
                    Tell us how we can assist you
                  </h2>
                  <p className="text-[14px] text-[#6E6E6E] mt-1">
                    Fill out the form below and our medical coordinators will get back to you with personalized guidance.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="py-10 px-4 text-center flex flex-col items-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#FFE8EA] flex items-center justify-center text-[#FF5A5F] mb-4">
                        <PiCheckCircleFill size={36} />
                      </div>

                      <h3 className="font-display text-[24px] font-bold text-[#0F0F0F] mb-2">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-[15px] text-[#4A3333] max-w-md leading-relaxed mb-6">
                        Thank you, <strong className="text-[#0F0F0F]">{fullName}</strong>. We have received your inquiry regarding <strong>{inquiryType}</strong>. Our team will review your details and respond within 15–30 minutes to <strong>{email}</strong>.
                      </p>

                      {/* Quick instant chat options */}
                      <div className="w-full max-w-md p-4 rounded-2xl bg-[#FFF8F7] border border-[#FFE8EA] mb-6 text-left">
                        <span className="text-[12px] font-bold text-[#6E6E6E] uppercase tracking-wider block mb-2">
                          Need instant feedback right now?
                        </span>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <a
                            href="https://m.me/tearsizev3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#0084FF] text-white text-[13px] font-semibold hover:bg-[#0070D6] transition-colors"
                          >
                            Messenger Chat
                          </a>
                          <a
                            href="whatsapp://send?phone=639613236199"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] text-white text-[13px] font-semibold hover:bg-[#20BA5A] transition-colors"
                          >
                            WhatsApp Chat
                          </a>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-6 py-2.5 rounded-full border border-[#FFE8EA] hover:border-[#FF5A5F] text-[13px] font-semibold text-[#0F0F0F] hover:text-[#FF5A5F] transition-colors"
                      >
                        Send Another Inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      noValidate
                      className="flex flex-col gap-5"
                    >
                      {/* Full Name */}
                      <div>
                        <label htmlFor="fullName" className="block text-[13px] font-bold text-[#2B2B2B] mb-1.5">
                          Full Name <span className="text-[#FF5A5F]">*</span>
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Maria Santos"
                          required
                          className="w-full h-12 px-4 rounded-xl border border-[#FFE8EA] bg-white text-[15px] text-[#0F0F0F] placeholder:text-[#9A7878] focus:border-[#FF5A5F] focus:ring-2 focus:ring-[#FFE8EA] outline-none transition-all"
                        />
                      </div>

                      {/* Email and Phone Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-[13px] font-bold text-[#2B2B2B] mb-1.5">
                            Email Address <span className="text-[#FF5A5F]">*</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. maria@gmail.com"
                            required
                            className="w-full h-12 px-4 rounded-xl border border-[#FFE8EA] bg-white text-[15px] text-[#0F0F0F] placeholder:text-[#9A7878] focus:border-[#FF5A5F] focus:ring-2 focus:ring-[#FFE8EA] outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label htmlFor="contactNumber" className="block text-[13px] font-bold text-[#2B2B2B] mb-1.5">
                            Mobile / WhatsApp Number
                          </label>
                          <input
                            id="contactNumber"
                            type="tel"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            placeholder="e.g. 0917 123 4567"
                            className="w-full h-12 px-4 rounded-xl border border-[#FFE8EA] bg-white text-[15px] text-[#0F0F0F] placeholder:text-[#9A7878] focus:border-[#FF5A5F] focus:ring-2 focus:ring-[#FFE8EA] outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Inquiry Type Topic Selector */}
                      <div>
                        <label className="block text-[13px] font-bold text-[#2B2B2B] mb-2">
                          Inquiry Topic
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {INQUIRY_TOPICS.map((topic) => {
                            const isSelected = inquiryType === topic;
                            return (
                              <button
                                key={topic}
                                type="button"
                                onClick={() => setInquiryType(topic)}
                                className={`px-3 py-1.5 rounded-full text-[12.5px] font-semibold transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#FF5A5F] text-white shadow-sm"
                                    : "bg-[#FFF5F5] border border-[#FFE8EA] text-[#4A3333] hover:border-[#FF8FA3] hover:text-[#0F0F0F]"
                                }`}
                              >
                                {topic}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Message Text Area */}
                      <div>
                        <label htmlFor="message" className="block text-[13px] font-bold text-[#2B2B2B] mb-1.5">
                          How can we help you? <span className="text-[#FF5A5F]">*</span>
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Please provide details regarding your inquiry, preferred treatments, dosage guidance, or medical questions..."
                          required
                          className="w-full p-4 rounded-xl border border-[#FFE8EA] bg-white text-[15px] text-[#0F0F0F] placeholder:text-[#9A7878] focus:border-[#FF5A5F] focus:ring-2 focus:ring-[#FFE8EA] outline-none transition-all resize-y min-h-[110px]"
                        />
                      </div>

                      {/* Error Alert */}
                      {errorMsg && (
                        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[13px]">
                          {errorMsg}
                        </div>
                      )}

                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-13 rounded-full text-white font-bold text-[15px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_16px_rgba(255,90,95,0.25)] hover:shadow-[0_6px_24px_rgba(255,90,95,0.35)] disabled:opacity-70"
                        style={{ background: "#FF5A5F" }}
                        onMouseEnter={(e) => {
                          if (!loading) e.currentTarget.style.background = "#E04A4F";
                        }}
                        onMouseLeave={(e) => {
                          if (!loading) e.currentTarget.style.background = "#FF5A5F";
                        }}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending your message...</span>
                          </div>
                        ) : (
                          <>
                            <span>Send Inquiry</span>
                            <PiPaperPlaneTiltFill size={18} />
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-2 text-[12px] text-[#6E6E6E] text-center mt-1">
                        <PiShieldCheckFill className="text-[#FF5A5F]" size={16} />
                        <span>All consultations and health inquiries are strictly confidential & HIPAA-compliant.</span>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── FREQUENTLY ASKED QUESTIONS ACCORDION ─────────────────────────────── */}
      <section className="py-14 bg-[#FFF8F7] border-t border-[#FFE8EA]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-[26px] sm:text-[32px] font-bold text-[#0F0F0F] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-[15px] text-[#6E6E6E] mt-2">
              Common questions about getting in touch with our clinical advisors and pharmacy fulfillment.
            </p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl border border-[#FFE8EA] overflow-hidden transition-all shadow-[0_1px_4px_rgba(255,90,95,0.04)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-[15px] sm:text-[16px] text-[#0F0F0F] hover:text-[#FF5A5F] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <PiCaretDown
                      size={18}
                      className={`text-[#FF5A5F] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-[14.5px] text-[#4A3333] leading-relaxed border-t border-[#FFE8EA]/40">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Quick CTA card */}
          <div className="mt-12 max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-[#FFE8EA] text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_4px_20px_rgba(255,90,95,0.06)]">
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-[18px] text-[#0F0F0F]">Ready to begin your consultation?</h3>
              <p className="text-[13.5px] text-[#6E6E6E] mt-1">Take our 2-minute medical eligibility assessment online.</p>
            </div>
            <Link
              href="/quiz"
              className="px-6 py-3 rounded-full text-white font-bold text-[14px] whitespace-nowrap transition-all shadow-[0_2px_10px_rgba(255,90,95,0.2)]"
              style={{ background: "#FF5A5F" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#E04A4F")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#FF5A5F")}
            >
              Start Online Assessment
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
