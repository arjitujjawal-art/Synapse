"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import KineticTagline from "@/components/ui/KineticTagline";
import NeuralPulseCanvas from "@/components/ui/NeuralPulseCanvas";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Pause video when tab is inactive
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Video */}
      <motion.div
        initial={{ scale: 1.03 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: [0.25, 0.4, 0.25, 1] }}
        className="absolute inset-0"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/scans/scan-1.jpeg"
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/65 via-white/45 to-[#f7f7f5]" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/20" />
      </motion.div>

      {/* Neural Pulse Layer — ambient, behind everything */}
      <div className="absolute inset-0 opacity-[0.06]">
        <NeuralPulseCanvas intensity="ambient" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container-wide w-full pt-16">
        <div className="max-w-[690px] text-left">
        {/* Brand Name */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="heading-label mb-6 tracking-[0.25em] text-accent-deep"
        >
          KORTEX
        </motion.p>

        {/* Main Heading with Kinetic Tagline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="heading-display text-text-primary mb-8"
        >
          From scans to stroke{" "}
          <br className="hidden sm:block" />
          <KineticTagline />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="body-large max-w-xl mb-10"
        >
          One visual workspace that turns stroke imaging into clear overlays,
          quantified tissue measurements, confidence-aware review, and a structured findings summary.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <Link href="/portal" className="btn-primary text-base">
            Explore Prototype
            <ArrowRight size={18} />
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.35 }}
          className="mt-10 flex flex-wrap gap-x-7 gap-y-2 text-[13px] font-medium text-text-secondary"
        >
          <span>01 · Upload a study</span>
          <span>02 · Review AI overlays</span>
          <span>03 · Export findings</span>
        </motion.div>
        </div>
      </div>

      {/* Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown size={24} className="scroll-cue text-text-tertiary" />
      </motion.div>
    </section>
  );
}
