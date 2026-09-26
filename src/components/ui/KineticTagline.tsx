"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["intelligence", "clarity", "confidence", "insight"];
const HOLD_DURATION = 2200; // ms per word
const BRAND_HOLD = 4400; // intelligence holds longer

export default function KineticTagline() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const cycleCount = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    if (reducedMotion || hasCompleted) return;

    const isIntelligence = currentIndex === 0;
    const duration = isIntelligence && cycleCount.current > 0 ? BRAND_HOLD : HOLD_DURATION;

    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % WORDS.length;

      if (nextIndex === 0) {
        cycleCount.current++;
        if (cycleCount.current >= 1) {
          // One full cycle complete — settle on "intelligence"
          setCurrentIndex(0);
          setHasCompleted(true);
          return;
        }
      }

      setCurrentIndex(nextIndex);
    }, duration);

    return () => clearTimeout(timer);
  }, [currentIndex, hasCompleted, reducedMotion]);

  if (reducedMotion) {
    return (
      <span className="text-accent font-semibold">intelligence.</span>
    );
  }

  return (
    <span
      className="inline-block relative"
      style={{ minWidth: "280px", height: "1.2em" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[currentIndex]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
          className="absolute left-0 text-accent font-semibold"
        >
          {WORDS[currentIndex]}.
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
