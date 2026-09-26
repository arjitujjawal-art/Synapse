"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useKortexStore } from "@/lib/store";
import { SCAN_IMAGES } from "@/lib/mock-study";

export default function ScanViewer() {
  const {
    currentSlice,
    setCurrentSlice,
    uploadedImages,
    overlayMode,
    overlayOpacity,
    zoom,
    viewOrientation,
  } = useKortexStore();

  const images = uploadedImages.length > 0 ? uploadedImages : SCAN_IMAGES;
  const totalSlices = images.length;
  const safeSliceIndex = Math.min(Math.max(0, currentSlice - 1), totalSlices - 1);
  const activeImage = images[safeSliceIndex];

  // Keyboard navigation for slice scrubber
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentSlice(Math.max(1, currentSlice - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentSlice(Math.min(totalSlices, currentSlice + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlice, totalSlices, setCurrentSlice]);

  const showCore = overlayMode === "core" || overlayMode === "combined";
  const showPenumbra = overlayMode === "penumbra" || overlayMode === "combined";
  const showUncertainty = overlayMode === "uncertainty";

  return (
    <div className="flex flex-col rounded-3xl bg-black border border-neutral-800 overflow-hidden shadow-xl text-white">
      {/* Viewer Sub-Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-800/80 bg-neutral-950/60 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-mono text-neutral-400">SERIES: KTX-2026</span>
          <span className="text-neutral-600">|</span>
          <span className="uppercase text-neutral-300 font-medium">
            {viewOrientation} VIEW
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-neutral-400">
          <span>SLICE {currentSlice} OF {totalSlices}</span>
          <span className="text-neutral-600">|</span>
          <span className="text-neutral-300">ZOOM {Math.round(zoom * 100)}%</span>
        </div>
      </div>

      {/* Main Scan Viewport */}
      <div className="relative w-full aspect-square max-h-[560px] bg-neutral-950 flex items-center justify-center overflow-hidden select-none">
        {/* Anatomical Orientation Markers */}
        <span className="absolute top-3 left-1/2 -translate-x-1/2 text-xs font-mono font-bold text-neutral-500 z-20">
          A
        </span>
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-mono font-bold text-neutral-500 z-20">
          P
        </span>
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-neutral-500 z-20">
          R
        </span>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-neutral-500 z-20">
          L
        </span>

        {/* Scalable Container */}
        <motion.div
          animate={{ scale: zoom }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Base Scan Image */}
          <div className="relative w-[90%] h-[90%]">
            <Image
              src={activeImage}
              alt={`Scan Slice ${currentSlice}`}
              fill
              priority
              className="object-contain"
            />

            {/* SVG Medical Overlays */}
            <svg
              viewBox="0 0 500 500"
              className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-300"
              style={{ opacity: overlayOpacity }}
            >
              <defs>
                {/* Penumbra Gradient */}
                <radialGradient id="penumbraGrad" cx="62%" cy="46%" r="28%">
                  <stop offset="0%" stopColor="#2457F5" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#2457F5" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#2457F5" stopOpacity="0.05" />
                </radialGradient>

                {/* Core Gradient */}
                <radialGradient id="coreGrad" cx="60%" cy="47%" r="16%">
                  <stop offset="0%" stopColor="#E53935" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#E53935" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#E53935" stopOpacity="0.1" />
                </radialGradient>

                {/* Uncertainty Gradient */}
                <radialGradient id="uncertaintyGrad" cx="62%" cy="46%" r="30%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.1" />
                  <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.7" />
                  <stop offset="85%" stopColor="#EF4444" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Penumbra Layer (Blue) */}
              <AnimatePresence>
                {showPenumbra && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <path
                      d="M 285 195 C 345 185, 385 225, 380 275 C 375 320, 325 350, 275 335 C 240 325, 235 285, 245 250 C 255 215, 260 200, 285 195 Z"
                      fill="url(#penumbraGrad)"
                      stroke="#2457F5"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                      className="mix-blend-screen"
                    />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Core Layer (Red) */}
              <AnimatePresence>
                {showCore && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <path
                      d="M 290 225 C 330 220, 345 245, 340 275 C 335 300, 310 315, 285 305 C 265 295, 265 270, 270 250 C 275 235, 275 228, 290 225 Z"
                      fill="url(#coreGrad)"
                      stroke="#E53935"
                      strokeWidth="2.5"
                      className="mix-blend-screen"
                    />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Uncertainty Layer (Heat-Map / Amber) */}
              <AnimatePresence>
                {showUncertainty && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <path
                      d="M 270 180 C 360 170, 400 230, 390 290 C 380 340, 315 370, 260 345 C 220 330, 220 270, 235 230 C 245 195, 250 185, 270 180 Z"
                      fill="url(#uncertaintyGrad)"
                      stroke="#F59E0B"
                      strokeWidth="1.5"
                      strokeDasharray="6 3"
                      className="mix-blend-screen"
                    />
                  </motion.g>
                )}
              </AnimatePresence>
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Bottom Slice Navigation Bar */}
      <div className="px-6 py-4 bg-neutral-900/90 border-t border-neutral-800 flex items-center justify-between gap-4">
        {/* Step backward */}
        <button
          type="button"
          onClick={() => setCurrentSlice(Math.max(1, currentSlice - 1))}
          disabled={currentSlice <= 1}
          className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="Previous Slice (←)"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Scrubber track */}
        <div className="flex-1 flex items-center gap-4">
          <input
            type="range"
            min={1}
            max={totalSlices}
            value={currentSlice}
            onChange={(e) => setCurrentSlice(parseInt(e.target.value))}
            className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>

        {/* Step forward */}
        <button
          type="button"
          onClick={() => setCurrentSlice(Math.min(totalSlices, currentSlice + 1))}
          disabled={currentSlice >= totalSlices}
          className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          title="Next Slice (→)"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
