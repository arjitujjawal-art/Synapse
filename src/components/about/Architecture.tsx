"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { ArrowDown, Layers, Cpu, ShieldCheck, FileSpreadsheet } from "lucide-react";

export default function Architecture() {
  return (
    <section className="section-padding bg-bg-secondary border-t border-border-soft">
      <div className="container-narrow">
        <SectionHeading label="SYSTEM SPECIFICATION">
          Technical Pipeline & Platform Architecture
        </SectionHeading>

        <p className="body-large text-text-secondary max-w-3xl mb-16 -mt-8">
          KORTEX separates user interface state from the underlying medical inference pipeline,
          ensuring modularity, auditability, and immediate readiness for PACS backend connectivity.
        </p>

        {/* Current Prototype vs Future Platform Dual Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Current Prototype Pipeline */}
          <div className="p-8 md:p-10 rounded-3xl bg-bg-primary border border-border-soft">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-soft">
              <div>
                <span className="text-xs font-mono text-accent font-semibold uppercase tracking-wider block">
                  Current Implementation
                </span>
                <h3 className="text-2xl font-semibold text-text-primary">
                  Frontend Prototype Architecture
                </h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600">
                Active Demo
              </span>
            </div>

            <div className="space-y-4 relative">
              <div className="p-4 rounded-2xl bg-white border border-border-soft flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center font-mono text-xs font-bold">
                  01
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">Multi-Slice Input Layer</h4>
                  <p className="text-xs text-text-tertiary">Direct client-side ingestion of series files</p>
                </div>
              </div>

              <div className="flex justify-center text-black/20 my-1">
                <ArrowDown size={16} />
              </div>

              <div className="p-4 rounded-2xl bg-white border border-border-soft flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center font-mono text-xs font-bold">
                  02
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">Quality & Geometry Parser</h4>
                  <p className="text-xs text-text-tertiary">Integrity verification & slice continuity sorting</p>
                </div>
              </div>

              <div className="flex justify-center text-black/20 my-1">
                <ArrowDown size={16} />
              </div>

              <div className="p-4 rounded-2xl bg-white border border-border-soft flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-soft text-accent flex items-center justify-center font-mono text-xs font-bold">
                  03
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">Simulated Neural Engine</h4>
                  <p className="text-xs text-text-tertiary">Asynchronous pipeline with neural pulse feedback</p>
                </div>
              </div>

              <div className="flex justify-center text-black/20 my-1">
                <ArrowDown size={16} />
              </div>

              <div className="p-4 rounded-2xl bg-white border border-border-soft flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center font-mono text-xs font-bold">
                  04
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">Interactive Workstation & Findings</h4>
                  <p className="text-xs text-text-tertiary">Synchronized overlays, volumetric metrics & export</p>
                </div>
              </div>
            </div>
          </div>

          {/* Future Platform Architecture */}
          <div className="p-8 md:p-10 rounded-3xl bg-bg-primary border border-border-soft">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-soft">
              <div>
                <span className="text-xs font-mono text-text-tertiary font-semibold uppercase tracking-wider block">
                  Future Roadmap
                </span>
                <h3 className="text-2xl font-semibold text-text-primary">
                  Clinical Multimodal Platform
                </h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/5 text-text-secondary">
                Planned Backend
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/70 border border-border-soft flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-text-secondary">
                  <Layers size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">DICOM / PACS Protocol Connector</h4>
                  <p className="text-xs text-text-tertiary">Hospital PACS streaming via C-STORE and DICOMweb</p>
                </div>
              </div>

              <div className="flex justify-center text-black/20 my-1">
                <ArrowDown size={16} />
              </div>

              <div className="p-4 rounded-2xl bg-white/70 border border-border-soft flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-text-secondary">
                  <Cpu size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">Multimodal Encoders & Fusion</h4>
                  <p className="text-xs text-text-tertiary">Dual CT perfusion + MRI diffusion transformer backbone</p>
                </div>
              </div>

              <div className="flex justify-center text-black/20 my-1">
                <ArrowDown size={16} />
              </div>

              <div className="p-4 rounded-2xl bg-white/70 border border-border-soft flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-text-secondary">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">Dual Decoders + Confidence Head</h4>
                  <p className="text-xs text-text-tertiary">Calibrated Bayesian uncertainty estimation</p>
                </div>
              </div>

              <div className="flex justify-center text-black/20 my-1">
                <ArrowDown size={16} />
              </div>

              <div className="p-4 rounded-2xl bg-white/70 border border-border-soft flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-text-secondary">
                  <FileSpreadsheet size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">EHR & Tele-Stroke Integration</h4>
                  <p className="text-xs text-text-tertiary">HL7 FHIR compliant structured stroke reports</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
