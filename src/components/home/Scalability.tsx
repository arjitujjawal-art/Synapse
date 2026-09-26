"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";

const ROADMAP = [
  {
    stage: "NOW",
    label: "Prototype interface",
    items: ["Multi-image upload", "Simulated pipeline", "Interactive scan viewer", "AI findings report"],
    active: true,
  },
  {
    stage: "NEXT",
    label: "Backend integration",
    items: ["DICOM / NIfTI workflows", "Real model inference", "Live segmentation results"],
    active: false,
  },
  {
    stage: "HOSPITAL",
    label: "Clinical workflow",
    items: ["PACS integration", "Clinical workflow integration", "Audit logging"],
    active: false,
  },
  {
    stage: "NETWORK",
    label: "Multi-center deployment",
    items: ["Multi-site access", "Standardized protocols", "Remote collaboration"],
    active: false,
  },
  {
    stage: "RESEARCH",
    label: "Advanced AI",
    items: ["Federated learning", "External validation", "Advanced multimodal AI"],
    active: false,
  },
];

export default function Scalability() {
  return (
    <section className="section-padding-lg bg-bg-primary">
      <div className="container-narrow">
        <SectionHeading label="Scalability">
          Built as a prototype.
          <br />
          <span className="text-text-secondary">Designed as a platform.</span>
        </SectionHeading>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-20 relative"
        >
          {/* Connecting line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-border-soft to-border-soft hidden md:block" />

          <div className="space-y-8">
            {ROADMAP.map((item, i) => (
              <motion.div
                key={item.stage}
                variants={fadeUp}
                className="relative flex gap-8 md:gap-12"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex flex-col items-center shrink-0">
                  <div
                    className={`w-4 h-4 rounded-full border-2 z-10 ${
                      item.active
                        ? "bg-accent border-accent shadow-lg shadow-accent/30"
                        : "bg-bg-secondary border-border-soft"
                    }`}
                    style={{ marginLeft: "16px" }}
                  />
                </div>

                {/* Content Card */}
                <div
                  className={`flex-1 p-6 md:p-8 rounded-2xl border transition-all duration-300 ${
                    item.active
                      ? "bg-bg-secondary border-accent/20 shadow-lg"
                      : "bg-bg-secondary/50 border-border-soft"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`text-xs font-bold tracking-[0.15em] px-3 py-1 rounded-full ${
                        item.active
                          ? "bg-accent/10 text-accent"
                          : "bg-bg-soft text-text-tertiary"
                      }`}
                    >
                      {item.stage}
                    </span>
                    <span className="text-sm font-medium text-text-primary">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.items.map((detail) => (
                      <span
                        key={detail}
                        className="text-xs px-3 py-1.5 rounded-full bg-bg-soft text-text-secondary border border-border-soft"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                  {!item.active && (
                    <p className="mt-3 text-[11px] text-text-tertiary italic">
                      {i <= 2 ? "Future capability" : "Research direction"}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
