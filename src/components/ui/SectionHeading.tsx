"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  label?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionHeading({ label, children, className = "" }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {label && (
        <p className="heading-label mb-4">{label}</p>
      )}
      <h2 className="heading-section text-text-primary">{children}</h2>
    </motion.div>
  );
}
