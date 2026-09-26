"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Zap, BarChart3, Shield, Layout } from "lucide-react";

const PILLARS = [
  {
    icon: Zap,
    title: "Faster interpretation workflow",
    description:
      "Designed to reduce friction across the entire pipeline — from upload through review, segmentation, quantification, and explanation.",
  },
  {
    icon: BarChart3,
    title: "Consistent quantification",
    description:
      "Outputs include core volume, penumbra volume, mismatch volume, mismatch ratio, confidence scoring, and image quality assessment.",
  },
  {
    icon: Shield,
    title: "Human-in-the-loop review",
    description:
      "Built around confidence, uncertain boundaries, and clinician review. Never implies autonomous medical decision-making.",
  },
  {
    icon: Layout,
    title: "One visual workspace",
    description:
      "Scan visualization, overlay control, quantified measurements, and AI findings — all accessible within a single interface.",
  },
];

export default function Impact() {
  return (
    <section className="section-padding-lg bg-bg-primary">
      <div className="container-narrow">
        <SectionHeading label="Impact">
          From prediction to usable
          <br />
          <span className="text-text-secondary">stroke intelligence.</span>
        </SectionHeading>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-20 grid md:grid-cols-2 gap-8"
        >
          {PILLARS.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={fadeUp}
              className="p-8 md:p-10 rounded-2xl border border-border-soft bg-bg-secondary hover:shadow-lg transition-shadow duration-500 group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center mb-6 group-hover:bg-accent/12 transition-colors">
                <pillar.icon size={22} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                {pillar.title}
              </h3>
              <p className="body-medium">{pillar.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
