"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Eye, Ruler, ShieldCheck, FileText } from "lucide-react";

const CONCEPTS = [
  {
    icon: Eye,
    keyword: "SEE",
    description: "Visualize suspected core and penumbra regions directly on the scan.",
  },
  {
    icon: Ruler,
    keyword: "MEASURE",
    description: "Quantify lesion volumes, mismatch, and tissue ratios automatically.",
  },
  {
    icon: ShieldCheck,
    keyword: "TRUST",
    description: "Surface model confidence and boundary uncertainty transparently.",
  },
  {
    icon: FileText,
    keyword: "EXPLAIN",
    description: "Generate a structured AI findings summary for clinical review.",
  },
];

export default function Innovation() {
  return (
    <section className="section-padding-lg bg-bg-secondary">
      <div className="container-narrow">
        <SectionHeading label="Innovation">
          Not another segmentation screen.
        </SectionHeading>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="body-large mt-6 max-w-2xl"
        >
          KORTEX turns a patient imaging study into an interpretable visual
          analysis workflow — not just another overlay tool.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {CONCEPTS.map((concept, i) => (
            <motion.div
              key={concept.keyword}
              variants={fadeUp}
              className="relative p-8 rounded-2xl bg-bg-primary border border-border-soft group hover:border-accent/20 transition-all duration-500"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/8 flex items-center justify-center mb-6 group-hover:bg-accent/15 transition-colors">
                <concept.icon size={20} className="text-accent" />
              </div>
              <p className="text-2xl font-bold tracking-tight text-text-primary mb-3">
                {concept.keyword}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                {concept.description}
              </p>
              {/* Subtle accent line on hover */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-accent rounded-full group-hover:w-12 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
