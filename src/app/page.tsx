"use client";

import React from "react";
import Link from "next/link";
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
  PiChatCircleText,
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
const HERO_CARDS = [
  {
    id: "metabolic",
    img: "/card-metabolic.png",
    lines: ["Metabolic", "Health"],
    sub: "for lasting weight loss",
    href: "#metabolic",
    wide: false,
  },
  {
    id: "skin",
    img: "/card-skin.png",
    lines: ["Skin", "Renewal"],
    sub: "for radiant, healthy skin",
    href: "#skin",
    wide: false,
  },
  {
    id: "vitality",
    img: "/card-vitality.png",
    lines: ["Men's", "Vitality"],
    sub: "for peak performance",
    href: "#vitality",
    wide: true,
  },
];

function Hero() {
  return (
    <section
      className="w-full pb-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, #E6D8C320 0%, transparent 70%), linear-gradient(180deg, #FDFAF6 0%, #FFFFFF 60%)",
        paddingTop: "clamp(2rem, 5vw, 3.5rem)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">

        {/* ── Giant heading ── */}
        <motion.div {...inView} variants={stagger}>
          <motion.h1
            variants={fadeUp}
            className="font-display tracking-tight text-[#0F1210] leading-[1.02]"
            style={{ fontSize: "clamp(3.2rem, 7.5vw, 6.5rem)" }}
          >
            Expert care,
            <br />
            <em className="not-italic" style={{ color: "#C2A68C" }}>
              wherever
            </em>{" "}
            life
            <br />
            takes&nbsp;you.
          </motion.h1>

          {/* ── CTA + trust chips ── */}
          <motion.div
            variants={fadeUp}
            className="mt-8 md:mt-10 flex flex-wrap items-center gap-3"
          >
            {/* Primary CTA */}
            <a
              href="#metabolic"
              className="inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap cursor-pointer transition-all duration-200 gap-2 shrink-0"
              style={{
                background: "#0F1210",
                color: "#fff",
                fontSize: "14px",
                minHeight: "52px",
                padding: "0 28px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#2A1A0A")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#0F1210")
              }
            >
              Get started <PiArrowRight size={16} />
            </a>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: <PiUsers size={13} />,           label: "50,000+ patients"  },
                { icon: <PiTruck size={13} />,            label: "Free delivery"     },
                { icon: <PiShieldCheckFill size={13} />,  label: "100% discreet"    },
              ].map(({ icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-medium rounded-full px-3.5 py-2 whitespace-nowrap"
                  style={{
                    background: "#E6D8C3",
                    color: "#4B4843",
                    border: "1px solid #E6D8C3",
                  }}
                >
                  <span className="text-[#C2A68C] shrink-0">{icon}</span>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Card grid — taller, bolder ── */}
        <motion.div
          {...inView}
          variants={stagger}
          className="mt-10 md:mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
        >
          {HERO_CARDS.map((card) => (
            <motion.a
              key={card.id}
              href={card.href}
              variants={fadeUp}
              className={[
                "group relative overflow-hidden rounded-[20px]",
                "flex flex-col justify-between",
                "p-6 md:p-8",
                card.wide ? "md:col-span-2 lg:col-span-1" : "",
              ].join(" ")}
              style={{ minHeight: "clamp(340px, 42vw, 500px)" }}
            >
              {/* Background image */}
              <Image
                src={card.img}
                alt={card.lines.join(" ")}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={card.id === "metabolic"}
              />
              {/* Deep vignette overlay */}
              <div
                className="absolute inset-0 z-[1]"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.55) 100%)",
                }}
              />

              {/* Title — top */}
              <div className="relative z-10 flex flex-col gap-0.5">
                {card.lines.map((line, i) => (
                  <h2
                    key={i}
                    className="font-display text-white leading-[1.08]"
                    style={{ fontSize: "clamp(1.55rem, 2.8vw, 2rem)" }}
                  >
                    {line}
                  </h2>
                ))}
                <p className="text-[13px] text-white/70 mt-1 font-medium">
                  {card.sub}
                </p>
              </div>

              {/* CTA — mobile always visible */}
              <div className="md:hidden relative z-10 flex items-center gap-2.5 mt-auto pt-4">
                <span className="text-[11.5px] font-bold tracking-[0.15em] uppercase text-white">
                  Explore Program
                </span>
                <CircleArrowIcon />
              </div>

              {/* CTA — desktop hover reveal */}
              <div className="hidden md:flex absolute bottom-8 left-8 right-8 z-10 items-center gap-3 transition-all duration-250 ease-out opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0">
                <span className="text-[11.5px] font-bold tracking-[0.15em] uppercase text-white">
                  Explore Program
                </span>
                <CircleArrowIcon />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CircleArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m12 16 4-4-4-4" />
      <path d="M8 12h8" />
    </svg>
  );
}

// ─── WAVE DIVIDER (reusable) ─────────────────────────────────────────────────
// fromColor = bg of the section above; toColor = bg of the section below.
function WaveDivider({ fromColor, toColor }: { fromColor: string; toColor: string }) {
  return (
    <div style={{ backgroundColor: fromColor, lineHeight: 0, display: "block" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ display: "block", width: "100%", height: "72px" }}
      >
        {/* back wave — lighter, offset for depth */}
        <path
          d="M0,28 C320,72 800,0 1120,44 C1240,60 1360,36 1440,28 L1440,72 L0,72 Z"
          fill={toColor}
          opacity="0.45"
        />
        {/* front wave — solid */}
        <path
          d="M0,52 C280,8 640,72 960,40 C1120,24 1280,56 1440,44 L1440,72 L0,72 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}

// ─── TRUST BAR (infinite marquee) ────────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: <PiUsers size={17} />,           text: "50,000+ members"           },
  { icon: <PiCurrencyDollar size={17} />,  text: "Transparent pricing"       },
  { icon: <PiHeartStraight size={17} />,   text: "Personalized care"         },
  { icon: <PiDesktop size={17} />,         text: "100% entirely online"      },
  { icon: <PiShieldCheckFill size={17} />, text: "FDA-registered facilities" },
  { icon: <PiTruck size={17} />,           text: "Free & discreet delivery"  },
];

/** Dot bullet used as a visual separator between marquee items */
function MarqueeDot() {
  return (
    <span
      aria-hidden="true"
      className="shrink-0 w-1 h-1 rounded-full"
      style={{ background: "#C2A68C", margin: "0 4px" }}
    />
  );
}

function TrustBar() {
  // Duplicate so the seam is invisible when the first copy exits left
  const doubled = [...TRUST_ITEMS, ...TRUST_ITEMS];
  return (
    <div
      className="w-full overflow-hidden"
      style={{ backgroundColor: "#E6D8C3" }}
    >
      <div className="marquee-track" aria-label="Trust highlights">
        {doubled.map((item, i) => (
          <React.Fragment key={i}>
            <div className="flex shrink-0 items-center gap-2 px-5 py-3.5 md:py-4">
              <span className="text-[#6B4E1A] shrink-0">{item.icon}</span>
              <span className="text-[12.5px] md:text-[13px] whitespace-nowrap text-[#0F1210] font-medium">
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
interface Bullet {
  icon: React.ReactNode;
  text: string;
}
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
    <section id={id} className="w-full py-14 md:py-20" style={{ background: bg }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
        <div
          className={[
            "flex flex-col gap-10 lg:gap-16 items-center",
            imgRight ? "lg:flex-row" : "lg:flex-row-reverse",
          ].join(" ")}
        >
          {/* Image */}
          <motion.div
            {...inView}
            variants={fadeIn}
            className="relative w-full lg:flex-1 rounded-[18px] overflow-hidden self-stretch"
            style={{ minHeight: "300px" }}
          >
            <Image
              src={imgSrc}
              alt={imgAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            {...inView}
            variants={stagger}
            className="flex flex-col gap-7 w-full lg:flex-1 max-w-[500px]"
          >
            <motion.div variants={fadeUp} className="font-display text-[#0F1210] leading-[1.1]"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
              {heading}
            </motion.div>

            <motion.ul variants={stagger} className="flex flex-col gap-3.5 list-none p-0 m-0">
              {bullets.map((b, i) => (
                <motion.li key={i} variants={fadeUp} className="flex items-start gap-3.5">
                  <span className="shrink-0 text-[#4B4843] mt-0.5">{b.icon}</span>
                  <span className="text-[15px] text-[#4B4843] leading-relaxed">{b.text}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-1">
              <a
                href={primaryCta.href}
                className="inline-flex items-center justify-center rounded-full text-[13.5px] font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200 bg-[#0F1210] text-white hover:bg-[#333] min-h-[48px] px-6 gap-2"
              >
                {primaryCta.label}
              </a>
              <a
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full text-[13.5px] font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200 bg-transparent text-[#0F1210] border border-[#0F1210] hover:bg-[#0F1210] hover:text-white min-h-[48px] px-6 gap-2"
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
    icon: <PiClipboardText size={20} />,
    step: "01",
    title: "Complete your intake",
    desc:  "Answer a short health questionnaire so our licensed doctors can understand your goals and medical history.",
  },
  {
    icon: <PiUserCircleCheck size={20} />,
    step: "02",
    title: "Doctor review",
    desc:  "A licensed physician reviews your profile and designs a personalized treatment plan within 24 hours.",
  },
  {
    icon: <PiPackage size={20} />,
    step: "03",
    title: "Your plan ships free",
    desc:  "Prescription-grade medications are compounded and arrive discreetly at your door — no pharmacy trip needed.",
  },
  {
    icon: <PiHandHeart size={20} />,
    step: "04",
    title: "Ongoing support",
    desc:  "Message your care team anytime, track your progress, and adjust your plan as your health evolves.",
  },
];

function BentoCampaign() {
  return (
    <section id="how-it-works" className="w-full py-3 md:py-4">
      <div className="max-w-[1280px] mx-auto px-2 md:px-4">
        <div
          className="relative overflow-hidden rounded-[22px] md:rounded-[28px] p-6 md:px-14 md:py-16 flex flex-col items-center"
          style={{
            background:
              "linear-gradient(160deg, #2A1A0A 0%, #1A1008 50%, #0F0804 100%)",
          }}
        >
          {/* Heading */}
          <motion.div
            {...inView}
            variants={stagger}
            className="flex flex-col items-center z-10 relative w-full"
          >
            <motion.p
              variants={fadeUp}
              className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/40 mb-4"
            >
              How it works
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-center text-white leading-[1.1] mb-1"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              Reach your goals
            </motion.h2>
            <motion.h2
              variants={fadeUp}
              className="font-display italic text-center leading-[1.1] mb-8"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                color: "#FAE3AE",
              }}
            >
              with &amp;health
            </motion.h2>
          </motion.div>

          {/* Person image — fades to transparent at bottom */}
          <div
            className="w-full max-w-[320px] md:max-w-[420px] relative mx-auto mb-4 md:mb-6 pointer-events-none"
            style={{
              height: "240px",
              WebkitMaskImage:
                "linear-gradient(to bottom, white 55%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, white 55%, transparent 100%)",
            }}
          >
            <Image
              src="/bento-campaign.png"
              alt=""
              fill
              className="object-cover object-top"
              sizes="420px"
            />
          </div>

          {/* How it works cards */}
          <motion.div
            {...inView}
            variants={stagger}
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 z-10 relative"
          >
            {HOW_IT_WORKS.map((card) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                className="rounded-[14px] p-5 flex flex-col gap-3"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "rgba(255,255,255,0.1)", color: "#FAE3AE" }}
                  >
                    {card.icon}
                  </span>
                  <span className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-white/40">
                    Step {card.step}
                  </span>
                </div>
                <h3 className="font-display text-[1.05rem] text-white leading-snug">
                  {card.title}
                </h3>
                <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {card.desc}
                </p>
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
    text: "I've tried everything for my skin. After 60 days on my &health plan, friends started asking what I changed. The difference was real — and fast.",
    treatment: "Skin Renewal",
  },
  {
    name: "David L.",
    rating: 5,
    text: "The intake was seamless and my doctor was incredibly thorough. Four months in and my metabolic health is completely transformed. Real results, no gimmicks.",
    treatment: "Metabolic Health",
  },
  {
    name: "Michelle R.",
    rating: 5,
    text: "I was skeptical of telehealth but this changed everything. Fast, private, genuinely effective. The care team is always just a message away — I never feel alone in it.",
    treatment: "Skin Renewal",
  },
  {
    name: "James T.",
    rating: 5,
    text: "The vitality program helped me feel like myself again. The doctor was knowledgeable, the medications arrived faster than expected. Couldn't recommend it more.",
    treatment: "Men's Vitality",
  },
];

function Testimonials() {
  return (
    <section className="w-full py-14 md:py-20" style={{ backgroundColor: "#FDFAF6" }}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
        <motion.div {...inView} variants={stagger} className="flex flex-col gap-10">

          {/* Header */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div>
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#8A8782] mb-3">
                Patient stories
              </p>
              <h2
                className="font-display text-[#0F1210] leading-tight"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                Real results, real people.
              </h2>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {[...Array(5)].map((_, i) => (
                <PiStarFill key={i} className="text-[#C2A68C]" size={15} />
              ))}
              <span className="ml-1 text-[14px] font-semibold text-[#0F1210]">4.9</span>
              <span className="text-[13px] text-[#8A8782] ml-1">· 8,000+ reviews</span>
            </div>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {REVIEWS.map((r) => (
              <motion.div
                key={r.name}
                variants={fadeUp}
                className="rounded-[16px] p-6 flex flex-col gap-4 bg-[#F5EFE6]"
                style={{ border: "1px solid #E6D8C3" }}
              >
                <div className="flex items-center gap-0.5">
                  {[...Array(r.rating)].map((_, i) => (
                    <PiStarFill key={i} className="text-[#C2A68C]" size={13} />
                  ))}
                </div>
                <p className="text-[14px] text-[#4B4843] leading-relaxed flex-1">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div
                  className="flex items-center justify-between mt-1 pt-4"
                  style={{ borderTop: "1px solid #E6D8C3" }}
                >
                  <span className="text-[13px] font-semibold text-[#0F1210]">
                    {r.name}
                  </span>
                  <span
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                    style={{ background: "#E6D8C3", color: "#6B4E1A" }}
                  >
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
const PRESS = [
  "Healthline", "Vogue", "Men's Health", "Well+Good", "Forbes Health", "Medical News Today",
];

function Press() {
  return (
    <section
      className="w-full bg-[#F5EFE6] py-10 md:py-12"
      style={{ borderBottom: "1px solid #E6D8C3" }}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
        <motion.p
          {...inView}
          variants={fadeIn}
          className="text-center text-[10.5px] font-bold tracking-[0.24em] uppercase text-[#8A8782] mb-7"
        >
          As featured in
        </motion.p>
        <motion.div
          {...inView}
          variants={stagger}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {PRESS.map((name) => (
            <motion.span
              key={name}
              variants={fadeUp}
              className="font-display italic cursor-default select-none transition-colors duration-200"
              style={{
                fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
                color: "#C8C0B4",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#8A8782")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#C8C0B4")}
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
    <section className="w-full py-16 md:py-24" style={{ backgroundColor: "#0F1210" }}>
      <motion.div
        {...inView}
        variants={stagger}
        className="max-w-[640px] mx-auto px-4 text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="font-display text-white leading-[1.1] mb-4"
          style={{ fontSize: "clamp(1.9rem, 4vw, 2.75rem)" }}
        >
          Your health journey
          <br />
          <em className="not-italic" style={{ color: "#FAE3AE" }}>
            starts with one step.
          </em>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-[15px] leading-relaxed mb-8"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Complete a 5-minute intake and get matched with a licensed doctor
          within 24 hours. No clinic visit required.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap gap-3 justify-center"
        >
          <a
            href="#metabolic"
            className="inline-flex items-center justify-center rounded-full text-[13.5px] font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200 bg-[#F5EFE6] text-[#0F1210] hover:bg-[#F5EFE6] min-h-[48px] px-7 gap-2"
          >
            Get started <PiArrowRight size={15} />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center rounded-full text-[13.5px] font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200 bg-transparent text-white min-h-[48px] px-7 gap-2"
            style={{ border: "1.5px solid rgba(255,255,255,0.3)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")}
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
        <WaveDivider fromColor="#F5EFE6" toColor="#E6D8C3" />
        <TrustBar />
        <WaveDivider fromColor="#E6D8C3" toColor="#F5EFE6" />

        <FeatureSection
          id="metabolic"
          imgSrc="/feature-doctor.png"
          imgAlt="Doctor conducting a telehealth consultation"
          imgRight
          heading={
            <>
              Manage your weight
              <br />
              with a plan made for&nbsp;you.
            </>
          }
          bullets={[
            {
              icon: <PiStethoscope size={20} />,
              text: "Personalized doctor-approved plans based on your metabolic profile and lifestyle",
            },
            {
              icon: <PiPill size={20} />,
              text: "GLP-1 medications including semaglutide and tirzepatide, compounded specifically for you",
            },
            {
              icon: <PiShield size={20} />,
              text: "Formulated in FDA-registered facilities and shipped free, straight to your door",
            },
          ]}
          primaryCta={{ label: "Get started", href: "#" }}
          secondaryCta={{ label: "See if you're eligible", href: "#" }}
        />

        <BentoCampaign />

        <FeatureSection
          id="skin"
          imgSrc="/card-skin.png"
          imgAlt="Person applying prescription skincare"
          heading={
            <>
              Prescription skincare,
              <br />
              personalized to your skin.
            </>
          }
          bullets={[
            {
              icon: <PiDropHalfBottom size={20} />,
              text: "Custom tretinoin, niacinamide, and active formulas prescribed by licensed dermatologists",
            },
            {
              icon: <PiCheckCircleFill size={20} />,
              text: "Targets acne, hyperpigmentation, fine lines, and texture — all in a single tailored plan",
            },
            {
              icon: <PiSealCheckFill size={20} />,
              text: "Serums blended for your exact skin type and concerns, delivered monthly",
            },
          ]}
          primaryCta={{ label: "Start my skin plan", href: "#" }}
          secondaryCta={{ label: "Learn more", href: "#" }}
          bg="#FDFAF6"
        />

        <Testimonials />
        <Press />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
