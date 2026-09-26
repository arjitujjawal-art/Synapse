"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Info, Activity, AlertCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function StrokeBasics() {
  const [showTechnical, setShowTechnical] = useState(false);

  return (
    <section className="section-padding bg-bg-secondary border-y border-border-soft">
      <div className="container-narrow">
        <SectionHeading label="CLINICAL FOUNDATION">
          Understanding the Ischemic Core and Penumbra
        </SectionHeading>

        <p className="body-large text-text-secondary max-w-3xl mt-8 mb-12">
          Acute ischemic stroke occurs when arterial occlusion deprives brain parenchyma
          of vital cerebral perfusion. Clinical management hinges on distinguishing
          non-viable infarcted tissue from salvageable hypoperfused zones.
        </p>

        {/* Core vs Penumbra Dual Columns */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {/* Ischemic Core */}
          <motion.div
            variants={fadeUp}
            className="p-8 rounded-3xl bg-bg-primary border border-border-soft relative overflow-hidden group hover:border-[#E53935]/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-4 h-4 rounded-full bg-[#E53935] shadow-[0_0_12px_rgba(229,57,53,0.4)]" />
              <h3 className="text-2xl font-semibold text-text-primary tracking-tight">
                Ischemic Core
              </h3>
            </div>
            <p className="text-[17px] text-text-secondary leading-relaxed mb-6">
              Brain tissue that is suspected to be severely and irreversibly injured.
              Cellular bioenergetic collapse and cytotoxic edema have already taken place,
              rendering this territory non-recoverable even with rapid recanalization.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#E53935]/10 text-[#E53935]">
              Irreversible Damage · Immediate Quantification
            </div>
          </motion.div>

          {/* Penumbra */}
          <motion.div
            variants={fadeUp}
            className="p-8 rounded-3xl bg-bg-primary border border-border-soft relative overflow-hidden group hover:border-[#2457F5]/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-4 h-4 rounded-full bg-[#2457F5] shadow-[0_0_12px_rgba(36,87,245,0.4)]" />
              <h3 className="text-2xl font-semibold text-text-primary tracking-tight">
                Penumbra (Tissue at Risk)
              </h3>
            </div>
            <p className="text-[17px] text-text-secondary leading-relaxed mb-6">
              Hypoperfused tissue surrounding the ischemic core that is functionally
              impaired but structurally viable due to collateral circulation. This is
              the critical target for endovascular thrombectomy and thrombolysis.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#2457F5]/10 text-[#2457F5]">
              Potentially Salvageable · Time-Sensitive
            </div>
          </motion.div>
        </motion.div>

        {/* Scan Visualization Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl border border-border-soft bg-bg-primary p-6 md:p-10 mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 relative aspect-square max-h-[440px] w-full rounded-2xl overflow-hidden bg-black/5 mx-auto">
              <Image
                src="/scans/scan-1.jpeg"
                alt="Brain perfusion scan illustration"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-medium">
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md">
                  Study KTX-2026-0847
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md">
                  Axial Cut L3
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <span className="heading-label tracking-[0.15em] text-[#E8158B]">
                THE CLINICAL EQUATION
              </span>
              <h4 className="text-3xl font-semibold text-text-primary tracking-tight">
                Mismatch Volume: The Window of Opportunity
              </h4>
              <p className="body-medium text-text-secondary">
                The difference between the penumbral volume and the ischemic core is
                termed the <strong>ischemic mismatch</strong>. A favorable mismatch ratio
                indicates that substantial salvageable brain tissue remains, assisting
                multidisciplinary stroke teams in making time-critical interventions.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-border-soft">
                  <span className="text-xs text-text-tertiary block mb-1">Core vs Penumbra</span>
                  <span className="text-xl font-semibold text-text-primary">18.4 mL vs 52.7 mL</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-border-soft">
                  <span className="text-xs text-text-tertiary block mb-1">Mismatch Ratio</span>
                  <span className="text-xl font-semibold text-[#2457F5]">2.86 (Favorable)</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Expandable Technical Details */}
        <div className="border border-border-soft rounded-2xl overflow-hidden bg-white">
          <button
            onClick={() => setShowTechnical(!showTechnical)}
            className="w-full px-6 py-5 flex items-center justify-between hover:bg-black/[0.02] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Info size={18} className="text-[#E8158B]" />
              <span className="text-[15px] font-medium text-text-primary">
                Learn the technical detail — Perfusion Thresholds & Trial Criteria
              </span>
            </div>
            <motion.div
              animate={{ rotate: showTechnical ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={18} className="text-text-tertiary" />
            </motion.div>
          </button>

          <AnimatePresence>
            {showTechnical && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden border-t border-border-soft bg-bg-primary/50"
              >
                <div className="p-6 md:p-8 space-y-6 text-sm text-text-secondary leading-relaxed">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
                        <Activity size={16} className="text-[#E53935]" />
                        Perfusion Thresholds
                      </h5>
                      <p>
                        In CT perfusion and MR perfusion, the ischemic core is typically
                        defined by severe reduction in Cerebral Blood Flow (CBF &lt; 30% of normal
                        contralateral hemisphere), while penumbra is identified by delayed time-to-maximum
                        (Tmax &gt; 6 seconds).
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
                        <AlertCircle size={16} className="text-[#2457F5]" />
                        DEFUSE 3 &amp; DAWN Framework
                      </h5>
                      <p>
                        Clinical trials established that patients presenting in the extended window
                        (6 to 24 hours from last known well) with a target mismatch (mismatch volume ≥ 15 mL
                        and mismatch ratio ≥ 1.8) derive substantial benefit from mechanical thrombectomy.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
