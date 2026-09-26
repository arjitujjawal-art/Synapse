"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  UploadCloud,
  FolderArchive,
  CheckCircle2,
  Cpu,
  Layers,
  Ruler,
  ShieldAlert,
  FileText,
  ChevronRight
} from "lucide-react";

const STEPS = [
  {
    num: "01",
    id: "upload",
    title: "Multi-Image Ingestion",
    icon: UploadCloud,
    tag: "Input Handling",
    desc: "Seamless ingestion of axial slice series. Designed for multi-image DICOM and NIfTI volumes, simulating real emergency medical workflows with rapid client-side parsing.",
    metrics: [
      { label: "Supported Types", val: "DICOM, NIfTI, JPG, PNG" },
      { label: "Throughput", val: "Instant multi-slice buffer" }
    ],
  },
  {
    num: "02",
    id: "organize",
    title: "Study Organization",
    icon: FolderArchive,
    tag: "Metadata Sorting",
    desc: "Automatic series identification, anatomical orientation extraction (axial, coronal, sagittal), and spatial sorting into continuous volumetric geometry.",
    metrics: [
      { label: "Orientation", val: "Anatomical Axial" },
      { label: "Geometry", val: "Isotropic voxel matrix" }
    ],
  },
  {
    num: "03",
    id: "quality",
    title: "Quality Check",
    icon: CheckCircle2,
    tag: "Artifact Detection",
    desc: "Rigorous pre-inference validation: evaluating motion artifacts, slice continuity, pixel intensity range, and anatomical completeness before AI processing.",
    metrics: [
      { label: "Integrity", val: "Passed (100%)" },
      { label: "Quality Score", val: "87% (Optimal)" }
    ],
  },
  {
    num: "04",
    id: "preprocess",
    title: "Preprocessing Pipeline",
    icon: Cpu,
    tag: "Signal Conditioning",
    desc: "Multi-stage automated conditioning: affine registration to standard stereotactic space, skull stripping / brain isolation, intensity normalization, and zero-loss resampling.",
    metrics: [
      { label: "Brain Masking", val: "Skull Stripped" },
      { label: "Normalization", val: "Z-score standardized" }
    ],
  },
  {
    num: "05",
    id: "segment",
    title: "AI Segmentation",
    icon: Layers,
    tag: "Deep Neural Engine",
    desc: "High-resolution convolutional neural networks delineate non-viable ischemic core against hypoperfused penumbra with voxel-level precision.",
    metrics: [
      { label: "Core Classification", val: "Red Overlay (#E53935)" },
      { label: "Penumbra Classification", val: "Blue Overlay (#2457F5)" }
    ],
  },
  {
    num: "06",
    id: "quantify",
    title: "Quantification & Mismatch",
    icon: Ruler,
    tag: "Volumetrics",
    desc: "Direct volumetric integration converts voxel counts into clinical millilitres, instantly calculating mismatch volume and mismatch ratio to guide clinical evaluation.",
    metrics: [
      { label: "Core Volume", val: "18.4 mL" },
      { label: "Mismatch Ratio", val: "2.86" }
    ],
  },
  {
    num: "07",
    id: "confidence",
    title: "Confidence & Uncertainty",
    icon: ShieldAlert,
    tag: "Safety & Reliability",
    desc: "Bayesian uncertainty estimation highlights boundary transition zones where core and penumbra overlap, ensuring clinicians see exactly what the model is certain of.",
    metrics: [
      { label: "Model Confidence", val: "91% (High)" },
      { label: "Boundary Margin", val: "Moderate uncertainty" }
    ],
  },
  {
    num: "08",
    id: "report",
    title: "Structured AI Report",
    icon: FileText,
    tag: "Clinical Synthesis",
    desc: "Synthesizes quantitative metrics, anatomical localization, and uncertainty notes into a standardized decision-support report ready for radiological review.",
    metrics: [
      { label: "Hemisphere", val: "Left MCA territory" },
      { label: "Auditing", val: "Exportable & Traceable" }
    ],
  },
];

export default function Pipeline() {
  const [activeStep, setActiveStep] = useState(0);
  const current = STEPS[activeStep];

  return (
    <section className="section-padding bg-bg-primary">
      <div className="container-narrow">
        <SectionHeading label="THE 8-STAGE WORKFLOW">
          How KORTEX Transforms Imaging to Intelligence
        </SectionHeading>

        <p className="body-large text-text-secondary max-w-3xl mt-8 mb-12">
          From the instant scan data enters the system to the generation of structured
          clinical findings, every step is built for transparency, precision, and clinician trust.
        </p>

        {/* Interactive Step Navigator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step Selector List */}
          <div className="lg:col-span-5 space-y-2">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = idx === activeStep;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-center justify-between border ${
                    isSelected
                      ? "bg-white border-accent/40 shadow-sm"
                      : "bg-white/40 border-transparent hover:bg-white/80"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-mono font-semibold px-2 py-1 rounded-md ${
                        isSelected
                          ? "bg-accent text-white"
                          : "bg-black/5 text-text-tertiary"
                      }`}
                    >
                      {step.num}
                    </span>
                    <div>
                      <h4
                        className={`text-sm font-semibold transition-colors ${
                          isSelected ? "text-text-primary" : "text-text-secondary"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <span className="text-xs text-text-tertiary">
                        {step.tag}
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className={`transition-transform ${
                      isSelected ? "text-accent translate-x-1" : "text-black/20"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active Step Visual Detail Display */}
          <div className="lg:col-span-7 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-8 md:p-10 rounded-3xl bg-white border border-border-soft shadow-sm"
              >
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-border-soft">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent-soft flex items-center justify-center text-accent">
                      <current.icon size={24} />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold block">
                        Stage {current.num} · {current.tag}
                      </span>
                      <h3 className="text-2xl font-semibold text-text-primary">
                        {current.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="body-medium text-text-secondary leading-relaxed mb-8">
                  {current.desc}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-soft">
                  {current.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-bg-primary border border-border-soft"
                    >
                      <span className="text-xs text-text-tertiary block mb-1">
                        {m.label}
                      </span>
                      <span className="text-sm font-semibold text-text-primary">
                        {m.val}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between text-xs text-text-tertiary">
                  <span>Part of the standard KORTEX verification sequence</span>
                  <span className="font-mono">Step {activeStep + 1} of 8</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
