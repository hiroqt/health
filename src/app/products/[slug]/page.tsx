"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IntroSplash } from "@/components/animations/IntroSplash";
import { PRODUCTS, getProductBySlug, Product, Benefit } from "@/data/products";
import { notFound } from "next/navigation";
import { PiArrowRight, PiCheckCircleFill, PiInfo, PiWarningCircle } from "react-icons/pi";
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
const inView = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-60px" },
};

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const product: Product | undefined = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

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
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/learn-more"
                  className="inline-flex items-center justify-center rounded-full text-[14px] font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200 min-h-[52px] px-8 gap-2 bg-accent hover:bg-accent-hover text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 outline-none"
                >
                  Start your program <PiArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
              
              {/* Main Content (Left/Top) */}
              <div className="md:col-span-7 flex flex-col gap-12">
                
                {/* About */}
                <motion.section variants={fadeUp} className="flex flex-col gap-6">
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
                
                {/* Dosing Guide Card */}
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
