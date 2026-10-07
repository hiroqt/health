"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  PiPackageFill,
  PiArrowRight,
  PiMagnifyingGlassPlus,
  PiX,
  PiArrowLeft,
} from "react-icons/pi";
import {
  PROOF_ORDER_ITEMS,
  ProofOrderItem,
} from "@/data/proofOfOrders";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const inView = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-50px" },
};

export function ProofOfOrdersCarousel() {
  // Use a curated set of order photos for the two marquee rows
  const row1 = React.useMemo(() => PROOF_ORDER_ITEMS.slice(0, 8), []);
  const row2 = React.useMemo(() => PROOF_ORDER_ITEMS.slice(8, 16), []);

  const row1Doubled = React.useMemo(() => [...row1, ...row1], [row1]);
  const row2Doubled = React.useMemo(() => [...row2, ...row2], [row2]);

  const allCarouselItems = React.useMemo(() => [...row1, ...row2], [row1, row2]);

  const [selectedItem, setSelectedItem] = useState<ProofOrderItem | null>(null);

  // Modal navigation
  const currentIndex = selectedItem
    ? allCarouselItems.findIndex((it) => it.id === selectedItem.id)
    : -1;

  const handleNext = useCallback(() => {
    if (currentIndex === -1) return;
    const nextIdx = (currentIndex + 1) % allCarouselItems.length;
    setSelectedItem(allCarouselItems[nextIdx]);
  }, [currentIndex, allCarouselItems]);

  const handlePrev = useCallback(() => {
    if (currentIndex === -1) return;
    const prevIdx = (currentIndex - 1 + allCarouselItems.length) % allCarouselItems.length;
    setSelectedItem(allCarouselItems[prevIdx]);
  }, [currentIndex, allCarouselItems]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!selectedItem) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedItem, handleNext, handlePrev]);

  // Swipe support for mobile lightbox
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  return (
    <section className="w-full py-14 md:py-20 bg-surface overflow-hidden border-t border-b border-[#FFE8EA]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
        <motion.div {...inView} variants={stagger} className="flex flex-col gap-8 md:gap-12">
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div>
              <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-3 text-ink-3">
                Proof of orders
              </p>
              <h2 className="font-display text-ink leading-tight text-[clamp(1.75rem,3vw,2.5rem)]">
                Real orders, safely dispatched.
              </h2>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#FFE8EA] text-[13px] font-semibold text-ink shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Verified door-to-door delivery
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Infinite Seamless Marquee Rows (identical design to Patient Stories) */}
      <motion.div
        {...inView}
        variants={fadeUp}
        className="relative w-full overflow-hidden flex flex-col gap-2 md:gap-6 pt-10 pb-4"
      >
        {/* ROW 1 (Left Auto Marquee) */}
        <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="marquee-track gap-6 md:gap-8 items-center py-4">
            {row1Doubled.map((item, i) => (
              <div
                key={`row1-${item.id}-${i}`}
                onClick={() => setSelectedItem(item)}
                className={`w-[260px] md:w-[320px] shrink-0 rounded-[20px] overflow-hidden shadow-sm border border-border bg-white transition-all duration-300 hover:scale-[1.03] hover:rotate-0 hover:z-10 hover:shadow-card-hover cursor-pointer ${
                  i % 2 === 0 ? "rotate-[-2deg] -translate-y-2" : "rotate-[2deg] translate-y-2"
                }`}
              >
                <div className="relative aspect-[4/5] w-full bg-[#FAF8F8]">
                  <Image
                    src={item.src}
                    alt={`Order parcel ${item.originalName}`}
                    fill
                    sizes="(max-width: 768px) 260px, 320px"
                    className="object-cover"
                    loading={i < 4 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-white/95 text-accent flex items-center justify-center shadow-md">
                      <PiMagnifyingGlassPlus size={20} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2 (Right Auto Marquee) */}
        <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="marquee-track-reverse gap-6 md:gap-8 items-center py-4">
            {row2Doubled.map((item, i) => (
              <div
                key={`row2-${item.id}-${i}`}
                onClick={() => setSelectedItem(item)}
                className={`w-[260px] md:w-[320px] shrink-0 rounded-[20px] overflow-hidden shadow-sm border border-border bg-white transition-all duration-300 hover:scale-[1.03] hover:rotate-0 hover:z-10 hover:shadow-card-hover cursor-pointer ${
                  i % 2 === 0 ? "rotate-[3deg] translate-y-2" : "rotate-[-3deg] -translate-y-2"
                }`}
              >
                <div className="relative aspect-[4/5] w-full bg-[#FAF8F8]">
                  <Image
                    src={item.src}
                    alt={`Order parcel ${item.originalName}`}
                    fill
                    sizes="(max-width: 768px) 260px, 320px"
                    className="object-cover"
                    loading={i < 4 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-white/95 text-accent flex items-center justify-center shadow-md">
                      <PiMagnifyingGlassPlus size={20} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Action link to dedicated proof page */}
      <div className="flex justify-center mt-6 md:mt-8">
        <Link
          href="/proof-of-orders"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13.5px] font-semibold text-[#FF5A5F] bg-white border border-[#FFE8EA] hover:border-[#FF5A5F] hover:bg-[#FFF5F6] shadow-xs transition-all"
        >
          View All Proof of Orders <PiArrowRight size={14} />
        </Link>
      </div>

      {/* Lightbox Modal on Image Click */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setSelectedItem(null)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="relative max-w-3xl w-full max-h-[92vh] bg-white rounded-[24px] overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-[#FFE8EA] flex items-center justify-between bg-[#FFF5F6]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[14px] font-bold text-ink">
                    Proof of Order
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 rounded-full bg-white border border-[#FFE8EA] text-ink-2 hover:text-accent flex items-center justify-center transition-colors cursor-pointer"
                >
                  <PiX size={18} />
                </button>
              </div>

              {/* Photo Display */}
              <div className="relative flex-1 min-h-[360px] max-h-[72vh] bg-[#FAF8F8] flex items-center justify-center p-2 sm:p-4">
                <Image
                  src={selectedItem.src}
                  alt={`Proof of order ${selectedItem.originalName}`}
                  width={selectedItem.width}
                  height={selectedItem.height}
                  className="max-h-[68vh] w-auto object-contain rounded-xl shadow-xs"
                  priority
                />

                {/* Arrow navigation */}
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous photo"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-ink hover:text-accent shadow-md flex items-center justify-center transition-all cursor-pointer"
                >
                  <PiArrowLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next photo"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-ink hover:text-accent shadow-md flex items-center justify-center transition-all cursor-pointer"
                >
                  <PiArrowRight size={20} />
                </button>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-white border-t border-[#FFE8EA] flex items-center justify-between text-[13px] text-ink-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Verified Safe Dispensing &amp; Dispatch</span>
                </div>
                <Link
                  href="/proof-of-orders"
                  className="text-accent font-semibold hover:underline flex items-center gap-1"
                  onClick={() => setSelectedItem(null)}
                >
                  Browse Full Ledger <PiArrowRight size={13} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
