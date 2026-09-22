"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  TRANSFORMATION_ITEMS,
  TransformationItem,
} from "@/data/beforeAfter";
import {
  PiArrowRight,
  PiArrowLeft,
  PiX,
  PiSealCheckFill,
  PiStarFill,
  PiCheckCircleFill,
  PiStethoscope,
  PiMagnifyingGlassPlus,
  PiShieldCheckFill,
  PiSparkleFill,
  PiInfo,
  PiClock,
} from "react-icons/pi";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function BeforeAfterClient() {
  const [selectedItem, setSelectedItem] = useState<TransformationItem | null>(null);

  // Modal navigation
  const currentIndex = selectedItem
    ? TRANSFORMATION_ITEMS.findIndex((item) => item.id === selectedItem.id)
    : -1;

  const handleNext = useCallback(() => {
    if (currentIndex === -1) return;
    const nextIdx = (currentIndex + 1) % TRANSFORMATION_ITEMS.length;
    setSelectedItem(TRANSFORMATION_ITEMS[nextIdx]);
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex === -1) return;
    const prevIdx = (currentIndex - 1 + TRANSFORMATION_ITEMS.length) % TRANSFORMATION_ITEMS.length;
    setSelectedItem(TRANSFORMATION_ITEMS[prevIdx]);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === "Escape") setSelectedItem(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem, handleNext, handlePrev]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  // Touch swipe support for mobile lightbox
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swiped left -> next
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F0F0F]">
      <Header splashDone={true} />

      <main className="flex-1">
        {/* ─── Hero Section ─── */}
        <section className="relative overflow-hidden pt-10 pb-12 md:pt-16 md:pb-20 bg-gradient-to-b from-[#FFF5F6] via-white to-white border-b border-[#FFE8EA]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="flex flex-col items-center text-center max-w-3xl mx-auto"
            >
              {/* Trust Badge */}
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE8EA] text-[#FF5A5F] text-[12px] md:text-[13px] font-semibold tracking-wide mb-6"
              >
                <PiSealCheckFill size={16} className="text-[#FF5A5F]" />
                <span>Verified Patient Transformations</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeUp}
                className="font-display font-black tracking-tight text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] leading-[1.08] text-[#0F0F0F] mb-6"
              >
                Real Journeys.{" "}
                <span className="text-[#FF5A5F] italic font-serif font-medium">
                  Remarkable Results.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="text-[15px] sm:text-[17px] text-[#4A3333] leading-relaxed mb-10 max-w-2xl"
              >
                Every transformation begins with an honest goal and the right medical guidance.
                Explore genuine before-and-after milestones achieved with our doctor-supervised
                GLP-1 and wellness protocols.
              </motion.p>

              {/* Stats Highlights */}
              <motion.div
                variants={fadeUp}
                className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-2"
              >
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#FFE8EA] shadow-xs flex flex-col items-center">
                  <div className="flex items-center gap-1 text-[#FF5A5F] text-[1.5rem] sm:text-[1.8rem] font-bold font-display">
                    15–20%
                  </div>
                  <span className="text-[12px] sm:text-[13px] text-[#6E6E6E] font-medium text-center">
                    Avg. Weight Reduction
                  </span>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#FFE8EA] shadow-xs flex flex-col items-center">
                  <div className="flex items-center gap-1 text-[#FF5A5F] text-[1.5rem] sm:text-[1.8rem] font-bold font-display">
                    100%
                  </div>
                  <span className="text-[12px] sm:text-[13px] text-[#6E6E6E] font-medium text-center">
                    Doctor Supervised
                  </span>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#FFE8EA] shadow-xs flex flex-col items-center">
                  <div className="flex items-center gap-1 text-[#FF5A5F] text-[1.5rem] sm:text-[1.8rem] font-bold font-display">
                    4.9 <PiStarFill size={18} className="text-[#FF5A5F] ml-0.5" />
                  </div>
                  <span className="text-[12px] sm:text-[13px] text-[#6E6E6E] font-medium text-center">
                    Patient Satisfaction
                  </span>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#FFE8EA] shadow-xs flex flex-col items-center">
                  <div className="flex items-center gap-1 text-[#FF5A5F] text-[1.5rem] sm:text-[1.8rem] font-bold font-display">
                    1:1 Care
                  </div>
                  <span className="text-[12px] sm:text-[13px] text-[#6E6E6E] font-medium text-center">
                    Ongoing Physician Check-ins
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── Gallery Section ─── */}
        <section id="gallery" className="py-10 md:py-16 bg-[#FFFBFB]/40">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">

            {/* Transformations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {TRANSFORMATION_ITEMS.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-[#FFE8EA] shadow-xs hover:shadow-xl hover:shadow-[#FF5A5F]/10 hover:border-[#FF5A5F]/40 transition-all duration-300 flex flex-col cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  {/* Image Container with 4:5 vertical aspect ratio */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FFF5F6]">
                    <picture>
                      <source srcSet={item.imageWebp} type="image/webp" />
                      <Image
                        src={item.imageWebp}
                        alt={item.alt}
                        fill
                        priority={index < 3}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </picture>

                    {/* Tag badge on top */}
                    <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#FF5A5F] text-[11.5px] font-bold shadow-xs border border-[#FFE8EA]">
                        <PiSealCheckFill size={13} className="text-[#FF5A5F]" />
                        {item.tag}
                      </span>
                      {item.duration && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium">
                          <PiClock size={12} />
                          {item.duration}
                        </span>
                      )}
                    </div>

                    {/* Hover enlarge overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#FF5A5F] text-[13px] font-bold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <PiMagnifyingGlassPlus size={16} />
                        View Full Story
                      </span>
                    </div>
                  </div>

                  {/* Card Info Footer */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white border-t border-[#FFE8EA]/60">
                    <div>
                      <span className="text-[11px] font-bold tracking-wider uppercase text-[#8A8A8A]">
                        {item.program}
                      </span>
                      <p className="text-[13.5px] text-[#2B2B2B] font-medium leading-snug mt-1 line-clamp-2">
                        {item.patientHighlight}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#FFE8EA]/50 text-[12.5px] text-[#6E6E6E]">
                      <span className="flex items-center gap-1 text-[#FF5A5F] font-semibold">
                        <PiCheckCircleFill size={14} />
                        Doctor-Prescribed
                      </span>
                      <span className="group-hover:text-[#FF5A5F] transition-colors font-medium flex items-center gap-1">
                        Tap to expand <PiArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── How Lasting Results Are Achieved ─── */}
        <section className="py-14 md:py-20 bg-white border-t border-[#FFE8EA]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#6E6E6E] block mb-2">
                The by tearsize Standard
              </span>
              <h2 className="font-display text-[1.85rem] sm:text-[2.5rem] font-black text-[#0F0F0F] leading-tight">
                How our patients achieve lasting change
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#FFF8F7] border border-[#FFE8EA] flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#FFE8EA] flex items-center justify-center text-[#FF5A5F] shadow-xs">
                  <PiStethoscope size={24} />
                </div>
                <h3 className="font-display text-[1.25rem] font-bold text-[#0F0F0F]">
                  1. Comprehensive Physician Review
                </h3>
                <p className="text-[14px] text-[#4A3333] leading-relaxed">
                  Every journey starts with a deep medical evaluation by licensed healthcare providers. We check your health background, BMI, metabolic indicators, and goals.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-[#FFF8F7] border border-[#FFE8EA] flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#FFE8EA] flex items-center justify-center text-[#FF5A5F] shadow-xs">
                  <PiSparkleFill size={24} />
                </div>
                <h3 className="font-display text-[1.25rem] font-bold text-[#0F0F0F]">
                  2. Targeted, Calibrated Protocols
                </h3>
                <p className="text-[14px] text-[#4A3333] leading-relaxed">
                  We don’t believe in one-size-fits-all diets. Treatments are custom-formulated and dosed precisely to eliminate appetite noise, balance metabolism, and burn fat.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-[#FFF8F7] border border-[#FFE8EA] flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#FFE8EA] flex items-center justify-center text-[#FF5A5F] shadow-xs">
                  <PiShieldCheckFill size={24} />
                </div>
                <h3 className="font-display text-[1.25rem] font-bold text-[#0F0F0F]">
                  3. Dedicated Medical Follow-Through
                </h3>
                <p className="text-[14px] text-[#4A3333] leading-relaxed">
                  Your dedicated clinical team stays with you throughout your program with continuous dosage adjustments, proactive side-effect prevention, and sustained habit coaching.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Medical Disclaimer ─── */}
        <section className="py-8 bg-[#FFFBFB] border-t border-[#FFE8EA]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#FFE8EA] flex items-start gap-3.5 text-[#6E6E6E]">
              <PiInfo size={22} className="text-[#FF5A5F] shrink-0 mt-0.5" />
              <div className="text-[12px] sm:text-[13px] leading-relaxed">
                <strong className="text-[#2B2B2B] font-semibold">Medical & Results Disclaimer: </strong>
                The transformations and results featured on this page reflect authentic patient journeys undergoing customized doctor-prescribed programs through by tearsize. Individual outcomes, rate of weight loss, and timelines will vary based on adherence, metabolic health, nutrition, baseline BMI, and medical history. Prescription medications (such as compounded GLP-1 receptor agonists) are prescribed at the sole discretion of a licensed physician following clinical consultation.
              </div>
            </div>
          </div>
        </section>

        {/* ─── Bottom CTA Banner ─── */}
        <section className="w-full py-16 md:py-24 relative overflow-hidden bg-[#0F0F0F] text-white">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute top-[10%] right-[8%] w-[100px] h-[100px] bg-[#FF5A5F]/10 rotate-45 rounded-[12px]" />
            <div className="absolute bottom-[15%] left-[6%] w-[70px] h-[70px] bg-[#FF5A5F]/5 rotate-45 rounded-[8px]" />
          </div>

          <div className="max-w-[700px] mx-auto px-4 text-center relative z-10">
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#FF8FA3] block mb-3">
              Begin Your Own Transformation
            </span>
            <h2 className="font-display text-[2rem] sm:text-[2.75rem] font-bold leading-[1.1] mb-5">
              Ready to write your own <br />
              <em className="not-italic text-[#FF5A5F]">success story?</em>
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-relaxed mb-8 text-white/65 max-w-lg mx-auto">
              Take our complimentary 5-minute health assessment today and consult with a licensed physician to find your customized protocol.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/quiz"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full text-[14px] font-semibold transition-colors duration-200 min-h-[48px] px-8 gap-2 bg-[#FF5A5F] hover:bg-[#E04A4F] text-white shadow-lg shadow-[#FF5A5F]/25"
              >
                Get a Free Assessment <PiArrowRight size={16} />
              </Link>
              <Link
                href="/learn-more"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full text-[14px] font-semibold transition-colors duration-200 min-h-[48px] px-7 gap-2 text-white bg-white/10 hover:bg-white/20 border border-white/20"
              >
                How It Works
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ─── Fullscreen Lightbox Modal ─── */}
      <AnimatePresence>
        {selectedItem && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Transformation Details"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedItem(null)}
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              className="relative w-full max-w-4xl max-h-[95vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer min-w-[44px] min-h-[44px]"
              >
                <PiX size={20} />
              </button>

              {/* Prev / Next Buttons (Desktop & Tablet) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous transformation"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#0F0F0F] shadow-lg border border-[#FFE8EA] flex items-center justify-center transition-all cursor-pointer min-w-[44px] min-h-[44px] hidden sm:flex"
              >
                <PiArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next transformation"
                className="absolute right-3 md:right-[380px] top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#0F0F0F] shadow-lg border border-[#FFE8EA] flex items-center justify-center transition-all cursor-pointer min-w-[44px] min-h-[44px] hidden sm:flex"
              >
                <PiArrowRight size={18} />
              </button>

              {/* Image Side (Left) */}
              <div className="relative md:w-[60%] w-full bg-[#FFF5F6] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
                <div className="relative w-full max-w-[440px] aspect-[4/5] rounded-2xl overflow-hidden shadow-sm border border-[#FFE8EA]">
                  <picture>
                    <source srcSet={selectedItem.imageWebp} type="image/webp" />
                    <Image
                      src={selectedItem.imageWebp}
                      alt={selectedItem.alt}
                      fill
                      priority
                      sizes="(max-width: 768px) 90vw, 500px"
                      className="object-contain object-center"
                    />
                  </picture>
                </div>
              </div>

              {/* Story / Details Side (Right) */}
              <div className="md:w-[40%] w-full p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white border-t md:border-t-0 md:border-l border-[#FFE8EA]">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE8EA] text-[#FF5A5F] text-[12px] font-bold">
                      <PiSealCheckFill size={14} />
                      Verified Patient
                    </span>
                    <span className="text-[12px] text-[#8A8A8A] font-medium">
                      {currentIndex + 1} of {TRANSFORMATION_ITEMS.length}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#8A8A8A]">
                      Prescribed Program
                    </span>
                    <h3 className="font-display text-[1.4rem] font-bold text-[#0F0F0F] leading-tight mt-0.5">
                      {selectedItem.program}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="px-3 py-1 rounded-lg bg-[#FFF5F6] text-[#FF5A5F] text-[12px] font-semibold border border-[#FFE8EA]">
                      {selectedItem.tag}
                    </span>
                    {selectedItem.duration && (
                      <span className="px-3 py-1 rounded-lg bg-[#F5F5F5] text-[#2B2B2B] text-[12px] font-medium flex items-center gap-1">
                        <PiClock size={12} />
                        {selectedItem.duration}
                      </span>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#FFE8EA]">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#8A8A8A] block mb-1">
                      Patient Clinical Milestone
                    </span>
                    <p className="text-[14px] text-[#4A3333] leading-relaxed">
                      {selectedItem.patientHighlight}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FFF8F7] border border-[#FFE8EA] text-[12px] text-[#6E6E6E] flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-[#FF5A5F] font-semibold">
                      <PiShieldCheckFill size={15} />
                      Doctor Monitored Protocol
                    </div>
                    <span>Results achieved through personalized titration and physician oversight.</span>
                  </div>
                </div>

                {/* Bottom Modal Actions */}
                <div className="pt-6 mt-6 border-t border-[#FFE8EA] flex flex-col gap-3">
                  <Link
                    href="/quiz"
                    className="w-full inline-flex items-center justify-center rounded-full text-[14px] font-semibold min-h-[46px] px-6 gap-2 bg-[#FF5A5F] hover:bg-[#E04A4F] text-white transition-colors shadow-md shadow-[#FF5A5F]/20 text-center"
                  >
                    Start Free Assessment <PiArrowRight size={15} />
                  </Link>

                  {/* Mobile Next/Prev buttons */}
                  <div className="flex items-center justify-between sm:hidden pt-1">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="flex items-center gap-1.5 text-[13px] font-semibold text-[#2B2B2B] p-2"
                    >
                      <PiArrowLeft size={16} /> Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-1.5 text-[13px] font-semibold text-[#FF5A5F] p-2"
                    >
                      Next <PiArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
