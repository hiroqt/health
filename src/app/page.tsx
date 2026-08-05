"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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

// ─── Animations ───────────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09 } },
};
const inView = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-60px" },
};

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="w-full pb-10 md:pb-16 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFF5F5 0%, #FFFFFF 60%)",
        paddingTop: "clamp(2rem, 5vw, 3.5rem)",
      }}
    >
      {/* Diagonal slash decorations — brand motif */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div style={{
          position: "absolute", top: "-10%", left: "5%",
          width: "7px", height: "120%",
          background: "rgba(240,112,112,0.10)",
          transform: "rotate(-16deg)",
        }} />
        <div style={{
          position: "absolute", top: "-10%", left: "8.5%",
          width: "7px", height: "120%",
          background: "rgba(240,112,112,0.07)",
          transform: "rotate(-16deg)",
        }} />
        <div style={{
          position: "absolute", top: "-10%", right: "6%",
          width: "100px", height: "100px",
          background: "rgba(240,112,112,0.06)",
          transform: "rotate(45deg)",
          borderRadius: "10px",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "10%",
          width: "70px", height: "70px",
          background: "rgba(240,112,112,0.05)",
          transform: "rotate(45deg)",
          borderRadius: "8px",
        }} />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 relative z-10 pt-4 md:pt-6">
        <motion.div
          {...inView}
          variants={stagger}
          className="flex flex-col gap-12 lg:gap-20"
        >
          {/* Top Section: Centered Text & CTA */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center text-center justify-center py-4 relative max-w-4xl mx-auto"
          >
            <p
              className="text-[12px] font-bold tracking-[0.22em] uppercase mb-6"
              style={{ color: "#F07070" }}
            >
              Doctor-prescribed · 100% online
            </p>
            <h1
              className="font-display font-black tracking-tight text-[#1A0A0A] leading-[1.02]"
              style={{ fontSize: "clamp(3.5rem, 6vw, 6.5rem)" }}
            >
              Smaller you,
              <br />
              <em className="not-italic" style={{ color: "#F07070" }}>
                bigger
              </em>{" "}
              life.
            </h1>

            <div className="mt-10 flex flex-col items-center justify-center gap-6">
              <a
                href="/quiz"
                className="inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap cursor-pointer transition-all duration-200 gap-2 shrink-0 text-white shadow-md hover:shadow-lg"
                style={{ background: "#F07070", fontSize: "15px", minHeight: "60px", padding: "0 40px" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#D94040")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#F07070")}
              >
                Start your program <PiArrowRight size={18} />
              </a>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { icon: <PiUsers size={16} />,          label: "50,000+ patients" },
                  { icon: <PiTruck size={16} />,           label: "Free delivery"    },
                  { icon: <PiShieldCheckFill size={16} />, label: "100% discreet"   },
                ].map(({ icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 text-[14px] font-medium whitespace-nowrap text-[#4A3333] px-2"
                  >
                    <span style={{ color: "#F07070" }} className="shrink-0">{icon}</span>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom Section: 3-Column Product Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: The Right Guidance */}
            <motion.a
              href="#guidance"
              variants={fadeUp}
              className="group relative rounded-[32px] bg-white border border-[#F5DADA] flex flex-col p-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(240,112,112,0.15)] transition-shadow duration-300"
              style={{ minHeight: "360px" }}
            >
              <div className="relative flex-1 min-h-[220px] overflow-hidden rounded-[24px]">
                <Image
                  src="/guidance.jpg"
                  alt="Start your journey to confidence"
                  fill
                  className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
              <div className="px-5 py-6 bg-white shrink-0 flex items-center justify-between">
                <div className="pr-2">
                  <h2 className="font-display text-[#1A0A0A] text-[1.5rem] leading-[1.1]">Guidance</h2>
                  <p className="text-[13px] text-[#9A7878] mt-1.5 font-medium leading-relaxed">Anti-aging & weight loss</p>
                </div>
                <div className="w-11 h-11 shrink-0 rounded-full border border-[#F5DADA] flex items-center justify-center text-[#F07070] group-hover:bg-[#F07070] group-hover:text-white transition-colors duration-300">
                  <PiArrowRight size={20} />
                </div>
              </div>
            </motion.a>

            {/* Card 2: NAD+ */}
            <motion.a
              href="#nad-plus"
              variants={fadeUp}
              className="group relative rounded-[32px] bg-white border border-[#F5DADA] flex flex-col p-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(240,112,112,0.15)] transition-shadow duration-300"
              style={{ minHeight: "360px" }}
            >
              <div className="relative flex-1 min-h-[220px] overflow-hidden rounded-[24px] bg-[#FFF5F5]">
                <Image
                  src="/nad.jpg"
                  alt="NAD+"
                  fill
                  className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="px-5 py-6 bg-white shrink-0 flex items-center justify-between">
                <div className="pr-2">
                  <h2 className="font-display text-[#1A0A0A] text-[1.5rem] leading-[1.1]">NAD+</h2>
                  <p className="text-[13px] text-[#9A7878] mt-1.5 font-medium leading-relaxed">Boosts energy & focus</p>
                </div>
                <div className="w-11 h-11 shrink-0 rounded-full border border-[#F5DADA] flex items-center justify-center text-[#F07070] group-hover:bg-[#F07070] group-hover:text-white transition-colors duration-300">
                  <PiArrowRight size={20} />
                </div>
              </div>
            </motion.a>

            {/* Card 3: GHK-CU */}
            <motion.a
              href="#ghk-cu"
              variants={fadeUp}
              className="group relative rounded-[32px] bg-white border border-[#F5DADA] flex flex-col p-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(240,112,112,0.15)] transition-shadow duration-300"
              style={{ minHeight: "360px" }}
            >
              <div className="relative flex-1 min-h-[220px] overflow-hidden rounded-[24px]">
                <Image
                  src="/ghk.jpg"
                  alt="GHK-CU"
                  fill
                  className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="px-5 py-6 bg-white shrink-0 flex items-center justify-between">
                <div className="pr-2">
                  <h2 className="font-display text-[#1A0A0A] text-[1.5rem] leading-[1.1]">GHK-CU</h2>
                  <p className="text-[13px] text-[#9A7878] mt-1.5 font-medium leading-relaxed">Boosts collagen & healing</p>
                </div>
                <div className="w-11 h-11 shrink-0 rounded-full border border-[#F5DADA] flex items-center justify-center text-[#F07070] group-hover:bg-[#F07070] group-hover:text-white transition-colors duration-300">
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
function WaveDivider({ fromColor, toColor }: { fromColor: string; toColor: string }) {
  return (
    <div style={{ backgroundColor: fromColor, lineHeight: 0, display: "block" }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 72" preserveAspectRatio="none"
        aria-hidden="true" style={{ display: "block", width: "100%", height: "72px" }}>
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
  { icon: <PiUsers size={17} />,           text: "50,000+ members"           },
  { icon: <PiCurrencyDollar size={17} />,  text: "Transparent pricing"       },
  { icon: <PiHeartStraight size={17} />,   text: "Personalized care"         },
  { icon: <PiDesktop size={17} />,         text: "100% entirely online"      },
  { icon: <PiShieldCheckFill size={17} />, text: "FDA-registered facilities" },
  { icon: <PiTruck size={17} />,           text: "Free & discreet delivery"  },
];

function MarqueeDot() {
  return (
    <span aria-hidden="true" className="shrink-0 w-1 h-1 rounded-full"
      style={{ background: "#F07070", margin: "0 4px" }} />
  );
}

function TrustBar() {
  const doubled = [...TRUST_ITEMS, ...TRUST_ITEMS];
  return (
    <div className="w-full overflow-hidden" style={{ backgroundColor: "#FADADD" }}>
      <div className="marquee-track" aria-label="Trust highlights">
        {doubled.map((item, i) => (
          <React.Fragment key={i}>
            <div className="flex shrink-0 items-center gap-2 px-5 py-3.5 md:py-4">
              <span style={{ color: "#D94040" }} className="shrink-0">{item.icon}</span>
              <span className="text-[12.5px] md:text-[13px] whitespace-nowrap text-[#1A0A0A] font-medium">
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
  primaryCta:   { label: string; href: string };
  secondaryCta: { label: string; href: string };
  bg?: string;
}

function FeatureSection({
  id, imgSrc, imgAlt, imgRight, heading, bullets,
  primaryCta, secondaryCta, bg = "white",
}: FeatureSectionProps) {
  return (
    <section id={id} className="w-full py-14 md:py-20 relative overflow-hidden" style={{ background: bg }}>
      {/* Decorative diagonal slashes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{
          position: "absolute", top: 0, left: imgRight ? "auto" : "2%", right: imgRight ? "2%" : "auto",
          width: "5px", height: "100%",
          background: "rgba(240,112,112,0.08)",
          transform: "rotate(-16deg)", transformOrigin: "top center",
        }} />
      </div>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className={["flex flex-col gap-10 lg:gap-16 items-center", imgRight ? "lg:flex-row" : "lg:flex-row-reverse"].join(" ")}>
          <motion.div
            {...inView} variants={fadeIn}
            className="relative w-full lg:flex-1 rounded-[18px] overflow-hidden self-stretch"
            style={{ minHeight: "300px" }}
          >
            <Image src={imgSrc} alt={imgAlt} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 50vw" />
          </motion.div>

          <motion.div {...inView} variants={stagger} className="flex flex-col gap-7 w-full lg:flex-1 max-w-[500px]">
            <motion.div variants={fadeUp} className="font-display text-[#1A0A0A] leading-[1.1]"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
              {heading}
            </motion.div>
            <motion.ul variants={stagger} className="flex flex-col gap-3.5 list-none p-0 m-0">
              {bullets.map((b, i) => (
                <motion.li key={i} variants={fadeUp} className="flex items-start gap-3.5">
                  <span className="shrink-0 mt-0.5" style={{ color: "#F07070" }}>{b.icon}</span>
                  <span className="text-[15px] text-[#4A3333] leading-relaxed">{b.text}</span>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-1">
              <a
                href={primaryCta.href}
                className="inline-flex items-center justify-center rounded-full text-[13.5px] font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200 text-white min-h-[48px] px-6 gap-2"
                style={{ background: "#F07070" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#D94040")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#F07070")}
              >
                {primaryCta.label}
              </a>
              <a
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full text-[13.5px] font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200 min-h-[48px] px-6 gap-2"
                style={{ background: "transparent", color: "#F07070", border: "1.5px solid #F07070" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#F07070"; e.currentTarget.style.color = "white"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#F07070"; }}
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
    desc:  "Built on authentic client experiences—because results you can see and feel matter most.",
  },
  {
    icon: <PiDropHalfBottom size={20} />,
    step: "2",
    title: "Science-backed formulations",
    desc:  "Carefully selected ingredients designed to support wellness, recovery, and overall vitality.",
  },
  {
    icon: <PiHandHeart size={20} />,
    step: "3",
    title: "Client-centered care",
    desc:  "We prioritize guidance, support, and education—so every client feels confident in their journey.",
  },
  {
    icon: <PiShieldCheckFill size={20} />,
    step: "4",
    title: "Consistency you can trust",
    desc:  "From product quality to customer experience, Tearsize delivers reliability every step of the way.",
  },
];

function BentoCampaign() {
  return (
    <section id="how-it-works" className="w-full py-3 md:py-4">
      <div className="max-w-[1280px] mx-auto px-2 md:px-4">
        <div
          className="relative overflow-hidden rounded-[22px] md:rounded-[28px] p-6 md:px-14 md:py-16 flex flex-col items-center"
          style={{ background: "linear-gradient(160deg, #2E1010 0%, #1A0808 50%, #0F0404 100%)" }}
        >
          {/* Diagonal slash accents in dark bg */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div style={{
              position: "absolute", top: "-20%", left: "12%",
              width: "8px", height: "140%",
              background: "rgba(240,112,112,0.15)",
              transform: "rotate(-16deg)",
            }} />
            <div style={{
              position: "absolute", top: "-20%", left: "16%",
              width: "8px", height: "140%",
              background: "rgba(240,112,112,0.09)",
              transform: "rotate(-16deg)",
            }} />
          </div>

          <motion.div {...inView} variants={stagger} className="flex flex-col items-center z-10 relative w-full">
            <motion.p variants={fadeUp}
              className="text-[11px] font-bold tracking-[0.22em] uppercase mb-4"
              style={{ color: "rgba(240,112,112,0.6)" }}>
              Why tearsize
            </motion.p>
            <motion.h2 variants={fadeUp}
              className="font-display text-center text-white leading-[1.1] mb-1"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
              What makes
            </motion.h2>
            <motion.h2 variants={fadeUp}
              className="font-display italic text-center leading-[1.1] mb-8"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#F07070" }}>
              tearsize Special?
            </motion.h2>
          </motion.div>

          {/* Person image */}
          <div className="w-full max-w-[320px] md:max-w-[420px] relative mx-auto mb-4 md:mb-6 pointer-events-none"
            style={{
              height: "240px",
              WebkitMaskImage: "linear-gradient(to bottom, white 55%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, white 55%, transparent 100%)",
            }}>
            <Image src="/bento-campaign.png" alt="" fill className="object-cover object-top" sizes="420px" />
          </div>

          {/* Step cards */}
          <motion.div {...inView} variants={stagger}
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 z-10 relative">
            {HOW_IT_WORKS.map((card) => (
              <motion.div key={card.title} variants={fadeUp}
                className="rounded-[14px] p-5 flex flex-col gap-3"
                style={{
                  background: "rgba(240,112,112,0.07)",
                  border: "1px solid rgba(240,112,112,0.15)",
                  backdropFilter: "blur(8px)",
                }}>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "rgba(240,112,112,0.15)", color: "#F07070" }}>
                    {card.icon}
                  </span>
                  <span className="text-[10.5px] font-bold tracking-[0.18em] uppercase"
                    style={{ color: "rgba(240,112,112,0.5)" }}>
                    Reason {card.step}
                  </span>
                </div>
                <h3 className="font-display text-[1.05rem] text-white leading-snug">{card.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "I've tried everything for my weight. After 60 days on my tearsize plan, friends started asking what I changed. The difference was real — and fast.",
    treatment: "Weight Loss Guidance",
  },
  {
    name: "David L.",
    rating: 5,
    text: "The intake was seamless and my doctor was incredibly thorough. Four months in and my energy levels with NAD+ are completely transformed. Real results.",
    treatment: "NAD+ Therapy",
  },
  {
    name: "Michelle R.",
    rating: 5,
    text: "I was skeptical of peptides but GHK-CU changed everything. Fast, private, and genuinely effective. My skin feels incredible and the care team is always there.",
    treatment: "GHK-CU Peptide",
  },
  {
    name: "James T.",
    rating: 5,
    text: "The guidance program helped me feel like myself again. The doctor was knowledgeable, the treatments arrived faster than expected. Couldn't recommend it more.",
    treatment: "Weight Loss Guidance",
  },
];

function Testimonials() {
  return (
    <section className="w-full py-14 md:py-20" style={{ backgroundColor: "#FFF5F5" }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
        <motion.div {...inView} variants={stagger} className="flex flex-col gap-10">
          <motion.div variants={fadeUp}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-3"
                style={{ color: "#9A7878" }}>
                Patient stories
              </p>
              <h2 className="font-display text-[#1A0A0A] leading-tight"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                Real results, real people.
              </h2>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {[...Array(5)].map((_, i) => (
                <PiStarFill key={i} size={15} style={{ color: "#F07070" }} />
              ))}
              <span className="ml-1 text-[14px] font-semibold text-[#1A0A0A]">4.9</span>
              <span className="text-[13px] ml-1" style={{ color: "#9A7878" }}>· 8,000+ reviews</span>
            </div>
          </motion.div>

          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {REVIEWS.map((r) => (
              <motion.div key={r.name} variants={fadeUp}
                className="rounded-[16px] p-6 flex flex-col gap-4"
                style={{ background: "white", border: "1px solid #F5DADA" }}>
                <div className="flex items-center gap-0.5">
                  {[...Array(r.rating)].map((_, i) => (
                    <PiStarFill key={i} size={13} style={{ color: "#F07070" }} />
                  ))}
                </div>
                <p className="text-[14px] text-[#4A3333] leading-relaxed flex-1">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center justify-between mt-1 pt-4"
                  style={{ borderTop: "1px solid #F5DADA" }}>
                  <span className="text-[13px] font-semibold text-[#1A0A0A]">{r.name}</span>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                    style={{ background: "#FADADD", color: "#D94040" }}>
                    {r.treatment}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── PRESS ────────────────────────────────────────────────────────────────────
const PRESS = ["Healthline", "Vogue", "Men's Health", "Well+Good", "Forbes Health", "Medical News Today"];

function Press() {
  return (
    <section className="w-full py-10 md:py-12" style={{ backgroundColor: "white", borderBottom: "1px solid #F5DADA" }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
        <motion.p {...inView} variants={fadeIn}
          className="text-center text-[10.5px] font-bold tracking-[0.24em] uppercase mb-7"
          style={{ color: "#9A7878" }}>
          As featured in
        </motion.p>
        <motion.div {...inView} variants={stagger}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PRESS.map((name) => (
            <motion.span key={name} variants={fadeUp}
              className="font-display italic cursor-default select-none transition-colors duration-200"
              style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)", color: "#E8BFBF" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F07070")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#E8BFBF")}
            >
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
    <section className="w-full py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: "#1A0A0A" }}>
      {/* Diagonal decorations in dark bg */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div style={{
          position: "absolute", top: "-10%", left: "8%",
          width: "8px", height: "120%",
          background: "rgba(240,112,112,0.18)",
          transform: "rotate(-16deg)",
        }} />
        <div style={{
          position: "absolute", top: "-10%", left: "12%",
          width: "8px", height: "120%",
          background: "rgba(240,112,112,0.10)",
          transform: "rotate(-16deg)",
        }} />
        <div style={{
          position: "absolute", top: "10%", right: "8%",
          width: "90px", height: "90px",
          background: "rgba(240,112,112,0.08)",
          transform: "rotate(45deg)",
          borderRadius: "10px",
        }} />
        <div style={{
          position: "absolute", bottom: "15%", right: "14%",
          width: "55px", height: "55px",
          background: "rgba(240,112,112,0.06)",
          transform: "rotate(45deg)",
          borderRadius: "7px",
        }} />
      </div>

      <motion.div {...inView} variants={stagger}
        className="max-w-[640px] mx-auto px-4 text-center relative z-10">
        <motion.h2 variants={fadeUp}
          className="font-display text-white leading-[1.1] mb-4"
          style={{ fontSize: "clamp(1.9rem, 4vw, 2.75rem)" }}>
          Your transformation
          <br />
          <em className="not-italic" style={{ color: "#F07070" }}>
            starts with one step.
          </em>
        </motion.h2>
        <motion.p variants={fadeUp}
          className="text-[15px] leading-relaxed mb-8"
          style={{ color: "rgba(255,255,255,0.55)" }}>
          Complete a 5-minute intake and get matched with a licensed doctor
          within 24 hours. No clinic visit required.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
          <a
            href="/quiz"
            className="inline-flex items-center justify-center rounded-full text-[13.5px] font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200 min-h-[48px] px-7 gap-2"
            style={{ background: "#F07070", color: "white" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#D94040")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F07070")}
          >
            Start my program <PiArrowRight size={15} />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-full text-[13.5px] font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200 min-h-[48px] px-7 gap-2 text-white"
            style={{ border: "1.5px solid rgba(240,112,112,0.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(240,112,112,0.9)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(240,112,112,0.4)")}
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
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WaveDivider fromColor="#FFFFFF" toColor="#FADADD" />
        <TrustBar />
        <WaveDivider fromColor="#FADADD" toColor="#FFFFFF" />

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
          primaryCta={{ label: "Get started", href: "/quiz" }}
          secondaryCta={{ label: "Learn more", href: "/learn-more" }}
        />

        <BentoCampaign />

        <FeatureSection
          id="ghk-cu"
          imgSrc="/ghk.jpg"
          imgAlt="GHK-CU Peptide"
          heading={
            <>
              GHK-CU:
              <br />
              The Ultimate Peptide
            </>
          }
          bullets={[
            {
              icon: <PiDropHalfBottom size={20} />,
              text: "Boosts collagen firmness, speeds up wound healing, and enhances skin barrier.",
            },
            {
              icon: <PiCheckCircleFill size={20} />,
              text: "Improves skin texture, reduces fine lines & wrinkles, and fades hyperpigmentation.",
            },
            {
              icon: <PiSealCheckFill size={20} />,
              text: "Acts as a powerful antioxidant with strong anti-inflammatory effects, while supporting hair growth and cellular repair.",
            },
          ]}
          primaryCta={{ label: "Start my peptide plan", href: "/quiz" }}
          secondaryCta={{ label: "Learn more", href: "/learn-more" }}
          bg="#FFF5F5"
        />

        <Testimonials />
        <Press />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
