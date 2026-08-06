"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { PiDropFill } from "react-icons/pi";

export function IntroSplash({ onComplete }: { onComplete: () => void }) {
  const dropControls = useAnimation();
  const expandControls = useAnimation();

  useEffect(() => {
    async function runSequence() {
      // 1. Drop enters
      await dropControls.start({
        y: [-60, 0],
        opacity: [0, 1],
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      });

      // Short pause
      await new Promise(resolve => setTimeout(resolve, 100));

      // 2. Drop falls
      await dropControls.start({
        y: [0, 60],
        transition: { duration: 0.4, ease: "easeIn" }
      });

      // 3. Drop hits and aggressively scales up to cover screen
      expandControls.start({
        scale: [1, 150],
        transition: { duration: 0.6, ease: "easeInOut" }
      });

      // 4. Icon vanishes into the pink overlay
      dropControls.start({
        opacity: 0,
        transition: { duration: 0.2 }
      });

      // Complete splash (allows AnimatePresence to fade it out)
      setTimeout(() => {
        onComplete();
      }, 500);
    }
    
    runSequence();
  }, [dropControls, expandControls, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-surface"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* The expanding circle (splash) */}
        <motion.div
          animate={expandControls}
          initial={{ scale: 0 }}
          className="absolute w-8 h-8 bg-accent rounded-full pointer-events-none mt-20 z-10"
        />
        
        {/* The Water Drop */}
        <motion.div
          animate={dropControls}
          initial={{ opacity: 0 }}
          className="z-30 text-accent bg-surface rounded-full p-2 relative top-[-10px]"
        >
          <PiDropFill size={64} />
        </motion.div>
      </div>
    </motion.div>
  );
}
