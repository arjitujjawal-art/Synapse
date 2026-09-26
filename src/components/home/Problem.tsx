"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Layers3, MousePointer2, Sparkles } from "lucide-react";

const SNAPSHOT = [
  {
    icon: Layers3,
    eyebrow: "WHAT IT IS",
    title: "A stroke imaging review workspace",
    text: "KORTEX brings scans, core and penumbra overlays, quantified measurements, model confidence, and findings into one clear interface.",
  },
  {
    icon: MousePointer2,
    eyebrow: "HOW TO USE IT",
    title: "Upload. Review. Understand.",
    text: "Add a patient study, let the simulated pipeline organize and segment the images, then inspect overlays and measurements before exporting a summary.",
  },
  {
    icon: Sparkles,
    eyebrow: "WHY IT IS BETTER",
    title: "Context, not just a colored mask",
    text: "Instead of separating visualization, measurement, uncertainty, and reporting across tools, KORTEX keeps the full reasoning trail visible and reviewable.",
  },
];

const BRAIN_VIEWS = [
  { src: "/mri/mri-01.jpeg", label: "Anatomy", detail: "Axial FLAIR" },
  { src: "/mri/mri-03.jpeg", label: "Tissue context", detail: "Structural review" },
  { src: "/mri/mri-05.jpeg", label: "Longitudinal view", detail: "Follow-up study" },
];

export default function Problem() {
  return (
    <section className="section-padding-lg bg-bg-secondary relative overflow-hidden">
      <div className="pastel-orb w-72 h-72 bg-accent-soft/80 -right-24 top-28" />
      <div className="container-narrow">
        <SectionHeading>
          Every minute changes the brain.
          <br />
          <span className="text-text-secondary">
            Imaging should not become the bottleneck.
          </span>
        </SectionHeading>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid md:grid-cols-2 gap-8 md:gap-10"
        >
          <motion.div variants={fadeUp}>
            <p className="body-large">
              When an ischemic stroke occurs, brain tissue begins to change rapidly.
              Some areas may already be severely damaged — the{" "}
              <span className="font-semibold text-core">ischemic core</span>. Surrounding
              this core, there is often a region of tissue that is at risk but not yet
              irreversibly injured — the{" "}
              <span className="font-semibold text-penumbra">penumbra</span>.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="body-large">
              Interpreting and quantifying these regions from imaging studies can be
              difficult, subjective, and time-sensitive. Different readers may reach
              different conclusions. The challenge is not just seeing the scan — it is
              extracting structured, consistent, and interpretable information from it.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12"
        >
          <p className="heading-label mb-5">KORTEX AT A GLANCE</p>
          <div className="grid lg:grid-cols-3 gap-px overflow-hidden rounded-3xl border border-border-soft bg-border-soft">
            {SNAPSHOT.map((item) => (
              <div key={item.eyebrow} className="bg-bg-primary p-6 md:p-7 flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <item.icon size={23} className="text-accent shrink-0" strokeWidth={1.7} />
                  <p className="text-[12px] tracking-[0.16em] font-semibold text-accent-deep">{item.eyebrow}</p>
                </div>
                <h3 className="text-[22px] leading-snug font-semibold tracking-[-0.025em] mb-3">{item.title}</h3>
                <p className="body-medium">{item.text}</p>
              </div>
            ))}
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-8 rounded-[30px] border border-[#eadbe2] bg-[#fffafb] p-4 md:p-6 shadow-[0_24px_70px_rgba(101,70,84,.08)]"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2 pt-2 pb-6">
              <div>
                <p className="text-[11px] font-semibold tracking-[.16em] text-[#9b7183] uppercase">Clinical visual language</p>
                <h3 className="text-2xl md:text-3xl font-medium tracking-[-.035em] mt-2">The brain, made easier to read.</h3>
              </div>
              <p className="text-sm text-text-secondary max-w-sm leading-relaxed">Familiar imaging views, presented with calm hierarchy and enough context to support focused review.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {BRAIN_VIEWS.map((view, index) => (
                <motion.figure
                  key={view.label}
                  variants={fadeUp}
                  className={`relative overflow-hidden rounded-[22px] bg-[#f3dce6] aspect-[4/3] ${index === 1 ? "md:-translate-y-2" : ""}`}
                >
                  <Image
                    src={view.src}
                    alt={`${view.label} brain MRI`}
                    fill
                    className="object-cover grayscale contrast-[1.08] opacity-70 mix-blend-multiply transition-transform duration-700 hover:scale-[1.035]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#704c5d]/55 via-transparent to-white/10" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <span className="block text-[11px] tracking-[.15em] uppercase text-white/70">0{index + 1} · {view.detail}</span>
                    <span className="block text-lg font-medium mt-1">{view.label}</span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>

            <div className="flex items-center gap-3 px-2 pt-5 text-[12px] text-[#8a6676]">
              <span className="w-2 h-2 rounded-full bg-[#d99ab5]" />
              Designed for clear communication between imaging, analysis, and clinical review.
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
