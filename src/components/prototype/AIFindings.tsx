"use client";

import { useKortexStore } from "@/lib/store";
import { AI_REPORT } from "@/lib/mock-study";
import { Sparkles, AlertCircle } from "lucide-react";

export default function AIFindings() {
  const { analysis } = useKortexStore();

  const findings = analysis?.findings ?? [
    "A suspected ischemic region is visualized in the left cerebral hemisphere.",
    "Estimated core volume: 18.4 mL",
    "Estimated penumbra volume: 52.7 mL",
    "The mismatch volume of 34.3 mL suggests a significant region of potentially salvageable tissue.",
    "The model indicates higher confidence in the central lesion region with moderate uncertainty around the posterior boundary margin.",
    "This result is intended for research and decision support only.",
  ];

  return (
    <div className="bg-white rounded-3xl border border-border-soft p-6 md:p-8 space-y-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-border-soft">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-accent" />
          <h4 className="text-lg font-semibold text-text-primary">
            AI Findings Summary
          </h4>
        </div>
        <span className="text-xs font-mono text-text-tertiary">
          Decision Support
        </span>
      </div>

      {/* Observation Box */}
      <div className="space-y-4 text-sm leading-relaxed text-text-secondary">
        <div>
          <span className="text-xs font-semibold uppercase text-text-tertiary tracking-wider block mb-1">
            Clinical Observation
          </span>
          <p className="text-text-primary">
            {AI_REPORT.observation}
          </p>
        </div>

        {/* Boundary Uncertainty Detail */}
        <div className="p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 text-xs text-amber-900 leading-relaxed">
          <div className="font-semibold mb-1 flex items-center gap-1.5 text-amber-950">
            <AlertCircle size={14} className="text-amber-700" />
            Boundary Uncertainty Assessment
          </div>
          {AI_REPORT.uncertaintyNote}
        </div>

        {/* Bulleted Findings */}
        <div className="pt-2 border-t border-border-soft space-y-2">
          <span className="text-xs font-semibold uppercase text-text-tertiary tracking-wider block mb-2">
            Structured Findings
          </span>
          {findings.map((finding, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
              <span>{finding}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Regulatory Research Disclaimer */}
      <div className="pt-4 border-t border-border-soft text-[11px] text-text-tertiary leading-relaxed">
        {AI_REPORT.disclaimer}
      </div>
    </div>
  );
}
