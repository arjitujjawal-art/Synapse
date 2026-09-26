"use client";

import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, Stethoscope, AlertTriangle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Safety() {
  return (
    <section className="section-padding bg-bg-primary">
      <div className="container-narrow">
        <SectionHeading label="SAFETY & ETHICAL POSTURE">
          Human-Centered Decision Support
        </SectionHeading>

        <p className="body-large text-text-secondary max-w-3xl mt-8 mb-12">
          KORTEX is strictly designed to augment, never replace, the irreplaceable judgment
          of qualified physicians, neurologists, and neuroradiologists.
        </p>

        {/* Highlighted Medical Disclaimer Card */}
        <div className="p-8 md:p-12 rounded-3xl bg-white border border-border-soft shadow-sm mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-700 mt-1 flex-shrink-0">
              <AlertTriangle size={24} />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold block mb-1">
                Official Intended Use Statement
              </span>
              <h3 className="text-xl md:text-2xl font-semibold text-text-primary">
                KORTEX is a research and decision-support prototype. AI-generated measurements
                and findings require review by a qualified healthcare professional.
              </h3>
            </div>
          </div>
          <p className="text-base text-text-secondary leading-relaxed pl-0 md:pl-16">
            This prototype is designed to demonstrate how artificial intelligence can make stroke
            imaging review more consistent, visual, and rapid. It does not possess medical device
            clearance, does not autonomously diagnose stroke or select thrombolytic or thrombectomy
            therapies, and must not serve as the sole basis for clinical treatment decisions.
          </p>
        </div>

        {/* 3 Core Ethical Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white/70 border border-border-soft">
            <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center text-text-primary mb-6">
              <UserCheck size={22} />
            </div>
            <h4 className="text-lg font-semibold text-text-primary mb-3">
              Human-in-the-Loop
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              Every segmentation mask and volumetric calculation is surfaced alongside raw scans,
              enabling instantaneous clinician inspection, verification, and manual boundary adjustment.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/70 border border-border-soft">
            <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center text-text-primary mb-6">
              <ShieldCheck size={22} />
            </div>
            <h4 className="text-lg font-semibold text-text-primary mb-3">
              Confidence &amp; Calibration
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              Rather than black-box binary outputs, KORTEX explicitly visualizes boundary uncertainty
              zones, alerting physicians to imaging ambiguity before critical interventions.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/70 border border-border-soft">
            <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center text-text-primary mb-6">
              <Stethoscope size={22} />
            </div>
            <h4 className="text-lg font-semibold text-text-primary mb-3">
              Clinical Transparency
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              All reported values — core volume, penumbra volume, and mismatch ratios — maintain
              full mathematical auditability, mapped directly back to anatomical voxel coordinates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
