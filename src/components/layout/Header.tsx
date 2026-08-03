"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PiList, PiX, PiArrowRight, PiCaretDown } from "react-icons/pi";

const NAV_LINKS = [
  {
    label: "Treatments",
    megaMenu: [
      {
        category: "Weight Loss",
        links: [
          { label: "Metabolic Health", href: "#metabolic" },
          { label: "GLP-1 Medication", href: "#metabolic" },
        ],
      },
      {
        category: "Skin Care",
        links: [
          { label: "Skin Renewal", href: "#skin" },
          { label: "Anti-Aging Rx", href: "#skin" },
        ],
      },
      {
        category: "Men's Health",
        links: [
          { label: "Men's Vitality", href: "#vitality" },
          { label: "Performance Support", href: "#vitality" },
        ],
      },
    ],
  },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Our Doctors", href: "#doctors" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 w-full bg-[#F5EFE6] transition-all duration-200"
        style={{ boxShadow: scrolled ? "0 1px 0 #E6D8C3" : "none" }}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 h-14 md:h-20 flex items-center justify-between gap-4 relative">
          {/* Logo */}
          <Link
            href="/"
            aria-label="&health home"
            className="shrink-0 flex items-center gap-1.5"
          >
            <span className="font-display italic text-[1.45rem] leading-none text-[#0F1210]">
              &amp;health
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
                    <button
                      className="flex items-center gap-1.5 text-[14px] font-medium text-[#4B4843] hover:text-[#0F1210] transition-colors h-full cursor-default"
                    >
                      {link.label}
                      <PiCaretDown
                        size={12}
                        className={`transition-transform duration-200 ${
                          hoveredMenu === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {/* Mega Menu Dropdown */}
                    <AnimatePresence>
                      {hoveredMenu === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 w-full bg-[#F5EFE6] shadow-[0_12px_24px_rgba(0,0,0,0.06)] border-t border-[#E6D8C3] overflow-hidden"
                          style={{
                            borderBottomLeftRadius: "16px",
                            borderBottomRightRadius: "16px",
                          }}
                        >
                          <div className="max-w-[1280px] mx-auto px-12 py-10 grid grid-cols-3 gap-12">
                            {link.megaMenu.map((group) => (
                              <div key={group.category} className="flex flex-col gap-4">
                                <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#8A8782]">
                                  {group.category}
                                </h3>
                                <ul className="flex flex-col gap-3">
                                  {group.links.map((subLink) => (
                                    <li key={subLink.label}>
                                      <Link
                                        href={subLink.href}
                                        onClick={() => setHoveredMenu(null)}
                                        className="text-[15px] font-medium text-[#0F1210] hover:text-[#C2A68C] transition-colors flex items-center justify-between group"
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
                    className="text-[14px] font-medium text-[#4B4843] hover:text-[#0F1210] transition-colors"
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
              className="inline-flex items-center h-10 md:h-11 px-4 md:px-5 rounded-full border border-[#E6D8C3] bg-[#F5EFE6] text-[13px] font-medium text-[#0F1210] whitespace-nowrap hover:bg-[#F5EFE6] transition-colors"
            >
              Sign in
            </Link>
            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2 -mr-2 text-[#4B4843] hover:text-[#0F1210] transition-colors cursor-pointer"
            >
              <PiList size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-14 md:h-20" aria-hidden="true" />

      {/* Mobile Drawer (kept for small screens) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/25 backdrop-blur-[2px] lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 36 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[360px] bg-[#F5EFE6] flex flex-col overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between px-6 h-14 md:h-16 border-b border-[#E6D8C3] shrink-0">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="font-display italic text-[1.3rem] text-[#0F1210]"
                >
                  &amp;health
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="p-1 text-[#4B4843] hover:text-[#0F1210] transition-colors cursor-pointer"
                >
                  <PiX size={22} />
                </button>
              </div>
              <nav className="flex-1 px-6 py-4">
                <ul className="flex flex-col gap-6">
                  {NAV_LINKS.map((link) => (
                    <li key={link.label}>
                      {link.megaMenu ? (
                        <div className="flex flex-col gap-4">
                          <span className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#8A8782]">
                            {link.label}
                          </span>
                          <ul className="flex flex-col gap-3 pl-2">
                            {link.megaMenu.flatMap((m) => m.links).map((subLink) => (
                              <li key={subLink.label}>
                                <Link
                                  href={subLink.href}
                                  onClick={() => setOpen(false)}
                                  className="text-[15px] font-medium text-[#0F1210]"
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
                          className="text-[15px] font-bold tracking-[0.1em] uppercase text-[#8A8782] hover:text-[#0F1210]"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
