"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  PiArrowRight,
  PiClipboardText,
  PiUserCircleCheck,
  PiPackage,
  PiHandHeart,
  PiShieldCheckFill,
  PiTruck,
  PiStarFill,
  PiCheckCircleFill,
  PiTimerFill,
  PiUsers,
  PiArrowUpRight,
  PiSealCheckFill,
  PiHeartbeat,
  PiPulse,
  PiSparkleFill,
  PiFlask,
} from "react-icons/pi";

// ─── Animation presets ────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};
const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const inView = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-60px" },
};

// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isVisible = useInView(ref, { once: true });

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = end / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="w-full relative overflow-hidden"
      style={{
        background: "linear-gradient(165deg, #FFF5F5 0%, #FADADD 40%, #FFF0F0 75%, #FFFFFF 100%)",
        paddingTop: "clamp(5rem, 10vw, 8rem)",
        paddingBottom: "clamp(3rem, 6vw, 5rem)",
      }}
    >
      {/* Brand slash motif */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div style={{ position: "absolute", top: "-10%", left: "4%", width: "6px", height: "130%", background: "rgba(240,112,112,0.12)", transform: "rotate(-16deg)" }} />
        <div style={{ position: "absolute", top: "-10%", left: "7.5%", width: "6px", height: "130%", background: "rgba(240,112,112,0.07)", transform: "rotate(-16deg)" }} />
        <div style={{ position: "absolute", top: "8%", right: "5%", width: "110px", height: "110px", background: "rgba(240,112,112,0.06)", transform: "rotate(45deg)", borderRadius: "14px" }} />
        <div style={{ position: "absolute", bottom: "12%", right: "12%", width: "65px", height: "65px", background: "rgba(240,112,112,0.05)", transform: "rotate(45deg)", borderRadius: "9px" }} />
        <div style={{ position: "absolute", top: "20%", left: "18%", width: "40px", height: "40px", background: "rgba(240,112,112,0.04)", transform: "rotate(45deg)", borderRadius: "6px" }} />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <motion.div {...inView} variants={stagger} className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.p
            variants={fadeUp}
            className="text-[11.5px] font-bold tracking-[0.25em] uppercase"
            style={{ color: "#F07070" }}
          >
            Your journey · starts here
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display font-black tracking-tight text-[#1A0A0A] leading-[1.02]"
            style={{ fontSize: "clamp(3rem, 6.5vw, 6rem)" }}
          >
            Start your
            <br />
            <em className="not-italic" style={{ color: "#F07070" }}>journey</em>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-[16px] leading-relaxed max-w-xl"
            style={{ color: "#4A3333" }}
          >
            A personalized, doctor-guided program built around you — your goals, your pace, your life. No clinic visits, no guesswork.
          </motion.p>

          {/* Quiz CTA pill */}
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-3">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap transition-all duration-200 gap-2 text-white shadow-lg hover:shadow-xl"
              style={{ background: "#F07070", fontSize: "15px", minHeight: "62px", padding: "0 44px" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#D94040")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#F07070")}
            >
              Take the free quiz <PiArrowRight size={18} />
            </Link>
            <div className="flex items-center gap-2 text-[13px] font-medium" style={{ color: "#9A7878" }}>
              <PiTimerFill size={15} style={{ color: "#F07070" }} />
              Quiz takes under 3 minutes
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── JOURNEY CARDS ────────────────────────────────────────────────────────────
const JOURNEY_CARDS = [
  {
    img: "/guidance.jpg",
    tag: "Weight Loss",
    title: "Guidance",
    subtitle: "Anti-aging & metabolic reset",
    desc: "Doctor-prescribed weight loss programs combining lifestyle coaching with clinically proven treatments. Designed for lasting results.",
    accent: "#F07070",
    href: "/#guidance",
    badge: "Most popular",
  },
  {
    img: "/nad.jpg",
    tag: "Energy & Focus",
    title: "NAD+",
    subtitle: "Cellular energy & clarity",
    desc: "Replenish your body's most essential coenzyme. NAD+ therapy restores energy metabolism, mental sharpness, and cellular resilience.",
    accent: "#E85555",
    href: "/#nad-plus",
    badge: null,
  },
  {
    img: "/ghk.jpg",
    tag: "Skin & Recovery",
    title: "GHK-CU",
    subtitle: "Collagen renewal & healing",
    desc: "A copper peptide complex that stimulates skin regeneration, reduces inflammation, and accelerates tissue repair from within.",
    accent: "#D94040",
    href: "/#ghk-cu",
    badge: null,
  },
];

function JourneyCards() {
  return (
    <section className="w-full py-14 md:py-20" style={{ background: "#FFFFFF" }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
        <motion.div {...inView} variants={stagger} className="flex flex-col gap-10">
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-3" style={{ color: "#9A7878" }}>
                Our programs
              </p>
              <h2 className="font-display text-[#1A0A0A] leading-tight" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
                Choose your path forward.
              </h2>
            </div>
            <p className="text-[14px] max-w-xs text-right" style={{ color: "#9A7878" }}>
              Every program is personalized by a licensed doctor — not an algorithm.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {JOURNEY_CARDS.map((card) => (
              <motion.a
                key={card.title}
                href={card.href}
                variants={fadeUp}
                className="group relative rounded-[28px] bg-white border border-[#F5DADA] flex flex-col overflow-hidden"
                style={{ boxShadow: "0 4px 20px rgba(240,112,112,0.07)", minHeight: "420px", textDecoration: "none" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(240,112,112,0.16)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(240,112,112,0.07)"; }}
              >
                {/* Badge */}
                {card.badge && (
                  <div className="absolute top-4 left-4 z-10 text-[10.5px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full text-white" style={{ background: "#F07070" }}>
                    {card.badge}
                  </div>
                )}

                {/* Image */}
                <div className="relative w-full overflow-hidden" style={{ height: "240px", background: "#FFF5F5" }}>
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(255,245,245,0.6) 0%, transparent 50%)" }} />
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-6 gap-3">
                  <span className="text-[10.5px] font-bold tracking-[0.2em] uppercase" style={{ color: card.accent }}>
                    {card.tag}
                  </span>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-[#1A0A0A] leading-none" style={{ fontSize: "1.6rem" }}>{card.title}</h3>
                      <p className="text-[12.5px] font-medium mt-1" style={{ color: "#9A7878" }}>{card.subtitle}</p>
                    </div>
                    <div className="w-10 h-10 shrink-0 rounded-full border border-[#F5DADA] flex items-center justify-center transition-all duration-300 group-hover:border-[#F07070] group-hover:bg-[#F07070]" style={{ color: "#F07070" }}>
                      <PiArrowRight size={18} className="transition-colors duration-300 group-hover:text-white" />
                    </div>
                  </div>
                  <p className="text-[13.5px] leading-relaxed flex-1" style={{ color: "#4A3333" }}>{card.desc}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── STATS BAND (Filipinos served + quiz stat) ────────────────────────────────
function StatsBand() {
  return (
    <section
      className="w-full py-14 md:py-18 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #2E1010 0%, #1A0808 55%, #0F0404 100%)" }}
    >
      {/* Slash motifs on dark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div style={{ position: "absolute", top: "-20%", left: "10%", width: "7px", height: "140%", background: "rgba(240,112,112,0.15)", transform: "rotate(-16deg)" }} />
        <div style={{ position: "absolute", top: "-20%", left: "14%", width: "7px", height: "140%", background: "rgba(240,112,112,0.08)", transform: "rotate(-16deg)" }} />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <motion.div {...inView} variants={stagger} className="flex flex-col items-center text-center gap-4 mb-12 md:mb-16">
          <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: "rgba(240,112,112,0.6)" }}>
            By the numbers
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-white leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            Thousands of Filipinos
            <br />
            <em className="not-italic" style={{ color: "#F07070" }}>already on their way.</em>
          </motion.h2>
        </motion.div>

        <motion.div {...inView} variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {/* Stat 1 */}
          <motion.div variants={fadeUp} className="rounded-[18px] p-7 flex flex-col gap-3 text-center" style={{ background: "rgba(240,112,112,0.07)", border: "1px solid rgba(240,112,112,0.15)" }}>
            <div className="w-10 h-10 rounded-full mx-auto flex items-center justify-center" style={{ background: "rgba(240,112,112,0.15)" }}>
              <PiUsers size={20} style={{ color: "#F07070" }} />
            </div>
            <div className="font-display text-white" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", lineHeight: 1 }}>
              <AnimatedCounter end={50000} suffix="+" />
            </div>
            <p className="text-[13.5px] font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>Filipinos served</p>
            <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
              From Metro Manila to the provinces — real people, real results.
            </p>
          </motion.div>

          {/* Stat 2 — Quiz time */}
          <motion.div variants={fadeUp} className="rounded-[18px] p-7 flex flex-col gap-3 text-center" style={{ background: "rgba(240,112,112,0.07)", border: "1px solid rgba(240,112,112,0.15)" }}>
            <div className="w-10 h-10 rounded-full mx-auto flex items-center justify-center" style={{ background: "rgba(240,112,112,0.15)" }}>
              <PiTimerFill size={20} style={{ color: "#F07070" }} />
            </div>
            <div className="font-display text-white" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", lineHeight: 1 }}>
              3 min
            </div>
            <p className="text-[13.5px] font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>Quiz takes only 3 minutes</p>
            <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
              No lengthy forms. Answer a few key questions and get matched instantly.
            </p>
          </motion.div>

          {/* Stat 3 */}
          <motion.div variants={fadeUp} className="rounded-[18px] p-7 flex flex-col gap-3 text-center" style={{ background: "rgba(240,112,112,0.07)", border: "1px solid rgba(240,112,112,0.15)" }}>
            <div className="w-10 h-10 rounded-full mx-auto flex items-center justify-center" style={{ background: "rgba(240,112,112,0.15)" }}>
              <PiStarFill size={20} style={{ color: "#F07070" }} />
            </div>
            <div className="font-display text-white" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", lineHeight: 1 }}>
              4.9
            </div>
            <p className="text-[13.5px] font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>Average rating</p>
            <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
              Based on thousands of verified patient reviews across all programs.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
const STEPS = [
  {
    number: "01",
    icon: <PiClipboardText size={22} />,
    title: "Take the 3-minute quiz",
    desc: "Tell us about your health, goals, and lifestyle. No long forms — just a few focused questions to help us understand what you need.",
  },
  {
    number: "02",
    icon: <PiUserCircleCheck size={22} />,
    title: "Get matched with a doctor",
    desc: "A licensed Filipino physician reviews your answers within 24 hours and builds a treatment plan tailored specifically for you.",
  },
  {
    number: "03",
    icon: <PiPackage size={22} />,
    title: "Receive your treatment",
    desc: "Your prescription is dispensed from an FDA-registered pharmacy and delivered free — discreetly packaged, right to your door.",
  },
  {
    number: "04",
    icon: <PiHandHeart size={22} />,
    title: "Ongoing doctor support",
    desc: "Unlimited consultations, dose adjustments, and check-ins throughout your program. Your doctor stays with you the entire journey.",
  },
];

function HowItWorks() {
  return (
    <section className="w-full py-14 md:py-20" style={{ background: "#FFF5F5" }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
        <motion.div {...inView} variants={stagger} className="flex flex-col gap-10">
          <motion.div variants={fadeUp} className="flex flex-col items-center text-center gap-3 max-w-xl mx-auto">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: "#9A7878" }}>
              The process
            </p>
            <h2 className="font-display text-[#1A0A0A] leading-tight" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
              Simple from start to finish.
            </h2>
            <p className="text-[15px] leading-relaxed" style={{ color: "#4A3333" }}>
              Four steps between you and the healthiest version of yourself.
            </p>
          </motion.div>

          {/* Steps grid */}
          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className="rounded-[20px] p-7 flex gap-5 items-start"
                style={{ background: "white", border: "1px solid #F5DADA" }}
              >
                <div className="shrink-0 flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#FADADD", color: "#F07070" }}>
                    {step.icon}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-px flex-1" style={{ background: "#F5DADA", minHeight: "20px" }} />
                  )}
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <span className="text-[10.5px] font-bold tracking-[0.2em] uppercase" style={{ color: "#F07070" }}>
                    Step {step.number}
                  </span>
                  <h3 className="font-display text-[#1A0A0A]" style={{ fontSize: "1.25rem", lineHeight: 1.15 }}>
                    {step.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: "#4A3333" }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── QUIZ SECTION ─────────────────────────────────────────────────────────────
const QUIZ_BENEFITS = [
  { icon: <PiCheckCircleFill size={16} />, text: "Matched to the right program for your body" },
  { icon: <PiCheckCircleFill size={16} />, text: "Reviewed by a licensed Filipino doctor" },
  { icon: <PiCheckCircleFill size={16} />, text: "Completely free — no commitment required" },
  { icon: <PiCheckCircleFill size={16} />, text: "Results in under 24 hours" },
];

function QuizSection() {
  return (
    <section id="quiz" className="w-full py-14 md:py-20 relative overflow-hidden" style={{ background: "white" }}>
      {/* Decorative slashes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{ position: "absolute", top: 0, right: "3%", width: "5px", height: "100%", background: "rgba(240,112,112,0.07)", transform: "rotate(-16deg)", transformOrigin: "top center" }} />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="rounded-[28px] overflow-hidden" style={{ background: "linear-gradient(140deg, #FFF5F5 0%, #FADADD 60%, #FFE8E8 100%)", border: "1px solid #F5DADA" }}>
          <div className="flex flex-col lg:flex-row items-center gap-0">

            {/* Left — copy */}
            <motion.div {...inView} variants={stagger} className="flex flex-col gap-6 p-8 md:p-12 lg:p-14 flex-1">
              <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: "#F07070" }}>
                Free · No commitment
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-display text-[#1A0A0A] leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
                The quiz only takes
                <br />
                <em className="not-italic" style={{ color: "#F07070" }}>3 minutes.</em>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[15px] leading-relaxed" style={{ color: "#4A3333" }}>
                A few questions. No guesswork. We use your answers to match you with the right program — then a real doctor builds your personal plan.
              </motion.p>
              <motion.ul variants={stagger} className="flex flex-col gap-2.5 list-none p-0 m-0">
                {QUIZ_BENEFITS.map((b) => (
                  <motion.li key={b.text} variants={fadeUp} className="flex items-center gap-3">
                    <span style={{ color: "#F07070" }} className="shrink-0">{b.icon}</span>
                    <span className="text-[14px] font-medium" style={{ color: "#4A3333" }}>{b.text}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div variants={fadeUp}>
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap transition-all duration-200 gap-2 text-white"
                  style={{ background: "#F07070", fontSize: "14px", minHeight: "52px", padding: "0 36px" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#D94040")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#F07070")}
                >
                  Start free quiz <PiArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — feature image */}
            <div className="relative w-full lg:w-[440px] shrink-0" style={{ minHeight: "340px" }}>
              <Image
                src="/feature-doctor.png"
                alt="Doctor reviewing patient intake"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 440px"
              />
              <div className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(to top, rgba(255,245,245,0.7) 0%, transparent 40%)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TRUST PILLARS ────────────────────────────────────────────────────────────
const PILLARS = [
  {
    icon: <PiSealCheckFill size={24} />,
    title: "Licensed Filipino doctors",
    desc: "Every treatment plan is written and supervised by a licensed physician — no bots, no shortcuts.",
  },
  {
    icon: <PiShieldCheckFill size={24} />,
    title: "FDA-registered pharmacy",
    desc: "Your medications are dispensed from an accredited pharmacy under strict quality controls.",
  },
  {
    icon: <PiTruck size={24} />,
    title: "Free & discreet delivery",
    desc: "Ships in plain packaging anywhere in the Philippines, completely free of charge.",
  },
  {
    icon: <PiHeartbeat size={24} />,
    title: "Continuous care",
    desc: "Your doctor is always reachable. Dose adjustments, check-ins, and support — included.",
  },
];

function TrustPillars() {
  return (
    <section className="w-full py-14 md:py-20" style={{ background: "#FFFFFF", borderTop: "1px solid #F5DADA" }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
        <motion.div {...inView} variants={stagger} className="flex flex-col gap-10">
          <motion.div variants={fadeUp} className="flex flex-col items-center text-center gap-3 max-w-lg mx-auto">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: "#9A7878" }}>
              Why tearsize
            </p>
            <h2 className="font-display text-[#1A0A0A] leading-tight" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
              Built on trust.
              <br />
              <em className="not-italic" style={{ color: "#F07070" }}>Proven by results.</em>
            </h2>
          </motion.div>

          <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PILLARS.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                className="rounded-[18px] p-7 flex flex-col gap-4"
                style={{ background: "#FFF5F5", border: "1px solid #F5DADA" }}
              >
                <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "#FADADD", color: "#F07070" }}>
                  {p.icon}
                </div>
                <h3 className="font-display text-[#1A0A0A] leading-snug" style={{ fontSize: "1.1rem" }}>{p.title}</h3>
                <p className="text-[13.5px] leading-relaxed" style={{ color: "#4A3333" }}>{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA CLOSER ───────────────────────────────────────────────────────────────
function CtaCloser() {
  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden" style={{ background: "#1A0A0A" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div style={{ position: "absolute", top: "-10%", left: "7%", width: "8px", height: "120%", background: "rgba(240,112,112,0.18)", transform: "rotate(-16deg)" }} />
        <div style={{ position: "absolute", top: "-10%", left: "11.5%", width: "8px", height: "120%", background: "rgba(240,112,112,0.10)", transform: "rotate(-16deg)" }} />
        <div style={{ position: "absolute", top: "10%", right: "7%", width: "90px", height: "90px", background: "rgba(240,112,112,0.07)", transform: "rotate(45deg)", borderRadius: "12px" }} />
        <div style={{ position: "absolute", bottom: "14%", right: "13%", width: "55px", height: "55px", background: "rgba(240,112,112,0.05)", transform: "rotate(45deg)", borderRadius: "8px" }} />
      </div>

      <motion.div {...inView} variants={stagger} className="max-w-[620px] mx-auto px-4 text-center relative z-10">
        <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: "rgba(240,112,112,0.6)" }}>
          Ready to begin?
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-display text-white leading-[1.05] mb-4" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}>
          Your transformation
          <br />
          <em className="not-italic" style={{ color: "#F07070" }}>starts with one step.</em>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-[15px] leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
          Take the free 3-minute quiz. Get matched with a licensed doctor. Start feeling like yourself again — entirely online.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap transition-all duration-200 gap-2 text-white"
            style={{ background: "#F07070", fontSize: "14.5px", minHeight: "52px", padding: "0 40px" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#D94040")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F07070")}
          >
            Take the quiz <PiArrowRight size={16} />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap transition-colors duration-200 text-white"
            style={{ fontSize: "14.5px", minHeight: "52px", padding: "0 40px", border: "1.5px solid rgba(240,112,112,0.35)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(240,112,112,0.85)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(240,112,112,0.35)")}
          >
            Back to home
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function LearnMorePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <JourneyCards />
        <StatsBand />
        <HowItWorks />
        <QuizSection />
        <TrustPillars />
        <CtaCloser />
      </main>
      <Footer />
    </>
  );
}
