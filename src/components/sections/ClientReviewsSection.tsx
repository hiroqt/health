"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  PiStarFill,
  PiArrowRight,
  PiX,
  PiCaretLeft,
  PiCaretRight,
  PiCheckCircleFill,
  PiShieldCheckFill,
  PiMagnifyingGlassPlus,
  PiChatsCircleFill,
  PiLightningFill,
  PiFireFill,
  PiHeartFill,
  PiDropFill,
} from "react-icons/pi";
import { CLIENT_REVIEWS, ClientReview, ReviewCategory } from "@/data/clientReviews";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const inView = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-40px" },
};

const CATEGORY_TABS: { id: ReviewCategory; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All Reviews (50)", icon: <PiCheckCircleFill className="text-accent" /> },
  { id: "weight", label: "Weight & Metabolism", icon: <PiFireFill className="text-amber-500" /> },
  { id: "energy", label: "Energy & Vitality", icon: <PiLightningFill className="text-yellow-500" /> },
  { id: "skin", label: "Skin & Anti-Aging", icon: <PiDropFill className="text-rose-400" /> },
  { id: "recovery", label: "Recovery & Sleep", icon: <PiHeartFill className="text-emerald-500" /> },
];

export function ClientReviewsSection() {
  const [activeCategory, setActiveCategory] = useState<ReviewCategory>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ClientReview | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const thumbnailRailRef = useRef<HTMLDivElement>(null);
  const modalRailRef = useRef<HTMLDivElement>(null);

  // Filter reviews by category
  const filteredReviews = CLIENT_REVIEWS.filter((r) => {
    return activeCategory === "all" || r.category === activeCategory;
  });

  const totalReviews = filteredReviews.length;
  const currentReview = filteredReviews[currentIndex % totalReviews] || filteredReviews[0] || CLIENT_REVIEWS[0];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  }, [totalReviews]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  }, [totalReviews]);

  // Slow, gentle auto-advance (6.5s interval) — automatically pauses when cursor is pointed/hovered
  useEffect(() => {
    if (isHovered || selectedReview) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      handleNext();
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, selectedReview, handleNext]);

  // Modal prev/next
  const handleModalNext = useCallback(() => {
    if (!selectedReview) return;
    const currentIdx = CLIENT_REVIEWS.findIndex((r) => r.id === selectedReview.id);
    const nextReview = CLIENT_REVIEWS[(currentIdx + 1) % CLIENT_REVIEWS.length];
    setSelectedReview(nextReview);
  }, [selectedReview]);

  const handleModalPrev = useCallback(() => {
    if (!selectedReview) return;
    const currentIdx = CLIENT_REVIEWS.findIndex((r) => r.id === selectedReview.id);
    const prevReview = CLIENT_REVIEWS[(currentIdx - 1 + CLIENT_REVIEWS.length) % CLIENT_REVIEWS.length];
    setSelectedReview(prevReview);
  }, [selectedReview]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedReview) {
        if (e.key === "Escape") setSelectedReview(null);
        if (e.key === "ArrowRight") handleModalNext();
        if (e.key === "ArrowLeft") handleModalPrev();
      } else {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedReview, handleNext, handlePrev, handleModalNext, handleModalPrev]);

  // Scroll active thumbnail into view inside its container ONLY (never affects window/page scroll)
  useEffect(() => {
    if (thumbnailRailRef.current) {
      const container = thumbnailRailRef.current;
      const activeBtn = container.querySelector(
        `[data-thumb-idx="${currentIndex}"]`
      ) as HTMLElement | null;
      if (activeBtn) {
        const targetScroll = activeBtn.offsetLeft - container.offsetWidth / 2 + activeBtn.offsetWidth / 2;
        container.scrollTo({ left: targetScroll, behavior: "smooth" });
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    if (modalRailRef.current && selectedReview) {
      const container = modalRailRef.current;
      const activeBtn = container.querySelector(
        `[data-modal-thumb="${selectedReview.id}"]`
      ) as HTMLElement | null;
      if (activeBtn) {
        const targetScroll = activeBtn.offsetLeft - container.offsetWidth / 2 + activeBtn.offsetWidth / 2;
        container.scrollTo({ left: targetScroll, behavior: "smooth" });
      }
    }
  }, [selectedReview]);

  // Touch swipe support
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent, isModal = false) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        if (isModal) handleModalNext();
        else handleNext();
      } else {
        if (isModal) handleModalPrev();
        else handlePrev();
      }
    }
    touchStartX.current = null;
  };

  // Helper to get card offset positions (-2, -1, 0, 1, 2)
  const getCardOffset = (idx: number) => {
    const diff = (idx - currentIndex + totalReviews) % totalReviews;
    if (diff === 0) return 0;
    if (diff === 1 || diff === -(totalReviews - 1)) return 1;
    if (diff === 2 || diff === -(totalReviews - 2)) return 2;
    if (diff === totalReviews - 1 || diff === -1) return -1;
    if (diff === totalReviews - 2 || diff === -2) return -2;
    return 99; // Offscreen
  };

  return (
    <section
      id="client-reviews"
      className="w-full py-12 md:py-16 bg-gradient-to-b from-bg via-surface to-bg relative overflow-hidden border-t border-b border-border/50"
    >
      {/* Ambient background soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[340px] bg-accent/5 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        {/* ─── HEADER & AUTHORITY BADGES ───────────────────────────────────── */}
        <motion.div {...inView} variants={stagger} className="flex flex-col items-center text-center max-w-2xl mx-auto mb-6 md:mb-8">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/25 mb-3 shadow-xs"
          >
            <PiCheckCircleFill className="text-accent text-[13px]" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent">
              Verified Client Experiences
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display text-ink leading-[1.15] text-[clamp(1.85rem,3.5vw,2.75rem)] mb-3"
          >
            Real results.{" "}
            <em className="italic text-accent font-normal block sm:inline">100% unedited conversations.</em>
          </motion.h2>

          {/* Trust rating badge bar */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-[12.5px] text-ink-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-border font-medium shadow-xs">
              <span className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <PiStarFill key={i} size={13} />
                ))}
              </span>
              <strong>5.0</strong> Rating
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-border font-medium shadow-xs">
              <PiChatsCircleFill className="text-accent text-[15px]" />
              <strong>50</strong> Documented Proofs
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-border font-medium shadow-xs">
              <PiShieldCheckFill className="text-accent text-[15px]" />
              Doctor Monitored
            </span>
          </motion.div>
        </motion.div>

        {/* ─── CATEGORY FILTER TABS ───────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full pb-2 mb-6 scrollbar-none">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id);
                setCurrentIndex(0);
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[12.5px] font-semibold transition-all duration-150 shrink-0 cursor-pointer ${
                activeCategory === tab.id
                  ? "bg-accent text-white shadow-xs ring-2 ring-accent/20"
                  : "bg-white border border-border text-ink-2 hover:border-accent/40 hover:text-ink hover:bg-surface-warm/40 shadow-xs"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ─── UNIQUE 3D PERSPECTIVE COVERFLOW STAGE ───────────────────────── */}
        <div
          className="relative w-full max-w-[960px] mx-auto h-[440px] sm:h-[480px] flex items-center justify-center overflow-hidden py-4 select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={(e) => onTouchEnd(e, false)}
        >
          {filteredReviews.map((review, idx) => {
            const offset = getCardOffset(idx);
            if (Math.abs(offset) > 2) return null; // Only render cards in the immediate deck view

            const isCenter = offset === 0;

            // Compute 3D transforms for physical deck sensation
            let transformClass = "";
            let zIndex = 10;
            let opacity = 0.3;
            let scale = 0.76;
            let translateX = "0%";
            let rotateY = 0;

            if (offset === 0) {
              zIndex = 30;
              opacity = 1;
              scale = 1;
              translateX = "0%";
              rotateY = 0;
            } else if (offset === -1) {
              zIndex = 20;
              opacity = 0.55;
              scale = 0.86;
              translateX = "-75%";
              rotateY = 14;
            } else if (offset === 1) {
              zIndex = 20;
              opacity = 0.55;
              scale = 0.86;
              translateX = "75%";
              rotateY = -14;
            } else if (offset === -2) {
              zIndex = 10;
              opacity = 0.2;
              scale = 0.72;
              translateX = "-135%";
              rotateY = 22;
            } else if (offset === 2) {
              zIndex = 10;
              opacity = 0.2;
              scale = 0.72;
              translateX = "135%";
              rotateY = -22;
            }

            return (
              <motion.div
                key={review.id}
                animate={{
                  x: translateX,
                  scale,
                  opacity,
                  rotateY,
                }}
                transition={{ duration: 0.65, ease }}
                style={{
                  zIndex,
                  perspective: "1000px",
                }}
                onClick={() => {
                  if (isCenter) {
                    setSelectedReview(review);
                  } else {
                    setCurrentIndex(idx);
                  }
                }}
                className={`absolute w-[250px] sm:w-[280px] md:w-[310px] aspect-[4/5] rounded-[22px] bg-white border cursor-pointer transition-shadow duration-300 flex flex-col overflow-hidden ${
                  isCenter
                    ? "border-accent/40 shadow-xl ring-1 ring-accent/20 hover:shadow-2xl hover:scale-[1.02]"
                    : "border-border/80 shadow-md hover:opacity-80"
                }`}
              >
                {/* Top card bar */}
                <div className="px-3.5 py-2 bg-surface border-b border-border/60 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-accent/10 text-accent font-bold text-[10.5px]">
                      #{review.id}
                    </span>
                    <span className="text-[10.5px] font-semibold text-ink-3 truncate max-w-[120px]">
                      {review.tag}
                    </span>
                  </div>
                  <div className="flex text-accent">
                    {[...Array(5)].map((_, starIdx) => (
                      <PiStarFill key={starIdx} size={10} />
                    ))}
                  </div>
                </div>

                {/* Screenshot view */}
                <div className="relative flex-1 w-full bg-surface-warm/20 overflow-hidden">
                  <Image
                    src={review.imageWebp}
                    alt={review.alt}
                    fill
                    sizes="(max-width: 768px) 280px, 310px"
                    className="object-contain p-2"
                    priority={isCenter}
                  />

                  {/* Zoom badge on center card hover */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                      <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-ink shadow-md flex items-center gap-1.5 text-[11.5px] font-semibold">
                        <PiMagnifyingGlassPlus size={14} className="text-accent" /> Tap to zoom full size
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom mini status */}
                <div className="px-3.5 py-1.5 bg-white border-t border-border/40 flex items-center justify-between text-[10.5px] text-ink-3 shrink-0">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <PiCheckCircleFill size={12} /> Verified Chat
                  </span>
                  <span className="text-accent font-medium">{isCenter ? "Click to expand" : "Click to view"}</span>
                </div>
              </motion.div>
            );
          })}

          {/* Floating Deck Navigation Buttons (Left & Right) */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 z-40 p-3 rounded-full bg-white/90 hover:bg-white text-ink border border-border hover:border-accent/40 shadow-md backdrop-blur-md transition-transform hover:scale-110 cursor-pointer"
            aria-label="Previous review"
          >
            <PiCaretLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 z-40 p-3 rounded-full bg-white/90 hover:bg-white text-ink border border-border hover:border-accent/40 shadow-md backdrop-blur-md transition-transform hover:scale-110 cursor-pointer"
            aria-label="Next review"
          >
            <PiCaretRight size={20} />
          </button>
        </div>

        {/* ─── DECK CONTROLS & THUMBNAIL SCRUBBER ──────────────────────────── */}
        <div
          className="max-w-[760px] mx-auto mt-4 flex flex-col items-center gap-3"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Status Indicator Bar */}
          <div className="flex items-center justify-between w-full px-3 text-[12px] text-ink-3">
            <span className="font-medium">
              Review <strong className="text-ink">#{currentReview.id}</strong> ({currentIndex + 1} of {totalReviews})
            </span>

            <span className="text-[11.5px] text-ink-3 flex items-center gap-1.5 font-medium">
              {isHovered ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-accent font-semibold">Paused on hover</span>
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Hover card to pause</span>
                </>
              )}
            </span>
          </div>

          {/* Interactive Miniature Thumbnail Scrubber Ribbon */}
          <div
            ref={thumbnailRailRef}
            className="w-full flex items-center gap-1.5 overflow-x-auto py-1.5 px-2 bg-surface/80 rounded-full border border-border/80 scrollbar-none shadow-xs"
          >
            {filteredReviews.map((review, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={review.id}
                  data-thumb-idx={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`shrink-0 transition-all duration-200 rounded-full cursor-pointer flex items-center justify-center ${
                    isActive
                      ? "bg-accent text-white px-3 py-1 text-[11.5px] font-bold shadow-xs scale-105"
                      : "bg-white/90 hover:bg-white text-ink-3 hover:text-ink px-2.5 py-1 text-[11px] font-medium border border-border/60"
                  }`}
                  aria-label={`Jump to review ${review.id}`}
                >
                  #{review.id}
                </button>
              );
            })}
          </div>

          {/* Consultation CTA button */}
          <div className="mt-4 flex justify-center">
            <a
              href="/learn-more"
              className="inline-flex items-center justify-center gap-2 py-3 px-7 rounded-full bg-accent hover:bg-accent-hover text-white text-[13.5px] font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              Start your personalized program <PiArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* ─── FULL-RESOLUTION LIGHTBOX MODAL ────────────────────────────────── */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedReview(null)}
            onTouchStart={onTouchStart}
            onTouchEnd={(e) => onTouchEnd(e, true)}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease }}
              className="relative max-w-xl w-full bg-[#141414] rounded-[24px] overflow-hidden border border-white/15 shadow-2xl flex flex-col max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-5 py-3 bg-black/60 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-accent/20 text-accent font-bold text-[11.5px]">
                    #{selectedReview.id}
                  </span>
                  <div className="flex text-accent">
                    {[...Array(5)].map((_, i) => (
                      <PiStarFill key={i} size={12} />
                    ))}
                  </div>
                  <span className="text-[12px] text-white/80 font-medium hidden sm:inline">
                    {selectedReview.tag}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11.5px] text-white/50">
                    {selectedReview.id} of {CLIENT_REVIEWS.length}
                  </span>
                  <button
                    onClick={() => setSelectedReview(null)}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <PiX size={17} />
                  </button>
                </div>
              </div>

              {/* Central Large Screenshot */}
              <div className="relative flex-1 overflow-hidden bg-black/90 flex items-center justify-center p-3 min-h-[340px] max-h-[62vh]">
                <div className="relative w-full h-full min-h-[320px] max-h-[60vh] flex items-center justify-center">
                  <Image
                    src={selectedReview.imageWebp}
                    alt={selectedReview.alt}
                    width={520}
                    height={650}
                    className="object-contain max-h-[58vh] w-auto h-auto rounded-xl mx-auto drop-shadow-2xl"
                    priority
                  />
                </div>

                {/* Prev / Next controls */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModalPrev();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110 shadow-lg cursor-pointer"
                  aria-label="Previous review"
                >
                  <PiCaretLeft size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModalNext();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110 shadow-lg cursor-pointer"
                  aria-label="Next review"
                >
                  <PiCaretRight size={20} />
                </button>
              </div>

              {/* Bottom Thumbnail Scrubber Rail */}
              <div className="p-2.5 bg-black/60 border-t border-white/10 shrink-0">
                <div
                  ref={modalRailRef}
                  className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/20"
                >
                  {CLIENT_REVIEWS.map((r) => (
                    <button
                      key={r.id}
                      data-modal-thumb={r.id}
                      onClick={() => setSelectedReview(r)}
                      className={`shrink-0 w-[42px] h-[52px] rounded-[7px] overflow-hidden border transition-all duration-150 relative cursor-pointer ${
                        selectedReview.id === r.id
                          ? "border-accent ring-2 ring-accent/40 scale-105 opacity-100"
                          : "border-white/15 opacity-40 hover:opacity-80"
                      }`}
                    >
                      <Image
                        src={r.imageWebp}
                        alt={`Thumb ${r.id}`}
                        fill
                        sizes="42px"
                        className="object-cover"
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[7.5px] text-white text-center font-semibold">
                        #{r.id}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
