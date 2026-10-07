"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  PROOF_ORDER_ITEMS,
  PROOF_ORDER_GROUPS,
  PROOF_VIDEO,
  ProofOrderItem,
} from "@/data/proofOfOrders";
import {
  PiPackageFill,
  PiTruckFill,
  PiShieldCheckFill,
  PiCheckCircleFill,
  PiArrowRight,
  PiArrowLeft,
  PiMagnifyingGlassPlus,
  PiX,
  PiFunnelFill,
  PiPlayCircleFill,
  PiThermometerColdFill,
  PiClockFill,
  PiLockKeyFill,
} from "react-icons/pi";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const inView = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-40px" },
};

const ITEMS_PER_PAGE = 24;

export default function ProofOfOrdersClient() {
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);
  const [selectedItem, setSelectedItem] = useState<ProofOrderItem | null>(null);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);

  // Filter items
  const filteredItems = useMemo(() => {
    if (selectedGroup === "all") return PROOF_ORDER_ITEMS;
    return PROOF_ORDER_ITEMS.filter((item) => item.group === selectedGroup);
  }, [selectedGroup]);

  // Reset pagination when filter changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [selectedGroup]);

  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const hasMore = visibleCount < filteredItems.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredItems.length));
  };

  // Lightbox navigation
  const currentIndex = selectedItem
    ? filteredItems.findIndex((it) => it.id === selectedItem.id)
    : -1;

  const handleNext = useCallback(() => {
    if (currentIndex === -1) return;
    const nextIdx = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIdx]);
  }, [currentIndex, filteredItems]);

  const handlePrev = useCallback(() => {
    if (currentIndex === -1) return;
    const prevIdx = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIdx]);
  }, [currentIndex, filteredItems]);

  // Keyboard navigation & lock body scroll
  useEffect(() => {
    if (!selectedItem && !showVideoModal) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
        setShowVideoModal(false);
      }
      if (selectedItem) {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedItem, showVideoModal, handleNext, handlePrev]);

  // Swipe support for mobile lightbox
  const touchStartX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX;
    if (distance > 50) handleNext();
    else if (distance < -50) handlePrev();
    touchStartX.current = null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F0F0F]">
      <Header splashDone={true} />

      <main className="flex-1">
        {/* ─── Hero Section ─── */}
        <section className="relative overflow-hidden pt-10 pb-12 md:pt-16 md:pb-20 bg-gradient-to-b from-[#FFF5F6] via-white to-white border-b border-[#FFE8EA]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div {...inView} variants={stagger} className="max-w-3xl">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#FFE8EA] text-accent text-[12px] font-bold tracking-[0.18em] uppercase shadow-xs mb-5">
                <PiPackageFill size={15} />
                <span>Verified Fulfilled Orders</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="font-display text-ink text-[clamp(2.4rem,5vw,3.75rem)] leading-[1.08] tracking-tight">
                Proof of Orders &amp;
                <br />
                <span className="italic font-light text-accent">Dispatched Deliveries</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-[16px] md:text-[17px] text-ink-2 leading-relaxed mt-5 max-w-2xl">
                Transparency and patient safety are our core pillars. Here is our live photographic ledger of orders dispatched, temperature-controlled, sealed, and delivered across the Philippines.
              </motion.p>

              {/* Trust Badges */}
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
                {[
                  { icon: <PiShieldCheckFill size={16} />, label: "FDA-Registered Dispensary" },
                  { icon: <PiThermometerColdFill size={16} />, label: "Cold-Chain Integrity" },
                  { icon: <PiLockKeyFill size={16} />, label: "Discreet Outer Packaging" },
                  { icon: <PiTruckFill size={16} />, label: "Nationwide Door-to-Door" },
                ].map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#FFE8EA] text-[13px] font-medium text-ink shadow-2xs"
                  >
                    <span className="text-accent">{badge.icon}</span>
                    {badge.label}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── Video Feature Section ─── */}
        {PROOF_VIDEO && (
          <section className="py-8 bg-[#FAF8F8] border-b border-[#FFE8EA]">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="p-6 md:p-8 rounded-[28px] bg-white border border-[#FFE8EA] shadow-xs flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF5F6] text-accent flex items-center justify-center shrink-0 border border-[#FFE8EA]">
                    <PiPlayCircleFill size={28} />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-accent text-[11px] font-bold tracking-wider uppercase">
                      <PiClockFill size={12} />
                      <span>Behind the Scenes</span>
                    </div>
                    <h2 className="font-display text-[1.4rem] text-ink mt-0.5 leading-snug">
                      Pack An Order With Us
                    </h2>
                    <p className="text-[14px] text-ink-3 mt-1 max-w-xl leading-relaxed">
                      Watch how our licensed pharmacy team carefully prepares cold packs, checks vials, and seals medication boxes to guarantee safety and efficacy in transit.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowVideoModal(true)}
                  className="w-full lg:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[14px] text-white bg-accent hover:bg-accent-hover shadow-sm transition-all hover:shadow-md cursor-pointer"
                >
                  <PiPlayCircleFill size={20} />
                  <span>Watch Video</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ─── Gallery Section ─── */}
        <section className="py-12 md:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            {/* Filter Tabs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-[13.5px] font-bold text-ink flex items-center gap-1.5">
                  <PiFunnelFill size={15} className="text-accent" />
                  Filter by Batch:
                </span>
                <span className="text-[13px] text-ink-3">
                  ({filteredItems.length} photos)
                </span>
              </div>

              {/* Batch Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                <button
                  type="button"
                  onClick={() => setSelectedGroup("all")}
                  className={`px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    selectedGroup === "all"
                      ? "bg-accent text-white shadow-xs"
                      : "bg-[#FFF5F6] text-ink-2 hover:bg-[#FFE8EA] border border-[#FFE8EA]"
                  }`}
                >
                  All ({PROOF_ORDER_ITEMS.length})
                </button>
                {PROOF_ORDER_GROUPS.map((grp) => {
                  const count = PROOF_ORDER_ITEMS.filter((i) => i.group === grp).length;
                  const isActive = selectedGroup === grp;
                  return (
                    <button
                      key={grp}
                      type="button"
                      onClick={() => setSelectedGroup(grp)}
                      className={`px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-accent text-white shadow-xs"
                          : "bg-[#FFF5F6] text-ink-2 hover:bg-[#FFE8EA] border border-[#FFE8EA]"
                      }`}
                    >
                      {grp} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Photo Grid */}
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5"
            >
              {displayedItems.map((item, index) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.3) }}
                  onClick={() => setSelectedItem(item)}
                  className="group relative aspect-[4/5] rounded-[18px] overflow-hidden bg-[#FAF8F8] border border-[#FFE8EA] cursor-pointer shadow-2xs hover:shadow-card-hover transition-all duration-300"
                >
                  <Image
                    src={item.src}
                    alt={`Order parcel ${item.originalName}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                    loading={index < 12 ? "eager" : "lazy"}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-3 text-center">
                    <span className="w-9 h-9 rounded-full bg-white text-accent flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                      <PiMagnifyingGlassPlus size={18} />
                    </span>
                    <span className="text-white text-[11px] font-semibold mt-2 drop-shadow-sm">
                      Inspect Photo
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-12 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-[14px] text-white bg-accent hover:bg-accent-hover shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  Load More Orders ({filteredItems.length - visibleCount} remaining)
                </button>
                <span className="text-[12px] text-ink-3">
                  Showing {visibleCount} of {filteredItems.length} photos
                </span>
              </div>
            )}
          </div>
        </section>

        {/* ─── Bottom CTA Strip ─── */}
        <section className="py-14 bg-[#FFF5F6] border-t border-[#FFE8EA]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
            <h2 className="font-display text-ink text-[clamp(1.8rem,3.5vw,2.5rem)] leading-tight">
              Ready to begin your doctor-guided program?
            </h2>
            <p className="text-[15px] text-ink-3 mt-3 max-w-xl mx-auto">
              Get evaluated online by a licensed physician within 24 hours. Your treatment is dispensed and delivered directly to your doorstep.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-[14.5px] text-white bg-accent hover:bg-accent-hover shadow-sm transition-all"
              >
                Start Assessment <PiArrowRight size={16} />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-[14.5px] text-accent bg-white border border-[#FFE8EA] hover:border-accent hover:bg-white shadow-2xs transition-all"
              >
                Explore Treatments
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Video Modal ─── */}
      <AnimatePresence>
        {showVideoModal && PROOF_VIDEO && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowVideoModal(false)}
          >
            <div
              className="relative max-w-4xl w-full bg-black rounded-[24px] overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 bg-[#141414] text-white flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                  <PiPlayCircleFill className="text-accent" size={20} />
                  <span className="font-semibold text-[14px]">Pack An Order With Us · Behind The Scenes</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowVideoModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <PiX size={18} />
                </button>
              </div>

              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                <video
                  src={PROOF_VIDEO.src}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Lightbox Modal ─── */}
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
            {/* Modal Box */}
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
                  <span className="text-[12px] text-ink-3">
                    ({currentIndex + 1} of {filteredItems.length})
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

              {/* Main Photo Display */}
              <div className="relative flex-1 min-h-[380px] max-h-[72vh] bg-[#FAF8F8] flex items-center justify-center p-2 sm:p-4">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.originalName}
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
              <div className="px-6 py-4 bg-white border-t border-[#FFE8EA] flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-ink-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Verified Safe Dispensing &amp; Dispatch</span>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href="/quiz"
                    className="text-accent font-semibold hover:underline flex items-center gap-1"
                  >
                    Place an Order <PiArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
