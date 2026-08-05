"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { PiSyringeFill } from "react-icons/pi";

export function IntroSplash({ onComplete }: { onComplete: () => void }) {
  const syringeControls = useAnimation();
  const dropControls = useAnimation();
  const expandControls = useAnimation();

  useEffect(() => {
    async function runSequence() {
      // 1. Syringe enters and tilts
      await syringeControls.start({
        y: [-60, 0],
        opacity: [0, 1],
        rotate: [0, -45], // Tilt to "inject" position
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      });

      // Short pause
      await new Promise(resolve => setTimeout(resolve, 100));

      // 2. Liquid drops from needle tip
      await dropControls.start({
        y: [0, 60],
        scale: [0.5, 1],
        opacity: [1, 1],
        transition: { duration: 0.4, ease: "easeIn" }
      });

      // 3. Drop hits and aggressively scales up to cover screen
      expandControls.start({
        scale: [1, 150],
        transition: { duration: 0.6, ease: "easeInOut" }
      });

      // 4. Syringe vanishes into the pink overlay
      syringeControls.start({
        opacity: 0,
        transition: { duration: 0.2 }
      });

      // Complete splash (allows AnimatePresence to fade it out)
      setTimeout(() => {
        onComplete();
      }, 500);
    }
    
    runSequence();
  }, [syringeControls, dropControls, expandControls, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-surface"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* The expanding pink circle */}
        <motion.div
          animate={expandControls}
          initial={{ scale: 0 }}
          className="absolute w-8 h-8 bg-accent rounded-full pointer-events-none mt-20 z-10"
        />
        
        {/* The liquid drop */}
        <motion.div
          animate={dropControls}
          initial={{ y: 0, scale: 0, opacity: 0 }}
          className="absolute w-3 h-3 bg-accent rounded-full mt-4 pointer-events-none z-20"
        />
        
        {/* The Syringe */}
        <motion.div
          animate={syringeControls}
          initial={{ opacity: 0 }}
          className="z-30 text-accent bg-surface rounded-full p-2"
        >
          <PiSyringeFill size={64} />
        </motion.div>
      </div>
    </motion.div>
  );
}
