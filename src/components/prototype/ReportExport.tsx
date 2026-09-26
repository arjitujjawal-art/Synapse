"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Printer, X } from "lucide-react";
import { useKortexStore } from "@/lib/store";
import { AI_REPORT } from "@/lib/mock-study";

export default function ReportExport() {
  const [showModal, setShowModal] = useState(false);
  const { analysis } = useKortexStore();

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="btn-secondary text-xs py-2 px-4 flex items-center gap-2"
      >
        <Download size={14} />
        <span>Export Clinical Report</span>
      </button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl border border-border-soft"
            >
              {/* Report Header */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-border-soft">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">
                    KORTEX / STROKE INTELLIGENCE
                  </span>
                  <h3 className="text-2xl font-bold text-text-primary mt-1">
                    Volumetric Perfusion Assessment Report
                  </h3>
                  <p className="text-xs text-text-tertiary mt-1">
                    Study ID: {analysis?.studyId ?? "KTX-2026-0847"} · Generated {new Date().toLocaleDateString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-black/5 text-text-tertiary transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Summary Table */}
              <div className="space-y-6 text-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-bg-primary border border-border-soft">
                  <div>
                    <span className="text-xs text-text-tertiary block">Core Volume</span>
                    <span className="text-lg font-bold text-[#E53935]">
                      {analysis?.coreVolumeMl ?? 18.4} mL
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-text-tertiary block">Penumbra</span>
                    <span className="text-lg font-bold text-[#2457F5]">
                      {analysis?.penumbraVolumeMl ?? 52.7} mL
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-text-tertiary block">Mismatch Ratio</span>
                    <span className="text-lg font-bold text-text-primary">
                      {analysis?.mismatchRatio ?? 2.86}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-text-tertiary block">Confidence</span>
                    <span className="text-lg font-bold text-emerald-600">
                      {analysis?.confidence ?? 91}%
                    </span>
                  </div>
                </div>

                {/* Structured Findings */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-text-primary text-xs uppercase tracking-wider">
                    Radiological Assessment
                  </h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {AI_REPORT.observation}
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed mt-2">
                    {AI_REPORT.uncertaintyNote}
                  </p>
                </div>

                {/* Legal & Regulatory Disclaimer */}
                <div className="p-4 rounded-xl bg-black/[0.03] border border-border-soft text-[11px] text-text-tertiary leading-relaxed">
                  <strong>Notice:</strong> {AI_REPORT.disclaimer}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-border-soft">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary text-xs py-2 px-5"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="btn-primary text-xs py-2 px-5 flex items-center gap-2"
                >
                  <Printer size={14} />
                  <span>Print / Save PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
