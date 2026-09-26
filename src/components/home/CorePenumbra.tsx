"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

const VIEWS = [
  { id: "raw", label: "Raw Scan", description: "Original brain imaging scan" },
  { id: "core", label: "Core", description: "Suspected ischemic core — severely damaged tissue" },
  { id: "penumbra", label: "Penumbra", description: "At-risk tissue surrounding the core" },
  { id: "combined", label: "Combined", description: "Full core and penumbra overlay map" },
] as const;

export default function CorePenumbra() {
  const [activeView, setActiveView] = useState<string>("raw");

  // Map views to scan images showing progressively more detail
  const getImageForView = (view: string) => {
    switch (view) {
      case "raw":
        return "/scans/scan-7.jpeg"; // Plain MRI slices
      case "core":
        return "/scans/scan-3.jpeg"; // Core segmentation
      case "penumbra":
        return "/scans/scan-4.jpeg"; // Penumbra mapping
      case "combined":
        return "/scans/scan-6.jpeg"; // Combined overlay
      default:
        return "/scans/scan-7.jpeg";
    }
  };

  return (
    <section className="section-padding-lg bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[52%] opacity-[0.055] grayscale pointer-events-none">
        <Image
          src="/reference/brain-cases.jpeg"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 52vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/70 to-bg-primary/20" />
      </div>
      <div className="container-narrow relative z-10">
        <SectionHeading label="Visual Intelligence">
          See the regions that matter.
        </SectionHeading>

        <div className="mt-20 flex flex-col lg:flex-row gap-12 items-center">
          {/* Scan Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex-1 w-full max-w-2xl"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-black shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={getImageForView(activeView)}
                    alt={`Brain scan — ${activeView} view`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* View indicator badge */}
              <div className="absolute top-4 left-4 glass rounded-full px-4 py-2">
                <span className="text-xs font-medium text-text-primary">
                  {VIEWS.find((v) => v.id === activeView)?.label}
                </span>
              </div>

              {/* Color legend */}
              {activeView !== "raw" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 glass rounded-xl px-4 py-3 flex gap-4"
                >
                  {(activeView === "core" || activeView === "combined") && (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-core" />
                      <span className="text-xs font-medium">Core</span>
                    </div>
                  )}
                  {(activeView === "penumbra" || activeView === "combined") && (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-penumbra" />
                      <span className="text-xs font-medium">Penumbra</span>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-3 w-full lg:w-auto"
          >
            {VIEWS.map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`text-left p-5 rounded-xl transition-all duration-300 border ${
                  activeView === view.id
                    ? "bg-bg-secondary border-border-soft shadow-lg"
                    : "border-transparent hover:bg-bg-soft"
                }`}
                style={{ minWidth: "260px" }}
              >
                <p
                  className={`text-sm font-semibold mb-1 transition-colors ${
                    activeView === view.id ? "text-accent" : "text-text-primary"
                  }`}
                >
                  {view.label}
                </p>
                <p className="text-xs text-text-tertiary">{view.description}</p>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
