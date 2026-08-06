"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IntroSplash } from "@/components/animations/IntroSplash";
import { PRODUCTS } from "@/data/products";
import { PiArrowRight, PiCheckCircleFill } from "react-icons/pi";
import Link from "next/link";

// ─── Categories & Mapping ─────────────────────────────────────────────────────
const CATEGORIES = ["All", "Weight Management", "Recovery & Healing", "Cellular Health"];

const CATEGORY_MAP: Record<string, string[]> = {
  "Weight Management": ["retatrutide", "tirzepatide", "tesamorelin", "mots-c"],
  "Recovery & Healing": ["bpc-157", "ghk-cu"],
  "Cellular Health": ["glutathione", "nad-plus"],
};

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

export default function ProductsCatalogPage() {
  const [showSplash, setShowSplash] = useState(false);
  const [splashDone, setSplashDone] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

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

  // Filter logic
  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeCategory === "All") return true;
    const slugs = CATEGORY_MAP[activeCategory] || [];
    return slugs.includes(product.slug);
  });

  return (
    <>
      <AnimatePresence>
        {showSplash && <IntroSplash onComplete={handleSplashComplete} />}
      </AnimatePresence>
      <Header splashDone={splashDone} />
      
      <main className="pt-32 pb-24 bg-bg min-h-screen relative overflow-hidden">
        
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden -z-10">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[80%] rounded-full bg-accent-subtle opacity-60 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-surface-warm opacity-80 blur-[120px]" />
        </div>

        <section className="w-full">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col gap-12 lg:gap-16">
              
              {/* Enhanced Hero */}
              <motion.div variants={fadeUp} className="flex flex-col items-center text-center max-w-3xl mx-auto relative z-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur-md border border-accent/10 text-[12px] font-bold tracking-[0.15em] uppercase text-accent mb-6 shadow-sm">
                  Our Formulations
                </span>
                <h1 className="font-display text-ink leading-[1.1] text-[clamp(2.5rem,5vw,4.5rem)] mb-6 tracking-tight">
                  Science-Backed <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-ink to-ink-3">
                    Treatments
                  </span>
                </h1>
                <p className="text-[17px] text-ink-3 leading-relaxed max-w-2xl mx-auto">
                  Explore our carefully selected ingredients designed to support wellness, recovery, and overall vitality. Each formulation is optimized for real, measurable results.
                </p>
              </motion.div>

              {/* Category Filter */}
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mb-4 relative z-10">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`relative px-5 py-2.5 rounded-full text-[14px] font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      activeCategory === category
                        ? "text-white bg-ink shadow-md"
                        : "text-ink-2 bg-white border border-border hover:border-accent/40 hover:bg-surface"
                    }`}
                  >
                    {category}
                    {activeCategory === category && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-full bg-ink -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </motion.div>

              {/* Premium Grid */}
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.slug}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    >
                      <Link href={`/products/${product.slug}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 rounded-[24px]">
                        <div className="group h-full bg-white/80 backdrop-blur-md border border-border rounded-[24px] p-2 flex flex-col justify-between hover:shadow-card-hover hover:border-accent/30 transition-all duration-500 hover:-translate-y-1">
                          
                          {/* Image Container with Overlay */}
                          <div className="w-full aspect-[4/3] relative overflow-hidden rounded-[18px] bg-surface mb-4">
                            <Image
                              src={product.coverImage}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                              <span className="bg-white text-ink px-5 py-2.5 rounded-full font-semibold text-[14px] shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                                View Details <PiArrowRight />
                              </span>
                            </div>
                          </div>
                          
                          {/* Card Content */}
                          <div className="px-4 pb-4 flex-grow flex flex-col">
                            {/* Benefit Tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {product.benefits.slice(0, 2).map((benefit, idx) => (
                                <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface text-accent text-[11px] font-bold tracking-wide uppercase">
                                  <PiCheckCircleFill className="text-[12px]" />
                                  {benefit.title}
                                </span>
                              ))}
                            </div>
                            
                            <h2 className="font-display text-ink text-[1.75rem] leading-[1.2] mb-2 group-hover:text-accent transition-colors duration-300">
                              {product.name}
                            </h2>
                            <p className="text-[14px] text-ink-3 leading-relaxed line-clamp-2 mt-auto">
                              {product.shortDescription}
                            </p>
                          </div>

                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Empty State (just in case) */}
              {filteredProducts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full py-20 text-center text-ink-3"
                >
                  <p className="text-lg">No formulations found for this category.</p>
                </motion.div>
              )}

            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
