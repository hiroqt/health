"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IntroSplash } from "@/components/animations/IntroSplash";
import { Product, Benefit } from "@/data/products";
import { ORDER_PRODUCTS } from "@/components/forms/OrderIntakeForm";
import { PiArrowRight, PiCheckCircleFill, PiInfo, PiWarningCircle, PiFlask, PiTag } from "react-icons/pi";
import Link from "next/link";

// ─── Animations ───────────────────────────────────────────────────────────────
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function ProductDetailClient({ product }: { product: Product }) {
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
      
      <main className="pt-32 pb-24 bg-surface min-h-screen">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8 lg:px-12">
          
          {/* Breadcrumb */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-8 flex items-center gap-2 text-[13px] font-medium text-ink-3">
            <Link href="/products" className="hover:text-accent transition-colors">Products</Link>
            <span>/</span>
            <span className="text-ink-3">{product.category}</span>
            <span>/</span>
            <span className="text-ink font-semibold">{product.name}</span>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col gap-16 md:gap-24">
            
            {/* Header Area */}
            <motion.div variants={fadeUp} className="flex flex-col gap-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-accent/20 text-[11px] font-bold tracking-[0.15em] uppercase text-accent w-fit shadow-xs">
                {product.category}
              </span>
              <h1 className="font-display text-ink leading-[1.1] text-[clamp(3rem,6vw,5rem)]">
                {product.name}
              </h1>
              <p className="text-[clamp(1.1rem,2vw,1.25rem)] text-ink-2 leading-relaxed max-w-2xl font-medium">
                {product.shortDescription}
              </p>
              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center rounded-full text-[14px] font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200 min-h-[52px] px-8 gap-2 bg-accent hover:bg-accent-hover text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 outline-none"
                >
                  Take free assessment (for first time user) <PiArrowRight size={16} />
                </Link>
                <Link
                  href="/order?reorder=true"
                  className="inline-flex items-center justify-center rounded-full text-[14px] font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200 min-h-[52px] px-8 gap-2 text-ink bg-white border border-border hover:border-accent/40 hover:bg-surface focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 outline-none"
                >
                  Re-order <PiArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
              
              {/* Main Content (Left/Top) */}
              <div className="md:col-span-7 flex flex-col gap-12">
                
                {/* About */}
                <motion.section variants={fadeUp} className="flex flex-col gap-6">
                  {product.coverImage ? (
                    <div className="relative w-full aspect-[16/9] md:aspect-[4/3] rounded-[24px] overflow-hidden bg-white border border-border">
                      <Image
                        src={product.coverImage}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 60vw"
                        priority
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-[16/9] md:aspect-[4/3] rounded-[24px] overflow-hidden bg-gradient-to-br from-surface via-surface-warm/30 to-surface-warm/50 border border-border flex flex-col items-center justify-center p-8 text-center select-none">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,90,95,0.08),transparent_60%)]" />
                      <div className="relative z-10 flex flex-col items-center max-w-sm">
                        <div className="w-16 h-16 rounded-2xl bg-white/90 border border-border flex items-center justify-center shadow-xs text-accent mb-4">
                          <PiFlask size={32} className="opacity-85" />
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-bold tracking-wider uppercase mb-2">
                          {product.category}
                        </span>
                        <h3 className="font-display text-[1.25rem] text-ink font-semibold mb-1.5">
                          Formulation Imagery In Preparation
                        </h3>
                        <p className="text-[13.5px] text-ink-3 leading-relaxed">
                          Official packaging and clinical photography will be published soon. Review clinical summary, benefits, and dosing protocol below.
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-4">
                    <h2 className="font-display text-[1.75rem] text-ink">About {product.name}</h2>
                    <p className="text-[15px] text-ink-3 leading-relaxed">
                      {product.about}
                    </p>
                  </div>
                </motion.section>

                <hr className="border-border" />

                {/* Benefits */}
                <motion.section variants={stagger} className="flex flex-col gap-6">
                  <h2 className="font-display text-[1.75rem] text-ink">Key Benefits</h2>
                  <div className="flex flex-col gap-4">
                    {product.benefits.map((benefit: Benefit, i: number) => (
                      <motion.div key={i} variants={fadeUp} className="flex items-start gap-4">
                        <div className="mt-1 text-accent shrink-0">
                          <PiCheckCircleFill size={20} />
                        </div>
                        <div>
                          <h3 className="text-[15px] font-semibold text-ink mb-1">{benefit.title}</h3>
                          <p className="text-[14px] text-ink-3 leading-relaxed">{benefit.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              </div>

              {/* Sidebar (Right/Bottom) */}
              <div className="md:col-span-5 flex flex-col gap-6">

                {/* Pricing Card */}
                {(() => {
                  const norm = (s: string) => s.toLowerCase().replace(/[\s\-_+]+/g, "");
                  const matchingProducts = ORDER_PRODUCTS.filter(
                    (op) =>
                      op.name.toLowerCase() === product.name.toLowerCase() ||
                      norm(op.name) === norm(product.name) ||
                      norm(op.name) === norm(product.slug)
                  );
                  const lowestPrice = matchingProducts.length > 0
                    ? Math.min(...matchingProducts.map((p) => p.price))
                    : null;

                  return (
                    <motion.div variants={fadeUp} className="bg-white border border-accent/20 rounded-[24px] p-6 lg:p-8 shadow-sm">
                      <h3 className="font-display text-[1.5rem] text-ink mb-2 flex items-center gap-2">
                        <PiTag className="text-accent" />
                        Pricing
                      </h3>
                      {lowestPrice !== null ? (
                        <>
                          <p className="text-[13px] text-ink-3 mb-5">
                            Starting from <span className="font-display font-bold text-accent text-[1.5rem]">₱{lowestPrice.toLocaleString()}</span>
                          </p>
                          <div className="flex flex-col gap-3 mb-6">
                            {matchingProducts.map((op) => (
                              <div
                                key={op.id}
                                className="flex items-center justify-between px-4 py-3 rounded-[14px] bg-surface border border-border"
                              >
                                <div className="flex flex-col">
                                  <span className="text-[14px] font-semibold text-ink">{op.dosage}</span>
                                  <span className="text-[12px] text-ink-3">{op.shortDesc}</span>
                                </div>
                                <span className="text-[16px] font-bold text-ink whitespace-nowrap">
                                  ₱{op.price.toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                          <Link
                            href="/order?reorder=true"
                            className="w-full inline-flex items-center justify-center rounded-full text-[14px] font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200 min-h-[48px] px-6 gap-2 bg-accent hover:bg-accent-hover text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 outline-none"
                          >
                            Order Now <PiArrowRight size={16} />
                          </Link>
                        </>
                      ) : (
                        <>
                          <p className="text-[14px] text-ink-3 mb-5">
                            Pricing is available upon consultation. Get in touch to learn more about this treatment.
                          </p>
                          <Link
                            href="/learn-more"
                            className="w-full inline-flex items-center justify-center rounded-full text-[14px] font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200 min-h-[48px] px-6 gap-2 bg-accent hover:bg-accent-hover text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 outline-none"
                          >
                            Inquire About Pricing <PiArrowRight size={16} />
                          </Link>
                        </>
                      )}
                    </motion.div>
                  );
                })()}

                <motion.div variants={fadeUp} className="bg-white border border-border rounded-[24px] p-6 lg:p-8">
                  <h3 className="font-display text-[1.5rem] text-ink mb-6 flex items-center gap-2">
                    <PiInfo className="text-accent" />
                    Dosing Guide
                  </h3>
                  
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[12px] font-bold tracking-wider uppercase text-ink-3">Dosage</span>
                      <span className="text-[15px] font-medium text-ink">{product.dosing.dosage}</span>
                    </div>
                    <hr className="border-border" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[12px] font-bold tracking-wider uppercase text-ink-3">Frequency</span>
                      <span className="text-[15px] font-medium text-ink">{product.dosing.frequency}</span>
                    </div>
                    <hr className="border-border" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[12px] font-bold tracking-wider uppercase text-ink-3">Duration</span>
                      <span className="text-[15px] font-medium text-ink">{product.dosing.duration}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Helpful Tips Card */}
                <motion.div variants={fadeUp} className="bg-ink rounded-[24px] p-6 lg:p-8 text-white">
                  <h3 className="font-display text-[1.5rem] mb-6 flex items-center gap-2 text-white">
                    <PiWarningCircle className="text-accent" />
                    Helpful Tips
                  </h3>
                  
                  <ul className="flex flex-col gap-4">
                    {product.tips.map((tip: string, i: number) => (
                      <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-white/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </motion.div>

              </div>
            </div>

          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
