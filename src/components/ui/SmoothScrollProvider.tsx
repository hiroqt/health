"use client";

import { useSmoothScroll } from "@/lib/useSmoothScroll";
import { ScrollProgress }  from "@/components/ui/ScrollProgress";

/**
 * Activates smooth scroll across all anchor links on the page
 * and renders the scroll-progress bar.
 * Mount once in the root layout — renders no visible DOM of its own
 * (only the progress bar).
 */
export function SmoothScrollProvider({ headerOffset = 72 }: { headerOffset?: number }) {
  useSmoothScroll(headerOffset);
  return <ScrollProgress />;
}
