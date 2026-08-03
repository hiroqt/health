"use client";

import { useEffect } from "react";

/** Cubic ease-in-out — feels natural, not mechanical */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Smooth-scrolls to a target element with a custom easing curve.
 * Duration scales with distance so short jumps feel quick and
 * long jumps don't feel slow.
 */
export function smoothScrollTo(target: HTMLElement, offset = 0): void {
  const start    = window.scrollY;
  const end      = target.getBoundingClientRect().top + window.scrollY - offset;
  const distance = Math.abs(end - start);

  // 400–900 ms range, scales with scroll distance
  const duration = Math.min(900, Math.max(400, distance * 0.4));

  let startTime: number | null = null;

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const elapsed  = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = easeInOutCubic(progress);

    window.scrollTo(0, start + (end - start) * eased);

    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/**
 * Attaches a single delegated click listener on the document.
 * Intercepts any <a href="#..."> click and smooth-scrolls to the target.
 * Offset accounts for the sticky header height.
 */
export function useSmoothScroll(headerOffset = 72) {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const id = href.slice(1);
      if (!id) {
        // Bare "#" — scroll to top
        e.preventDefault();
        smoothScrollTo(document.documentElement, 0);
        return;
      }

      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      smoothScrollTo(target, headerOffset);

      // Keep the URL hash in sync without a jump
      history.pushState(null, "", href);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [headerOffset]);
}
