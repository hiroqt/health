"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IntroSplash } from "@/components/animations/IntroSplash";
import {
  PiArrowRight,
  PiStarFill,
  PiCheckCircleFill,
  PiStethoscope,
  PiDropHalfBottom,
  PiShieldCheckFill,
  PiTruck,
  PiArrowsCounterClockwise,
  PiClipboardText,
  PiUserCircleCheck,
  PiPackage,
  PiHandHeart,
  PiSealCheckFill,
  PiHeartStraight,
  PiUsers,
  PiCurrencyDollar,
  PiDesktop,
  PiPill,
  PiShield,
} from "react-icons/pi";

import feedback1 from "../../public/feedbacks/Real Results from Real People (1).png";
import feedback2 from "../../public/feedbacks/Real Results from Real People (2).png";
import feedback3 from "../../public/feedbacks/Real Results from Real People (3).jpg";
import feedback4 from "../../public/feedbacks/Real Results from Real People (4).png";
import feedback5 from "../../public/feedbacks/Real Results from Real People (5).png";
import feedback6 from "../../public/feedbacks/Real Results from Real People (6).png";
import feedback7 from "../../public/feedbacks/Real Results from Real People (7).png";
import feedback8 from "../../public/feedbacks/Real Results from Real People (8).png";
import feedback9 from "../../public/feedbacks/Real Results from Real People (9).png";

// ─── Animations ───────────────────────────────────────────────────────────────
const ease = [0.16, 1, 0.3, 1] as const;
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

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ splashDone }: { splashDone: boolean }) {
  return (
    <section
      className="w-full pb-10 md:pb-16 relative overflow-hidden bg-gradient-to-b from-surface from-0% to-bg to-60% pt-[clamp(2rem,5vw,3.5rem)]"
    >
      {/* Diagonal slash decorations — brand motif */}
      <motion.div initial="hidden" animate={splashDone ? "visible" : "hidden"} variants={stagger} className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div variants={slashAnim} className="absolute -top-[10%] left-[5%] w-[7px] h-[120%] bg-accent/10 -rotate-16" />
        <motion.div variants={slashAnim} className="absolute -top-[10%] left-[8.5%] w-[7px] h-[120%] bg-accent/5 -rotate-16" />
        <motion.div variants={blockAnim} className="absolute -top-[10%] right-[6%] w-[100px] h-[100px] bg-accent/5 rotate-45 rounded-[10px]" />
        <motion.div variants={blockAnim} className="absolute bottom-[10%] right-[10%] w-[70px] h-[70px] bg-accent/5 rotate-45 rounded-[8px]" />
      </motion.div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 relative z-10 pt-4 md:pt-6">
        <motion.div
          initial="hidden"
          animate={splashDone ? "visible" : "hidden"}
          variants={stagger}
          className="flex flex-col gap-12 lg:gap-20"
        >
          {/* Top Section: Centered Text & CTA */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center text-center justify-center py-4 relative max-w-4xl mx-auto"
          >
            <motion.p variants={fadeUp} className="text-[12px] font-bold tracking-[0.22em] uppercase mb-6 text-accent">
              Doctor-prescribed · 100% online
            </motion.p>
            <motion.h1 variants={stagger} className="font-display text-ink text-center tracking-tight leading-[1.1] text-[clamp(3.5rem,7vw,7rem)] flex flex-col items-center gap-y-1 md:gap-y-4">
              <div className="flex flex-wrap justify-center items-center gap-x-3 md:gap-x-5">
                <span className="flex overflow-hidden"><motion.span variants={wordAnim} className="font-light">Smaller</motion.span></span>
                <span className="flex overflow-hidden"><motion.span variants={wordAnim} className="font-medium">you,</motion.span></span>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-x-3 md:gap-x-5">
                <span className="flex overflow-hidden py-2"><motion.span variants={wordAnim} className="italic font-light text-accent tracking-normal pr-1">bigger</motion.span></span>
                <span className="flex overflow-hidden py-2"><motion.span variants={wordAnim} className="font-medium">life.</motion.span></span>
              </div>
            </motion.h1>

            <div className="mt-10 flex flex-col items-center justify-center gap-6">
              <a
                href="/learn-more"
                className="inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap cursor-pointer transition-all duration-200 gap-2 shrink-0 text-white shadow-md hover:shadow-lg bg-accent hover:bg-accent-hover text-[15px] min-h-[60px] px-10 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Start your program <PiArrowRight size={18} />
              </a>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { icon: <PiUsers size={16} />, label: "1,000+ patients" },
                  { icon: <PiTruck size={16} />, label: "Free delivery" },
                  { icon: <PiShieldCheckFill size={16} />, label: "100% discreet" },
                ].map(({ icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 text-[14px] font-medium whitespace-nowrap text-ink-2 px-2"
                  >
                    <span className="text-accent shrink-0">{icon}</span>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom Section: 3-Column Product Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1: Weight Management */}
            <motion.a
              href="/products"
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative rounded-[32px] bg-white/70 backdrop-blur-md border border-border flex flex-col p-2.5 hover:shadow-card-hover transition-all duration-300 min-h-[360px] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 outline-none"
            >
              <div className="relative flex-1 min-h-[220px] overflow-hidden rounded-[24px]">
                <Image
                  src="/card-metabolic.png"
                  alt="Weight Management"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
              <div className="px-5 py-6 bg-transparent shrink-0 flex items-center justify-between">
                <div className="pr-2">
                  <h2 className="font-display text-ink text-[1.5rem] leading-[1.1]">Weight Management</h2>
                  <p className="text-[13px] text-ink-3 mt-1.5 font-medium leading-relaxed">Advanced GLP-1 therapies</p>
                </div>
                <div className="w-11 h-11 shrink-0 rounded-full border border-border flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-colors duration-300">
                  <PiArrowRight size={20} />
                </div>
              </div>
            </motion.a>

            {/* Card 2: Peptide Therapy */}
            <motion.a
              href="/products"
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative rounded-[32px] bg-white/70 backdrop-blur-md border border-border flex flex-col p-2.5 hover:shadow-card-hover transition-all duration-300 min-h-[360px] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 outline-none"
            >
              <div className="relative flex-1 min-h-[220px] overflow-hidden rounded-[24px]">
                <Image
                  src="/card-skin.png"
                  alt="Peptide Therapy"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="px-5 py-6 bg-transparent shrink-0 flex items-center justify-between">
                <div className="pr-2">
                  <h2 className="font-display text-ink text-[1.5rem] leading-[1.1]">Peptide Therapy</h2>
                  <p className="text-[13px] text-ink-3 mt-1.5 font-medium leading-relaxed">Healing & rejuvenation</p>
                </div>
                <div className="w-11 h-11 shrink-0 rounded-full border border-border flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-colors duration-300">
                  <PiArrowRight size={20} />
                </div>
              </div>
            </motion.a>

            {/* Card 3: Wellness & Longevity */}
            <motion.a
              href="/products"
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative rounded-[32px] bg-white/70 backdrop-blur-md border border-border flex flex-col p-2.5 hover:shadow-card-hover transition-all duration-300 min-h-[360px] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 outline-none"
            >
              <div className="relative flex-1 min-h-[220px] overflow-hidden rounded-[24px]">
                <Image
                  src="/card-vitality.png"
                  alt="Wellness & Longevity"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="px-5 py-6 bg-transparent shrink-0 flex items-center justify-between">
                <div className="pr-2">
                  <h2 className="font-display text-ink text-[1.5rem] leading-[1.1]">Wellness & Longevity</h2>
                  <p className="text-[13px] text-ink-3 mt-1.5 font-medium leading-relaxed">Cellular energy & focus</p>
                </div>
                <div className="w-11 h-11 shrink-0 rounded-full border border-border flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-colors duration-300">
                  <PiArrowRight size={20} />
                </div>
              </div>
            </motion.a>

          </div>

        </motion.div>
      </div>
    </section>
  );
}

// ─── WAVE DIVIDER ─────────────────────────────────────────────────────────────
function WaveDivider({ fromColor, toColor, className }: { fromColor?: string; toColor: string, className?: string }) {
  // Using className to pass Tailwind classes for background/fill instead of inline styles
  return (
    <div className={`leading-none block ${className || ''}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 72" preserveAspectRatio="none"
        aria-hidden="true" className="block w-full h-[72px]">
        <path d="M0,28 C320,72 800,0 1120,44 C1240,60 1360,36 1440,28 L1440,72 L0,72 Z"
          fill={toColor} opacity="0.45" />
        <path d="M0,52 C280,8 640,72 960,40 C1120,24 1280,56 1440,44 L1440,72 L0,72 Z"
          fill={toColor} />
      </svg>
    </div>
  );
}

// ─── TRUST BAR ────────────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: <PiUsers size={17} />, text: "50,000+ members" },
  { icon: <PiCurrencyDollar size={17} />, text: "Transparent pricing" },
  { icon: <PiHeartStraight size={17} />, text: "Personalized care" },
  { icon: <PiDesktop size={17} />, text: "100% entirely online" },
  { icon: <PiShieldCheckFill size={17} />, text: "FDA-registered facilities" },
  { icon: <PiTruck size={17} />, text: "Free & discreet delivery" },
];

function MarqueeDot() {
  return (
    <span aria-hidden="true" className="shrink-0 w-1 h-1 rounded-full bg-accent mx-1" />
  );
}

function TrustBar() {
  const doubled = [...TRUST_ITEMS, ...TRUST_ITEMS];
  return (
    <div className="w-full overflow-hidden bg-trust-bar">
      <div className="marquee-track" aria-label="Trust highlights">
        {doubled.map((item, i) => (
          <React.Fragment key={i}>
            <div className="flex shrink-0 items-center gap-2 px-5 py-3.5 md:py-4">
              <span className="shrink-0 text-accent-hover">{item.icon}</span>
              <span className="text-[12.5px] md:text-[13px] whitespace-nowrap text-ink font-medium">
                {item.text}
              </span>
            </div>
            <MarqueeDot />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ─── FEATURE SECTION ──────────────────────────────────────────────────────────
interface Bullet { icon: React.ReactNode; text: string; }
interface FeatureSectionProps {
  id: string;
  imgSrc: string;
  imgAlt: string;
  imgRight?: boolean;
  heading: React.ReactNode;
  bullets: Bullet[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  bgClass?: string;
}

function FeatureSection({
  id, imgSrc, imgAlt, imgRight, heading, bullets,
  primaryCta, secondaryCta, bgClass = "bg-white",
}: FeatureSectionProps) {
  return (
    <section id={id} className={`w-full py-14 md:py-20 relative overflow-hidden ${bgClass}`}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className={["flex flex-col gap-10 lg:gap-16 items-center", imgRight ? "lg:flex-row" : "lg:flex-row-reverse"].join(" ")}>
          <motion.div
            {...inView} variants={fadeIn}
            className="relative w-full lg:flex-1 rounded-[18px] overflow-hidden self-stretch min-h-[300px]"
          >
            <Image src={imgSrc} alt={imgAlt} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 50vw" />
          </motion.div>

          <motion.div {...inView} variants={stagger} className="flex flex-col gap-7 w-full lg:flex-1 max-w-[500px]">
            <motion.div variants={fadeUp} className="font-display text-ink leading-[1.1] text-[clamp(1.75rem,3vw,2.5rem)]">
              {heading}
            </motion.div>
            <motion.ul variants={stagger} className="flex flex-col gap-3.5 list-none p-0 m-0">
              {bullets.map((b, i) => (
                <motion.li key={i} variants={fadeUp} className="flex items-start gap-3.5">
                  <span className="shrink-0 mt-0.5 text-accent">{b.icon}</span>
                  <span className="text-[15px] text-ink-2 leading-relaxed">{b.text}</span>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-1">
              <a
                href={primaryCta.href}
                className="inline-flex items-center justify-center rounded-full text-[13.5px] font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200 min-h-[48px] px-6 gap-2 bg-accent hover:bg-accent-hover text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 outline-none"
              >
                {primaryCta.label}
              </a>
              <a
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full text-[13.5px] font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200 min-h-[48px] px-6 gap-2 bg-transparent text-accent border-[1.5px] border-accent hover:bg-accent hover:text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 outline-none"
              >
                {secondaryCta.label}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── DARK BENTO CAMPAIGN ──────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  {
    icon: <PiUsers size={20} />,
    step: "1",
    title: "Real results, real people",
    desc: "Built on authentic client experiences—because results you can see and feel matter most.",
  },
  {
    icon: <PiDropHalfBottom size={20} />,
    step: "2",
    title: "Science-backed formulations",
    desc: "Carefully selected ingredients designed to support wellness, recovery, and overall vitality.",
  },
  {
    icon: <PiHandHeart size={20} />,
    step: "3",
    title: "Client-centered care",
    desc: "We prioritize guidance, support, and education—so every client feels confident in their journey.",
  },
  {
    icon: <PiShieldCheckFill size={20} />,
    step: "4",
    title: "Consistency you can trust",
    desc: "From product quality to customer experience, by tearsize delivers reliability every step of the way.",
  },
];

function BentoCampaign() {
  return (
    <section id="how-it-works" className="w-full py-3 md:py-4">
      <div className="max-w-[1280px] mx-auto px-2 md:px-4">
        <div
          className="relative overflow-hidden rounded-[22px] md:rounded-[28px] p-6 md:px-14 md:py-16 flex flex-col items-center bg-gradient-to-br from-dark-bg-2 via-[#1A0808] to-dark-bg shadow-lg"
        >

          <motion.div {...inView} variants={stagger} className="flex flex-col items-center z-10 relative w-full">
            <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4 text-accent/60">
              Why by tearsize
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-center text-white leading-[1.1] mb-1 text-[clamp(2.5rem,5vw,3.5rem)]">
              What makes
            </motion.h2>
            <motion.h2 variants={fadeUp} className="font-display italic text-center leading-[1.1] mb-8 text-[clamp(2.5rem,5vw,3.5rem)] text-accent">
              by tearsize Special?
            </motion.h2>
          </motion.div>

          {/* Person image */}
          <div className="w-full relative mx-auto mb-4 md:mb-6 pointer-events-none h-[300px] md:h-[460px]"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, white 55%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, white 55%, transparent 100%)",
            }}>
            <Image src="/image.png" alt="" fill className="object-cover object-center rounded-2xl md:rounded-[24px]" sizes="(max-width: 768px) 100vw, 1280px" />
          </div>

          {/* Step cards */}
          <motion.div {...inView} variants={stagger}
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 z-10 relative">
            {HOW_IT_WORKS.map((card) => (
              <motion.div key={card.title} variants={fadeUp}
                className="rounded-[14px] p-5 flex flex-col gap-3 bg-accent/5 border border-accent/15 backdrop-blur-md hover:bg-accent/10 transition-colors duration-300">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-accent/15 text-accent">
                    {card.icon}
                  </span>
                  <span className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-accent/50">
                    Reason {card.step}
                  </span>
                </div>
                <h3 className="font-display text-[1.05rem] text-white leading-snug">{card.title}</h3>
                <p className="text-[13px] leading-relaxed text-white/55">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS STEPS ─────────────────────────────────────────────────────────
const PROCESS_STEPS = [
  {
    step: "01",
    title: "Take the 3-minute quiz",
    desc: "Tell us about your health, goals, and lifestyle. No long forms — just a few focused questions to help us understand what you need.",
    icon: <PiClipboardText size={24} />
  },
  {
    step: "02",
    title: "Get matched with a doctor",
    desc: "A licensed Filipino physician reviews your answers within 24 hours and builds a treatment plan tailored specifically for you.",
    icon: <PiUserCircleCheck size={24} />
  },
  {
    step: "03",
    title: "Receive your treatment",
    desc: "Your prescription is dispensed from an FDA-registered pharmacy and delivered free — discreetly packaged, right to your door.",
    icon: <PiPackage size={24} />
  },
  {
    step: "04",
    title: "Ongoing doctor support",
    desc: "Unlimited consultations, dose adjustments, and check-ins throughout your program. Your doctor stays with you the entire journey.",
    icon: <PiHeartStraight size={24} />
  }
];

function HowItWorksSteps() {
  return (
    <section className="w-full py-16 md:py-24 bg-surface relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <motion.div {...inView} variants={stagger} className="flex flex-col items-center text-center mb-12 md:mb-16">
          <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4 text-accent">
            How it works
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-ink leading-tight text-[clamp(2rem,4vw,3rem)] mb-4 max-w-2xl mx-auto">
            Simple from start to finish.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[15px] text-ink-3 leading-relaxed max-w-2xl mx-auto">
            Four steps between you and the healthiest version of yourself.
          </motion.p>
        </motion.div>

        <motion.div {...inView} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((item, i) => (
            <motion.div key={item.step} variants={fadeUp} className="relative bg-white rounded-[24px] p-8 border border-border hover:shadow-card-hover transition-all duration-300 flex flex-col group">
              <div className="flex items-center justify-between mb-8">
                <span className="w-12 h-12 rounded-full flex items-center justify-center bg-accent-subtle text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </span>
                <span className="text-[40px] font-display font-light text-border-strong opacity-30 select-none">
                  {item.step}
                </span>
              </div>
              <h3 className="font-display text-ink text-[1.25rem] leading-snug mb-3">
                {item.title}
              </h3>
              <p className="text-[14px] text-ink-3 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div {...inView} variants={fadeUp} className="mt-12 flex justify-center">
          <a
            href="/learn-more"
            className="inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200 gap-2 shrink-0 text-white bg-accent hover:bg-accent-hover text-[14.5px] min-h-[56px] px-8 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 outline-none shadow-sm"
          >
            Start your journey <PiArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const FEEDBACK_IMAGES = [
  feedback1,
  feedback2,
  feedback3,
  feedback4,
  feedback5,
  feedback6,
  feedback7,
  feedback8,
  feedback9,
];

const ROW1 = FEEDBACK_IMAGES.slice(0, 5);
const ROW2 = FEEDBACK_IMAGES.slice(5, 9);
const ROW1_DOUBLED = [...ROW1, ...ROW1];
const ROW2_DOUBLED = [...ROW2, ...ROW2];

function Testimonials() {
  return (
    <section className="w-full py-14 md:py-20 bg-surface overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
        <motion.div {...inView} variants={stagger} className="flex flex-col gap-8 md:gap-12">
          <motion.div variants={fadeUp}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-3 text-ink-3">
                Patient stories
              </p>
              <h2 className="font-display text-ink leading-tight text-[clamp(1.75rem,3vw,2.5rem)]">
                Real results, real people.
              </h2>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {[...Array(5)].map((_, i) => (
                <PiStarFill key={i} size={15} className="text-accent" />
              ))}
              <span className="ml-1 text-[14px] font-semibold text-ink">4.9</span>
              <span className="text-[13px] ml-1 text-ink-3">· 1,000+ reviews</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div {...inView} variants={fadeUp} className="relative w-full overflow-hidden flex flex-col gap-2 md:gap-6 pt-10 pb-4">
        {/* ROW 1 (Left Marquee) */}
        <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="marquee-track gap-6 md:gap-8 items-center py-4">
            {ROW1_DOUBLED.map((img, i) => (
              <div
                key={`r1-${i}`}
                className={`w-[260px] md:w-[320px] shrink-0 rounded-[20px] overflow-hidden shadow-sm border border-border bg-white transition-all duration-300 hover:scale-[1.03] hover:rotate-0 hover:z-10 hover:shadow-card-hover cursor-pointer ${i % 2 === 0 ? 'rotate-[-2deg] -translate-y-2' : 'rotate-[2deg] translate-y-2'
                  }`}
              >
                <Image
                  src={img}
                  alt={`Patient feedback ${i + 1}`}
                  className="w-full h-auto object-contain"
                  placeholder="blur"
                  quality={100}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2 (Right Marquee) */}
        <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="marquee-track-reverse gap-6 md:gap-8 items-center py-4">
            {ROW2_DOUBLED.map((img, i) => (
              <div
                key={`r2-${i}`}
                className={`w-[260px] md:w-[320px] shrink-0 rounded-[20px] overflow-hidden shadow-sm border border-border bg-white transition-all duration-300 hover:scale-[1.03] hover:rotate-0 hover:z-10 hover:shadow-card-hover cursor-pointer ${i % 2 === 0 ? 'rotate-[3deg] translate-y-2' : 'rotate-[-3deg] -translate-y-2'
                  }`}
              >
                <Image
                  src={img}
                  alt={`Patient feedback row 2 ${i + 1}`}
                  className="w-full h-auto object-contain"
                  placeholder="blur"
                  quality={100}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── PRESS ────────────────────────────────────────────────────────────────────
const PRESS = ["Healthline", "Vogue", "Men's Health", "Well+Good", "Forbes Health", "Medical News Today"];

function Press() {
  return (
    <section className="w-full py-10 md:py-12 bg-white border-b border-border">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
        <motion.p {...inView} variants={fadeIn}
          className="text-center text-[10.5px] font-bold tracking-[0.24em] uppercase mb-7 text-ink-3">
          As featured in
        </motion.p>
        <motion.div {...inView} variants={stagger}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PRESS.map((name) => (
            <motion.span key={name} variants={fadeUp}
              className="font-display italic cursor-default select-none transition-colors duration-200 text-[clamp(1.05rem,2vw,1.3rem)] text-border-strong hover:text-accent">
              {name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA BANNER ───────────────────────────────────────────────────────────────
function CtaBanner() {
  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden bg-ink">
      {/* Diagonal decorations in dark bg */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[10%] right-[8%] w-[90px] h-[90px] bg-accent/10 rotate-45 rounded-[10px]" />
        <div className="absolute bottom-[15%] right-[14%] w-[55px] h-[55px] bg-accent/5 rotate-45 rounded-[7px]" />
      </div>

      <motion.div {...inView} variants={stagger}
        className="max-w-[640px] mx-auto px-4 text-center relative z-10">
        <motion.h2 variants={fadeUp} className="font-display text-white leading-[1.1] mb-4 text-[clamp(1.9rem,4vw,2.75rem)]">
          Your transformation
          <br />
          <em className="not-italic text-accent">
            starts with one step.
          </em>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-[15px] leading-relaxed mb-8 text-white/55">
          Complete a 5-minute intake and get matched with a licensed doctor
          within 24 hours. No clinic visit required.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
          <a
            href="/learn-more"
            className="inline-flex items-center justify-center rounded-full text-[13.5px] font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200 min-h-[48px] px-7 gap-2 bg-accent hover:bg-accent-hover text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink outline-none"
          >
            Start my program <PiArrowRight size={15} />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-full text-[13.5px] font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200 min-h-[48px] px-7 gap-2 text-white border-[1.5px] border-accent/40 hover:border-accent/90 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink outline-none"
          >
            How it works
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [showSplash, setShowSplash] = useState(false);
  const [splashDone, setSplashDone] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem("splashShown")) {
      setShowSplash(true);
      setSplashDone(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("splashShown", "true");
    setTimeout(() => {
      setSplashDone(true);
    }, 400); // small buffer for fade out
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <IntroSplash onComplete={handleSplashComplete} />}
      </AnimatePresence>
      <Header splashDone={splashDone} />
      <main>
        <Hero splashDone={splashDone} />
        <WaveDivider className="bg-bg" toColor="var(--color-trust-bar)" />
        <TrustBar />
        <WaveDivider className="bg-trust-bar" toColor="var(--color-bg)" />

        <FeatureSection
          id="guidance"
          imgSrc="/guidance.jpg"
          imgAlt="The Right Guidance"
          imgRight
          heading={
            <>
              Start your journey
              <br />
              to confidence.
            </>
          }
          bullets={[
            {
              icon: <PiStethoscope size={20} />,
              text: "Get the right guidance tailored to your specific goals and lifestyle.",
            },
            {
              icon: <PiCheckCircleFill size={20} />,
              text: "Personalized programs designed for effective weight loss and anti-aging.",
            },
            {
              icon: <PiShieldCheckFill size={20} />,
              text: "Expert support every step of the way to ensure your long-term success.",
            },
          ]}
          primaryCta={{ label: "Get started", href: "/learn-more" }}
          secondaryCta={{ label: "Learn more", href: "/learn-more" }}
        />

        <BentoCampaign />

        <HowItWorksSteps />

        <Testimonials />
        <Press />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
