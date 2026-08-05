"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PiList, PiX, PiArrowRight, PiCaretDown, PiSyringe, PiSyringeFill } from "react-icons/pi";

const NAV_LINKS = [
  {
    label: "Programs",
    megaMenu: [
      {
        category: "Weight Loss",
        links: [
          { label: "Metabolic Health", href: "#metabolic" },
          { label: "GLP-1 Medication",  href: "#metabolic" },
        ],
      },
      {
        category: "Skin Care",
        links: [
          { label: "Skin Renewal",  href: "#skin" },
          { label: "Anti-Aging Rx", href: "#skin" },
        ],
      },
      {
        category: "Men's Health",
        links: [
          { label: "Men's Vitality",      href: "#vitality" },
          { label: "Performance Support", href: "#vitality" },
        ],
      },
    ],
  },
  { label: "How It Works", href: "/learn-more" },
  { label: "Our Doctors",  href: "#doctors"     },
];

export function Header({ splashDone = true }: { splashDone?: boolean }) {
  const [scrolled,     setScrolled]     = useState(false);
  const [open,         setOpen]         = useState(false);
  const [hoveredMenu,  setHoveredMenu]  = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        initial="hidden"
        animate={splashDone ? "visible" : "hidden"}
        variants={{
          hidden: { y: "-100%" },
          visible: { y: 0, transition: { type: "spring", stiffness: 300, damping: 30, duration: 0.6 } }
        }}
        className="fixed top-0 inset-x-0 z-50 w-full bg-white transition-all duration-200"
        style={{ boxShadow: scrolled ? "0 1px 0 #FFE8EA" : "none" }}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 h-14 md:h-20 flex items-center justify-between gap-4 relative">

          {/* Logo */}
          <Link href="/" aria-label="tearsize home" className="shrink-0 flex items-center gap-2">
            <span
              className="font-display font-medium leading-none select-none"
              style={{ color: "#6E6E6E", fontSize: "1rem" }}
            >
              by
            </span>
            <span
              className="font-display font-black italic leading-none select-none"
              style={{ color: "#FF5A5F", fontSize: "1.6rem" }}
            >
              tears
            </span>
            <PiSyringeFill
              size={26}
              style={{ color: "#FF5A5F", transform: "rotate(-25deg)", margin: "0 -2px" }}
              aria-hidden="true"
            />
            <span
              className="font-display font-black italic leading-none select-none"
              style={{ color: "#FF5A5F", fontSize: "1.6rem" }}
            >
              ze
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 h-full">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="h-full flex items-center"
                onMouseEnter={() => setHoveredMenu(link.label)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                {link.megaMenu ? (
                  <>
                    <button className="flex items-center gap-1.5 text-[14px] font-medium text-[#2B2B2B] hover:text-[#FF5A5F] transition-colors h-full cursor-default">
                      {link.label}
                      <PiCaretDown
                        size={12}
                        className={`transition-transform duration-200 ${hoveredMenu === link.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {hoveredMenu === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(4px)" }}
                          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: 5, scale: 0.98, filter: "blur(4px)" }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          className="absolute top-full left-0 w-full bg-white shadow-[0_12px_24px_rgba(255,90,95,0.10)] border-t border-[#FFE8EA] overflow-y-auto max-h-[80vh]"
                          style={{ borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" }}
                        >
                          <div className="max-w-[1280px] mx-auto px-12 py-10 grid grid-cols-3 gap-12">
                            {link.megaMenu.map((group) => (
                              <div key={group.category} className="flex flex-col gap-4">
                                <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#6E6E6E]">
                                  {group.category}
                                </h3>
                                <ul className="flex flex-col gap-3">
                                  {group.links.map((subLink) => (
                                    <li key={subLink.label}>
                                      <Link
                                        href={subLink.href}
                                        onClick={() => setHoveredMenu(null)}
                                        className="text-[15px] font-medium text-[#0F0F0F] hover:text-[#FF5A5F] transition-colors flex items-center justify-between group"
                                      >
                                        {subLink.label}
                                        <PiArrowRight
                                          size={14}
                                          className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                                        />
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={link.href!}
                    className="text-[14px] font-medium text-[#2B2B2B] hover:text-[#FF5A5F] transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              href="#"
              className="hidden sm:inline-flex items-center h-10 md:h-11 px-4 md:px-5 rounded-full border border-[#FFE8EA] text-[13px] font-medium text-[#0F0F0F] whitespace-nowrap hover:border-[#FF5A5F] hover:text-[#FF5A5F] transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/learn-more"
              className="inline-flex items-center h-10 md:h-11 px-5 md:px-6 rounded-full text-[13px] font-semibold text-white whitespace-nowrap transition-colors"
              style={{ background: "#FF5A5F" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#E04A4F")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#FF5A5F")}
            >
              Get started
            </Link>
            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2 -mr-2 text-[#2B2B2B] hover:text-[#FF5A5F] transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full"
            >
              <PiList size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Spacer */}
      <div className="h-14 md:h-20" aria-hidden="true" />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px] lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 36 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[360px] bg-white flex flex-col overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between px-6 h-14 md:h-16 border-b border-[#FFE8EA] shrink-0">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-1.5 select-none"
                >
                  <span className="font-display font-medium leading-none" style={{ color: "#6E6E6E", fontSize: "0.9rem" }}>by</span>
                  <div className="flex items-center">
                    <span className="font-display font-black italic text-[1.4rem] leading-none" style={{ color: "#FF5A5F" }}>tears</span>
                    <PiSyringeFill
                      size={24}
                      style={{ color: "#FF5A5F", transform: "rotate(-25deg)", margin: "0 -2px" }}
                      aria-hidden="true"
                    />
                    <span className="font-display font-black italic text-[1.4rem] leading-none" style={{ color: "#FF5A5F" }}>ze</span>
                  </div>
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="p-1 text-[#2B2B2B] hover:text-[#FF5A5F] transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-black/5"
                >
                  <PiX size={22} />
                </button>
              </div>
              <nav className="flex-1 px-6 py-6">
                <ul className="flex flex-col gap-6">
                  {NAV_LINKS.map((link) => (
                    <li key={link.label}>
                      {link.megaMenu ? (
                        <div className="flex flex-col gap-4">
                          <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#6E6E6E]">
                            {link.label}
                          </span>
                          <ul className="flex flex-col gap-3 pl-2">
                            {link.megaMenu.flatMap((m) => m.links).map((subLink) => (
                              <li key={subLink.label}>
                                <Link
                                  href={subLink.href}
                                  onClick={() => setOpen(false)}
                                  className="text-[15px] font-medium text-[#0F0F0F] hover:text-[#FF5A5F] transition-colors py-2 min-h-[44px] flex items-center"
                                >
                                  {subLink.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <Link
                          href={link.href!}
                          onClick={() => setOpen(false)}
                          className="text-[15px] font-semibold text-[#0F0F0F] hover:text-[#FF5A5F] transition-colors py-2 min-h-[44px] flex items-center"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="px-6 pb-8 shrink-0">
                <Link
                  href="/learn-more"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-full h-12 rounded-full text-[14px] font-semibold text-white transition-colors"
                  style={{ background: "#FF5A5F" }}
                >
                  Get started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
