"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { ArrowDown, ArrowRight, Check, ScanLine } from "lucide-react";
import styles from "./Workflow.module.css";

const CURRENT_STEPS = [
  "Scan",
  "Manual review",
  "Separate measurements",
  "Interpretation",
  "Reporting",
];

const KORTEX_STEPS = [
  { label: "Patient Study", detail: "Multiple imaging inputs" },
  { label: "Quality Check", detail: "Automated integrity validation" },
  { label: "Segmentation", detail: "AI-assisted region detection" },
  { label: "Quantification", detail: "Automated volume measurement" },
  { label: "Confidence", detail: "Uncertainty-aware outputs" },
  { label: "Visual Review", detail: "Interactive overlay workspace" },
  { label: "AI Findings Report", detail: "Structured summary" },
];

export default function Workflow() {
  return (
    <section className={`section-padding-lg bg-bg-secondary ${styles.workflow}`}>
      <div className="container-narrow">
        <SectionHeading label="Workflow">
          From fragmented steps
          <br />
          <span className="text-text-secondary">to a unified workflow.</span>
        </SectionHeading>

        <div className="mt-12 grid lg:grid-cols-[0.75fr_1.25fr] gap-8 items-start">
          {/* Current Workflow */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p variants={fadeUp} className="heading-label mb-8 text-text-tertiary">
              Traditional / Fragmented
            </motion.p>
            <div className="space-y-0 rounded-3xl border border-[#ecd8df] bg-[#fff1f5] p-6 md:p-8">
              {CURRENT_STEPS.map((step, i) => (
                <motion.div key={step} variants={fadeUp}>
                  <div className="flex items-center gap-4 py-5 border-b border-border-soft">
                    <span className="w-7 h-7 rounded-full bg-[#f3d5e0] flex items-center justify-center text-xs font-medium text-text-primary">
                      {i + 1}
                    </span>
                    <span className="text-[15px] text-text-secondary">{step}</span>
                  </div>
                  {i < CURRENT_STEPS.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ArrowDown size={14} className="text-text-tertiary/40" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* KORTEX Workflow */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-8">
              <p className="heading-label text-accent">KORTEX</p>
              <ArrowRight size={14} className="text-accent" />
            </motion.div>
            <div className="relative rounded-3xl border border-accent/25 bg-gradient-to-br from-[#eee7f8] via-[#f7edf6] to-[#fff1f4] p-6 md:p-9 shadow-[0_24px_80px_rgba(117,98,164,0.10)]">
              <div className="absolute left-[42px] md:left-[54px] top-[58px] bottom-[100px] w-px bg-accent/35" />
              {KORTEX_STEPS.map((step, i) => (
                <motion.div key={step.label} variants={fadeUp}>
                  <div className="relative flex items-start gap-5 py-4 group">
                    <span className="w-9 h-9 rounded-full bg-[#e4d8f3] border border-accent/25 shadow-sm flex items-center justify-center text-xs font-semibold text-text-primary shrink-0 z-10">
                      {i === 0 ? <ScanLine size={16} /> : i === KORTEX_STEPS.length - 1 ? <Check size={16} /> : i + 1}
                    </span>
                    <div>
                      <p className="text-[15px] font-medium text-text-primary">
                        {step.label}
                      </p>
                      <p className="text-[13px] text-text-tertiary mt-0.5">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="mt-5 ml-14 flex items-center gap-3 text-[12px] font-semibold tracking-[0.12em] text-text-primary">
                ONE CONTINUOUS REVIEW PATH <ArrowRight size={15} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
