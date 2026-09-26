"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function AboutHero() {
  return (
    <section className="pt-36 pb-20 md:pt-44 md:pb-28 relative overflow-hidden">
      <div className="container-narrow">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-3xl"
        >
          <span className="heading-label mb-4 block tracking-[0.2em]">
            ABOUT KORTEX
          </span>
          <h1 className="heading-section text-text-primary mb-8 font-semibold tracking-tight">
            Turning complex stroke imaging into interpretable visual intelligence.
          </h1>
          <p className="body-large text-text-secondary leading-relaxed">
            KORTEX is a medical imaging interface concept for visualizing suspected
            ischemic core and penumbra, quantifying lesion burden, surfacing confidence,
            and producing structured AI-assisted findings.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
