"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A 2 px accent-green bar pinned to the very top of the viewport.
 * Fills left-to-right as the user scrolls the page.
 * useSpring smooths out rapid scroll jitter.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping:   28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: "0%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "var(--color-accent)",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}
