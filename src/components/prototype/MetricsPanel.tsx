"use client";

import { useKortexStore } from "@/lib/store";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import { Activity, ShieldCheck } from "lucide-react";

export default function MetricsPanel() {
  const { analysis } = useKortexStore();

  const core = analysis?.coreVolumeMl ?? 18.4;
  const penumbra = analysis?.penumbraVolumeMl ?? 52.7;
  const mismatch = analysis?.mismatchVolumeMl ?? 34.3;
  const ratio = analysis?.mismatchRatio ?? 2.86;
  const confidence = analysis?.confidence ?? 91;
  const quality = analysis?.qualityScore ?? 87;

  return (
    <div className="bg-white rounded-3xl border border-border-soft p-6 md:p-8 space-y-6 shadow-xs">
      {/* Header with Quality Badge */}
      <div className="flex items-center justify-between pb-4 border-b border-border-soft">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-text-tertiary font-semibold block">
            Volumetric Analysis
          </span>
          <h4 className="text-lg font-semibold text-text-primary">
            Calculated Tissue Metrics
          </h4>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-semibold">
          <ShieldCheck size={14} />
          <span>Quality {quality}%</span>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Ischemic Core */}
        <div className="p-4 rounded-2xl bg-bg-primary border border-border-soft">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E53935]" />
            <span className="text-xs text-text-secondary font-medium">Core Volume</span>
          </div>
          <div className="text-2xl font-semibold text-text-primary">
            <AnimatedNumber value={core} decimals={1} suffix=" mL" />
          </div>
          <span className="text-[11px] text-text-tertiary">Non-viable tissue</span>
        </div>

        {/* Penumbra */}
        <div className="p-4 rounded-2xl bg-bg-primary border border-border-soft">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2457F5]" />
            <span className="text-xs text-text-secondary font-medium">Penumbra</span>
          </div>
          <div className="text-2xl font-semibold text-text-primary">
            <AnimatedNumber value={penumbra} decimals={1} suffix=" mL" />
          </div>
          <span className="text-[11px] text-text-tertiary">Salvageable target</span>
        </div>

        {/* Mismatch Volume */}
        <div className="p-4 rounded-2xl bg-bg-primary border border-border-soft">
          <div className="flex items-center gap-2 mb-1">
            <Activity size={12} className="text-accent" />
            <span className="text-xs text-text-secondary font-medium">Mismatch Vol</span>
          </div>
          <div className="text-2xl font-semibold text-text-primary">
            <AnimatedNumber value={mismatch} decimals={1} suffix=" mL" />
          </div>
          <span className="text-[11px] text-text-tertiary">Penumbra – Core</span>
        </div>

        {/* Mismatch Ratio */}
        <div className="p-4 rounded-2xl bg-bg-primary border border-border-soft">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-text-secondary font-medium">Mismatch Ratio</span>
          </div>
          <div className="text-2xl font-semibold text-[#2457F5]">
            <AnimatedNumber value={ratio} decimals={2} />
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">Favorable target</span>
        </div>
      </div>

      {/* Confidence & Uncertainty Summary */}
      <div className="p-4 rounded-2xl bg-bg-primary border border-border-soft space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-secondary">Model Confidence</span>
          <span className="text-xs font-semibold text-text-primary font-mono">
            {confidence}% (Calibrated)
          </span>
        </div>
        <div className="w-full bg-black/10 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-accent h-full rounded-full transition-all duration-500"
            style={{ width: `${confidence}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs pt-1 border-t border-border-soft/60">
          <span className="text-text-tertiary">Boundary Uncertainty</span>
          <span className="font-medium text-amber-600">Moderate (Posterior margin)</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-text-tertiary">Affected Hemisphere</span>
          <span className="font-medium text-text-primary">Left MCA Territory</span>
        </div>
      </div>
    </div>
  );
}
