"use client";

import { useKortexStore } from "@/lib/store";
import StudyUploader from "@/components/prototype/StudyUploader";
import ProcessingState from "@/components/prototype/ProcessingState";
import ScanWorkstation from "@/components/prototype/workstation/ScanWorkstation";

export default function PrototypePage() {
  const { prototypeState, resetPrototype } = useKortexStore();

  return (
    <div className={`min-h-screen pt-28 px-4 md:px-8 bg-bg-primary ${prototypeState === "results" ? "pb-8" : "pb-20"}`}>
      <div className={prototypeState === "results" ? "max-w-[1600px] mx-auto" : "max-w-7xl mx-auto"}>
        {/* Workspace Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-semibold tracking-wider uppercase text-accent">
                KORTEX WORKSTATION
              </span>
              <span className="text-xs text-text-tertiary">/</span>
              <span className="text-xs text-text-tertiary font-mono">
                {prototypeState === "results"
                  ? "ANALYSIS KTX-2026-0847"
                  : prototypeState === "processing"
                  ? "INFERENCE ENGINE"
                  : "STUDY INGESTION"}
              </span>
            </div>
            <h1 className="text-3xl font-semibold text-text-primary tracking-tight">
              {prototypeState === "results"
                ? "Stroke Lesion Review & Quantification"
                : prototypeState === "processing"
                ? "Processing Volumetric Study"
                : "Analyze Brain Imaging Study"}
            </h1>
          </div>

          {prototypeState === "results" && <span className="text-xs text-text-tertiary">Interactive frontend simulation · no clinical inference</span>}
        </div>

        {/* State Conditional Views */}
        {prototypeState === "idle" && (
          <div className="py-8">
            <StudyUploader />
          </div>
        )}

        {prototypeState === "processing" && (
          <div className="py-8">
            <ProcessingState />
          </div>
        )}

        {prototypeState === "results" && <ScanWorkstation />}
      </div>
    </div>
  );
}
