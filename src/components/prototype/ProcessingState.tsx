"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useKortexStore } from "@/lib/store";
import { MOCK_ANALYSIS } from "@/lib/mock-study";
import NeuralPulseCanvas from "@/components/ui/NeuralPulseCanvas";

const STEPS = [
  { id: "prepare", label: "Preparing Study" },
  { id: "quality", label: "Checking Image Integrity & Motion" },
  { id: "organize", label: "Organizing Continuous Slices" },
  { id: "preprocess", label: "Normalizing Pixel Intensities" },
  { id: "segment", label: "Running Core & Penumbra Neural Segmentation" },
  { id: "quantify", label: "Calculating Lesion Volumes & Mismatch" },
  { id: "confidence", label: "Estimating Confidence & Boundary Margin" },
  { id: "report", label: "Generating Structured AI Findings" },
];

export default function ProcessingState() {
  const { setPrototypeState, setAnalysis } = useKortexStore();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          // When all steps are done, transition to results
          setTimeout(() => {
            setAnalysis(MOCK_ANALYSIS);
            setPrototypeState("results");
          }, 600);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(timer);
  }, [setAnalysis, setPrototypeState]);

  return (
    <div className="relative w-full max-w-2xl mx-auto py-12 px-6">
      {/* Background Neural Pulse Layer — active during processing */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-30 pointer-events-none">
        <NeuralPulseCanvas intensity="processing" />
      </div>

      <div className="relative z-10 bg-white/80 backdrop-blur-xl border border-border-soft rounded-3xl p-8 md:p-12 shadow-lg">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="heading-label tracking-[0.2em] text-accent mb-2 block font-mono">
            INFERENCE IN PROGRESS
          </span>
          <h3 className="text-2xl md:text-3xl font-semibold text-text-primary tracking-tight">
            Analyzing Cerebral Perfusion
          </h3>
          <p className="text-sm text-text-secondary mt-2">
            Evaluating volumetric scan data using dual core/penumbra neural decoders
          </p>
        </div>

        {/* Animated Steps Sequence */}
        <div className="space-y-3.5 max-w-lg mx-auto">
          {STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isPending = idx > currentStepIndex;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 ${
                  isCurrent
                    ? "bg-accent-soft/50 border border-accent/30 text-text-primary"
                    : isCompleted
                    ? "bg-black/[0.02] border border-transparent text-text-primary"
                    : "opacity-40 border border-transparent text-text-tertiary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      isCompleted
                        ? "bg-emerald-500 text-white"
                        : isCurrent
                        ? "bg-accent text-white"
                        : "bg-black/10 text-text-tertiary"
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={14} strokeWidth={3} />
                    ) : isCurrent ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span className="text-sm font-medium">{step.label}</span>
                </div>

                <div className="text-xs font-mono">
                  {isCompleted && (
                    <span className="text-emerald-600 font-semibold">Done</span>
                  )}
                  {isCurrent && (
                    <span className="text-accent font-semibold animate-pulse">Running</span>
                  )}
                  {isPending && <span>Waiting</span>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
