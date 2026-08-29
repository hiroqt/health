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
  PiSealCheckFill,
  PiHeartbeat,
} from "react-icons/pi";

// ─── Animation presets ────────────────────────────────────────────────────────
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
};
const fadeIn = {
  hidden: { opacity: 0, filter: "blur(4px)" },
  visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, ease } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const slashAnim = {
  hidden: { opacity: 0, scaleY: 0, transformOrigin: "top" },
  visible: { opacity: 1, scaleY: 1, transition: { duration: 0.9, ease } }
};
const blockAnim = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.9, ease } }
};
const wordAnim = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease } }
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
      className="w-full pb-10 md:pb-16 relative overflow-hidden bg-gradient-to-b from-surface from-0% to-bg to-60% pt-[clamp(2rem,5vw,3.5rem)]"
    >
      {/* Brand slash motif */}
      <motion.div initial="hidden" animate="visible" variants={stagger} className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div variants={slashAnim} className="absolute -top-[10%] left-[5%] w-[7px] h-[120%] bg-accent/10 -rotate-16" />
        <motion.div variants={slashAnim} className="absolute -top-[10%] left-[8.5%] w-[7px] h-[120%] bg-accent/5 -rotate-16" />
        <motion.div variants={blockAnim} className="absolute -top-[10%] right-[6%] w-[100px] h-[100px] bg-accent/5 rotate-45 rounded-[10px]" />
        <motion.div variants={blockAnim} className="absolute bottom-[10%] right-[10%] w-[70px] h-[70px] bg-accent/5 rotate-45 rounded-[8px]" />
        <motion.div variants={blockAnim} className="absolute top-[20%] left-[18%] w-[40px] h-[40px] bg-accent/5 rotate-45 rounded-[6px]" />
      </motion.div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 relative z-10 pt-8 md:pt-12">
        <motion.div {...inView} variants={stagger} className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.p
            variants={fadeUp}
            className="text-[12px] font-bold tracking-[0.22em] uppercase text-accent mb-2"
          >
            Your journey · starts here
          </motion.p>
          <motion.h1
            variants={stagger}
            className="font-display font-black tracking-tight text-ink leading-[1.05] flex flex-col items-center text-[clamp(3.5rem,7vw,7rem)]"
          >
            <span className="flex overflow-hidden pb-4 -mb-4"><motion.span variants={wordAnim} className="font-medium">Start your</motion.span></span>
            <span className="flex overflow-hidden pb-8 pt-2 px-4 -mb-8 -mx-4"><motion.span variants={wordAnim} className="italic font-light text-accent tracking-normal">journey</motion.span></span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-[16px] leading-relaxed max-w-xl text-ink-2 mt-4"
          >
            A personalized, doctor-guided program built around you — your goals, your pace, your life. No clinic visits, no guesswork.
          </motion.p>

          {/* Quiz CTA pill */}
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 mt-6">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap transition-all duration-200 gap-2 text-white shadow-md hover:shadow-lg bg-accent hover:bg-accent-hover text-[15px] min-h-[60px] px-10 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Take the free quiz <PiArrowRight size={18} />
            </Link>
            <div className="flex items-center gap-2 text-[13.5px] font-medium text-ink-3">
              <PiTimerFill size={15} className="text-accent" />
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
    typographyTop: "Weight",
    typographyBottom: "Management",
    tag: "Weight Management",
    title: "Weight Management",
    subtitle: "Sustainable fat loss & metabolic reset",
    desc: "Doctor-prescribed programs combining lifestyle coaching with clinically proven therapies like Tirzepatide, Retatrutide, Cagrilintide, and Tesamorelin. Designed for lasting results.",
    href: "/products",
    badge: "Most popular",
  },
  {
    typographyTop: "Peptide",
    typographyBottom: "Therapy",
    tag: "Peptide Therapy",
    title: "Peptide Therapy",
    subtitle: "Accelerated repair & cellular regeneration",
    desc: "Advanced peptide formulations like BPC-157, MOTS-c, TB-500, and Ipamorelin that stimulate cellular healing, growth hormone release, and tissue repair.",
    href: "/products",
    badge: null,
  },
  {
    typographyTop: "Wellness &",
    typographyBottom: "Longevity",
    tag: "Wellness & Longevity",
    title: "Wellness & Longevity",
    subtitle: "Cellular vitality, radiance & detox",
    desc: "Replenish biological resilience with therapies like GHK-Cu, NAD+, KPV, Glow, Klow, and Glutathione. Restore energy metabolism, glowing skin, and cellular longevity.",
    href: "/products",
    badge: null,
  },
];

function JourneyCards() {
  return (
    <section className="w-full py-14 md:py-20 bg-bg">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
        <motion.div {...inView} variants={stagger} className="flex flex-col gap-10">
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-3 text-ink-3">
                Our programs
              </p>
              <h2 className="font-display text-ink leading-tight text-[clamp(1.75rem,3.5vw,2.75rem)]">
                Choose your path forward.
              </h2>
            </div>
            <p className="text-[14px] max-w-xs sm:text-right text-ink-3">
              Every program is personalized by a licensed doctor — not an algorithm.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {JOURNEY_CARDS.map((card) => (
              <motion.a
                key={card.title}
                href={card.href}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative rounded-[32px] bg-white border border-border flex flex-col p-2.5 hover:shadow-card-hover transition-all duration-300 min-h-[420px] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 outline-none"
              >
                {/* Badge */}
                {card.badge && (
                  <div className="absolute top-6 left-6 z-10 text-[10.5px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full text-white bg-accent">
                    {card.badge}
                  </div>
                )}

                {/* Typography Element */}
                <div className="relative flex-1 min-h-[220px] overflow-hidden rounded-[24px] bg-bg flex flex-col items-center justify-center p-6 border-b border-border/50 group-hover:bg-surface transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-b from-surface to-bg pointer-events-none opacity-50" />

                  {/* Elegant Typography */}
                  <div className="relative z-10 flex flex-col items-center text-center group-hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <span className="font-display text-[2.2rem] font-medium tracking-tight text-ink leading-[1]">
                      {card.typographyTop}
                    </span>
                    <span className="font-display text-[2.4rem] italic font-light text-accent tracking-normal leading-[1] mt-1">
                      {card.typographyBottom}
                    </span>
                  </div>

                  {/* Subtle Motif */}
                  <div className="absolute top-[10%] left-[20%] w-[4px] h-[80%] bg-accent/5 -rotate-16 pointer-events-none transition-transform duration-700 group-hover:scale-y-110" />
                  <div className="absolute bottom-[20%] right-[15%] w-[40px] h-[40px] bg-accent/5 rotate-45 rounded-[6px] pointer-events-none transition-transform duration-700 group-hover:rotate-90 group-hover:scale-110" />
                </div>

                {/* Body */}
                <div className="flex flex-col shrink-0 px-5 py-6 gap-3">
                  <span className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-accent">
                    {card.tag}
                  </span>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-ink leading-none text-[1.6rem]">{card.title}</h3>
                      <p className="text-[13px] font-medium mt-1.5 text-ink-3">{card.subtitle}</p>
                    </div>
                    <div className="w-11 h-11 shrink-0 rounded-full border border-border flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-colors duration-300">
                      <PiArrowRight size={20} />
                    </div>
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-ink-2 mt-2">{card.desc}</p>
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
      className="w-full py-14 md:py-20 relative overflow-hidden bg-dark-bg"
    >
      {/* Slash motifs on dark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[20%] left-[10%] w-[7px] h-[140%] bg-accent/10 -rotate-16" />
        <div className="absolute -top-[20%] left-[14%] w-[7px] h-[140%] bg-accent/5 -rotate-16" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <motion.div {...inView} variants={stagger} className="flex flex-col items-center text-center gap-4 mb-12 md:mb-16">
          <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.22em] uppercase text-accent/80">
            By the numbers
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-white leading-tight text-[clamp(1.8rem,4vw,3rem)]">
            Thousands of Filipinos
            <br />
            <em className="not-italic text-accent">already on their way.</em>
          </motion.h2>
        </motion.div>

        <motion.div {...inView} variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {/* Stat 1 */}
          <motion.div variants={fadeUp} className="rounded-[24px] p-8 flex flex-col gap-3 text-center bg-accent/5 border border-accent/15 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center bg-accent/10 text-accent">
              <PiUsers size={22} />
            </div>
            <div className="font-display text-white leading-none mt-2 text-[clamp(2.5rem,5vw,3.5rem)]">
              <AnimatedCounter end={1000} suffix="+" />
            </div>
            <p className="text-[14px] font-medium text-white/70">Filipinos served</p>
            <p className="text-[12.5px] leading-relaxed text-white/40 mt-1">
              From Metro Manila to the provinces — real people, real results.
            </p>
          </motion.div>

          {/* Stat 2 — Quiz time */}
          <motion.div variants={fadeUp} className="rounded-[24px] p-8 flex flex-col gap-3 text-center bg-accent/5 border border-accent/15 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center bg-accent/10 text-accent">
              <PiTimerFill size={22} />
            </div>
            <div className="font-display text-white leading-none mt-2 text-[clamp(2.5rem,5vw,3.5rem)]">
              3 min
            </div>
            <p className="text-[14px] font-medium text-white/70">Quiz takes only 3 minutes</p>
            <p className="text-[12.5px] leading-relaxed text-white/40 mt-1">
              No lengthy forms. Answer a few key questions and get matched instantly.
            </p>
          </motion.div>

          {/* Stat 3 */}
          <motion.div variants={fadeUp} className="rounded-[24px] p-8 flex flex-col gap-3 text-center bg-accent/5 border border-accent/15 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center bg-accent/10 text-accent">
              <PiStarFill size={22} />
            </div>
            <div className="font-display text-white leading-none mt-2 text-[clamp(2.5rem,5vw,3.5rem)]">
              4.9
            </div>
            <p className="text-[14px] font-medium text-white/70">Average rating</p>
            <p className="text-[12.5px] leading-relaxed text-white/40 mt-1">
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
    icon: <PiClipboardText size={24} />,
    title: "Take the 3-minute quiz",
    desc: "Tell us about your health, goals, and lifestyle. No long forms — just a few focused questions to help us understand what you need.",
  },
  {
    number: "02",
    icon: <PiUserCircleCheck size={24} />,
    title: "Get matched with a doctor",
    desc: "A licensed Filipino physician reviews your answers within 24 hours and builds a treatment plan tailored specifically for you.",
  },
  {
    number: "03",
    icon: <PiPackage size={24} />,
    title: "Receive your treatment",
    desc: "Your prescription is dispensed from an FDA-registered pharmacy and delivered free — discreetly packaged, right to your door.",
  },
  {
    number: "04",
    icon: <PiHandHeart size={24} />,
    title: "Ongoing doctor support",
    desc: "Unlimited consultations, dose adjustments, and check-ins throughout your program. Your doctor stays with you the entire journey.",
  },
];

function HowItWorks() {
  return (
    <section className="w-full py-14 md:py-20 bg-surface">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
        <motion.div {...inView} variants={stagger} className="flex flex-col gap-10">
          <motion.div variants={fadeUp} className="flex flex-col items-center text-center gap-4 max-w-xl mx-auto">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-ink-3">
              The process
            </p>
            <h2 className="font-display text-ink leading-tight text-[clamp(1.75rem,3.5vw,2.75rem)]">
              Simple from start to finish.
            </h2>
            <p className="text-[15px] leading-relaxed text-ink-2">
              Four steps between you and the healthiest version of yourself.
            </p>
          </motion.div>

          {/* Steps grid */}
          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className="rounded-[24px] p-8 flex gap-6 items-start bg-white border border-border shadow-sm"
              >
                <div className="shrink-0 flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center bg-accent-light text-accent">
                    {step.icon}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-px flex-1 bg-border min-h-[24px]" />
                  )}
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <span className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-accent">
                    Step {step.number}
                  </span>
                  <h3 className="font-display text-ink text-[1.35rem] leading-[1.15]">
                    {step.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-ink-2 mt-1">
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
  { icon: <PiCheckCircleFill size={18} />, text: "Matched to the right program for your body" },
  { icon: <PiCheckCircleFill size={18} />, text: "Reviewed by a licensed Filipino doctor" },
  { icon: <PiCheckCircleFill size={18} />, text: "Completely free — no commitment required" },
  { icon: <PiCheckCircleFill size={18} />, text: "Results in under 24 hours" },
];

function QuizSection() {
  return (
    <section id="quiz" className="w-full py-14 md:py-20 relative overflow-hidden bg-bg">
      {/* Decorative slashes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-[3%] w-[5px] h-[100%] bg-accent/5 -rotate-16 origin-top" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="rounded-[32px] overflow-hidden bg-gradient-to-br from-surface to-accent-light border border-border">
          <div className="flex flex-col lg:flex-row items-stretch gap-0">

            {/* Left — copy */}
            <motion.div {...inView} variants={stagger} className="flex flex-col justify-center gap-7 p-8 md:p-12 lg:p-16 flex-1">
              <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.22em] uppercase text-accent">
                Free · No commitment
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-display text-ink leading-tight text-[clamp(1.8rem,4vw,3rem)]">
                The quiz only takes
                <br />
                <em className="not-italic text-accent">3 minutes.</em>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[15px] leading-relaxed text-ink-2 max-w-lg">
                A few questions. No guesswork. We use your answers to match you with the right program — then a real doctor builds your personal plan.
              </motion.p>
              <motion.ul variants={stagger} className="flex flex-col gap-3.5 list-none p-0 m-0 mt-2">
                {QUIZ_BENEFITS.map((b) => (
                  <motion.li key={b.text} variants={fadeUp} className="flex items-center gap-3">
                    <span className="shrink-0 text-accent">{b.icon}</span>
                    <span className="text-[14.5px] font-medium text-ink-2">{b.text}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div variants={fadeUp} className="mt-4">
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap transition-all duration-200 gap-2 text-white bg-accent hover:bg-accent-hover text-[14.5px] min-h-[56px] px-8 shadow-sm hover:shadow-md"
                >
                  Start free quiz <PiArrowRight size={18} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — feature image */}
            <div className="relative w-full lg:w-[480px] shrink-0 min-h-[340px] bg-accent/5">
              <Image
                src="/feature-doctor.png"
                alt="Doctor reviewing patient intake"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
              <div className="absolute inset-0 lg:hidden bg-gradient-to-t from-surface/80 to-transparent" />
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
    icon: <PiSealCheckFill size={26} />,
    title: "Licensed Filipino doctors",
    desc: "Every treatment plan is written and supervised by a licensed physician — no bots, no shortcuts.",
  },
  {
    icon: <PiShieldCheckFill size={26} />,
    title: "FDA-registered pharmacy",
    desc: "Your medications are dispensed from an accredited pharmacy under strict quality controls.",
  },
  {
    icon: <PiTruck size={26} />,
    title: "Free & discreet delivery",
    desc: "Ships in plain packaging anywhere in the Philippines, completely free of charge.",
  },
  {
    icon: <PiHeartbeat size={26} />,
    title: "Continuous care",
    desc: "Your doctor is always reachable. Dose adjustments, check-ins, and support — included.",
  },
];

function TrustPillars() {
  return (
    <section className="w-full py-14 md:py-20 bg-bg border-t border-border">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
        <motion.div {...inView} variants={stagger} className="flex flex-col gap-12">
          <motion.div variants={fadeUp} className="flex flex-col items-center text-center gap-4 max-w-lg mx-auto">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-ink-3">
              Why by tearsize
            </p>
            <h2 className="font-display text-ink leading-tight text-[clamp(1.75rem,3.5vw,2.75rem)]">
              Built on trust.
              <br />
              <em className="not-italic text-accent">Proven by results.</em>
            </h2>
          </motion.div>

          <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                className="rounded-[24px] p-8 flex flex-col gap-4 bg-surface border border-border hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent-light text-accent">
                  {p.icon}
                </div>
                <h3 className="font-display text-ink leading-snug text-[1.2rem]">{p.title}</h3>
                <p className="text-[14px] leading-relaxed text-ink-2">{p.desc}</p>
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
    <section className="w-full py-16 md:py-24 relative overflow-hidden bg-ink">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[10%] left-[7%] w-[8px] h-[120%] bg-accent/10 -rotate-16" />
        <div className="absolute -top-[10%] left-[11.5%] w-[8px] h-[120%] bg-accent/5 -rotate-16" />
        <div className="absolute top-[10%] right-[7%] w-[90px] h-[90px] bg-accent/10 rotate-45 rounded-[12px]" />
        <div className="absolute bottom-[14%] right-[13%] w-[55px] h-[55px] bg-accent/5 rotate-45 rounded-[8px]" />
      </div>

      <motion.div {...inView} variants={stagger} className="max-w-[620px] mx-auto px-4 text-center relative z-10">
        <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.22em] uppercase mb-5 text-accent/80">
          Ready to begin?
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-display text-white leading-[1.05] mb-5 text-[clamp(2rem,4.5vw,3rem)]">
          Your transformation
          <br />
          <em className="not-italic text-accent">starts with one step.</em>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-[15.5px] leading-relaxed mb-10 text-white/60">
          Take the free 3-minute quiz. Get matched with a licensed doctor. Start feeling like yourself again — entirely online.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap transition-all duration-200 gap-2 text-white bg-accent hover:bg-accent-hover text-[15px] min-h-[56px] px-9 shadow-lg"
          >
            Take the quiz <PiArrowRight size={18} />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap transition-colors duration-200 text-white text-[15px] min-h-[56px] px-9 border-[1.5px] border-accent/40 hover:border-accent/90"
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
